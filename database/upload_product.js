const csv = require('csv-parser');
const db = require('./db.js');
const fs = require('fs');
const Product = db.Product;

//let files = ['product_test.csv', 'features_test.csv', 'styles_test.csv', 'photos_test.csv', 'skus_test.csv', 'related_test.csv'];
let files = ['product.csv', 'features.csv', 'styles.csv', 'photos.csv', 'skus.csv', 'related.csv'];

(async function() {
  try {
    for (var i = 0; i < files.length; i++) {
      await new Promise((resolve, reject) => {
        let buffer = [];
        let fileName = files[i].split('.')[0];
        console.log('testing file', fileName);
        let counter = 0;
        let stream = fs.createReadStream(`../etl/${files[i]}`)
          .pipe(csv())
          .on('error', reject)
          .on('data', async data => {
            stream.pause();
            let doc = db.modify(data, fileName);
            buffer.push(doc);
            counter++;
            try {
              if (counter > 10000) {
                if (fileName === 'product') {
                  await Product.insertMany(buffer);
                } else {
                  let operations = [];
                  buffer.forEach((doc, index) => {
                    if (fileName === 'features') {
                      operations.push({
                        'updateOne': {
                            'filter': { "_id": doc['product_id'] },
                            'update': { "$push": { "features": doc } }
                        }
                      })
                    } else if (fileName === 'styles') {
                      operations.push({
                        'updateOne': {
                            'filter': { "_id": doc['product_id'] },
                            'update': { "$push": { "styles": doc } }
                        }
                      })
                    } else if (fileName === 'photos') {
                      operations.push({
                        'updateOne': {
                            'filter': { "_id": doc['product_id'], "styles": { $elemMatch: { "id": doc['style_id'] } } },
                            'update': { "$push": { "styles.$.photos": doc } }
                        }
                      })
                    } else if (fileName === 'skus') {
                      operations.push({
                        'updateOne': {
                            'filter': { "_id": doc['product_id'], "styles": { $elemMatch: { "id": doc['style_id'] } } },
                            'update': { "$push": { "styles.$.skus": doc } }
                        }
                      })
                    } else if (fileName === 'related') {
                      operations.push({
                        'updateOne': {
                            'filter': { "_id": doc['current_product_id'] },
                            'update': { "$push": { "related": doc } }
                        }
                      })
                    }
                  })
                  await Product.collection.bulkWrite(
                    operations,
                    { "ordered": true, w: 1 }
                  )
                  operations = [];
                }
                buffer = [];
                counter = 0;
              }
            } catch (e) {
              stream.destroy(e);
            }
            stream.resume();
          })
          .on('end', async () => {
            try {
              if (counter > 0) {
                if (fileName === 'product') {
                  await Product.insertMany(buffer);
                } else {
                    let operations = [];
                    buffer.forEach( async (doc, index) => {
                      if (fileName === 'features') {
                        operations.push({
                          'updateOne': {
                              'filter': { "_id": doc['product_id'] },
                              'update': { "$push": { "features": doc } }
                          }
                        })
                      } else if (fileName === 'styles') {
                        operations.push({
                          'updateOne': {
                              'filter': { "_id": doc['product_id'] },
                              'update': { "$push": { "styles": doc } }
                          }
                        })
                      } else if (fileName === 'photos') {
                          operations.push({
                            'updateOne': {
                                'filter': { "_id": doc['product_id'], "styles": { $elemMatch: { "id": doc['style_id'] } } },
                                'update': { "$push": { "styles.$.photos": doc } }
                            }
                          })
                      } else if (fileName === 'skus') {
                          operations.push({
                            'updateOne': {
                                'filter': { "_id": doc['product_id'], "styles": { $elemMatch: { "id": doc['style_id'] } } },
                                'update': { "$push": { "styles.$.skus": doc } }
                            }
                          })
                      } else if (fileName === 'related') {
                        operations.push({
                          'updateOne': {
                              'filter': { "_id": doc['current_product_id'] },
                              'update': { "$push": { "related": doc } }
                          }
                        })
                      }
                    })
                    await Product.collection.bulkWrite(
                      operations,
                      { "ordered": true, w: 1 }
                    )
                    operations = [];
                }
                buffer = [];
                counter = 0;
                console.log('Done:', fileName);
                resolve();
              }
            } catch(e) {
              stream.destroy(e);
            }
          });
      })
    }
  } catch(e) {
    console.error(e);
  } finally {
    process.exit();
  }
})();
const csv = require('csv-parser');
const db = require('./db.js');
const fs = require('fs');
const Product = db.Product;
const Feature = db.Feature;
const Photo = db.Photo;
const Style = db.Style;
const Related = db.Related;
const Sku = db.Sku;

fs.readdir('../etl', function(err, files) {

  if (err) {
    throw err;
  }

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
                if (counter >= 100000) {
                  if (fileName === 'product') {
                    await Product.insertMany(buffer);
                  } else if (fileName === 'features') {
                    await Feature.insertMany(buffer);
                  } else if (fileName === 'photos') {
                    await Photo.insertMany(buffer);
                  } else if (fileName === 'styles') {
                    await Style.insertMany(buffer);
                  } else if (fileName === 'skus') {
                    await Sku.insertMany(buffer);
                  } else {
                    await Related.insertMany(buffer);
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
                if ( counter > 0 ) {
                  if (fileName === 'product') {
                    await Product.insertMany(buffer);
                  } else if (fileName === 'features') {
                    await Feature.insertMany(buffer);
                  } else if (fileName === 'photos') {
                    await Photo.insertMany(buffer);
                  } else if (fileName === 'styles') {
                    await Style.insertMany(buffer);
                  } else if (fileName === 'skus') {
                    await Sku.insertMany(buffer);
                  } else {
                    await Related.insertMany(buffer);
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
});
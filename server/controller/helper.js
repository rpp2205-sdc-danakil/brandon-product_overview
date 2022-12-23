const db = require('../../database/db.js');
const Product = db.Product;

module.exports = {

  getProductsHandler: (req, res) => {
    var count = 5;
    var num = Math.floor(Math.random() * 100000 + 900000);

    // return Product.find({_id: {$gte : num, $lte: (num - 1) + count}}, {name: 1, slogan: 1, description: 1, category: 1, default_price: 1}).exec()
    // .then(result => {
    //   res.status(200).send(result);
    // })
    // .catch(err => {
    //   res.status(500).send(err);
    // });  //Used in initial loader.io test

    return Product.aggregate([
      {$match : {
        "_id": {$gte : num, $lte: (num - 1) + count}
        }
      },
      {$project: {
        "name": 1,
        "slogan": 1,
        "description": 1,
        "category": 1,
        "default_price": 1
       }
      }
    ]).exec()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  getProductHandler: (req, res) => {
    let id = req.params.product_id;

    // return Product.findById(id, {slogan: 0, product_id: 0, description: 0, features: 0, results: 0, related: 0, __v: 0}).exec()
    // .then(result => {
    //   res.status(200).send(result);
    // })
    // .catch(err => {
    //   res.status(500).send(err);
    // }); //Used in initial loaderio test

    return Product.aggregate([
      {$match : {
        "_id": parseInt(id)
        }
      },
      {$project: {
        "name": 1,
        "category": 1,
        "default_price": 1
       }
      }
    ]).exec()
    .then(result => {
      res.status(200).send(result[0]);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  getStylesHandler: (req, res) => {
    let id = req.params.product_id;

    // return Product.findById(id, {_id: 0, product_id: 1, results: 1}).exec()
    //   .then(result => {
    //     res.status(200).send(result);
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   });  //Used in initial loaderio test

    return Product.aggregate([
      {$match: {
        "_id": parseInt(id)
       }
      },
      {$project: {
        "_id": 0,
        "product_id": 1,
        "results": 1
       }
      },
      {$project: {
        "results._id": 0,
        "results.product_id": 0,
        "results.photos._id": 0,
        "results.photos.style_id": 0,
        "results.photos.product_id": 0,
        "results.skus._id": 0,
        "results.skus.style_id": 0,
        "results.skus.product_id": 0
       }
      }
    ]).exec()
      .then(result => {
        res.status(200).send(result[0]);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  },

  getRelatedHandler: (req, res) => {
    let id = req.params.product_id;

    // return Product.findById(id).exec()
    //   .then(result => {
    //     let related = result.related.map(item => item.related_product_id);
    //     res.status(200).send(related);
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   });  //Used in initial loaderio test

    return Product.aggregate([
      {$match: {
        "_id": parseInt(id)
        }
      },
      {$project: {
        "_id": 0,
        "related": "$related.related_product_id"
        }
      }
    ]).exec()
      .then(result => {
        res.status(200).send(result[0].related);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
};
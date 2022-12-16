const db = require('../../database/db.js');
const Product = db.Product;

module.exports = {

  getProductsHandler: (req, res) => {
    var count = 5;
    var num = Math.floor(Math.random() * 100000 + 900000);

    return Product.find({_id: {$gte : num, $lte: (num - 1) + count}}, {name: 1, slogan: 1, description: 1, category: 1, default_price: 1}).exec()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });

    // return Product.find({}).limit(count).exec()
    // .then(result => {
    //   res.status(200).send(result);
    // })
    // .catch(err => {
    //   res.status(500).send(err);
    // });
  },

  getProductHandler: (req, res) => {
    let id = req.params.product_id;

    // return Product.findById(id).exec()
    //   .then(result => {
    //     res.status(200).send(result);
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   });

    return Product.findById(id, {slogan: 0, description: 0, features: 0, results: 0, related: 0}).exec()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  },

  getRelatedHandler: (req, res) => {
    let id = req.params.product_id;

     return Product.findById(id).exec()
      .then(result => {
        let related = result.related.map(item => item.related_product_id);
        res.status(200).send(related);
      })
      .catch(err => {
        res.status(500).send(err);
      });

      // return Product.findById(id).exec()
      // .then(result => {
      //   let related = result.related;
      //   let arr = [];

      //   for (var i = 0; i < related.length; i++) {
      //     arr.push(related[i].related_product_id);
      //   }

      //   related = arr;
      //   res.status(200).send(related);
      // })
      // .catch(err => {
      //   res.status(500).send(err);
      // })
  },

  getStylesHandler: (req, res) => {
    let id = req.params.product_id;

    // return Product.findById(id).exec()
    //   .then(result => {
    //     res.status(200).send(result);
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   })

    return Product.findById(id, {product_id: 1, results: 1}).exec()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });

    // return Product.findById(id).exec()
    // .then(result => {
    //   res.status(200).send(result.results);
    // })
    // .catch(err => {
    //   res.status(500).send(err);
    // })
  }
};
require('dotenv').config();
const db = require('../../database/db.js');
const Product = db.Product;

module.exports = {

  getProductHandler: (req, res) => {
    let id = req.params.product_id;

    return Product.findById(id).exec()
      .then(result => {
        res.status(200).send(result.data);
      })
      .catch(err => {
        res.status(500).send(err);
      })
    // axios.get(`${API_Link}/products/${product_id}`, auth)
    //   .then(response => {
    //     res.status(200).send(response.data)
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   })
  },

  getRelatedHandler: (req, res) => {
    let id = req.params.product_id;

    return Product.findById(id).exec()
      .then(result => {
        let related = result.related.filter(item => item.related_product_id);
        res.status(200).send(related);
      })
      .catch(err => {
        res.status(500).send(err);
      })
    // axios.get(`${API_Link}/products/${product_id}/related`, auth)
    //   .then(response => {
    //     res.status(200).send(response.data);
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   })
  },

  getStylesHandler: (req, res) => {
    let id = req.params.product_id;

    return Product.findById(id).exec()
    .then(result => {
      res.status(200).send(result.styles);
    })
    .catch(err => {
      res.status(500).send(err);
    })

    // axios.get(`${API_Link}/products/${product_id}/styles`, auth)
    //   .then(response => {
    //     res.status(200).send(response.data);
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   })
  }

};

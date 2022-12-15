const mongoose = require('mongoose');
const { Schema, model, connect } = mongoose;
connect(`mongodb://localhost:27017/products`);

let styleId_to_prodId = {};

const productsSchema = new Schema({
  _id: Number,
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      _id: Number,
      product_id: Number,
      feature: String,
      value: String
    }
  ],
  results: [
    {
      _id: Number,
      style_id: Number,
      product_id: Number,
      name: String,
      sale_price: String,
      original_price: String,
      'default?': Boolean,
      photos: [
        {
          _id: Number,
          style_id: Number,
          url: String,
          thumbnail_url: String
        }
      ],
      skus: [
        {
          _id: Number,
          style_id: Number,
          size: String,
          quantity: Number
        }
      ]
    }
  ],
  related: [
    {
      _id: Number,
      current_product_id: Number,
      related_product_id: Number
    }
  ]
});

// const productsSchema = new Schema({
//   _id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   features: [
//     {
//       id: Number,
//       product_id: Number,
//       feature: String,
//       value: String
//     }
//   ],
//   results: [
//     {
//       id: Number,
//       product_id: Number,
//       name: String,
//       sale_price: String,
//       original_price: String,
//       'default?': Boolean,
//       photos: [
//         {
//           id: Number,
//           style_id: Number,
//           url: String,
//           thumbnail_url: String
//         }
//       ],
//       skus: [
//         {
//           id: Number,
//           style_id: Number,
//           size: String,
//           quantity: Number
//         }
//       ]
//     }
//   ],
//   related: [
//     {
//       id: Number,
//       current_product_id: Number,
//       related_product_id: Number
//     }
//   ]
// });

let modify = (data, fileName) => {
  let doc = null;

  if (fileName === 'product') {

    // doc = new Product({
    //   _id: data['id'],
    //   name: data['name'],
    //   slogan: data['slogan'],
    //   description: data['description'],
    //   category: data['category'],
    //   default_price: data['default_price']
    // });

    doc = new Product({
      _id: data['id'],
      product_id: data['id'],
      name: data['name'],
      slogan: data['slogan'],
      description: data['description'],
      category: data['category'],
      default_price: data['default_price']
    });

    return doc;

  } else if (fileName === 'features') {
    let value = data['value'];

    if (value === 'null') {
      value = JSON.parse(value);
    }

    // doc = {
    //   id: parseInt(data['id']),
    //   product_id: parseInt(data['product_id']),
    //   feature: data['feature'],
    //   value: value
    // };

    doc = {
      _id: parseInt(data['id']),
      product_id: parseInt(data['product_id']),
      feature: data['feature'],
      value: value
    };

    return doc;

  } else if (fileName === 'styles') {
      let sale_price = data['sale_price'];
      let value = false;

      if (sale_price === 'null') {
        sale_price = JSON.parse(sale_price);
      }

      if (parseInt(data['default_style']) === 1) {
        value = true;
      }

      styleId_to_prodId[data['id']] = parseInt(data['productId']);

      // doc = {
      //   id: parseInt(data['id']),
      //   product_id: parseInt(data['productId']),
      //   name: data['name'],
      //   sale_price: sale_price,
      //   original_price: data['original_price'],
      //   'default?': value,
      //   photos: [],
      //   skus: []
      // };

      doc = {
        _id: parseInt(data['id']),
        style_id: parseInt(data['id']),
        product_id: parseInt(data['productId']),
        name: data['name'],
        sale_price: sale_price,
        original_price: data['original_price'],
        'default?': value,
        photos: [{thumbnail_url: null}],
        skus: []
      };

    return doc;

  } else if (fileName === 'photos') {
    let url = data['url'].replace(/['"]+/g, '');
    let thumbnail = data['thumbnail_url'].replace(/['"]+/g, '');
    // Product.findOneAndUpdate({_id: styleId_to_prodId[data['styleId']], "results": { $elemMatch: { "_id": data['styleId'] } }}, {$pull: {"results.$.photos": {thumbnail_url: null}}}).exec()
    //   .then(result => {})
    //   .catch(error => {console.error(err)});
    (async function updateOne() {
      await Product.findOneAndUpdate({_id: styleId_to_prodId[data['styleId']], "results": { $elemMatch: { "_id": data['styleId'] } }}, {$pull: {"results.$.photos": {thumbnail_url: null}}})
    })()

    // doc = {
    //   id: parseInt(data['id']),
    //   style_id: parseInt(data['styleId']),
    //   url: url,
    //   thumbnail_url: thumbnail,
    //   product_id: styleId_to_prodId[data['styleId']]
    // };

    doc = {
      _id: parseInt(data['id']),
      style_id: parseInt(data['styleId']),
      url: url,
      thumbnail_url: thumbnail,
      product_id: styleId_to_prodId[data['styleId']]
    };

    return doc;

  } else if (fileName === 'skus') {
    let size = data['size'].replace(/['"]+/g, '');

    // doc = {
    //   id: parseInt(data['id']),
    //   style_id: parseInt(data['styleId']),
    //   size: size,
    //   quantity: parseInt(data['quantity']),
    //   product_id: styleId_to_prodId[data['styleId']]
    // }

    doc = {
      _id: parseInt(data['id']),
      style_id: parseInt(data['styleId']),
      size: size,
      quantity: parseInt(data['quantity']),
      product_id: styleId_to_prodId[data['styleId']]
    }

    return doc;

  } else if (fileName === 'related') {

    // doc = {
    //   id: parseInt(data['id']),
    //   current_product_id: parseInt(data['current_product_id']),
    //   related_product_id: parseInt(data['related_product_id'])
    // };

    doc = {
      _id: parseInt(data['id']),
      current_product_id: parseInt(data['current_product_id']),
      related_product_id: parseInt(data['related_product_id'])
    };

    return doc;

  }
}

const Product = model('Products', productsSchema);
//const Product = model('Products_Test', productsSchema, 'products_test');
//const Product = model('Products_Test_Mix', productsSchema);

module.exports = {Product, modify};
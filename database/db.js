const mongoose = require('mongoose');
const { Schema, model, connect } = mongoose;
connect(`mongodb://localhost:27017/products`);

let styleId_to_prodId = {};

const productsSchema = new Schema({
  _id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      id: Number,
      product_id: Number,
      feature: String,
      value: String
    }
  ],
  styles: [
    {
      id: Number,
      product_id: Number,
      name: String,
      sale_price: String,
      original_price: String,
      default_style: Boolean,
      photos: [
        {
          id: Number,
          style_id: Number,
          url: String,
          thumbnail_url: String
        }
      ],
      skus: [
        {
          id: Number,
          style_id: Number,
          size: String,
          quantity: Number
        }
      ]
    }
  ],
  related: [
    {
      id: Number,
      current_product_id: Number,
      related_product_id: Number
    }
  ]
});

let modify = (data, fileName) => {
  let doc = null;

  if (fileName === 'product') {
    doc = new Product({
      _id: data['id'],
      name: data['name'],
      slogan: data['slogan'],
      description: data['description'],
      category: data['category'],
      default_price: data['default_price']
    });

    return doc;

  } else if (fileName === 'features') {

    doc = {
      id: parseInt(data['id']),
      product_id: parseInt(data['product_id']),
      feature: data['feature'],
      value: data['value']
    };

    return doc;

  } else if (fileName === 'styles') {
      let value = false;

      if (parseInt(data['default_style']) === 1) {
        value = true;
      }

      styleId_to_prodId[data['id']] = parseInt(data['productId']);

      doc = {
        id: parseInt(data['id']),
        product_id: parseInt(data['productId']),
        name: data['name'],
        sale_price: data['sale_price'],
        original_price: data['original_price'],
        default_style: value,
        photos: [],
        skus: []
      };

    return doc;

  } else if (fileName === 'photos') {

    doc = {
      id: parseInt(data['id']),
      style_id: parseInt(data['styleId']),
      url: data['url'],
      thumbnail_url: data['thumbnail_url'],
      product_id: styleId_to_prodId[data['styleId']]
    };

    return doc;

  } else if (fileName === 'skus') {

    doc = {
      id: parseInt(data['id']),
      style_id: parseInt(data['styleId']),
      size: data['size'],
      quantity: parseInt(data['quantity']),
      product_id: styleId_to_prodId[data['styleId']]
    }

    return doc;

  } else if (fileName === 'related') {

    doc = {
      id: parseInt(data['id']),
      current_product_id: parseInt(data['current_product_id']),
      related_product_id: parseInt(data['related_product_id'])
    };

    return doc;

  }
}

const Product = model('Products', productsSchema);
//const Product = model('Products_Test', productsSchema);

module.exports = {Product, modify};
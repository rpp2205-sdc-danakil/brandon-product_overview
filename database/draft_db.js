const mongoose = require('mongoose');
const { Schema, model, connect } = mongoose;
connect(`mongodb://localhost:27017/products`);

const productSchema = new Schema({
  _id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
});

const featureSchema = new Schema({
  _id: Number,
  product_id: Number,
  feature: String,
  value: String
});

const photoSchema = new Schema({
  _id: Number,
  style_id: Number,
  url: String,
  thumbnail_url: String
});

const styleSchema = new Schema({
  _id: Number,
  product_id: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: Number
});

const skuSchema = new Schema({
  _id: Number,
  style_id: Number,
  size: String,
  quantity: Number
});

const relatedSchema = new Schema({
  _id: Number,
  current_product_id: Number,
  related_product_id: Number
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
    doc = new Feature({
      _id: data['id'],
      product_id: data['product_id'],
      feature: data['feature'],
      value: data['value']
    });

    return doc;

  } else if (fileName === 'photos') {

    doc = new Photo({
      _id: data['id'],
      style_id: data['styleId'],
      url: data['url'],
      thumbnail_url: data['thumbnail_url']
    });

    return doc;

  } else if (fileName === 'styles') {
    doc = new Style({
      _id: data['id'],
      product_id: data['productId'],
      name: data['name'],
      sale_price: data['sale_price'],
      original_price: data['original_price'],
      default_style: data['default_style'],
    });

    return doc;

  } else if (fileName === 'skus') {
    doc = new Sku({
      _id: data['id'],
      style_id: data['styleId'],
      size: data['size'],
      quantity: data['quantity']
    });

    return doc;

  } else if (fileName === 'related') {
    doc = new Related({
      _id: data['id'],
      current_product_id: data['current_product_id'],
      related_product_id: data['related_product_id']
    });

    return doc;
  }
}


const Product = model('Product', productSchema);
const Feature = model('Feature', featureSchema);
const Photo = model('Photo', photoSchema);
const Style = model('Style', styleSchema);
const Sku = model('Sku', skuSchema);
const Related = model('Related', relatedSchema, 'related');

module.exports = {Product, Feature, Photo, Style, Sku, Related, modify};

// //list products
// //GET /products
// [
//   {
//         "id": 1,
//         "name": "Camo Onesie",
//         "slogan": "Blend in to your crowd",
//         "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//         "category": "Jackets",
//         "default_price": "140"
//     },
//   {
//         "id": 2,
//         "name": "Bright Future Sunglasses",
//         "slogan": "You've got to wear shades",
//         "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
//         "category": "Accessories",
//         "default_price": "69"
//     },
//   {
//         "id": 3,
//         "name": "Morning Joggers",
//         "slogan": "Make yourself a morning person",
//         "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
//         "category": "Pants",
//         "default_price": "40"
//     },
//     // ...
// ]

// //product information
// //GET /products/:product_id
// {
//   "id": 11,
//   "name": "Air Minis 250",
//   "slogan": "Full court support",
//   "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
//   "category": "Basketball Shoes",
//   "default_price": "0",
//   "features": [
//   {
//           "feature": "Sole",
//           "value": "Rubber"
//       },
//   {
//           "feature": "Material",
//           "value": "FullControlSkin"
//       },
//   // ...
//   ],
// }


// //product styles
// //GET /products/:product_id/styles
// {
//   "product_id": "1",
//   "results": [
//   {
//           "style_id": 1,
//           "name": "Forest Green & Black",
//           "original_price": "140",
//           "sale_price": "0",
//           "default?": true,
//           "photos": [
//       {
//                   "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//                   "url": "urlplaceholder/style_1_photo_number.jpg"
//               },
//       {
//                   "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//                   "url": "urlplaceholder/style_1_photo_number.jpg"
//               }
//       // ...
//           ],
//       "skus": {
//                 "37": {
//                       "quantity": 8,
//                       "size": "XS"
//                 },
//                 "38": {
//                       "quantity": 16,
//                       "size": "S"
//                 },
//                 "39": {
//                       "quantity": 17,
//                       "size": "M"
//                 },
//           //...
//             }
//   },
// {
//       "style_id": 2,
//       "name": "Desert Brown & Tan",
//       "original_price": "140",
//       "sale_price": "0",
//       "default?": false,
//       "photos": [
//       {
//                   "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
//                   "url": "urlplaceholder/style_2_photo_number.jpg"
//       }
//     // ...
//           ],
//       "skus": {
//                 "37": {
//                       "quantity": 8,
//                       "size": "XS"
//                 },
//                 "38": {
//                       "quantity": 16,
//                       "size": "S"
//                 },
//                 "39": {
//                       "quantity": 17,
//                       "size": "M"
//                 },
//           //...
//             }
//   },
// // ...
// }

// //related products
// //GET /products/:product_id/related
// [
//   2,
//   3,
//   8,
//   7
// ],
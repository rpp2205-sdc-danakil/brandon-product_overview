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

const Product = model('product_collection', productsSchema);
//const Product = model('ProductMixTest', productsSchema);

module.exports = {Product, modify};

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


// const productsSchema = new Schema({
//   _id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   features: [{
//     id: Number,
//     product_id: Number,
//     feature: String,
//     value: String
//   }],
//   styles: [{
//     id: Number,
//     product_id: Number,
//     name: String,
//     sale_price: String,
//     original_price: String,
//     default_style: Number,
//   }],
//   photos: [{
//     id: Number,
//     style_id: Number,
//     url: String,
//     thumbnail_url: String
//   }],
//   skus: [{
//     id: Number,
//     style_id: Number,
//     size: String,
//     quantity: Number
//   }],
//   related: [{
//     id: Number,
//     current_product_id: Number,
//     related_product_id: Number
//   }]
// });
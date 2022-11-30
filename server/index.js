const express = require('express');
const db = require('../database/db.js');
const port = 3001;
const app = express();
const { getProductHandler, getRelatedHandler, getStylesHandler } = require('./controller/helper.js');

app.get('/products/:product_id', getProductHandler);

app.get('/products/:product_id/styles', getStylesHandler);

app.get('/products/:product_id/related', getRelatedHandler);

// let newProduct = db.Product({
//   id: 1,
//   name: 'Camo Onsie',
//   slogan: 'Blend in to your crowd',
//   description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//   category: 'Jackets',
//   default_price: '140',
//   features: [
//     {
//       feature: "Sole",
//       value: "Rubber"
//     },
//     {
//       feature: "Material",
//       value: "FullControlSkin"
//     },
//   ],
//   styles: [
//     {
//       id: 1,
//       name: "Forest Green & Black",
//       original_price: "140",
//       sale_price: "0",
//       default: true,
//       photos: [
//         {
//           thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//           url: "urlplaceholder/style_1_photo_number.jpg"
//         },
//         {
//           thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//           url: "urlplaceholder/style_1_photo_number.jpg"
//         }
//       ],
//       skus: [
//         {
//           id: 37,
//           quantity: 8,
//           size: "XS"
//         },
//         {
//           id: 38,
//           quantity: 16,
//           size: "S"
//         },
//         {
//           id: 39,
//           quantity: 17,
//           size: "M"
//         }
//       ]
//     }
//   ],
//   related: [2, 3, 8, 7]
// });
// newProduct.save();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//"results": [
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
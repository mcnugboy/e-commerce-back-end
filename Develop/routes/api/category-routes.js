const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attribute:['id', 'category_name'],
    include:[
      {
        model: Product,
        attribute:[
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ],
  })
  .then(category => res.join(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

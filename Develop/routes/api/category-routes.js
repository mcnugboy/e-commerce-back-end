const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attribute:['id', 'category_name'],
    include:[
      {
        model: Product,
        attribute:['id', 'product_name', 'price','stock', 'category_id']
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
  Category.findOne({
    where: {
      id: req.params.id
    },
    include:[
      {
        model:Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ],
  })
  .then(category => {
    if (!category) {
      res.status(404).json({ message: 'Sorry, no categories were found with this id.' });
      return;
    }
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(category => res.json(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(category => {
      if (!category[0]) {
        res.status(404).json({ message: 'Sorry, no categories were found with this id.' });
        return;
      }
      res.json(category);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(category => {
    if (category) {
      res.status(404).json({ message: 'Sorry, no categories were found with this id.' });
      return;
    }
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

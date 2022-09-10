const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll ({
    attributes:['id', 'product_name', 'price', 'stock', 'category_id'],
    include:[
      {
        model: Category,
        attributes:['id', 'category_name']
      },
      {
        model: Tag,
        attributes:['id', 'tag_name']
      },
    ]
  })
  .then(tag => res.join(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne ({
    where: {
      id: req.params.id
    },
    include:[
      {
        model: Tag,
        attributes:['id', 'tag_name']
      }
    ]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'Sorry, no tags were found with this id.' });
      return;
    }
    res.json(tag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tag => {
      if (!tag[0]) {
        res.status(404).json({ message: 'Sorry, no tags were found with this id.' });
        return;
      }
      res.json(tag);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tag => {
    if (tag) {
      res.status(404).json({ message: 'Sorry, no tags were found with this id.' });
      return;
    }
    res.json(tag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

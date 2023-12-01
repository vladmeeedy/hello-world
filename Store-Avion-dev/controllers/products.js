const Product = require("../models/Product");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

exports.addImages = (req, res, next) => {
  if (req.files.length > 0) {
    res.json({
      message: "Photos are received"
    });
  } else {
    res.json({
      message:
        "Something wrong with receiving photos at server. Please, check the path folder"
    });
  }
};

exports.addProduct = (req, res, next) => {
  const productFields = _.cloneDeep(req.body);

  productFields.itemNo = rand();

  try {
    productFields.name = productFields.name
      .toLowerCase()
      .trim()
      .replace(/\s\s+/g, " ");

  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }

  const updatedProduct = queryCreator(productFields);

  const newProduct = new Product(updatedProduct);

  newProduct
    .save()
    .then(product => res.json(product))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      if (!product) {
        return res.status(400).json({
          message: `Product with id "${req.params.id}" is not found.`
        });
      } else {
        const productFields = _.cloneDeep(req.body);

        try {
          productFields.name = productFields.name
            .toLowerCase()
            .trim()
            .replace(/\s\s+/g, " ");
        } catch (err) {
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          });
        }

        const updatedProduct = queryCreator(productFields);

        Product.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedProduct },
          { new: true }
        )
          .then(product => res.json(product))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getAllProducts = (req, res, next) => {
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  Product.find()
    .skip(startPage * perPage - perPage)
    .limit(perPage)
    .sort(sort)
    .then(products => res.send(products))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getProducts = (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const addItems = Number(mongooseQuery.addItems);
  const items = Number(mongooseQuery.items);

  if (mongooseQuery?.currentPrice) {
    if (typeof mongooseQuery.currentPrice === 'string') {
      const priceRange = mongooseQuery?.currentPrice?.split('-');
      if (priceRange.length === 2 && !isNaN(priceRange[0]) && !isNaN(priceRange[1])) {
        const minPrice = Number(priceRange[0]);
        const maxPrice = Number(priceRange[1]);

        const priceFilter = {
          $gte: minPrice,
          $lte: maxPrice
        };

        mongooseQuery['currentPrice'] = priceFilter;
      }
    } else {
      const firstRange = mongooseQuery?.currentPrice?.$in[0].split('-');
      const secondRange = mongooseQuery?.currentPrice?.$in[1].split('-');
      const leftNumber = String(firstRange[0]);
      const rightNumber = String(secondRange[1]);
      const priceFilter = {
        $gte: leftNumber,
        $lte: rightNumber
      };
      mongooseQuery['currentPrice'] = priceFilter;
    }
  }

  delete mongooseQuery.addItems;
  delete mongooseQuery.items;

  if (mongooseQuery.brand === "") {
    delete mongooseQuery.brand;
  }

  if (mongooseQuery.categories === "") {
    delete mongooseQuery.categories;
  }

  if (mongooseQuery.currentPrice === "") {
    delete mongooseQuery.currentPrice;
  }

  let applyLimit = true;
  if (mongooseQuery.brand?.length > 0 || mongooseQuery.currentPrice?.length > 0 || mongooseQuery.categories?.length > 0) {
    applyLimit = true;
  }

  let query = Product.find(mongooseQuery);
  if (applyLimit) {
    query = query.limit(addItems + items);
  }
  query.then((products) => {
    res.send(products);
  });
  query.catch((err) =>
    res.status(400).json({
      message: `Error happened on server: "${err}"`,
    })
  );
};

exports.getProductsRandom = (req, res, next) => {
  Product.aggregate([{ $sample: { size: 4 } }])
    .then(products => res.send(products))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
}

exports.getProductById = (req, res, next) => {
  Product.findOne({
    itemNo: req.params.itemNo
  })
    .then(product => {
      if (!product) {
        res.status(400).json({
          message: `Product with itemNo ${req.params.itemNo} is not found`
        });
      } else {
        res.json(product);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getProductsFilterParams = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  try {
    const products = await Product.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const productsQuantity = await Product.find(mongooseQuery);

    res.json({ products, productsQuantity: productsQuantity.length });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.searchProducts = async (req, res, next) => {
  if (!req.body.query) {
    res.status(400).json({ message: "Query string is empty" });
  }

  let query = req.body.query
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");

  let queryArr = query.split(" ");

  let matchedProducts = await Product.find({
    $text: { $search: query }
  });

  res.send(matchedProducts);
};

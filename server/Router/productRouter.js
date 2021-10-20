const express = require("express");
const router = express.Router();
const product = require("./models/Product");
const { body, validationResult } = require("express-validator");
const { request } = require("express");
const Product = require("./models/Product");
/*
   @usage : Get all Products
   @url : http://127.0.0.1:5000/api/products/
   @fields : no-fields
   @method : GET
   @access : PUBLIC 
*/

router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    // console.log(products);
    res.status(200).json({ products: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: [{ msg: error.message }] });
  }
});
/*
   @usage : Get a Product
   @url : http://127.0.0.1:5000/api/products/:product_id
   @fields : no-fields
   @method : GET
   @access : PUBLIC
*/
router.get("/products/:product_id", async (req, res) => {
  let productid = req.params.product_id;
  try {
    let product = await Product.findById(productid);
    res.status(200).json({ Product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: [{ msg: error.message }] });
  }
});

/* @usage : Create a Product
   @url : http://127.0.0.1:5000/api/products/
   @fields : name , image , price , qty , info
   @method : POST
   @access : PUBLIC
    */
router.post(
  "/products",
  [
    body("name").notEmpty().withMessage("name is require"),
    body("image").notEmpty().withMessage("image is require"),
    body("price").notEmpty().withMessage("price is require"),
    body("qty").notEmpty().withMessage("qty  is require"),
    body("info").notEmpty().withMessage("info is require"),
  ],
  async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let product = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info,
      };
      product = new Product(product);
      product = await product.save();
      res.status(200).json({
        msg: "Product is created",
        product: product,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: [{ msg: error.message }] });
    }
  }
);
/*
@  usage : Update Product
   @url : http://127.0.0.1:5000/api/products/:product_id
   @fields : name , image , price , qty , info
   @method : PUT
   @access : PUBLIC */
router.put("/products/:product_id", async (req, res) => {
  let productid = req.params.product_id;
  try {
    let product = await Product.findById(productid);
    if (!product) {
      return res.status(200).json({ error: [{ msg: "No Product Found" }] });
    }
    let updateProduct = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      qty: req.body.qty,
      info: req.body.info,
    };
    product = await Product.findByIdAndUpdate(
      productid,
      {
        $set: updateProduct,
      },
      { new: true }
    );
    res.status(200).json({
      msg: "Product is updated",
      product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: [{ msg: error.message }] });
  }
});

/*
@  usage : Delete Product
   @url : http://127.0.0.1:5000/api/products/:product_id
   @fields : no-fields
   @method : DELETE
   @access : PUBLIC */
router.delete("/products/:product_id", async (req, res) => {
  let productid = req.params.product_id;
  try {
    let product = await Product.findById(productid);
    if (!product) {
      return res.status(200).json({ error: [{ msg: "No Product Found" }] });
    }
    await Product.findByIdAndDelete(productid);
    res.status(200).json({
      msg: "Product is deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: [{ msg: error.message }] });
  }
});
module.exports = router;

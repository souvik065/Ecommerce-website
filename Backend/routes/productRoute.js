const express = require("express");
const app = express();
const { getAllProduct,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
app.use(express.json());
const router = express.Router();

router.route("/products").get(getAllProduct);

router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router
    .route("/product/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
    .get(getProductDetails);








module.exports = router
const express = require("express")
const router = express.Router()
const {
    getCategorys,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
const validateToken = require("../middleware/validateTokenHandler")

router.use(validateToken)
router.route("/").get(getCategorys).post(createCategory)
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory)


module.exports = router
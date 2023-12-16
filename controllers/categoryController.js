const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getCategorys = asyncHandler(async (req, res) => {
  const categorys = await Category.find({ user_id: req.user.id });
  res.status(200).json(categorys);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createCategory = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, is_available } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const category = await Category.create({
    name,
    is_available,
    user_id: req.user.id,
  });

  res.status(201).json(category);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (category.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to get other user Category");
  }

  res.status(200).json(category);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (category.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user Category");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCategory);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  if (category.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user Category");
  }
  await Category.deleteOne({ _id: req.params.id });
  res.status(200).json(category);
});

module.exports = {
  getCategorys,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};



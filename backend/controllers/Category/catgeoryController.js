const Category = require("../../models/Category/Catgeory");

const createCategoryCtrl = async (req, res, next) => {
  const { title } = req.body;
  try {
    const categoryIsExist = await Category.find({ title});
    if(categoryIsExist) {
      return next(new Error("Category is already exist!"))
    }
    const category = await Category.create({title, user: req.userAuth})
    res.json({
      status: "success",
      msg: "Category Created Successfully!",
      data: category
    });
  } catch (error) {
    next(new Error(error));
  }
};

const fetchAllCategoriesCtrl = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "success",
      msg: "All Categories",
      data: categories,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const fetchSingleCategoryCtrl = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const updateCategoryCtrl = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {title}, {new: true, runValidators: true})
    res.json({
      status: "category updated success",
      data: category,
    });
  } catch (error) {
    next(new Error(error));
  }
};




const deleteCategoryCtrl = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      msg: "Category Deleted Successfully!",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  createCategoryCtrl,
  fetchAllCategoriesCtrl,
  fetchSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};

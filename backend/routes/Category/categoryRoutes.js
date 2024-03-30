const express = require('express');
const { createCategoryCtrl, fetchAllCategoriesCtrl, fetchSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } = require('../../controllers/Category/catgeoryController');
const isLogin = require('../../middlewares/isLogin');
const categoryRouter = express.Router();


//create category
categoryRouter.post('/create', isLogin, createCategoryCtrl);

// get all categories
categoryRouter.get('/all', isLogin, fetchAllCategoriesCtrl);

// get single category
categoryRouter.get('/:id', isLogin, fetchSingleCategoryCtrl);

//update category
categoryRouter.put('/update/:id', isLogin, updateCategoryCtrl);

//delete category
categoryRouter.delete('/delete/:id', isLogin, deleteCategoryCtrl);




module.exports = categoryRouter;
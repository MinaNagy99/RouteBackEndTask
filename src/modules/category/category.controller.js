import categoryModel from "../../../DataBase/models/categoryModel.js";
import { catchAsyncError } from "../../../middlewares/catchAsyncError.js";
import { AppError } from "../../../utilities/AppError.js";
import { ApiFeature } from "../../../utilities/AppFeature.js";

const createCategory = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const category = await categoryModel.create(req.body);

  if (!category) {
    return next(new AppError("can't create category"));
  }
  res.status(200).send({ message: "success", data: category });
});
//================================================================

const deleteCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findOneAndDelete({
    _id: id,
    createdBy: req.user._id
  });

  if (!category) {
    return next(new AppError("can't delete the category"));
  }

  res.status(200).send({ message: "success", data: category });
});

//================================================================

const updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryModel.findOneAndUpdate(
    {
      _id: id,
      createdBy: req.user._id
    },
    req.body,
    {
      new: true
    }
  );
  if (!category) {
    return next(new AppError("Failed to update the category", 500));
  }

  res.status(200).json({ message: "success", data: category });
});

//================================================================

const getAllcategory = catchAsyncError(async (req, res, next) => {
  const apiFeature = new ApiFeature(categoryModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();
  const countBlogs = await categoryModel.find().countDocuments();
  const pageNumber = Math.ceil(countBlogs / 5);
  const result = await apiFeature.mongoseQuery;
  if (!result) {
    return next(new AppError("can't find category"));
  }
  res.status(200).send({
    message: "Success",
    data: {
      page: apiFeature.page,
      result,
      pageNumber
    }
  });
});

//================================================================

const getcategoryById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryModel.findById(id);

  if (!category) {
    return next(new AppError("Can't find this category", 404));
  }

  res.status(200).send({ message: "success", data: category });
});

//================================================================

export {
  getAllcategory,
  createCategory,
  getcategoryById,
  deleteCategory,
  updateCategory
};

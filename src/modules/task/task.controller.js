import taskModel from "../../../DataBase/models/taskModel.js";
import { catchAsyncError } from "../../../middlewares/catchAsyncError.js";
import { AppError } from "../../../utilities/AppError.js";
import { ApiFeature } from "../../../utilities/AppFeature.js";

const createtask = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const task = await taskModel.create(req.body);

  !task && next(new AppError("can't create task"));
  res.status(200).send({ message: "success", data: task });
});

const deletetask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await taskModel.findOneAndDelete({
    _id: id,
    createdBy: req.user._id
  });

  !task && next(new AppError("can't delete the task"));

  res.status(200).send({ message: "success" });
});

const updatetask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await taskModel.findOneAndUpdate(
    {
      _id: id,
      createdBy: req.user._id
    },
    req.body,
    {
      new: true
    }
  );

  if (!task) {
    return next(new AppError("Can't find this task", 404));
  }

  res.status(200).send({ message: "success" ,data:task});
});

const getAllTasks = catchAsyncError(async (req, res, next) => {
  let query;
  let countQuery;

  if (!req.user) {
    query = taskModel.find({ visible: true });
    countQuery = taskModel.find({ visible: true }).countDocuments();
  } else {
    query = taskModel.find({
      $or: [{ visible: true }, { visible: false, createdBy: req.user._id }]
    });
    countQuery = taskModel
      .find({
        $or: [{ visible: true }, { visible: false, createdBy: req.user._id }]
      })
      .countDocuments();
  }

  const apiFeature = new ApiFeature(query, req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  const countBlogs = await countQuery;
  const pageNumber = Math.ceil(countBlogs / 20);
  const result = await apiFeature.mongoseQuery;

  if (!result) {
    return next(new AppError("can't find task"));
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

const gettaskById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let task;
  if (req.user) {
    task = await taskModel.findOne({
      $or: [
        { visible: true, _id: id },
        { visible: false, _id: id, createdBy: req.user._id }
      ]
    });
  } else {
    task = await taskModel.findOne({ visible: true, _id: id });
  }

  if (!task) {
    return next(new AppError("Can't find this task", 404));
  }
  res.status(200).send({ message: "success", data: task });
});

export { getAllTasks, createtask, gettaskById, deletetask, updatetask };

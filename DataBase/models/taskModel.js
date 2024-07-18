import mongoose, { Schema, Types } from "mongoose";
const schema = new Schema(
  {
    list: [
      {
        type: String,
        min: [2, "text body must be more than 2 letters"],
        max: [2000, "text body must be less than 2000 letters"]
      }
    ],
    textBody: {
      type: String,
      min: [2, "text body must be more than 2 letters"],
      max: [2000, "text body must be less than 2000 letters"]
    },
    type: {
      type: String,
      enum: ["text", "list"],
      required: true
    },
    visible: { type: Boolean, required: true },
    category: { type: Types.ObjectId, ref: "category", required: true },
    createdBy: { type: Types.ObjectId, ref: "user", required: true }
  },
  { timestamps: true }
);

function autoPopulateTask(next) {
  this.populate([
    {
      path: "category"
    },
    {
      path: "createdBy"
    }
  ]);

  next();
}

schema.pre("findOne", autoPopulateTask);
schema.pre("find", autoPopulateTask);
schema.pre("findOneAndUpdate", autoPopulateTask);
schema.pre("findByIdAndUpdate", autoPopulateTask);
schema.pre("save", autoPopulateTask);

const taskModel = mongoose.model("task", schema);

export default taskModel;

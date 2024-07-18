import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    min: [2, "name must be more than 2 letters"],
    max: [50, "name must be less than 50 letters"],
    required: true
  },
  createdBy: { type: Types.ObjectId, ref: "user", required: true }
});

function autoPopulateCategory(next) {
  this.populate([
    {
      path: "createdBy",
      select: "userName email"
    }
  ]);
  next();
}

schema.pre("findOne", autoPopulateCategory);
schema.pre("find", autoPopulateCategory);
schema.pre("findOneAndUpdate", autoPopulateCategory);
schema.pre("findByIdAndUpdate", autoPopulateCategory);
schema.pre("save", autoPopulateCategory);

const categoryModel = mongoose.model("category", schema);

export default categoryModel;

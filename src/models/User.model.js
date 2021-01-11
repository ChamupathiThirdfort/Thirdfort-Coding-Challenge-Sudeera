import mongoosePaginate from "mongoose-paginate-v2";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(mongoosePaginate);

export default mongoose.model("User", UserSchema);

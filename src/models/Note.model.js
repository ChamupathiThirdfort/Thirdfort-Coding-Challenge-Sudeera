import mongoosePaginate from 'mongoose-paginate-v2';

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    _id: {
      type: mongoose.ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    archived: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.index({title: 'text', content: 'text'});
NoteSchema.plugin(mongoosePaginate);

export default mongoose.model("Note", NoteSchema);

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    creatorId: Number,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Post', PostSchema);

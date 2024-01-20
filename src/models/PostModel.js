import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    creatorId: {
      type: Number, // for simple post request I didnt use here mongoose.Schema.Types.ObjectId, laso we dont need here ref to user, I would have use it if we did.
      index: true, // Index this field
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Post', PostSchema);

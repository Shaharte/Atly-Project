import mongoose from 'mongoose';

const StatisticsSchema = new mongoose.Schema(
  {
    method: String,
    executionTime: Number,
    isError: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Statistics', StatisticsSchema);

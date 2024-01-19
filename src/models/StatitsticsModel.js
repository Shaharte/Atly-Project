import mongoose from 'mongoose';

const StatisticsSchema = new mongoose.Schema(
  {
    method: String,
    executionTime: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Statistics', StatisticsSchema);

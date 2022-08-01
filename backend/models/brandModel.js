import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: Boolean, required: true, default: 1 },
  },
  { timestamps: true }
)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand

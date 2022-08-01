import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItem: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        quantity: 'Number',
      },
    ],
    status: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order

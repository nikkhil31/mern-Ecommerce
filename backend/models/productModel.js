import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  stock: 'Number',
  price: 'Number',
  image_link: 'String',
  description: 'String',
  features: [{ type: 'String' }],
  specification: [{ title: 'String', value: 'String' }],
})

productSchema.set('toObject', { virtuals: true })
productSchema.set('toJSON', { virtuals: true })

productSchema.virtual('priceInWord').get(function () {
  return (
    'Rs ' +
    Number(this.price)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  )
})

const Product = mongoose.model('Product', productSchema)

export default Product

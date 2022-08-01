import { faker } from '@faker-js/faker'
import colors from 'colors'
import mongoose from 'mongoose'
import Brand from '../models/brandModel.js'
import Product from '../models/productModel.js'
import sercrets from '../utils/secrets.js'

mongoose.connect(sercrets.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const brandSeeder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Brand.deleteMany()
      let brand = []
      for (let index = 0; index < 10; index++) {
        brand.push({ title: faker.commerce.department(), status: 1 })
      }
      await Brand.insertMany(brand)
      return resolve(true)
    } catch (error) {
      return reject(error)
    }
  })
}

const productSeeder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany()
      const brand = await Brand.aggregate([{ $sample: { size: 1 } }])

      //   return console.log(brand)
      let product = []
      for (let index = 0; index < 10; index++) {
        product.push({
          name: faker.commerce.productName(),
          brand: brand[0]._id,
          stock: 1000,
          price: faker.commerce.price(100, 200, 0),
          image_link: faker.image.imageUrl(320, 320),
          description: faker.commerce.productDescription(),
          features: [
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
          ],
          specification: [
            {
              title: faker.commerce.productAdjective(),
              value: faker.commerce.productAdjective(),
            },
            {
              title: faker.commerce.productAdjective(),
              value: faker.commerce.productAdjective(),
            },
          ],
        })
      }
      await Product.insertMany(product)
      return resolve(true)
    } catch (error) {
      return reject(error)
    }
  })
}

;(async function () {
  try {
    await brandSeeder()
    await productSeeder()

    console.log('Data Seeded!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
})()

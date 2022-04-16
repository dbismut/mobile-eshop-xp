import faker from '@faker-js/faker'

export const data = new Array(14).fill(0).map((_, i) => {
  const id = String(i).padStart(2, '0')
  return {
    id,
    name: faker.commerce.productName(),
    price: faker.commerce.price(100, 800, 2, '$'),
    model: `/images/model_${id}.jpg`,
    product: `/images/product_${id}.jpg`,
    fav: false
  }
})

import faker from '@faker-js/faker'
import slugify from 'slugify'

const _data = new Array(14).fill(0).map((_, i) => {
  const id = String(i).padStart(2, '0')
  const name = faker.commerce.productName()
  return {
    id,
    name,
    price: faker.commerce.price(100, 800, 2, '$'),
    model: `/images/model_${id}.jpg`,
    product: `/images/product_${id}.jpg`,
    slug: `${id}--${slugify(name, { lower: true })}`,
    fav: false
  }
})

export const data = _data.map((p, i) => ({
  ...p,
  nextSlug: _data[(i + 1) % 14].slug
}))

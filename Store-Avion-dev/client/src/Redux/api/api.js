import axios from 'axios'
import { HOST } from '../../components/Token'

export async function api(apiName) {
  try {
    const response = await axios.get(HOST + `/${apiName}`)
    const data = response.data
    return data
  } catch (e) {
    console.log(e)
  }
}

async function getAllProducts(input) {
  const selectedBrands = []
  const selectedCategories = []
  const selectedPrices = []

  for (const brand in input.brands) {
    if (input.brands[brand] === true) {
      selectedBrands.push(brand)
    }
  }

  for (const category in input.categories) {
    if (input.categories[category] === true) {
      selectedCategories.push(category)
    }
  }

  for (const price in input.prices) {
    if (input.prices[price] === true) {
      selectedPrices.push(price)
    }
  }

  try {
    if (
      selectedBrands.length > 0 ||
      selectedCategories.length > 0 ||
      selectedPrices.length > 0
    ) {
      const response = await axios.get(
        HOST +
          `/products?brand=${selectedBrands}&categories=${selectedCategories}&currentPrice=${selectedPrices}`,
      )
      const data = response.data
      return data
    } else {
      const response = await axios.get(
        HOST + `/products?addItems=${input.addItems}&items=${input.items}`,
      )
      const data = response.data
      return data
    }
  } catch (e) {
    console.log(e)
  }
}

const exportedObject = {
  api,
  getAllProducts,
}

export default exportedObject

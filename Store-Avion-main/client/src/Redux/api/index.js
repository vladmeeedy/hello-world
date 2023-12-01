import axios from 'axios'
import { HOST } from '../../components/Token'

export default async function api(apiName) {
  let result
  await axios
    .get(HOST + '/products/allproducts')
    .then((products) => {
      result = products.data
    })
    .catch((err) => {
      console.error('fetch products failed', err)
    })
  return result
}

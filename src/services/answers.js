import axios from 'axios'
const baseUrl = '/api/answers'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getAll, create, setToken}
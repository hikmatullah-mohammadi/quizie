import axios from 'axios'

export default axios.create({
  baseURL: "/api/v1/quizie",
  headers: {
    "Content-type": "application/json"
  }
})
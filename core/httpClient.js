import axios from 'axios'

export const serverHttp = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://servatica.herokuapp.com/api'
})

export const mlHttp = axios.create({
  baseURL: 'http://195.246.57.111:5557'
})

import axios from 'axios'

export const serverHttp = axios.create({
  baseURL: 'https://servatica.herokuapp.com/api',
  // baseURL: 'http://servatica.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

export const mlHttp = axios.create({
  baseURL: 'https://195.246.57.111:5557'
  // baseURL: 'http://172.16.220.220:5557'
})

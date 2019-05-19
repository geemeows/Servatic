import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.43.19:5557'
})

// instance.defaults.headers.common['content-type'] = 'application/json'

export default instance

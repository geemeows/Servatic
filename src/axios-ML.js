import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://172.16.16.11:5557'
})

// instance.defaults.headers.common['content-type'] = 'application/json'

export default instance

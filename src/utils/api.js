import axios from 'axios'

const api = axios.create({
    baseURL: 'https://price-tracker-backend-xi.vercel.app'
})

export default api
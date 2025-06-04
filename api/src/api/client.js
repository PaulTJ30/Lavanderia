import axios from 'axios'


api_url = "http://192.168.100.132:5000/clients"

export const createClient = async (data) => {
    return await axios.post(`${api_url}/create`, data)
}

export const getClientByName = async (name) => {
    return await axios.get(`${api_url}/search/name`, {
        params: { name }
    })
}

export const getClientByPhone = async (phone) => {
    return await axios.get(`${api_url}/search/phone`, {
        params: { phone }
    })
}

export const updateClient = async (clientId, data) => {
    return await axios.put(`${api_url}/update/${clientId}`, data);
}

export const deleteClient = async (clientId) => {
    return await axios.delete(`${api_url}/delete/${clientId}`)
}
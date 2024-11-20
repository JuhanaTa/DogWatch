import axios from 'axios';

const sittersDataFetch = async () => {
    const resp = await axios.get(`http://localhost:8080/api/v1/users`)
    return resp.data
}

const getPubliUserData = async (uuid) => {
    const resp = await axios.get(`http://localhost:8080/api/v1/users/` + uuid)
    return resp.data
}

const getServices = async () => {
    const resp = await axios.get(`http://localhost:8080/api/v1/services`)
    return resp.data
}

const getUserBookings = async (token) => {
    const resp = await axios.get(`http://localhost:8080/api/v1/bookings`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    console.log("bookings resp")

    return resp.data
}

export {
    sittersDataFetch,
    getPubliUserData,
    getServices,
    getUserBookings
};
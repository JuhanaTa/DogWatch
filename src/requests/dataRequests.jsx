import axios from 'axios';

const getSittersDataFetch = async () => {
    const resp = await axios.get(`http://localhost:8080/api/v1/sitters`)
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

const postSitterRequest = async (bookingData, token) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post('http://localhost:8080/api/v1/bookings', bookingData, config);
    return resp.data
}

const patchUpdateBookingStatus = async (status, bookingId, token) => {

    console.log('update data', status, bookingId, token)

    const statusData = {
        status: status
    }

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.patch(`http://localhost:8080/api/v1/bookings/${bookingId}`, statusData, config);
    return resp.data

}

const postSitterReview = async (ratingData, bookingId, token) => {
    console.log('ratingData', ratingData)
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post(`http://localhost:8080/api/v1/reviews/${bookingId}`, ratingData, config);
    return resp.data
}

const getSittersWithFilter = async (filters) => {
    //Have to use service id for request
    const reqFilters = {
        serviceId: filters.service.uuid,
        location: filters.location,
        rating: filters.rating,
    }
    console.log('filters', reqFilters, filters)

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post('http://localhost:8080/api/v1/search', reqFilters, config);
    return resp.data
}


export {
    getSittersDataFetch,
    getPubliUserData,
    getServices,
    getUserBookings,
    postSitterRequest,
    patchUpdateBookingStatus,
    postSitterReview,
    getSittersWithFilter
};
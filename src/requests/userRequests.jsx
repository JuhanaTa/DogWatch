import axios from 'axios';

const userLoginReq = async (credentials, token) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post('http://localhost:8080/api/v1/login', credentials, config);
    console.log("login resp")
    return resp.data;
}

const userRegisterReq = async (credentials) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post('http://localhost:8080/api/v1/register', credentials, config);
    return resp.data
}

const userUpdatePassword = async (passwords, uuid, token) => {
    const resp = await axios.patch(`http://localhost:8080/api/v1/users/${uuid}`, passwords, {
        headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json'
        },
    })
    console.log('resp', resp.data)
    return resp.data
}

const userDataFetch = async (uuid) => {
    const resp = await axios.get(`http://localhost:8080/api/v1/users/${uuid}`)
    return resp.data
}

const updateUserData = async (uuid, token, updatedData, avatar) => {

    const formData = new FormData();

    if (updatedData.firstName) formData.append('firstName', updatedData.firstName);
    if (updatedData.lastName) formData.append('lastName', updatedData.lastName);
    if (updatedData.email) formData.append('email', updatedData.email);
    if (updatedData.role) formData.append('role', updatedData.role);
    if (updatedData.location) formData.append('location', updatedData.location);
    if (updatedData.headline) formData.append('headline', updatedData.headline);
    if (updatedData.description) formData.append('description', updatedData.description);

    console.log('avatar', avatar)
    // Append file
    if (avatar) formData.append('avatar', avatar);

    const resp = await axios.put(`http://localhost:8080/api/v1/users/${uuid}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data', 
        },
    })

    return resp

}

const postUserServices = async (services, id, token) => {
    console.log('update services',services,id,token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post(`http://localhost:8080/api/v1/users/${id}/services`, {services}, config);
    return resp.data
}

const getAllUserMessages = async (uuid, token) => {

    console.log('uuid, token', uuid, token)

    const resp = await axios.get(`http://localhost:8080/api/v1/messages/${uuid}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    return resp.data
}

const getUserMessages = async (token) => {
    const resp = await axios.get(`http://localhost:8080/api/v1/messages/`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    return resp.data
}

const postUserMessage = async (content, receiverId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post(`http://localhost:8080/api/v1/messages/${receiverId}`, content, config);
    return resp.data
}

export {
    userLoginReq,
    userRegisterReq,
    userUpdatePassword,
    postUserServices,
    userDataFetch,
    updateUserData,
    getAllUserMessages,
    getUserMessages,
    postUserMessage
};
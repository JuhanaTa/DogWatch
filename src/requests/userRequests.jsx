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

    // Append file
    avatar && formData.append('file', avatar, avatar.name);

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




const userEdit = async () => {
    //Posts new user data with edited content. Token stays the same.

    //Should return udpated user information???
    /*const userInfo = {
        firstname: 'asd',
        lastname: 'asd',
        email: 'asd',
        password: 'asd,
        role: 'owner',
        desc: 'asdasd',

        //NOT ADDED YET
        bookingRequests: [],
        bookingHistory: [],
        messages: [] ???????? Maybe
        image:
    }*/
}

const uploadImage = async (image) => {


    //axios.post()
}

/*const searchSitters = async (service, location, rating) => {
    //Fetches sitters with specific filters (service, location and rating)
    //returns sitter data including e.g.:
    
        {
                userId: 0,
                firstname: "Sitter",
                lastname: "1",
                image: "",
                desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
                reviews: [
                    {
                        from: "Robert Harris",
                        rating: 5,
                        created_at: 1731604851,
                        comment: "Alina is exceptional with Oscar! She ensured he got his swimming sessions and followed his supplement schedule precisely. It was clear Oscar adored her, and we felt relieved knowing he was with someone so caring.",
                    },
                    {
                        from: "Robert Harris",
                        rating: 5,
                        created_at: 1731604851,
                        comment: "Alina is exceptional with Oscar! She ensured he got his swimming sessions and followed his supplement schedule precisely. It was clear Oscar adored her, and we felt relieved knowing he was with someone so caring.",
                    },
                ]
            },


            //NOT ADDED YET
            CurrentBookings: []
    
}*/

const getPublicUserInfo = async (id) => {

    //Fetches public user information with id.
    //returns user information 
    //including these: (same stuff as in search sitters)



    const resp = await axios.get(`https://dummyjson.com/products`)
    return resp.data
}


const requestBooking = async (bookingData) => {
    /*
        const bookingData = {
            service:
            location:
            dates: []
        }
    */

    //POST
    //Backend compares sitter schedule. Response somehow indicates the success/failure of booking
}


export {
    userLoginReq,
    userRegisterReq,
    userUpdatePassword,
    userEdit,
    postUserServices,
    uploadImage,
    getPublicUserInfo,
    userDataFetch,
    updateUserData
};
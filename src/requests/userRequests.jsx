import axios from 'axios';

const userLoginReq = async (credentials, token) => {

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const resp = await axios.post('https://dummyjson.com/posts', credentials, config);



    //Should return user token and other user data e.g:
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
    return resp.data;

}

const userRegisterReq = async () => {

    //Should return new user token and other user data e.g:
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

const userPasswordChange = async () => {
    // Are we implementing this yet?
}

const searchSitters = async (service, location, rating) => {
    //Fetches sitters with specific filters (service, location and rating)
    //returns sitter data including e.g.:
    /*
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
    */
}

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
    userEdit,
    uploadImage,
    userPasswordChange,
    getPublicUserInfo,
    searchSitters
};
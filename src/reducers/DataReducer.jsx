import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServices, getUserBookings, sittersDataFetch } from "../requests/dataRequests";



let serviceTypes = ["Dog sitting", "Dog walking"]
let availableLocations = ["Helsinki", "Espoo", "Vantaa"]
let initialParameters = {
    service: 'Dog sitting',
    location: 'Helsinki',
    rating: 0,
}

let exampleSearchResults = [
    {
        userId: 0,
        firstname: "Alina",
        lastname: "Johnson",
        location: "Helsinki",
        image: "",
        desc: "Hi! I’m Alina, a part-time veterinary science student with a passion for animal care. For the past five years, I’ve dedicated myself to dog-sitting, especially for dogs with medical needs or anxiety. My services include dog walking, overnight stays, and day care, all tailored to meet your pet’s specific needs. I am experienced with medication administration, basic training, and creating calming routines for anxious pups. I love outdoor adventures and make sure every dog I care for gets plenty of exercise and attention!",
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
    {
        userId: 1,
        firstname: "Priya",
        lastname: "Patel",
        location: "Helsinki",
        image: "",
        desc: "Hi, I’m Priya! As a pet lover with five years of experience, I focus on caring for small and medium-sized breeds. I offer dog walking and day care services. I’m particularly skilled at working with shy or anxious pups, providing a patient and reassuring atmosphere. Building trust and creating a stress-free environment is what I do best.",
        reviews: [
            {
                from: "Michelle White",
                rating: 5,
                created_at: 1731604851,
                comment: "Priya kept Coco active and safe throughout the day. I was pleased with her updates and her gentle care for Coco’s needs.",
            },
            {
                from: "Michelle White",
                rating: 5,
                created_at: 1731604851,
                comment: "Priya kept Coco active and safe throughout the day. I was pleased with her updates and her gentle care for Coco’s needs.",
            },
        ]
    },
    {
        userId: 2,
        firstname: "Annika",
        lastname: "Laitinen",
        location: "Helsinki",
        image: "",
        desc: "Hello, I’m Annika, and I’ve been volunteering at dog shelters and pet-sitting for four years. I provide overnight stays and day care, with a focus on senior dogs and those needing extra care. I’m patient, nurturing, and committed to making every pet feel loved and cared for.",
        reviews: [
            {
                from: "Ben Kramer",
                rating: 5,
                created_at: 1731604851,
                comment: "Annika did an amazing job with Finn, giving him the structured agility training he thrives on. She really knows how to bring out his best.",
            },
            {
                from: "Ben Kramer",
                rating: 5,
                created_at: 1731604851,
                comment: "Annika did an amazing job with Finn, giving him the structured agility training he thrives on. She really knows how to bring out his best.",
            },
        ]
    },
]


export const dataInit = createAsyncThunk(
    'data/dataInit',
    async (token) => {

        const bookings = token ? await getUserBookings(token) : []
        const sitters = await sittersDataFetch()
        const services = await getServices()

        return { bookings: bookings, sitters: sitters, services: services }

    }
)

export const searchSitters = createAsyncThunk(
    'data/search/filter',
    async (filters) => {
        //Api call to search sitters here
        //Fetches the profiles of filtered sitters.
        return { searchParameters: filters, searchResults: exampleSearchResults }
    }
)

export const searchAllSitters = createAsyncThunk(
    'data/allSitters',
    async () => {
        const sitters = await sittersDataFetch()
        return sitters
    }
)

export const getServiceTypes = createAsyncThunk(
    'data/services',
    async () => {
        const services = await getServices()
        return services
    }
)

export const getBookings = createAsyncThunk(
    'data/bookings',
    async (token) => {
        const bookings = await getUserBookings(token)
        return bookings
    }
)

const DataReducer = createSlice({
    name: 'search',
    initialState: {
        searchLoading: false,
        availableLocations: availableLocations,
        services: [],
        searchParameters: initialParameters,
        searchResults: [],
        sittersList: [],
        bookingHistory: [],
        bookings: [],
        searchError: null
    },

    extraReducers: (builder) => {
        builder

            .addCase(dataInit.pending, (state) => {
                state.searchLoading = true;
                state.bookings = []
                state.services = []
                state.sittersList = []
                state.searchError = null;
            })
            .addCase(dataInit.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.bookings = action.payload.bookings
                state.services = action.payload.services
                state.sittersList = action.payload.sitters
                state.searchError = null;
            })
            .addCase(dataInit.rejected, (state, action) => {
                state.searchLoading = false;
                state.bookings = []
                state.services = []
                state.sittersList = []
                state.searchError = action.error.message;
            })

            .addCase(searchSitters.pending, (state) => {
                state.searchLoading = true;
                state.searchParameters = initialParameters;
                state.searchResults = []
                state.searchError = null;
            })
            .addCase(searchSitters.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchParameters = action.payload.searchParameters;
                state.searchResults = action.payload.searchResults;
                state.searchError = null;
            })
            .addCase(searchSitters.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchParameters = initialParameters;
                state.searchResults = []
                state.searchError = action.error.message;
            })

            .addCase(searchAllSitters.pending, (state) => {
                state.searchLoading = true;
                state.searchError = false;
            })
            .addCase(searchAllSitters.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.sittersList = action.payload
                state.searchError = false;
            })
            .addCase(searchAllSitters.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.error.message;
            })

            .addCase(getServiceTypes.pending, (state) => {
                state.searchLoading = true;
                state.searchError = false;
            })
            .addCase(getServiceTypes.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.services = action.payload
                state.searchError = false;
            })
            .addCase(getServiceTypes.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.error.message;
            })

            .addCase(getBookings.pending, (state) => {
                state.searchLoading = true;
                state.searchError = false;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.bookings = action.payload
                state.searchError = false;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.error.message;
            })
    }
})

export default DataReducer.reducer;
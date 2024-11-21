import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServices, getSittersDataFetch, getSittersWithFilter, getUserBookings } from "../requests/dataRequests";



let availableLocations = ["Helsinki", "Espoo", "Vantaa"]

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
        const sitters = await getSittersDataFetch()
        const services = await getServices()
        const initSearchParams = {
            service: services[0],
            location: 'Helsinki',
            rating: 0
        }

        console.log('init data', initSearchParams)

        return { bookings: bookings, sitters: sitters, services: services, initSearchParams: initSearchParams }

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
        const sitters = await getSittersDataFetch()
        return sitters
    }
)

export const searchFilteredSitters = createAsyncThunk(
    'data/filteredSitters',
    async (filters) => {
        const sitters = await getSittersWithFilter(filters)
        return {sitters: sitters, filters: filters}
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
        //loaders
        dataInitLoad: true,
        sittersLoad: false,
        filterLoad: false,
        serviceTypesLoad: false,
        bookingsLoad: false,

        //errors
        dataInitError: null,
        sittersLoadError: null,
        filterLoadError: null,
        serviceTypesError: null,
        bookingsError: null,

        //Main / other stuff
        availableLocations: availableLocations,
        services: [],
        searchParameters: {
            service: null,
            location: '',
            rating: null
        },
        searchResults: [],
        sittersList: [],
        bookingHistory: [],
        bookings: [],
    },

    extraReducers: (builder) => {
        builder

            .addCase(dataInit.pending, (state) => {
                state.dataInitLoad = true;
                state.bookings = []
                state.services = []
                state.sittersList = []
                state.dataInitError = null;
            })
            .addCase(dataInit.fulfilled, (state, action) => {
                state.dataInitLoad = false;
                state.bookings = action.payload.bookings
                state.services = action.payload.services
                state.sittersList = action.payload.sitters
                state.searchParameters = action.payload.initSearchParams
                state.dataInitError = null;
            })
            .addCase(dataInit.rejected, (state, action) => {
                state.dataInitLoad = false;
                state.bookings = []
                state.services = []
                state.sittersList = []
                state.dataInitError = action.error.message;
            })

            .addCase(searchAllSitters.pending, (state) => {
                state.sittersLoad = true;
                state.sittersLoadError = false;
            })
            .addCase(searchAllSitters.fulfilled, (state, action) => {
                state.sittersLoad = false;
                state.sittersList = action.payload
                state.sittersLoadError = false;
            })
            .addCase(searchAllSitters.rejected, (state, action) => {
                state.sittersLoad = false;
                state.sittersLoadError = action.error.message;
            })

            .addCase(searchFilteredSitters.pending, (state) => {
                state.filterLoad = true;
                state.searchResults = []
                state.filterLoadError = null;
            })
            .addCase(searchFilteredSitters.fulfilled, (state, action) => {
                state.filterLoad = false;
                state.searchParameters = action.payload.filters;
                state.searchResults = action.payload.sitters;
                state.filterLoadError = null;
            })
            .addCase(searchFilteredSitters.rejected, (state, action) => {
                state.filterLoad = false;
                state.searchResults = []
                state.filterLoadError = action.error.message;
            })

            .addCase(getServiceTypes.pending, (state) => {
                state.serviceTypesLoad = true;
                state.serviceTypesError = false;
            })
            .addCase(getServiceTypes.fulfilled, (state, action) => {
                state.serviceTypesLoad = false;
                state.services = action.payload
                state.serviceTypesError = false;
            })
            .addCase(getServiceTypes.rejected, (state, action) => {
                state.serviceTypesLoad = false;
                state.serviceTypesError = action.error.message;
            })

            .addCase(getBookings.pending, (state) => {
                state.bookingsLoad = true;
                state.bookingsError = false;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.bookingsLoad = false;
                state.bookings = action.payload
                state.bookingsError = false;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.bookingsLoad = false;
                state.bookingsError = action.error.message;
            })
    }
})

export default DataReducer.reducer;
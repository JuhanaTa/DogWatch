import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServices, getSittersDataFetch, getSittersWithFilter, getUserBookings, postSitterRequest } from "../requests/dataRequests";



let availableLocations = ["Helsinki", "Espoo", "Vantaa"]

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

export const createSitterBooking = createAsyncThunk(
    'data/createBooking',
    async (data) => {

        console.log('req data', data.bookingData, data.token)
        const bookingResp = await postSitterRequest(data.bookingData, data.token)
        return bookingResp
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
        createBookingLoad: false,

        //errors
        dataInitError: null,
        sittersLoadError: null,
        filterLoadError: null,
        serviceTypesError: null,
        bookingsError: null,
        createBookingError: null,

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
                state.sittersLoadError = null;
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
                state.serviceTypesError = null;
            })
            .addCase(getServiceTypes.fulfilled, (state, action) => {
                state.serviceTypesLoad = false;
                state.services = action.payload
                state.serviceTypesError = null;
            })
            .addCase(getServiceTypes.rejected, (state, action) => {
                state.serviceTypesLoad = false;
                state.serviceTypesError = action.error.message;
            })

            .addCase(getBookings.pending, (state) => {
                state.bookingsLoad = true;
                state.bookingsError = null;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.bookingsLoad = false;
                state.bookings = action.payload
                state.bookingsError = null;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.bookingsLoad = false;
                state.bookingsError = action.error.message;
            })

            .addCase(createSitterBooking.pending, (state) => {
                state.createBookingLoad = true;
                state.createBookingError = null;
            })
            .addCase(createSitterBooking.fulfilled, (state, action) => {
                state.createBookingLoad = false;
                state.bookings.push(action.payload.booking) 
                state.createBookingError = null;
            })
            .addCase(createSitterBooking.rejected, (state, action) => {
                state.createBookingLoad = false;
                state.createBookingError = action.error.message;
            })
    }
})

export default DataReducer.reducer;
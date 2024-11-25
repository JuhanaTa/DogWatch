import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServices, getSittersDataFetch, getSittersWithFilter, getUserBookings, patchUpdateBookingStatus, postSitterRequest, postSitterReview } from "../requests/dataRequests";



let availableLocations = ["Helsinki", "Espoo", "Vantaa"]

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
        return { sitters: sitters, filters: filters }
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
        const reqBooking = await postSitterRequest(data.bookingData, data.token)
        console.log('reqBooking', reqBooking)

        const bookings = await getUserBookings(data.token)
        console.log('fetched bookings', bookings)
        return bookings
    }
)

export const updateBookingStatus = createAsyncThunk(
    'data/updateBooking',
    async (data) => {
        console.log('req data', data.status, data.bookingId, data.token)
        await patchUpdateBookingStatus(data.status, data.bookingId, data.token)

        const bookings = await getUserBookings(data.token)
        return bookings
    }
)

export const leaveSitterReview = createAsyncThunk(
    'data/leaveSitterReview',
    async (data) => {
        console.log('review data', data)
        await postSitterReview(data.ratingData, data.bookingId, data.token)
        const bookings = await getUserBookings(data.token)
        return bookings 
    }
)

const DataReducer = createSlice({
    name: 'search',
    initialState: {
        //loaders
        sittersLoad: false,
        filterLoad: false,
        serviceTypesLoad: false,
        bookingsLoad: false,
        createBookingLoad: false,
        updateBookinStatusLoad: false,
        leaveSitterReviewLoad: false,

        //errors
        sittersLoadError: null,
        filterLoadError: null,
        serviceTypesError: null,
        bookingsError: null,
        createBookingError: null,
        updateBookinStatusError: null,
        leaveSitterReviewError: null,

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

    reducers: {
        dataInitial: (state, action) => {
            // Clear user state and localStorage on logout
            state.services = action.payload.services
            state.sittersList = action.payload.sitters
            state.searchParameters = action.payload.initSearchParams
        },
        dataAuthInitial: (state, action) => {
            state.bookings = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder

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
                state.bookings = action.payload
                state.createBookingError = null;
            })
            .addCase(createSitterBooking.rejected, (state, action) => {
                state.createBookingLoad = false;
                state.createBookingError = action.error.message;
            })

            .addCase(updateBookingStatus.pending, (state) => {
                state.updateBookinStatusLoad = true;
                state.updateBookinStatusError = null;
            })
            .addCase(updateBookingStatus.fulfilled, (state, action) => {
                state.updateBookinStatusLoad = false;
                state.bookings = action.payload
                state.updateBookinStatusError = null;
            })
            .addCase(updateBookingStatus.rejected, (state, action) => {
                state.updateBookinStatusLoad = false;
                state.updateBookinStatusError = action.error.message;
            })

            .addCase(leaveSitterReview.pending, (state) => {
                state.leaveSitterReviewLoad = true;
                state.leaveSitterReviewError = null;
            })
            .addCase(leaveSitterReview.fulfilled, (state, action) => {
                state.leaveSitterReviewLoad = false;
                state.bookings = action.payload
                state.leaveSitterReviewError = null;
            })
            .addCase(leaveSitterReview.rejected, (state, action) => {
                state.leaveSitterReviewLoad = false;
                state.leaveSitterReviewError = action.error.message;
            })
    }
})

export const { dataInitial, dataAuthInitial } = DataReducer.actions;

export default DataReducer.reducer;
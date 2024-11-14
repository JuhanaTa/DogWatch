import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



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

export const searchSitters = createAsyncThunk(
    'search',
    async (filters) => {
        //Api call to search sitters here
        //Fetches the profiles of filtered sitters.
        return {searchParameters: filters, searchResults: exampleSearchResults}
    }
)

const SearchReducer = createSlice({
    name: 'user',
    initialState: {
        searchLoading: false,
        availableLocations: availableLocations,
        serviceTypes: serviceTypes,
        searchParameters: initialParameters,
        searchResults: [],
        searchError: null
    },
    /*reducers: {
        Add non async things here
    },*/
    extraReducers: (builder) => {
        builder
            .addCase(searchSitters.pending, (state) => {
                state.loading = true;
                state.searchParameters = initialParameters;
                availableLocations = searchSitters
                serviceTypes = serviceTypes
                state.searchResults = []
                state.error = null;
            })
            .addCase(searchSitters.fulfilled, (state, action) => {
                state.loading = false;
                state.searchParameters = action.payload.searchParameters;
                availableLocations = searchSitters
                serviceTypes = serviceTypes
                state.searchResults = action.payload.searchResults;
                state.error = null;
            })
            .addCase(searchSitters.rejected, (state, action) => {
                state.loading = false;
                state.searchParameters = initialParameters;
                availableLocations = searchSitters
                serviceTypes = serviceTypes
                state.searchResults = []
                state.error = action.error.message;
            })
    }
})

export default SearchReducer.reducer;
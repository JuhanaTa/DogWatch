import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (credentials) => {
        //Api call to user login here
        localStorage.setItem('user', JSON.stringify(credentials))
        return credentials
    }
)

export const userEdit = createAsyncThunk(
    'user/userEdit',
    async (credentials) => {
        //Api call to user edit here
        localStorage.setItem('user', JSON.stringify(credentials))
        return credentials
    }
)

// Retrieve current User if already present
const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const UserReducer = createSlice({
    name: 'user',
    initialState: {
        userLoading: false,
        user: currentUser,
        userError: null
    },
    reducers: {
        userLogout: (state) => {
            // Clear user state and localStorage on logout
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.userLoading = true;
                state.user = null;
                state.userError = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload;
                state.userError = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userLoading = false;
                state.user = null;
                //console.log(action.error.message);
                state.userError = action.error.message;
            })
            .addCase(userEdit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userEdit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload; 
            })
            .addCase(userEdit.rejected, (state, action) => {
                state.status = 'failed';
                state.userError = action.error.message;
            });
    }
})

export const { userLogout } = UserReducer.actions;

export default UserReducer.reducer;
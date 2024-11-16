import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (credentials) => {
        const userInfo = {
            firstname: '',
            lastname: '',
            email: credentials.email,
            password: credentials.password,
            role: 'owner',
            desc: '',
        }
        //Api call to user login here
        localStorage.setItem('user', JSON.stringify(userInfo))
        //needs to return all user info
        return userInfo
    }
)

export const userRegister = createAsyncThunk(
    'user/userRegister',
    async (credentials) => {
        const userInfo = {
            firstname: credentials.firstname,
            lastname: credentials.lastname,
            email: credentials.email,
            password: credentials.password,
            role: credentials.role,
            desc: '',
        }
        //Api call to user register here
        localStorage.setItem('user', JSON.stringify(userInfo))
        //needs to return all user info
        return userInfo
    }
)

export const userEdit = createAsyncThunk(
    'user/userEdit',
    async (credentials) => {
        console.log('creds', credentials)
        //Api call to user edit here
        localStorage.setItem('user', JSON.stringify(credentials))
        //needs to return all user info with edited content
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
                state.userError = action.error.message;
            })

            .addCase(userRegister.pending, (state) => {
                state.userLoading = true;
                state.user = null;
                state.userError = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload;
                state.userError = null;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.userLoading = false;
                state.user = null;
                state.userError = action.error.message;
            })

            .addCase(userEdit.pending, (state) => {
                state.userLoading = false;
                state.userError = null;
            })
            .addCase(userEdit.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload; 
                state.userError = null;
            })
            .addCase(userEdit.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.error.message;
            });
    }
})

export const { userLogout } = UserReducer.actions;

export default UserReducer.reducer;
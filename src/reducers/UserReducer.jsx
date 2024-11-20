import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPublicUserInfo, updateUserData, uploadImage, userDataFetch, userLoginReq, userRegisterReq, userUpdatePassword } from "../requests/userRequests";



export const userInit = createAsyncThunk(
    'user/userInit',
    async (uuid) => {
        const userPersonalData = await userDataFetch(uuid)
        return { userInfo: userPersonalData }
    }
)

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (credentials) => {
        const userInfo = {
            email: credentials.email,
            password: credentials.password,
        }

        const userAuth = await userLoginReq(userInfo)
        const userPersonalData = await userDataFetch(userAuth.userInfo.uuid)

        //set login token
        localStorage.setItem('token', userAuth.token)
        localStorage.setItem('userUUID', userAuth.userInfo.uuid)

        return { token: userAuth.token, userInfo: userPersonalData }
    }
)

export const userRegister = createAsyncThunk(
    'user/userRegister',
    async (credentials) => {

        const userData = await userRegisterReq(credentials)

        localStorage.setItem('user', JSON.stringify(userInfo))
        //needs to return all user info
        return userData
    }
)

export const getUserData = createAsyncThunk(
    'user/userData',
    async (uuid) => {
        console.log('UUID', uuid)
        const userPersonalData = await userDataFetch(uuid)
        return { userInfo: userPersonalData }
    }
)

export const userEdit = createAsyncThunk(
    'user/userEdit',
    async (data) => {
        console.log('updated data 1', data.uuid, data.token, data.updatedData, data.avatar)
        //Api call to user edit here
        const updateUserResp = await updateUserData(data.uuid, data.token, data.updatedData, data.avatar)

        if(updateUserResp.status == 201){
            const userPersonalData = await userDataFetch(data.uuid)
            return {userInfo: userPersonalData}
        }

    }
)

export const userChangePassword = createAsyncThunk(
    'user/userChangePassword',
    async (data) => {
        console.log("password udpate", data)
        const resp = await userUpdatePassword(data.passwords, data.uuid, data.token)
        return resp
    }
)

// Retrieve current User if already present
const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const UserReducer = createSlice({
    name: 'user',
    initialState: {
        userLoading: false,
        user: null,
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

            .addCase(userInit.pending, (state) => {
                state.userLoading = true;
                state.user = null;
                state.userError = null;
            })
            .addCase(userInit.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload.userInfo;
                state.userError = null;
            })
            .addCase(userInit.rejected, (state, action) => {
                state.userLoading = false;
                state.user = null;
                state.userError = action.error.message;
            })

            .addCase(userLogin.pending, (state) => {
                state.userLoading = true;
                state.user = null;
                state.userError = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload.userInfo;
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

            .addCase(getUserData.pending, (state) => {
                state.userLoading = true;
                state.user = null;
                state.userError = null;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload.userInfo;
                state.userError = null;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.userLoading = false;
                state.user = null;
                state.userError = action.error.message;
            })

            .addCase(userEdit.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(userEdit.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload.userInfo;
                state.userError = null;
            })
            .addCase(userEdit.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.error.message;
            })

            .addCase(userChangePassword.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(userChangePassword.fulfilled, (state, action) => {
                state.userLoading = false;
            })
            .addCase(userChangePassword.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.error.message;
            })

    }
})

export const { userLogout } = UserReducer.actions;

export default UserReducer.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserServices, updateUserData, uploadImage, userDataFetch, userLoginReq, userRegisterReq, userUpdatePassword } from "../requests/userRequests";

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (credentials) => {
        const userInfo = {
            email: credentials.email,
            password: credentials.password,
        }

        const userAuth = await userLoginReq(userInfo)
        const userPersonalData = await userDataFetch(userAuth.userId)

        //Local Storage updated
        localStorage.setItem('token', userAuth.token)
        localStorage.setItem('userUUID', userAuth.userId)

        return { token: userAuth.token, userInfo: userPersonalData }
    }
)

export const userRegister = createAsyncThunk(
    'user/userRegister',
    async (credentials) => {

        const userAuth = await userRegisterReq(credentials)
        const userPersonalData = await userDataFetch(userAuth.userId)

        //Local Storage updated
        localStorage.setItem('token', userAuth.token)
        localStorage.setItem('userUUID', userAuth.userId)
        return { token: userAuth.token, userInfo: userPersonalData }
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

        if (updateUserResp.status == 201) {
            const userPersonalData = await userDataFetch(data.uuid)
            return { userInfo: userPersonalData }
        }

    }
)

export const updateUserServices = createAsyncThunk(
    'user/userServicesEdit',
    async (serviceUpdateData) => {
        //Api call to user edit here
        await postUserServices(serviceUpdateData.services, serviceUpdateData.id, serviceUpdateData.token)
        const userPersonalData = await userDataFetch(serviceUpdateData.id)

        return { userInfo: userPersonalData }

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

const UserReducer = createSlice({
    name: 'user',
    initialState: {
        //loaders
        userInitLoad: true,
        userLoginLoad: false,
        userRegisterLoad: false,
        getUserDataLoad: false,
        userEditLoad: false,
        userServicesUpdateLoad: false,
        userPasswordChangeLoad: false,

        //errors
        userInitError: null,
        userLoginError: null,
        userRegisterError: null,
        getUserDataError: null,
        userEditError: null,
        userServicesUpdateError: null,
        userPasswordChangeError: null,

        //Main / other stuff
        user: null
    },
    reducers: {
        userLogout: (state) => {
            // Clear user state and localStorage on logout
            state.user = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userUUID');
        },
        userInitial: (state, action) => {
            state.user = action.payload.userInfo;
        },

    },
    extraReducers: (builder) => {
        builder

            .addCase(userLogin.pending, (state) => {
                state.userLoginLoad = true;
                state.user = null;
                state.userLoginError = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userLoginLoad = false;
                state.user = action.payload.userInfo;
                state.userLoginError = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userLoginLoad = false;
                state.user = null;

                if(action.error.code === "ERR_BAD_REQUEST"){
                    state.userLoginError = "Input fields are invalid. Please input valid credentials."
                } else {
                    state.userLoginError = action.error.message;
                }
            })

            .addCase(userRegister.pending, (state) => {
                state.userRegisterLoad = true;
                state.user = null;
                state.userRegisterError = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.userRegisterLoad = false;
                state.user = action.payload.userInfo;
                state.userRegisterError = null;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.userRegisterLoad = false;
                state.user = null;
                console.log('error',action.error.code, action.error )

                if(action.error.code === "ERR_BAD_REQUEST"){
                    state.userRegisterError = "Input fields are invalid. Please input valid credentials."
                } else {
                    state.userRegisterError = action.error.message;
                }
            })

            .addCase(getUserData.pending, (state) => {
                state.getUserDataLoad = true;
                state.user = null;
                state.getUserDataError = null;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.getUserDataLoad = false;
                state.user = action.payload.userInfo;
                state.getUserDataError = null;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.getUserDataLoad = false;
                state.user = null;
                state.getUserDataError = action.error.message;
            })

            .addCase(userEdit.pending, (state) => {
                state.userEditLoad = true;
                state.userEditError = null;
            })
            .addCase(userEdit.fulfilled, (state, action) => {
                state.userEditLoad = false;
                state.user = action.payload.userInfo;
                state.userEditError = null;
            })
            .addCase(userEdit.rejected, (state, action) => {
                state.userEditLoad = false;
                state.userEditError = action.error.message;
            })

            .addCase(updateUserServices.pending, (state) => {
                state.userServicesUpdateLoad = true;
                state.userServicesUpdateError = null;
            })
            .addCase(updateUserServices.fulfilled, (state, action) => {
                state.userServicesUpdateLoad = false;
                state.user = action.payload.userInfo;
                state.userServicesUpdateError = null;
            })
            .addCase(updateUserServices.rejected, (state, action) => {
                state.userServicesUpdateLoad = false;
                state.userServicesUpdateError = action.error.message;
            })

            .addCase(userChangePassword.pending, (state) => {
                state.userPasswordChangeLoad = true;
                state.userPasswordChangeError = null
            })
            .addCase(userChangePassword.fulfilled, (state, action) => {
                state.userPasswordChangeLoad = false;
                state.userPasswordChangeError = null
            })
            .addCase(userChangePassword.rejected, (state, action) => {
                state.userPasswordChangeLoad = false;
                state.userPasswordChangeError = action.error.message;
            })

    }
})

export const { userLogout, userInitial } = UserReducer.actions;

export default UserReducer.reducer;
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        error: false
    },
    reducers: {
        // Login process starts which makes the loading true
        startLogin: (state) => {
            state.loading = true;
        },
        // Login process succeeds which makes the loading false and sets the currentUser to the logged in User
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        // Login process fails which makes the loading false again and sets the error into true
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        // If the logout function is dispatched the User's all state will go back to initialState
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.indexOf((videoId) => videoId === action.payload), 1);
            }
            else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        }
    }
})


export const { startLogin, loginSuccess, loginFailure, logout, subscription } = userSlice.actions

export default userSlice.reducer
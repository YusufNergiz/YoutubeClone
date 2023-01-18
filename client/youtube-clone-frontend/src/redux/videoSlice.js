import { createSlice } from '@reduxjs/toolkit'
import { Action } from '@remix-run/router';

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        currentVideo: null,
        loading: false,
        error: false
    },
    reducers: {
        // Fetching Video Data process begun
        startFetching: (state) => {
            state.loading = true;
        },
        // Fetching Vide Data process Successfull
        fetchingSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload
        },
        fetchingFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        likeVideo: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                // Adds the current user's ID to the videos likes array if it already does not exist
                state.currentVideo.likes.push(action.payload);
                // Removes the current user's ID from the dislikes array if it exists
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.indexOf((userId) => userId === action.payload), 1);
            }
        },
        dislikeVideo: (state, action) => {
            if (!state.currentVideo.dislikes.includes(action.payload)) {
                state.currentVideo.dislikes.push(action.payload);
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.indexOf((userId) => userId === action.payload));
            }
        }
    }
})


export const { startFetching, fetchingSuccess, fetchingFailure, likeVideo, dislikeVideo } = videoSlice.actions

export default videoSlice.reducer
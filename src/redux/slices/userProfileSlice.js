import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (body) => {
    try {
        const response = await axiosClient.post('/user/getUserDetails', body);
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const LikeUnlikeUserPost = createAsyncThunk('/posts/like', async (body) => {
    try {
        const response = await axiosClient.post('/posts/like', body);
        return response.result.post;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const FollowUnfollow = createAsyncThunk('user/follow', async (body) => {
    try {
        const response = await axiosClient.post('/user/follow', body);
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const commentOnUserPost = createAsyncThunk('/posts/comment', async (body) => {
    try {
        const response = await axiosClient.post('/posts/comment', body);
        return response.result.post;
    } catch (error) {
        return Promise.reject(error);
    }
})


const userProfileSlice = createSlice({
    name: 'userProfileSlice',
    initialState: {
        userProfile: {}
    },

    reducers: {
        setUserProfile: (state, action) => {
            const postId = action.payload.post._id;
            const index = state.userProfile?.posts?.findIndex((post) => post._id === postId);
            if (index !== -1 && index !== undefined) {
                state.userProfile.posts[index] = action.payload.post;
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })
            .addCase(FollowUnfollow.fulfilled, (state, action) => {
                const result = action?.payload;
                state.userProfile.followers = result?.followers;
                state.userProfile.isFollowing = result?.isFollowing;
            })
            .addCase(LikeUnlikeUserPost.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state.userProfile?.posts?.findIndex((p) => p._id === post._id);
                if (index !== -1 && index !== undefined)
                    state.userProfile.posts[index] = post;
            })
            .addCase(commentOnUserPost.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state.userProfile?.posts?.findIndex((p) => p._id === post._id);
                if (index !== -1 && index !== undefined)
                    state.userProfile.posts[index] = post;
            })
    }
})

export default userProfileSlice.reducer;
export const { setUserProfile } = userProfileSlice.actions;
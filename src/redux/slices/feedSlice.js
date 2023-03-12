import { axiosClient } from "../../utils/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFeed = createAsyncThunk('user/getFeedData', async () => {
    try {
        const response = await axiosClient.get('/user/getFeedData');
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const LikeUnlikeFeed = createAsyncThunk('FeedSlice/posts/like', async (body) => {
    try {
        const response = await axiosClient.post('/posts/like', body);
        return response.result.post;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const FollowUser = createAsyncThunk('user/follow', async (body) => {
    try {
        const response = await axiosClient.post('/user/follow', body);
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
        feedData: {},
    },

    extraReducers: (builder) => {
        builder.addCase(getFeed.fulfilled, (state, action) => {
            state.feedData = action.payload;
        })
            .addCase(LikeUnlikeFeed.fulfilled, (state, action) => {
                const post = action.payload;

                //finding this post in feedData
                const index = state?.feedData?.posts?.findIndex((p) => p._id === post._id);

                if (index !== -1 && index !== undefined) {
                    state.feedData.posts[index] = post;
                }
            })
            .addCase(FollowUser.fulfilled, (state, action) => {
                const { userIdfollowed } = action.payload;

                //finding this post in feedData
                const index = state?.feedData?.Suggestions?.findIndex((s) => s._id === userIdfollowed);

                if (index !== -1 && index !== undefined) {
                    state.feedData.Suggestions.splice(index, 1);
                }
            })
    }
})

export default feedSlice.reducer;
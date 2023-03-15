import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk('user/getMyProfile', async () => {
    try {
        const response = await axiosClient.get('/user/getMyProfile');
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (body) => {
    try {
        const response = await axiosClient.put('/user/', body);
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const CreateNewPost = createAsyncThunk('appConfig/post/', async (body) => {
    try {
        const response = await axiosClient.post("/posts/", body);
        return response.result.post;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const LikeUnlikePost = createAsyncThunk('/posts/like', async (body) => {
    try {
        const response = await axiosClient.post('/posts/like', body);
        return response.result.post;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const DeleteAccount = createAsyncThunk('/user/delete', async () => {
    try {
        const response = await axiosClient.delete('/user/deleteMyProfile');
        return response.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

export const searchUser = createAsyncThunk('/user/searchUser', async (body) => {
    try {
        const response = await axiosClient.post('/user/searchUser', body);
        return response.result.users;
    } catch (error) {
        return Promise.reject(error);
    }
})

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        toastData: {},
        myProfile: {},
        searchResults: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        settoastData: (state, action) => {
            state.toastData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload;
        })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.myProfile = action.payload;
            })
            .addCase(LikeUnlikePost.fulfilled, (state, action) => {
                const post = action.payload;

                //finding this post in myProfile
                const index = state?.myProfile?.posts?.findIndex((p) => p._id === post._id);

                if (index !== -1 && index !== undefined) {
                    state.myProfile.posts[index] = post;
                }
            })
            .addCase(CreateNewPost.fulfilled, (state, action) => {
                const post = action.payload;
                state.myProfile.posts.unshift(post);
            })
            .addCase(DeleteAccount.fulfilled, (state, action) => {
                state.myProfile = {};
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.searchResults = action.payload;
            })
    }
})

export default appConfigSlice.reducer;

export const { setLoading, settoastData } = appConfigSlice.actions;
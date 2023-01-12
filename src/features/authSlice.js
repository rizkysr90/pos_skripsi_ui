import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("users/loginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login/users', {
            email: user.email,
            password: user.password
        });
        return response.data.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.metadata.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
    await axios.delete('http://localhost:8080/auth/logout/users');
})
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers : {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        // builder.addCase(logoutUser.pending, (state) => {
        //     state.isLoading = true;
        // });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.user = null;
        })
        // builder.addCase(logoutUser.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // })
    }
})


export const {reset} = authSlice.actions;
export default authSlice.reducer;
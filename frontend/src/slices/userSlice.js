import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userInfo: userInfoFromStorage,
  userList: null,
  userDetails:null,
  loading: false,
  error: null
}

export const loginUser = createAsyncThunk('login_user', async ({ email, password }, thunkAPI) => {
  try {
    return await userService.loginUser(email, password);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message);
  }
});

export const registerUser = createAsyncThunk('register_user', async ({ companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber }, thunkAPI) => {
  try {
    return await userService.registerUser({ companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber });
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserList = createAsyncThunk('get_userlist', async ({ token, keyword }, thunkAPI) => {
  try {
    return await userService.getUserList(token, keyword);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const sortByField = createAsyncThunk('sort_by_name', async ({columnName, sortDirection, token}, thunkAPI) => {
  try {
    return await userService.sortByField({columnName, sortDirection, token});
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserDetails = createAsyncThunk('get_user_details', async ({ userId, token }, thunkAPI) => {
  try {
    console.log(userId, token);
    return await userService.getUserDetails(userId, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null
      state.loading = false
      state.error = null
      localStorage.removeItem('userInfo')
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        localStorage.setItem('userInfo',JSON.stringify(action.payload))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
      state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        localStorage.setItem('userInfo', JSON.stringify(action.payload) )
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
      .addCase(getUserList.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false
        state.userList = action.payload
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(sortByField.pending, (state) => {
        state.loading = true
      })
      .addCase(sortByField.fulfilled, (state, action) => {
        state.loading = false
        state.userList = action.payload
      })
      .addCase(sortByField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;


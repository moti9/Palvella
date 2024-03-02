import { createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../services/AuthAPI";
import configStore from "../app/configStore";


const storedData = JSON.parse(localStorage.getItem('auth')) || {
    user: {
        id: null,
        username: null,
        first_name: null,
        last_name: null,
        image: null,
    },
    isAuthenticated: false,
    isAccessToken: false,
    isRefreshToken: false
};
const cookie = configStore.cookie;
const access_token = cookie.get("access_token");
const refresh_token = cookie.get("refresh_token");

if (!access_token || !refresh_token) {
    storedData.isAuthenticated = false;
}

if (access_token) {
    storedData.isAccessToken = true;
}

if (refresh_token) {
    storedData.isRefreshToken = true;
}

const initialState = {
    ...storedData,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            cookie.set("access_token", action.payload.access_token);
            cookie.set("refresh_token", action.payload.refresh_token);
            localStorage.setItem("auth", JSON.stringify(state));
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            // Clear tokens from cookies
            cookie.remove('refresh_token');
            cookie.remove('access_token');
            // Clear state from local storage
            localStorage.removeItem('auth');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            // Clear tokens from cookies
            cookie.remove('refresh_token');
            cookie.remove('access_token');
            // Clear state from local storage
            localStorage.removeItem('auth');
        },
        refreshAccessTokenSuccess: (state, action) => {
            cookie.set('access_token', action.payload.access);
            // Save state to local storage
            localStorage.setItem('auth', JSON.stringify(state));
        },
        refreshAccessTokenFailure: (state, action) => {
            state.isAuthenticated = false;
            // Clear tokens from cookies
            cookie.remove('refresh_token');
            cookie.remove('access_token');
            // Clear state from local storage
            localStorage.removeItem('auth');
        },
    }
});

export const { loginSuccess, loginFailure, logout, refreshAccessTokenSuccess, refreshAccessTokenFailure } = authSlice.actions;

export default authSlice.reducer;

export const login = (userData) => async (dispatch) => {
    try {
        const response = await AuthAPI.LoginUser(userData);
        // console.log(response);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        // console.log(error);
        dispatch(loginFailure(error.message));
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await AuthAPI.logoutUser();
        dispatch(logout());
    } catch (error) {
        console.error(error);
    }
};

export const refreshAccessToken = () => async (dispatch) => {
    try {
        const response = await AuthAPI.refreshAccessToken();
        dispatch(refreshAccessTokenSuccess(response.data));
    } catch (error) {
        dispatch(refreshAccessTokenFailure(error.message));
    }
};
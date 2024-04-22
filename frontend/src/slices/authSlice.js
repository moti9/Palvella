import { createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../services/AuthAPI";
import BusinessAPI from "../services/BusinessAPI";
import configStore from "../app/configStore";


const storedData = JSON.parse(localStorage.getItem('palvella')) || {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    image: null,
    role: null,
    isAuthenticated: false,
    isAccessToken: false,
    isRefreshToken: false
};
const cookie = configStore.cookie;
const access_token = cookie.get("access_token");
const refresh_token = cookie.get("refresh_token");

if (!access_token || !refresh_token) {
    storedData.isAuthenticated = false;
    localStorage.removeItem('palvella');
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
    name: 'palvella',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.id = action.payload.id;
            state.firstName = action.payload.first_name;
            state.lastName = action.payload.last_name;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            cookie.set("access_token", action.payload.access_token);
            cookie.set("refresh_token", action.payload.refresh_token);
            localStorage.setItem("palvella", JSON.stringify(state));
        },
        loginFailure: (state) => {
            state.isAuthenticated = false;
            // Clear tokens from cookies
            cookie.remove('refresh_token');
            cookie.remove('access_token');
            // Clear state from local storage
            localStorage.removeItem('palvella');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            // Clear tokens from cookies
            cookie.remove('refresh_token');
            cookie.remove('access_token');
            // Clear state from local storage
            localStorage.removeItem('palvella');
        },
        refreshAccessTokenSuccess: (state, action) => {
            cookie.set('access_token', action.payload.access);
            // Save state to local storage
            localStorage.setItem('palvella', JSON.stringify(state));
        },
        refreshAccessTokenFailure: (state) => {
            state.isAuthenticated = false;
            // Clear tokens from cookies
            cookie.remove('refresh_token');
            cookie.remove('access_token');
            // Clear state from local storage
            localStorage.removeItem('palvella');
        },
    }
});

export const { loginSuccess, loginFailure, logout, refreshAccessTokenSuccess, refreshAccessTokenFailure } = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await AuthAPI.LoginUser(userData);
        // console.log(response);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        // console.log(error);
        dispatch(loginFailure(error.message));
        throw error;
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await AuthAPI.logoutUser();
        dispatch(logout());
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const loginBusiness = (userData) => async (dispatch) => {
    try {
        const response = await BusinessAPI.loginBusiness(userData);
        // console.log(response);
        dispatch(loginSuccess(response));
    } catch (error) {
        // console.log(error);
        dispatch(loginFailure(error.message));
        throw error;
    }
};

export const logoutBusiness = () => async (dispatch) => {
    try {
        await BusinessAPI.logoutBusiness();
        dispatch(logout());
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const refreshAccessToken = () => async (dispatch) => {
    try {
        const response = await AuthAPI.refreshAccessToken();
        dispatch(refreshAccessTokenSuccess(response.data));
    } catch (error) {
        dispatch(refreshAccessTokenFailure(error.message));
        throw error;
    }
};
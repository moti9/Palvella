import axios from "axios";
import configStore from "../app/configStore";

const cookie = configStore.cookie;

class AuthAPI {
    static baseUrl = `${configStore.baseUrl}/auth`;

    static async SignupUser(body) {
        try {
            const response = await axios.post(`${this.baseUrl}/signup/`, body, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle validation error here
                const validationErrors = error.response.data.errors; // Assuming errors are returned in a specific format
                throw new Error('Validation Error: ' + JSON.stringify(validationErrors));
            } else {
                throw error;
            }
        }
    }

    static async LoginUser(body) {
        try {
            const response = await axios.post(`${this.baseUrl}/login/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            if (error) {
                console.log(error);
                throw error;
            }
            else {
                throw error;
            }
        }
    }



    static async logoutUser() {
        try {
            const refresh_token = cookie.get("refresh_token");
            const access_token = cookie.get("access_token");
            if (refresh_token && access_token) {
                return axios.post(`${this.baseUrl}/logout/`, { "refresh_token": refresh_token }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access_token}`,
                    },
                });
            } else {
                throw new Error('Both refresh_token and access_token are required for logout.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized error here
                throw new Error('Unauthorized: Please log in again.');
            } else {
                throw error;
            }
        }
    }

    static async refreshAccessToken() {
        try {
            const refresh_token = cookie.get("refresh_token");
            return axios.post(`${this.baseUrl}/token/refresh/`, { refresh: refresh_token }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized error here
                throw new Error('Unauthorized: Please log in again.');
            } else {
                throw error;
            }
        }
    }

    static async checkAuthentication() {

        try {
            const access_token = cookie.get("access_token");
            const response = await axios.post(`${this.baseUrl}/token/verify/`, { token: access_token }, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized error here
                throw new Error('Unauthorized: Please log in again.');
            } else {
                throw error;
            }
        }
    }

    static async changePassword(body) {
        try {
            const access_token = cookie.get("access_token");
            return axios.post(`${this.baseUrl}/change-password/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized error here
                throw new Error('Unauthorized: Please log in again.');
            } else {
                throw error;
            }
        }
    }
}

export default AuthAPI;

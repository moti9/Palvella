import axios from "axios";
import configStore from "../app/configStore";

const cookie = configStore.cookie;
const baseUrl = `${configStore.baseUrl}/merchants`;

const sendRequest = async (url, method, body, isFileUpload = false, requireAuth = true) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        if (requireAuth) {
            const accessToken = cookie.get("access_token");
            if (accessToken) {
                headers['Authorization'] = `JWT ${accessToken}`;
            }
            else {
                throw Error("Access token required for authentication");
            }
        }

        if (isFileUpload) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        const response = await axios({
            method: method,
            url: `${baseUrl}/${url}/`,
            headers: headers,
            data: body
        });
        return response.data;
    } catch (error) {
        console.error("Error in sendRequest:", error);
        // throw error;
    }
}

class BusinessAPI {
    static async businessAccountSignup(body) {
        return sendRequest('signup', 'post', body, false, false);
    }

    static async loginBusiness(body) {
        return sendRequest('login', 'post', body, false, false);
    }

    static async logoutBusiness() {
        const refresh_token = cookie.get("refresh_token");
        if (!refresh_token) {
            throw new Error('Refresh token not found.');
        }
        return sendRequest('logout', 'post', { refresh_token });
    }

    static async businessRegister(body) {
        return sendRequest('register', 'post', body);
    }

    static async generateBusinessDescription(body) {
        return sendRequest('business-content', 'post', body);
    }
    static async generateShopProductContent(body) {
        return sendRequest('shop-content', 'post', body);
    }
    static async generateRestaurantProductContent(body) {
        return sendRequest('restaurant-content', 'post', body);
    }

    static async addBusinessAddress(body) {
        return sendRequest('business-address', 'post', body);
    }

    static async getBusinessAddress() {
        return sendRequest('business-address', 'get');
    }

    static async uploadBusinessLogo(body) {
        return sendRequest('business-logo', 'post', body, true);
    }

    static async getBusinessLogo() {
        return sendRequest('business-logo', 'get');
    }

    static async uploadBusinessImage(body) {
        return sendRequest('business-image', 'post', body, true);
    }

    static async getBusinessImages() {
        return sendRequest('business-image', 'get');
    }

    static async uploadBusinessDocument(body) {
        return sendRequest('business-document', 'post', body, true);
    }

    static async getBusinessDocuments() {
        return sendRequest('business-document', 'get');
    }

    static async uploadBusinessOwnerDocument(body) {
        return sendRequest('owner-document', 'post', body, true);
    }

    static async getBusinessOwnerDocuments() {
        return sendRequest('owner-document', 'get');
    }

    static async getBusinessDetails() {
        return sendRequest('register', 'get');
    }

    static async getAllCategories() {
        return sendRequest('categories', 'get', null, false, false);
    }

    static async getAllCategoryDetail() {
        return sendRequest('category-detail', 'get', null, false, false);
    }

    static async getAllCategoryInfo() {
        return sendRequest('category-info', 'get', null, false, false);
    }

    static async getAllCuisines() {
        return sendRequest('cuisines', 'get', null, false, false);
    }

    static async getAllCuisineDetail() {
        return sendRequest('cuisine-detail', 'get', null, false, false);
    }

    static async getAllAllergens() {
        return sendRequest('allergens', 'get', null, false, false);
    }

    static async createShopProduct(body) {
        return sendRequest('create-shop-product', 'post', body, true);
    }

    static async createRestaurantProduct(body) {
        return sendRequest('create-restaurant-product', 'post', body, true);
    }

    static async getAllProducts() {
        return sendRequest('get-products', 'get');
    }

    static async getTopProducts() {
        return sendRequest('top-products', 'get', null, false, false);
    }

    static async getBusinessList() {
        return sendRequest('businesses', 'get', null, false, false);
    }

    static async getProductList() {
        return sendRequest('products', 'get', null, false, false);
    }
}

export default BusinessAPI;

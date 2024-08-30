import axios from "axios";
import configStore from "../app/configStore";

const cookie = configStore.cookie;
const baseUrl = `${configStore.baseUrl}/users`;

const sendRequest = async (
  url,
  method,
  body,
  isFileUpload = false,
  requireAuth = true
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (requireAuth) {
      const accessToken = cookie.get("access_token");
      if (accessToken) {
        headers["Authorization"] = `JWT ${accessToken}`;
      } else {
        throw Error("Access token required for authentication");
      }
    }

    if (isFileUpload) {
      headers["Content-Type"] = "multipart/form-data";
    }
    const response = await axios({
      method: method,
      url: `${baseUrl}/${url}/`,
      headers: headers,
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error("Error in sendRequest:", error);
    // throw error;
  }
};

class UserAPI {
  static async getBusinessesList() {
    return sendRequest("signup", "post", body, false, false);
  }
}

export default UserAPI;

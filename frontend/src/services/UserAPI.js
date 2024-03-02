import axios from "axios";
import configStore from "../app/configStore";

class UserAPI {
    static baseUrl = `${configStore.baseUrl}/users`;
};

export default UserAPI;
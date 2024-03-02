import axios from "axios";
import configStore from "../app/configStore";

class MerchantAPI {
    static baseUrl = `${configStore.baseUrl}/merchants`;
};

export default MerchantAPI;
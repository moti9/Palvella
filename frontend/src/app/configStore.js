import { Cookies } from "react-cookie";

const configStore = {
    baseUrl: "http://127.0.0.1:8000/",
    cookie: new Cookies(),
};

export default configStore;
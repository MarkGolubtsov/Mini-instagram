import jwt_decode from "jwt-decode";
import {RestRequest} from "./requestService";
import {endpoints} from "../constant/endpoints";

const getUserFromStorage = () => {
    let token = localStorage.getItem('token');
    let data = jwt_decode(token);
    let user = {
        name: data.name,
        secondname: data.second.name,
        email: data.email
    };
    return user;
};

const afterLogin = response => {
    if (response.data.token) {
        localStorage.setItem('token', `${response.data.token}`);
    }
    return response;
};
const registration = (username, email, password) =>
    RestRequest.post(endpoints.registration, {}, {username, email, password})
        .then(afterLogin);

const login = (username, password) =>
    RestRequest.post(endpoints.login, {}, {username, password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('User');
};
export {
    login,
    getUserFromStorage,
    registration,
    logout
}

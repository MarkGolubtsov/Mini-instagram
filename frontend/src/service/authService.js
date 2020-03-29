import jwt_decode from "jwt-decode";
import {authEndpoints} from "../constant/endpoints";
import {RestRequest} from "./requestService";

const getUserFromStorage = () => {
    let token = localStorage.getItem('Jwt token');
    if (!token) return null;
    let data = jwt_decode(token);
    let user = {
        name: data.name,
        surname: data.surname,
        email: data.email
    };
    return user;
};

const afterLogin = response => {
    if (response.data.token) {
        localStorage.setItem('Jwt token', `${response.data.token}`);
    }
    return response;
};
const registration = (name, surname, email, password) =>
    RestRequest.post(authEndpoints.registration, {}, {name, surname, email, password})
        .then(afterLogin);

const login = (email, password) =>
    RestRequest.post(authEndpoints.login, {}, {email, password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('Jwt token');
};
export default {
    login,
    getUserFromStorage,
    registration,
    logout
}

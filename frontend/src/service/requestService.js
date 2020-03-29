import Axios from "axios";
import socketIOClient from "socket.io-client";
import {apiUrl} from "../constant/endpoints";

const method = {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    DELETE: 'delete'
};

const sendRequest = (method, url, data) => {
    const Authorization = localStorage.getItem('Jwt token');
    const headers = {Authorization};
    return Axios.request({method, url, data, headers});
};

export const RestRequest = {
    get: (endpoint, parameters, data) => sendRequest(method.GET, endpoint, data),
    put: (endpoint, parameters, data) => sendRequest(method.PUT, endpoint, data),
    post: (endpoint, parameters, data) => sendRequest(method.POST, endpoint, data),
    delete: (endpoint, parameters, data) => sendRequest(method.DELETE, endpoint, data)
};
export const socket = socketIOClient(apiUrl, {
    query: {
        token: localStorage.getItem('authToken')
    }
});

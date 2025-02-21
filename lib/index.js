import axios from "axios";

let matrixHost = "http://matrix.com";
let access_token = ""

async function authWithPassword(login, password) {
    try {
        const response = await axios.post(`${matrixHost}/_matrix/client/r0/login`, {
            type: 'm.login.password',
            user: login,
            password: password
        });

        access_token = response.data.access_token;
        console.log('Authorization successful! Access token:', access_token);

        return access_token;
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
    }
}

function setHost(host){
    matrixHost = host;
}

// Пример запроса информации о пользователе
async function getUserInfo() {
    try {
        const response = await axios.get(`${matrixHost}/_matrix/client/r0/account/whoami`, {
            headers: {
                Authorization: `Bearer ${access_token}`  // Добавляем токен в заголовок запроса
            }
        });

        console.log('User info:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting user info:', error.response ? error.response.data : error.message);
    }
}

async function getAllRoomsAdministrator(){
    try {
        const response = await axios.get(`${matrixHost}/_synapse/admin/v1/rooms`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        // console.log('All rooms:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting admins rooms:', error.response ? error.response.data : error.message);
    }
}

async function getAllUsersAdministrator(){
    try {
        const response = await axios.get(`${matrixHost}/_synapse/admin/v2/users?from=0&limit=1000&guests=false`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error getting admins users:', error.response ? error.response.data : error.message);
    }
}


import axios from 'axios';

const SignUpService = (login, password) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${login}/${password}`);
}

const LoginService = (login, password) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/login/${login}/${password}`);
}

export {SignUpService, LoginService};
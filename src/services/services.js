import axios from 'axios';

const SignUpService = (login, password) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${login}/${password}`);
}

const LoginService = (login, password) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/login/${login}/${password}`);
}

const Users = (token) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${token}`);
}

const TalkList = (token) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${token}/0`);
}

const SentMessage = (token, userId, message) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/say/${token}/${userId}/${message}`);
}

const LogOut = (token, userId) => {
    return axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/logout/${token}/${userId}`);
}

export {SignUpService, LoginService, Users, TalkList, SentMessage, LogOut};
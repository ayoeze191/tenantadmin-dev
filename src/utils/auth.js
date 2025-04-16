import decode from 'jwt-decode'
import { getCookie } from './cookies';

function getAccessToken() {
    return getCookie("10ants-tk");
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date();
}

function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if(!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
}

export function isLoggedIn() {
    const accessToken = getAccessToken();
    return !!accessToken;
}

export function requireAuth(to, from, next) {
    if(!isLoggedIn()){
        next({
            path: '/',
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next();
    }
};

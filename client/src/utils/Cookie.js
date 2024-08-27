
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const secretKey = process.env.REACT_APP_SECRET_KEY;

// console.log("secretKey",secretKey);

if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
}

//------------------------------------------------------- Encrypt the token
export const encryptToken = (token) => {
    return CryptoJS.AES.encrypt(token, secretKey).toString();
};

//------------------------------------------------------- Decrypt the token
export const decryptToken = (encryptedToken) => {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

//------------------------------------------------------- Set token in cookie with far future expiration date
export const setCookie = (name, token) => {
    const encryptedToken = encryptToken(token);
    Cookies.set(name, encryptedToken, { expires: 365 * 10, secure: true, sameSite: 'Strict' }); // 10 years expiration
};

//----------------------------------------- Get token from cookie
export const getCookie = (name) => {
    const encryptedToken = Cookies.get(name);
    if (encryptedToken) {
        return decryptToken(encryptedToken);
    }
    return null;
};

//------------------------------------------------------- Remove token from cookie
export const removeTokenCookie = (name) => {
    Cookies.remove(name);
};

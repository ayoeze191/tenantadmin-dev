export function setCookie(cookieName, cookieValue) {
    window.document.cookie = cookieName + "=" + cookieValue + "; expires=-1; secure; sameSite=Lax; path=/";
}

export function getCookie(name){
    const { cookie } = window.document;
    const cookieArray = String(cookie || '').split(";")
    const cookieFound = cookieArray.find(c => c.includes(name));

    if(cookieFound) {
        const [, cookieValue] = cookieFound.split('=');
        return cookieValue;
    }

    return null;
}

export function deleteCookie(name) {
    window.document.cookie = name + "=; path=/ expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function clearCookies() {
    const cookies = [
        "10ants-tk"
    ];
    cookies.forEach(cookie => deleteCookie(cookie))
}
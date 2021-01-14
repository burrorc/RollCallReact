export const isLogin = () => {
    if (localStorage.getItem('aKey')) {
        return true;
    }

    return false;
}
import API from "./API"
const URL = {
    login: "/auth/login",
    register: "/register",
    forgot_password: "/forgot-password"
}
export const LoginApi = async (data) => {

    try {
        let response = await API.post(URL.login, data);

        return response.data;

    } catch (err) {

    }

}
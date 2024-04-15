const APIURL = 'http://localhost:4000'

export const apiEndpoint = {
    authEndpoint: {
        login: `${APIURL}/auth/login`,
        register: `${APIURL}/auth/register`,
        logout: `${APIURL}/auth/logout`,
        profile: `${APIURL}/auth/profile`,
    },
    MessageEndpoint: `${APIURL}/message`,
    UserEndpoint: `${APIURL}/users`,
}
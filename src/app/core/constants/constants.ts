export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
}

// const APIURL = 'https://msg-box-backend-pzrzz1prd-nkansah-wireko-brobbeys-projects.vercel.app'
const APIURL = 'http://localhost:4000'

export const apiEndpoint = {
    authEndpoint: {
        login: `${APIURL}/auth/login`,
        register: `${APIURL}/auth/register`,
        logout: `${APIURL}/auth/logout`,
    },
    MessageEndpoint: `${APIURL}/message`,
    UserEndpoint: `${APIURL}/user`,
    SocketEndpoint: `${APIURL}`,
    ProfileEndpoint: `${APIURL}/profile`,
}
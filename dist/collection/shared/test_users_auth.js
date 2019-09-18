import axios from 'axios';
export const user_with_site = {
    email: 'mpcrds+auto+2@gmail.com',
    password: process.env.TEST_SITE_USER_PW,
    site_id: 5
};
export const user_with_nickname = {
    email: 'mpcrds+auto+child2@gmail.com',
    password: process.env.TEST_GENERIC_USER_PW,
};
export const user_without_nickname = {
    email: 'mpcrds+auto+child1@gmail.com',
    password: process.env.TEST_GENERIC_USER_PW,
};
export function getSessionID(username, password) {
    return axios.post(process.env.TEST_CRDS_LOGIN_ENDPOINT, { username: username, password: password })
        .then(success => {
        return success.data.userToken;
    }).catch(err => {
        console.error(err);
    });
}


const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const API = async () => await fetch('https://randomuser.me/api/?results=100&seed=abc').then(response => response.json());

export const fullname = (user) => {
    return `${capitalize(user.name.first)} ${capitalize(user.name.last)}`
}

export const loginApi = async (user, password) => {
    return await API()
    .then(json => json.results.find(profile => profile.login.username === user && profile.login.password === password));
}

export const findUser = (users, username) => {
    return users.find(user => user.login.username === username);
}
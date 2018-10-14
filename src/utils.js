
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const fullname = (user) => {
    return `${capitalize(user.name.first)} ${capitalize(user.name.last)}`
}

export const loginApi = async (user, password) => {
    await fetch('https://randomuser.me/api/?results=100&seed=abc')
    .then(response => response.json())
    .then(json => {
      return json.results.find(profile => profile.login.username === user && profile.login.password === password);
    });
}
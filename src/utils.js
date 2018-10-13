
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const fullname = (user) => {
    return `${capitalize(user.name.first)} ${capitalize(user.name.last)}`
}
const key = "repairwave.user";

export function getUser(attribute) {
    var user = localStorage.getItem(key);
    if (!user) {
        return null; // Return null if the user is not found
    } else {
        user = JSON.parse(user);
    }

    return user[attribute] || null;
}

export function setUser(attribute, value) {
    var user = localStorage.getItem(key);
    if (!user) {
        user = {};
    } else {
        user = JSON.parse(user);
    }

    user[attribute] = value;

    localStorage.setItem(key, JSON.stringify(user));
}

export function clearUser() {
    localStorage.removeItem(key);
}

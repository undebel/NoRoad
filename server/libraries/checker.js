/**
 * Checks the data to create a new user.
 * @param {Object} body 
 * @returns Returns the check and the message as an object.
 */
const checkCreateUser = (body) => {
    if (!body.alias || body.alias.trim() === "") {
        return { result: false, msg: "Alias cannot be empty" };
    }
    else if (!body.password || body.password.trim() === "") {
        return { result: false, msg: "Password cannot be empty" };
    }
    else {
        return { result: true };
    }
};

/**
 * Checks the data to update an existent user.
 * @param {Object} body 
 * @returns Returns the check and the message as an object.
 */
const checkUpdateUser = (body) => {
    let result = { result: false };

    if (body.alias && body.alias.trim() !== "") {
        result = { result: true, alias: body.alias };
    }

    if (body.password && body.password.trim() !== "") {
        result = { ...result, result: true, password: body.password };
    }

    if (body.admin) {
        result = { ...result, result: true, admin: true };
    }

    return result;
};

/**
 * Checks the data to let login the app.
 * @param {string} id 
 * @param {string} password 
 * @returns Returns the check and the message as an object.
 */
const checkLogin = (id, password) => {
    if (!id || id.trim() === "") {
        return { result: false, msg: "ID cannot be empty" };
    }
    else if (!password || !password.trim() === "") {
        return { result: false, msg: "Password cannot be empty" };
    }
    else {
        return { result: true };
    }
};

/**
 * Checks the data to create a new room.
 * @param {Object} body 
 * @returns Returns the check and the message as an object.
 */
const checkCreateRoom = (body) => {
    if (!body.id || body.id.trim() === "") {
        return { result: false, msg: "ID cannot be empty" };
    }
    else if (!body.guestId || body.guestId.trim() === "") {
        return { result: false, msg: "Guest ID cannot be empty" };
    }
    else {
        return { result: true };
    }
};

module.exports = { checkCreateUser, checkUpdateUser, checkLogin, checkCreateRoom };
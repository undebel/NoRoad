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

const checkUpdateUser = (body) => {
    let result = { result: false };

    if (body.alias && body.alias.trim() !== "") {
        result = { result: true, alias: body.alias };
    }

    if (body.password && body.password.trim() !== "") {
        result = { ...result, result: true, password: body.password};
    }

    return result;
};

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
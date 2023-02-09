const isSHA256 = (str) => {
    const pattern = /^[a-fA-F0-9]{64}$/;
    return pattern.test(str);
};

const checkCreateUser = (body) => {
    if (!body.alias || body.alias.trim() === "") {
        return { result: false, msg: "Alias cannot be empty" };
    }
    else if (!body.password || !isSHA256(body.password)) {
        return { result: false, msg: "Password must be a SHA256 hash" };
    }
    else {
        return { result: true };
    }
};

const checkUpdateUser = (body) => {
    const result = { result: false };

    if (body.alias && body.alias.trim() !== "") {
        result = { result: true, alias: body.alias };
    }

    if (body.password && isSHA256(body.password)) {
        result = { ...result, result: true, password: body.password};
    }

    return result;
};

const checkLogin = (id, password) => {
    if (!id || id.trim() === "") {
        return { result: false, msg: "ID cannot be empty" };
    }
    else if (!password || !isSHA256(password)) {
        return { result: false, msg: "Password must be a SHA256 hash" };
    }
    else {
        return { result: true };
    }
};

module.exports = { checkCreateUser, checkUpdateUser, checkLogin };
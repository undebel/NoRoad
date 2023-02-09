const checkCreateUser = (body) => {
    if (!body.alias || body.alias.trim() === "") {
        return { result: false, msg: "" }; // TODO: Implement this
    }
    else if (!body.password || body.password) {
        return { result: false, msg: "" }; // Check if the password received is a SHA256
    }
    else {
        return { result: true };
    }
}

module.exports = { checkCreateUser };
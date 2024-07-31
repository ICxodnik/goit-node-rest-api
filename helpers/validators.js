
function isNameValid(data) {
    if (/^[A-Za-z ]+$/.test(data)) {
        return true;
    }
    return false;
}

function isEmailValid(data) {
    if (/\S+@\S+\.\S+/.test(data)) {
        return true;
    }
    return false;
}

function isPhoneValid(data) {
    if (/[0-9+() \-.]/g.test(data)) {
        return true;
    }
    return false;
}

module.exports = {
    isNameValid,
    isEmailValid,
    isPhoneValid
}
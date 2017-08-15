const constantRole = require('../constants/role');

exports.getUserInfo = (request) => {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role
    };
}

exports.getRole = (checkRole) => {
    let role;
    switch (checkRole) {
        case constantRole.ROLE_ADMIN:
            role = 4;
            break;
        case constantRole.ROLE_OWNER:
            role = 3;
            break;
        case constantRole.ROLE_CLIENT:
            role = 2;
            break;
        case constantRole.ROLE_MEMBER:
            role = 1;
            break;
    }
    return role;
}
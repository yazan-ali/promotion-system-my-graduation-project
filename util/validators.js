module.exports.validateRegisterInput = (
    first_name,
    last_name,
    username,
    password,
) => {
    const errors = {};
    if (first_name.trim() === "") {
        errors.first_name = "First name must not be empty";
    }
    if (last_name.trim() === "") {
        errors.last_name = "Last name must not be empty";
    }
    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password must not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}
    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password must not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateCreatePromotionRequestInput = (
    start_date,
    end_date,
    files
) => {
    const errors = {};
    if (start_date === null) {
        errors.start_date = "يجب ادخال هذا الحقل";
    }
    if (end_date === null) {
        errors.end_date = "يجب ادخال هذا الحقل";
    }
    if (files.length < 2) {
        errors.files = "يجب رفع جميع الملفات المطلوبة";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateUpdatePromotionRequestInput = (files) => {
    const errors = {};
    if (files.length < 3) {
        errors.files = "يجب رفع جميع الملفات المطلوبة";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
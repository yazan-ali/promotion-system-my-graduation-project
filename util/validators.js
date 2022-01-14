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
    files,
    promotion_type
) => {

    const errors = {};
    if (start_date === null) {
        errors.start_date = "يجب ادخال هذا الحقل";
    }
    if (end_date === null) {
        errors.end_date = "يجب ادخال هذا الحقل";
    }

    if (promotion_type === "تثبيت أستاذ مساعد") {
        for (let i = 1; i <= 6; i++) {
            if (!files[`file_${i}`]) {
                errors.files = { ...errors.files, [`file_${i}`]: "يجب رفع هذا الملف" }
            }
        }
    } else {
        for (let i = 1; i <= 4; i++) {
            if (!files[`file_${i}`]) {
                errors.files = { ...errors.files, [`file_${i}`]: "يجب رفع هذا الملف" }
            }
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateUpdatePromotionRequestInput = (files, promotion_type) => {
    const errors = {};


    if (files) {
        if (promotion_type === "تثبيت أستاذ مساعد") {
            for (let i = 1; i <= 6; i++) {
                if (!files[`file_${i}`]) {
                    errors.files = { ...errors.files, [`file_${i}`]: "يجب رفع هذا الملف" }
                }
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                if (!files[`file_${i}`]) {
                    errors.files = { ...errors.files, [`file_${i}`]: "يجب رفع هذا الملف" }
                }
            }
        }
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateAdminFilesInput = (files, current_phase_number, process_level_number) => {
    const errors = {};


    if (process_level_number === 1) {
        if (current_phase_number === 1) {
            if (Object.keys(files).length < 3) {
                errors.files = "يجب رفع جميع الملفات"
            }
        } else if (current_phase_number === 2) {
            if (Object.keys(files).length < 5) {
                errors.files = "يجب رفع جميع الملفات"
            }
        }
    } else {
        if (current_phase_number === 6) {
            if (Object.keys(files).length < 6) {
                errors.files = "يجب رفع ملف قرار المقيمين "
            }
        } else if (current_phase_number === 4) {
            if (Object.keys(files).length < 7) {
                errors.files = "يجب رفع ملف قرار مجلس العمداء "
            }
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
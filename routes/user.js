const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../util/checkAuth");

// const { validateRegisterInput, validateLoginInput } = require("../../util/validators");

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        teacher_id: user.teacher_id,
        rank: user.rank,
        college: user.college,
        section: user.section,
        year: user.year,
        promotion_points: user.promotion_points,
        administrativeRank: user.administrativeRank,
        promotionRequest: user.promotionRequest,
        isAdmin: user.isAdmin
    }, process.env.TOKEN_SECRETE, { expiresIn: "1h" }
    )
}

// get user
router.get("/teacher/:id", async (req, res) => {
    try {
        const teacher = await User.findOne({ _id: req.params.id }).populate('promotionRequest');
        if (teacher) {
            res.json({
                success: true,
                result: teacher
            })
        } else {
            res.json({
                success: false,
                message: "User not found"
            })
        }
    } catch (err) {
        throw new Error(err);
    }
})

// get teachers for specific section or specific college
router.get("/user/:college/:section", async (req, res) => {
    try {
        const user = checkAuth(req, res);
        let teachers;

        if (user) {
            if (user.administrativeRank === 1) {
                teachers = await User.find({
                    college: req.params.college,
                    section: req.params.section,
                    isAdmin: false
                }).populate("promotionRequest")
            } else if (user.administrativeRank === 2) {
                teachers = await User.find({
                    college: req.params.college,
                    isAdmin: false
                }).populate("promotionRequest")
            } else if (user.administrativeRank > 2) {
                teachers = await User.find({ isAdmin: false }).populate("promotionRequest")
            }
            res.json({
                success: true,
                teachers: teachers
            })
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            })
            throw new Error("An error occurred");
        }
    } catch (err) {
        console.log(err);
    }
})

// register
router.post("/register", async (req, res) => {
    // const { valid, errors } = validateRegisterInput(first_name, last_name, username, password,);
    // if (!valid) {
    //     throw new UserInputError("Errors", {
    //         errors: errors
    //     })
    // }

    try {

        const user = await User.findOne({ teacher_id: req.body.teacher_id });
        if (user) {
            res.json({
                auth: false,
                message: "هذا المستخدم موجود بالفعل"
            })
            throw new Error("This user already exists")
        }

        password = await bcrypt.hash(req.body.password, 12);

        const newUser = new User({
            full_name: req.body.full_name,
            teacher_id: req.body.teacher_id,
            username: req.body.teacher_id,
            rank: req.body.rank,
            password: password,
            college: req.body.college,
            section: req.body.section,
            year: req.body.year,
            promotion_points: req.body.promotion_points,
            administrativeRank: req.body.administrativeRank,
            isAdmin: req.body.isAdmin
        });
        const result = await newUser.save();

        const token = generateToken(result);
        res.json({
            result: {
                ...result._doc,
                id: result._id,
                token
            },
            auth: true
        })
    }
    catch (err) {
        // res.json({
        //     success: false,
        //     message: "An error occurred"
        // });
        console.log(err)
    }
});

// login

router.post("/login", async (req, res) => {

    try {

        //   const { errors, valid } = validateLoginInput(username, password);
        const user = await User.findOne({ username: req.body.username }).populate("promotionRequest");

        // if (!valid) {
        //     throw new UserInputError("Errors", {
        //         errors: errors
        //     });
        // }

        if (user) {
            // errors.general = "User not found";
            // throw new UserInputError("User not found", {
            //     errors: errors
            // });
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                res.json({
                    auth: false,
                    message: "اسم المستخدم أو كلمة المرور غير صحيحة"
                })
                throw new Error("Username or password is incorrect")
            } else {
                const token = generateToken(user);
                res.json({
                    result: {
                        ...user._doc,
                        id: user._id,
                        token
                    },
                    auth: true
                })
            }
        } else {
            res.json({
                auth: false,
                message: "هذا المستخدم غير موجود"
            })
            throw new Error("User not found")
        }
    }
    catch (err) {
        // res.json({
        //     success: false,
        //     message: "An error occurred"
        // });
        console.log(err)
    }
})

// get all teachers
router.get("/teachers", async (req, res) => {

    try {

        // const teachers = await User.find({ isAdmin: false })
        const teachers = await User.find({ isAdmin: false })
        res.json({
            success: true,
            result: teachers
        })
    } catch (err) {
        res.json({
            success: false,
            message: "حدث خطأ ما"
        })
        console.log(err);
    }
})

//get specific administrative
router.get("/administrative/:college/:section/:administrativeRank", async (req, res) => {

    try {
        let administrative
        if (req.params.college === "none") {
            administrative = await User.findOne({
                administrativeRank: req.params.administrativeRank
            })
        }
        else if (req.params.section === "none") {
            administrative = await User.findOne({
                college: req.params.college,
                administrativeRank: req.params.administrativeRank
            })
        } else {
            administrative = await User.findOne({
                college: req.params.college,
                section: req.params.section,
                administrativeRank: req.params.administrativeRank
            })
        }

        if (administrative) {
            res.json({
                success: true,
                result: administrative,
            })
        } else {
            res.json({
                success: false,
                message: "لم يتم العثور على المستخدم"
            })
        }

    } catch (err) {
        console.log(err)
    }
})

//update administrative
router.put("/administrative", async (req, res) => {

    try {
        await User.findByIdAndUpdate(req.body.new_administrative_id, { administrativeRank: req.body.administrativeRank })
        if (req.body.prev_administrative_id) {
            await User.findByIdAndUpdate(req.body.prev_administrative_id, { administrativeRank: 0 })
        }

        res.json({
            success: true,
        })

    } catch (err) {
        res.json({
            success: false,
            message: "حدث خطأ ما"
        })
        console.log(err)
    }
})

module.exports = router;
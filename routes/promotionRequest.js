const express = require('express');
const router = express.Router();
const PromotionRequset = require("../models/promotionRequest");
const User = require("../models/user");
const checkAuth = require("../util/checkAuth");
const { validateCreatePromotionRequestInput, validateUpdatePromotionRequestInput } = require("../util/validators");
const nodemailer = require("nodemailer");

// get all promotion request
router.get("/promotionRequests", async (req, res) => {

    try {
        const promotionRequests = await PromotionRequset.find({});
        if (promotionRequests) {
            res.json({
                success: true,
                result: promotionRequests
            });
        } else {
            res.json({
                success: false,
                message: "An error occurred"
            })
            throw new Error("An error occurred")
        }
    }
    catch (err) {
        console.log(err);
    }
});

// get specific promotion request
router.get("/promotionRequests/:created_by_id", async (req, res) => {

    try {
        const promotionRequest = await PromotionRequset.findOne({ 'created_by.id': req.params.created_by_id });
        if (promotionRequest) {
            res.json({
                success: true,
                result: promotionRequest
            });
        } else {
            res.json({
                success: false,
                message: "Promotion request not found"
            })
            throw new Error("Promotion request not found")
        }
    }
    catch (err) {
        console.log(err);
    }
});

// get promotion request for administrative
router.get("/promotionRequests/:college/:section/:current_phase_number", async (req, res) => {

    let promotionRequests;

    try {
        if (req.params.current_phase_number === 1) {
            promotionRequests = await PromotionRequset.find({
                'created_by.college': req.params.college,
                "created_by.section": req.params.section,
                current_phase_number: req.params.current_phase_number,
            });
        } else if (req.params.current_phase_number === 2) {
            promotionRequests = await PromotionRequset.find({
                'created_by.college': req.params.college,
                current_phase_number: req.params.current_phase_number
            });
        } else {
            promotionRequests = await PromotionRequset.find({
                current_phase_number: req.params.current_phase_number
            });
        }
        if (promotionRequests) {
            res.json({
                success: true,
                result: promotionRequests
            });
        } else {
            res.json({
                success: false,
                message: "An error occurred"
            })
            throw new Error("An error occurred")
        }
    }
    catch (err) {
        console.log(err);
    }
});

// create promotion request
router.post("/promotionRequests", async (req, res) => {

    // const { valid, errors } = validateCreatePromotionRequestInput(req.body.start_date, req.body.end_date, req.body.user_files);

    // if (!valid) {
    //     res.json({
    //         success: false,
    //         errors: errors
    //     })
    //     return
    // }

    const user = checkAuth(req, res);

    if (user) {
        const newPromotionRequest = {
            created_by: {
                id: user.id,
                full_name: user.full_name,
                username: user.username,
                teacher_id: user.teacher_id,
                rank: user.rank,
                college: user.college,
                section: user.section,
                administrativeRank: user.administrativeRank,
            },
            user_files: req.body.user_files,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            promotion_type: req.body.promotion_type,
            current_phase_number: 1,
            process_level_number: 1,
            rejected: false,
            created_at: new Date()
        }

        try {
            const promotionRequest = new PromotionRequset(newPromotionRequest);
            const userData = await User.findById(user.id)
            await promotionRequest.save();

            userData.promotionRequest = promotionRequest;
            await userData.save();

            res.json({
                success: true,
                result: promotionRequest,
                message: "تم انشاء طلب الترقية بنجاح"
            })
        }
        catch (err) {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            });
            console.log(err);
        }
    }
});

// update promotion request
router.put("/promotionRequests/:id", async (req, res) => {

    // const { valid, errors } = validateUpdatePromotionRequestInput(req.body.user_files);

    // if (!valid) {
    //     res.json({
    //         success: false,
    //         errors: errors
    //     })
    //     return
    // }
    try {

        const user = checkAuth(req, res);
        const promotionRequest = await PromotionRequset.findOne({ _id: req.params.id });

        if (promotionRequest && promotionRequest.current_phase_number === 0) {
            if (user.id === promotionRequest.created_by.id) {
                const updatedPromotionRequest = {
                    user_files: req.body.user_files,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    rejectionReasons: [],
                    rejected: false,
                    current_phase_number: promotionRequest.current_phase_number + 1,
                    updated_at: new Date()

                    // current_phase_number: promotionRequest.current_phase_number === 0 ?
                    //     promotionRequest.current_phase_number + 1
                    //     :
                    //     promotionRequest.current_phase_number
                }
                await PromotionRequset.findByIdAndUpdate(req.params.id, updatedPromotionRequest);
                res.json({
                    success: true,
                    message: "تم تعديل طلبك بنجاح"
                });
            }
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            })
            throw new Error("Promotion request not found")
        }
    }
    catch (err) {
        console.log(err);
    }
});


// add files to promotion request from administrative
router.put("/promotionRequests/administrative/:id", async (req, res) => {
    try {

        const user = checkAuth(req, res);
        const promotionRequest = await PromotionRequset.findOne({ _id: req.params.id });

        if (promotionRequest) {
            if (user.administrativeRank === promotionRequest.current_phase_number) {
                const updatedPromotionRequest = {
                    administrative_files: req.body.administrative_files,
                }
                await PromotionRequset.findByIdAndUpdate(req.params.id, updatedPromotionRequest);
                res.json({
                    success: true,
                    message: "Promotion Request Updated Successfully"
                });
            }
        } else {
            res.json({
                success: false,
                message: "Promotion request not found"
            })
            throw new Error("Promotion request not found")
        }
    }
    catch (err) {
        console.log(err);
    }
});

// delete promotion request
router.delete("/promotionRequests/:id", async (req, res) => {

    try {

        const user = checkAuth(req, res);
        const promotionRequest = await PromotionRequset.findOne({ _id: req.params.id });

        if (promotionRequest) {
            if (user.id === promotionRequest.created_by.id) {
                await PromotionRequset.findByIdAndDelete(req.params.id);
                res.json({
                    message: "تم حذف طلبك بنجاح",
                    success: true
                });
            }
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            })
            throw new Error("Promotion request not found")
        }
    } catch (err) {
        console.log(err);
    }
});

// approve promotion request
router.put("/promotionRequests/:id/approve", async (req, res) => {

    try {

        const user = checkAuth(req, res);
        const promotionRequest = await PromotionRequset.findOne({ _id: req.params.id });

        if (promotionRequest) {
            if (user && user.administrativeRank > 0) {
                const updatedPromotionRequest = {
                    current_phase_number: promotionRequest.current_phase_number + 1,
                    rejected: false,
                    rejectionReasons: [],
                    updated_at: new Date()
                }

                await PromotionRequset.findByIdAndUpdate(req.params.id, updatedPromotionRequest);
                res.json({
                    success: true,
                    message: "تمت العملية بنجاح"
                });
            }
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            });
            throw new Error("Promotion request not found")
        }
    }
    catch (err) {
        console.log(err);
    }
});

// reject promotion request
router.put("/promotionRequests/:id/rejection", async (req, res) => {

    try {

        const user = checkAuth(req, res);
        const promotionRequest = await PromotionRequset.findOne({ _id: req.params.id });

        if (promotionRequest) {
            if (user && user.administrativeRank > 0) {
                const updatedPromotionRequest = {
                    current_phase_number: promotionRequest.current_phase_number > 0 ?
                        promotionRequest.current_phase_number - 1
                        :
                        promotionRequest.current_phase_number,
                    rejectionReasons: req.body.rejectionReasons,
                    rejected: true,
                    updated_at: new Date()
                }
                await PromotionRequset.findByIdAndUpdate(req.params.id, updatedPromotionRequest);
                res.json({
                    success: true,
                    message: "تمت العملية بنجاح"
                });
            }
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            });
            throw new Error("Promotion request not found")
        }
    }
    catch (err) {
        console.log(err)
    }
});

// process 2
router.put("/promotionRequests/:id/process_2", async (req, res) => {

    try {

        const user = checkAuth(req, res);
        const promotionRequest = await PromotionRequset.findOne({ _id: req.params.id });

        if (promotionRequest) {
            if (user && user.administrativeRank > 0) {
                const updatedPromotionRequest = {
                    current_phase_number: promotionRequest.current_phase_number > 0 ?
                        promotionRequest.current_phase_number - 1
                        :
                        promotionRequest.current_phase_number,
                    updated_at: new Date()
                }
                await PromotionRequset.findByIdAndUpdate(req.params.id, updatedPromotionRequest);
                res.json({
                    success: true,
                    message: "تمت العملية بنجاح"
                });
            }
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            });
            throw new Error("Promotion request not found")
        }
    }
    catch (err) {
        console.log(err)
    }
});

// sync function main() {

//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "yazan1abuali@gmail.com",
//             pass: "naruto154ali",
//         },
//     });

//     let info = await transporter.sendMail({
//         from: 'yazan1abuali@gmail.com',
//         to: "yazanabuali2000@gmail.com",
//         subject: "Hello ✔",
//         text: "Hello world?",
//         html: "<b>Hello world???</b>",
//         attachments: [
//             {
//                 filename: 'test.pdf',
//                 path: 'https://cdn.filestackcontent.com/HG2bguhQkWEuc2jxFELw'
//             },
//         ]
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

// send research file by email
router.post("/send-email", async (req, res) => {

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "yazan1abuali@gmail.com",
                pass: "naruto154ali",
            },
        });

        let info = await transporter.sendMail({
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.body,
            attachments: [
                ...req.body.attachments
            ]
        });
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;
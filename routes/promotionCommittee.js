const express = require('express');
const router = express.Router();
const PromotionCommittee = require("../models/promotionCommittee");
const User = require("../models/user");
const checkAuth = require("../util/checkAuth");

// get all promotions committee
router.get("/promotionCommittee", async (req, res) => {

    try {
        const allPromotionCommittee = await PromotionCommittee.find({});
        if (allPromotionCommittee) {
            res.json({
                success: true,
                result: allPromotionCommittee
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

// get specific promotions committee
router.get("/promotionCommittee/:id", async (req, res) => {

    try {
        const promotionCommittee = await PromotionCommittee.findOne({ promotion_request_id: req.params.id }).
            populate("promotion_request")

        if (promotionCommittee) {
            res.json({
                success: true,
                result: promotionCommittee
            });
        } else {
            res.json({
                success: false,
                message: "Promotion committee not found"
            })
            throw new Error("An error occurred")
        }
    }
    catch (err) {
        console.log(err);
    }
});

// get promotions for specific member
router.get("/promotionCommittee/promotionRequests/:member_id", async (req, res) => {
    try {
        const promotionRequests = await PromotionCommittee.find({
            'members._id': req.params.member_id
        }).populate("promotion_request")

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

    } catch (err) {
        console.log(err)
    }
});


// create new promotion committee
router.post("/promotionCommittee", async (req, res) => {

    const user = checkAuth(req, res);

    if (user) {
        const newPromotionCommittee = {
            members: req.body.members,
            promotion_request_id: req.body.promotion_request._id,
            promotion_request: req.body.promotion_request
        }

        try {
            const promotionCommittee = new PromotionCommittee(newPromotionCommittee)
            // promotionCommittee.promotion_requests.push(req.body.promotionRequest)
            await promotionCommittee.save()

            res.json({
                success: true,
                result: promotionCommittee,
                message: "تم إرسال الطلب إلى اللجنة بنجاح"
            })

        } catch (err) {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            });
            console.log(err)
        }
    }
})

// update promotion committee
router.put("/promotionCommittee/:id", async (req, res) => {

    try {
        const user = checkAuth(req, res);
        const promotionCommittee = await PromotionCommittee.findOne({ _id: req.params.id });

        if (user && promotionCommittee) {
            const updatedPromotionCommittee = {
                members: req.body.members,
            }
            await PromotionCommittee.findByIdAndUpdate(req.params.id, updatedPromotionCommittee);
            res.json({
                success: true,
                message: "تم تعديل اللجنة بنجاح"
            });
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            })
            throw new Error("Promotion committee not found")
        }
    } catch (err) {
        console.log(err);
    }
})

// send promtion request to pre-existing committee
router.put("/promotionCommittee/:id/add", async (req, res) => {

    try {
        const user = checkAuth(req, res);
        const promotionCommittee = await PromotionCommittee.findOne({ _id: req.params.id });

        if (user && promotionCommittee) {
            promotionCommittee.promotion_requests.push(req.body.promotionRequest)
            await promotionCommittee.save()

            res.json({
                success: true,
                message: "تم إرسال الطلب إلى اللجنة بنجاح"
            });
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            })
            throw new Error("Promotion committee not found")
        }
    } catch (err) {
        console.log(err);
    }
})

// delete promotion committee
router.delete("/promotionCommittee/:id", async (req, res) => {
    try {

        const user = checkAuth(req, res);
        const promotionCommittee = await PromotionCommittee.findOne({ _id: req.params.id });

        if (promotionCommittee) {
            await PromotionCommittee.findByIdAndDelete(req.params.id);
            res.json({
                message: "تم حذف اللجنة بنجاح",
                success: true
            });
        } else {
            res.json({
                success: false,
                message: "حدث خطأ ما"
            })
            throw new Error("Promotion committee not found")
        }
    } catch (err) {
        console.log(err);
    }
})

// get teachers for specific section or specific college
router.get("/teachers/:college", async (req, res) => {

    try {

        const teachers = await User.find({ college: req.params.college }).populate("promotionRequest")
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


// approve promotion request
router.put("/promotionCommittee/:id/approve", async (req, res) => {

    try {

        const user = checkAuth(req, res);
        const promotionCommittee = await PromotionCommittee.findOne({ _id: req.params.id });

        if (promotionCommittee) {
            // if (user && user.administrativeRank > 0) {
            const updatedMembers = promotionCommittee.members.map(member => {
                if (member._id === user.id) {
                    return { ...member, memberDecision: "approved", rejectionReasons: [] }
                } else {
                    return member
                }
            })

            promotionCommittee.members = updatedMembers
            promotionCommittee.save();

            res.json({
                success: true,
                message: "تمت العملية بنجاح"
            });
            //     }
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

// approve promotion request
router.put("/promotionCommittee/:id/rejection", async (req, res) => {

    try {

        const user = checkAuth(req, res);
        const promotionCommittee = await PromotionCommittee.findOne({ _id: req.params.id });

        if (promotionCommittee) {
            // if (user && user.administrativeRank > 0) {
            const updatedMembers = promotionCommittee.members.map(member => {
                if (member._id === user.id) {
                    return {
                        ...member,
                        memberDecision: "rejected",
                        rejectionReasons: req.body.rejectionReasons
                    }
                } else {
                    return member
                }
            })

            promotionCommittee.members = updatedMembers
            promotionCommittee.save();

            res.json({
                success: true,
                message: "تمت العملية بنجاح"
            });
            //     }
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

module.exports = router;
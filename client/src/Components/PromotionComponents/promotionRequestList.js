// import React, { useState, useEffect } from 'react';
// import PromotionRequest from './promotionRequest';
// import PromotionRequestCreateForm from './promotionRequestCreateForm';
// import PromotionRequestEditForm from './promotionRequestEditForm';
// import axios from 'axios';
// import { Button } from 'semantic-ui-react';
// import { Label } from 'semantic-ui-react'
// import Snackbar from '../snackbar';

// function PromotionRequestList({ promotionRequest, user }) {

//     const [promotionRequestList, setPromotionRequestList] = useState([]);
//     const [showCreateForm, setShowCreateForm] = useState(false);
//     const [erorr, setErorr] = useState(null);
//     const [alert, setAlert] = useState({});
//     const [showSnackbar, setShowSnackbar] = useState(false);

//     useEffect(() => {
//         // if (promotionRequest) {
//         // setPromotionRequestList([promotionRequest])
//         if (user) {
//             // axios.get(`/promotionRequests/${user.id}`).
//             axios.get(`http://localhost:5000/promotionRequests/${user.id}`).
//                 then(res => {
//                     if (res.data.success) {
//                         setPromotionRequestList([res.data.result])
//                     }
//                 })
//         }
//         // } else {
//         //     axios.get(`http://localhost:5000/promotionRequests/${user.college}/${user.section}/${user.administrativeRank}`).
//         //         then(res => {
//         //             setPromotionRequestList(res.data.result)
//         //         })
//         // }
//     }, []);

//     const handleShowCreateForm = () => {
//         const timestamp = new Date().getTime() - (1825 * 24 * 60 * 60 * 1000)

//         if (Date.parse(user.year) > timestamp && user.promotion_points < 8) {
//             setErorr("عدد سنوات الخبرة و عدد نقاط الترقية غير كافين")
//         } else if (Date.parse(user.year) > timestamp) {
//             setErorr("أنت لا تمتلك عدد سنوات خبرة كافية")
//         }
//         else if (timestamp && user.promotion_points < 8) {
//             setErorr("أنت لا تمتلك عدد نقاط ترقية كافية")
//         }
//         else {
//             setShowCreateForm(prevState => !prevState);
//         }
//     }

//     const closeSnackbar = () => {
//         setShowSnackbar(false);
//     }

//     const handleAlert = (alert) => {
//         setAlert(alert)
//         setShowSnackbar(true);
//     }

//     const handleCreatePromotionRequest = (newPromotionRequest) => {
//         setPromotionRequestList([...promotionRequestList, newPromotionRequest]);
//     }

//     const handleUpdatePromotionRequest = (id, updatedPromotionRequest) => {
//         const updatedPromotionRequestList = promotionRequestList.map(promotionRequest => {
//             if (promotionRequest._id === id) {
//                 return updatedPromotionRequest
//             }
//             else {
//                 return promotionRequest
//             }
//         })
//         setPromotionRequestList(updatedPromotionRequestList);
//     }

//     const handleDeletePromotionRequest = (id) => {
//         const updatedPromotionRequestList = promotionRequestList.filter(promotionRequest => {
//             if (promotionRequest._id !== id) {
//                 return promotionRequest
//             }
//         })
//         setPromotionRequestList(updatedPromotionRequestList);
//     }

//     return (
//         <div className="promotion-request-root">
//             {
//                 promotionRequestList.length > 0 ? (
//                     promotionRequestList.map(promotionRequest => (
//                         <PromotionRequest
//                             key={promotionRequest._id}
//                             promotionRequest={promotionRequest}
//                             handleUpdatePromotionRequest={handleUpdatePromotionRequest}
//                             handleDeletePromotionRequest={handleDeletePromotionRequest}
//                             handleAlert={handleAlert}
//                             user={user}
//                         />
//                     ))
//                 ) :

//                     showCreateForm ? (
//                         <PromotionRequestCreateForm
//                             user={user}
//                             handleCreatePromotionRequest={handleCreatePromotionRequest}
//                             handleShowCreateForm={handleShowCreateForm}
//                             handleAlert={handleAlert}
//                         />
//                     ) : (
//                         <div>
//                             <p style={{ color: "#fff", fontSize: "1.5rem" }}>لإنشاء طلب ترقية يجب أن تكون عدد سنوات الخدمة 5 سنوات على الأقل و عدد نقاط ترقية 8 على الأقل</p>
//                             <div style={{}}>
//                                 <div>
//                                     <Button style={{ backgroundColor: "#fff", color: "#1FBDC7" }} primary onClick={handleShowCreateForm}>
//                                         إنشاء طلب ترقية
//                                     </Button>
//                                 </div>
//                                 {
//                                     erorr && <div>
//                                         <Label basic color='red' pointing>
//                                             {erorr}
//                                         </Label>
//                                     </div>
//                                 }
//                             </div>
//                             {/* <Button style={{ backgroundColor: "#fff", color: "#1FBDC7" }} primary onClick={handleShowCreateForm}>
//                                 إنشاء طلب ترقية
//                             </Button> */}
//                         </div>
//                     )
//             }
//             {/* <PromotionRequest
//                 promotionRequest={promotionRequest}
//                 handleUpdatePromotionRequest={handleUpdatePromotionRequest}
//                 handleDeletePromotionRequest={handleDeletePromotionRequest}
//             /> */}
//             {
//                 showSnackbar && (
//                     <Snackbar
//                         message={alert.message}
//                         type={alert.type}
//                         direction={"bottom"}
//                         duration={5000}
//                         closeSnackbar={closeSnackbar}
//                     />
//                 )
//             }
//         </div >
//     )
// }

// export default PromotionRequestList;


import React, { useState, useEffect } from 'react';
import PromotionRequest from './promotionRequest';
import PromotionRequestCreateForm from './promotionRequestCreateForm';
import PromotionRequestEditForm from './promotionRequestEditForm';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Label } from 'semantic-ui-react'
import Snackbar from '../snackbar';
// import { Document, Page } from 'react-pdf';

function PromotionRequestList({ user }) {

    const [promotionRequest, setPromotionRequest] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [erorr, setErorr] = useState(null);
    const [alert, setAlert] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [promotionType, setPromotionType] = useState("");

    useEffect(() => {
        // if (promotionRequest) {
        // setPromotionRequestList([promotionRequest])
        if (user) {
            axios.get(`/promotionRequests/${user.id}`).
                // axios.get(`http://localhost:5000/promotionRequests/${user.id}`).
                then(res => {
                    if (res.data.success) {
                        setPromotionRequest(res.data.result)
                    }
                })
        }
        // } else {
        //     axios.get(`http://localhost:5000/promotionRequests/${user.college}/${user.section}/${user.administrativeRank}`).
        //         then(res => {
        //             setPromotionRequestList(res.data.result)
        //         })
        // }
    }, []);


    const handleShowCreateForm = (promotionType) => {
        setShowCreateForm(prevState => !prevState);
        setPromotionType(promotionType)
    }

    const closeSnackbar = () => {
        setShowSnackbar(false);
    }

    const handleAlert = (alert) => {
        setAlert(alert)
        setShowSnackbar(true);
    }

    const handleCreatePromotionRequest = (newPromotionRequest) => {
        setPromotionRequest(newPromotionRequest);
    }

    const handleUpdatePromotionRequest = (id, updatedPromotionRequest) => {
        setPromotionRequest(updatedPromotionRequest);
    }

    const handleDeletePromotionRequest = (id) => {
        setPromotionRequest(null);
    }

    return (
        <div className="promotion-request-root">
            {
                promotionRequest ? (
                    <PromotionRequest
                        key={promotionRequest._id}
                        promotionRequest={promotionRequest}
                        handleUpdatePromotionRequest={handleUpdatePromotionRequest}
                        handleDeletePromotionRequest={handleDeletePromotionRequest}
                        handleAlert={handleAlert}
                        user={user}
                    />
                ) :

                    showCreateForm ? (
                        <PromotionRequestCreateForm
                            user={user}
                            handleCreatePromotionRequest={handleCreatePromotionRequest}
                            handleShowCreateForm={handleShowCreateForm}
                            handleAlert={handleAlert}
                            promotionType={promotionType}
                        />
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>

                                {/* <PDFViewer
                                    document={{
                                        url: "https://cdn.filestackcontent.com/DBbljZ4MSCWa8H8g4OI3",
                                    }}
                                /> */}
                                <Button style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}>
                                    <a
                                        style={{ color: "#1FBDC7" }}
                                        download
                                        href="https://cdn.filestackcontent.com/DBbljZ4MSCWa8H8g4OI3">
                                        <i style={{ marginRight: 10 }} className="fas fa-book"></i> الشروط العامة للترقية</a>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}
                                    primary
                                    onClick={() => handleShowCreateForm("تثبيت أستاذ مساعد")}>
                                    إنشاء طلب تثبيت أستاذ مساعد
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}
                                    primary
                                    onClick={() => handleShowCreateForm("ترقية أستاذ مشارك")}>
                                    إنشاء طلب ترقية أستاذ مشارك
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}
                                    primary
                                    onClick={() => handleShowCreateForm("ترقية أستاذ جامعي")}>
                                    إنشاء طلب ترقية أستاذ جامعي
                                </Button>
                            </div>
                            {/* <Button style={{ backgroundColor: "#fff", color: "#1FBDC7" }} primary onClick={handleShowCreateForm}>
                                إنشاء طلب ترقية
                            </Button> */}
                        </div>
                    )
            }
            {/* <PromotionRequest
                promotionRequest={promotionRequest}
                handleUpdatePromotionRequest={handleUpdatePromotionRequest}
                handleDeletePromotionRequest={handleDeletePromotionRequest}
            /> */}
            {
                showSnackbar && (
                    <Snackbar
                        message={alert.message}
                        type={alert.type}
                        direction={"bottom"}
                        duration={5000}
                        closeSnackbar={closeSnackbar}
                    />
                )
            }
        </div >
    )
}

export default PromotionRequestList;
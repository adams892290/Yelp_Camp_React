import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCampgroundDetails, deleteCampground, addReview, editReview, deleteReview } from "../functions/functions";
import Header from "./Header";
import { Link, Redirect } from "react-router-dom";

const CampgroundDetails = () => {

    const { id } = useParams();

    const [campground, setCampground] = useState({});
    const [reviews, setReviews] = useState([]);
    const [imagesJSX, setImagesJSX] = useState([]);
    const [newReview, setNewReview] = useState({ review: "", rating: 1 });
    const [redirectCampground, setRedirectCampground] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [userId, setUserId] = useState("");




    useEffect(() => {

        const token = localStorage.getItem("token");
        getCampgroundDetails(id, token)
            .then((res) => {
                if (res.data.user_id === null) {
                    localStorage.clear();
                } else {
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    setUserId(res.data.user_id);
                }
                setCampground(res.data.foundCampground);
                setReviews(res.data.foundReviews);
                setImagesJSX(res.data.foundCampground.image.map((ele, index) => {
                    if (index === 0) {
                        return (<div className="carousel-item active">
                            <img src={ele} className="d-block w-100 my-carasoul-image" alt="..." />
                        </div>);
                    } else {
                        return (<div className="carousel-item my-carasoul-image">
                            <img src={ele} className="d-block w-100" alt="..." />
                        </div>);
                    }
                }));
                document.getElementById("first-rate1").setAttribute("checked", "true");
                document.getElementById("alert-success").style.display = "none";
                document.getElementById("alert-danger").style.display = "none";
            })
            .catch((err) => {
                console.log("Errorrrr", err);
            });



        document.getElementById("editReview").style.display = "none";
    }, []);



    const handleDeleteCampgroundClick = (e) => {
        const token = localStorage.getItem("token");
        deleteCampground(e.target.value, token)
            .then((res) => {
                if (res.data.message) {
                } else {
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    setRedirectCampground(true);
                }
            })
            .catch((err) => {
                console.log("Errorrrr", err);
            });
    }

    const handleChange = (e) => {
        if (e.target.name === "rating") {
            setNewReview({ rating: e.target.value, review: newReview.review });
            document.getElementById(`first-rate${e.target.value}`).setAttribute("checked", "true");
        } else if (e.target.name === "review") {
            setNewReview({ review: e.target.value, rating: newReview.rating });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleNewReviewClick = () => {
        if (newReview.rating > 0 && newReview.review.length > 0) {
            const token = localStorage.getItem("token");
            addReview(id, newReview, token)
                .then((res) => {
                    if (res.data.message) {
                        document.getElementById("alert-danger").style.display = "block";
                        document.getElementById("danger-message").innerText = "Login to post a review!";
                        closeAlert();
                    } else {
                        localStorage.clear();
                        localStorage.setItem("token", res.data.token);
                        setNewReview({});
                        setReviews(reviews.concat(res.data.newReview));
                        document.getElementById("review").value = "";
                        document.getElementById("alert-success").style.display = "block";
                        document.getElementById("success-message").innerText = "Review posted!";
                        closeAlert();
                    }
                })
                .catch((err) => {
                    console.log("Erorrr", err);
                });
        }

    }

    const handleEditReviewClick = (e) => {
        const pendingReview = reviews.filter((ele) => {
            if (ele._id === e.target.value)
                return true;
            else
                return false;
        });
        setNewReview(pendingReview[0]);
        document.getElementById("editReview").value = e.target.value;
        document.getElementById("editReview").style.display = "block";
        document.getElementById("addReview").style.display = "none";
    }

    const handleSaveEditedReviewClick = (e) => {
        const token = localStorage.getItem("token");
        editReview(e.target.value, newReview, token)
            .then((res) => {
                if (res.data.message) {
                    document.getElementById("rating").value = "";
                    document.getElementById("review").value = "";
                    document.getElementById("alert-danger").style.display = "block";
                    document.getElementById("danger-message").innerText = "Login to edit the review!";
                    closeAlert();
                } else {
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    setNewReview({});
                    document.getElementById("rating").value = "";
                    document.getElementById("review").value = "";

                    setReviews(reviews.map((ele) => {
                        if (ele._id === e.target.value) {
                            ele.rating = res.data.updatedReview.rating;
                            ele.review = res.data.updatedReview.review;
                            return ele;
                        } else
                            return ele;
                    }));
                    document.getElementById("alert-success").style.display = "block";
                    document.getElementById("success-message").innerText = "Review edited!";
                    closeAlert();
                }
            })
            .catch((err) => {
                console.log("Erorrrr", err);
            });
        document.getElementById("editReview").style.display = "none";
        document.getElementById("addReview").style.display = "block";
    }

    const handleDeleteReviewClick = (e) => {
        const token = localStorage.getItem("token");
        deleteReview(id, e.target.value, token)
            .then((res) => {
                if (res.data.message) {
                    togglePopup();
                } else {
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    setReviews(reviews.filter((ele) => {
                        if (ele._id !== e.target.value) {
                            return true;
                        } else
                            return false;
                    }));
                }

            })
            .catch((err) => {
                console.log("Erorrr", err);
            });
    }

    const reRender = () => {
        setUserId("");
    }

    const closeAlert = () => {
        setTimeout(() => {
            document.getElementById("alert-danger").style.display = "none";
            document.getElementById("alert-success").style.display = "none";
        }, 5000);
    }


    return (
        <div>
            <Header user_id={userId} reRender={reRender} />
            <div className="row my-3">
                {(redirectCampground) ? <Redirect to="/campground" /> : null}
                {(redirectLogin) ? <Redirect to="/login" /> : null}
                <div className="col-4 offset-2">
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" id="alert-danger">
                        <span id="danger-message"></span>
                    </div>
                    <div className="alert alert-success alert-dismissible fade show" role="alert" id="alert-success">
                        <span id="success-message"></span>
                    </div>
                    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">

                            {imagesJSX}

                        </div>
                    </div>
                    <div className="my-card" styles="width: 18rem;">

                        <div className="my-card-body mx-2">
                            <h5 className="my-card-title">{campground.title}</h5>
                            <p>{campground.location}</p>
                            <p className="my-card-text">{campground.description}</p>
                            {(userId === campground.author) ? (
                                <div>
                                    <Link exact to={`/campground/edit/${campground._id}`} className="btn my-card-btn">Edit</Link>
                                    <button className="btn my-card-btn-danger" onClick={handleDeleteCampgroundClick} value={campground._id}>Delete</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="col-4">


                    <h3 className="my-card-body">Add a Review</h3>
                    <form onSubmit={handleSubmit} id="review-form">
                        <fieldset className="starability-grow" onChange={handleChange}>

                            <input type="radio" id="no-rate" className="input-no-rate" name="rating" value="0"
                                aria-label="No rating." />
                            <input type="radio" id="first-rate1" name="rating" value="1" />
                            <label htmlFor="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name="rating" value="2" />
                            <label htmlFor="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name="rating" value="3" />
                            <label htmlFor="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name="rating" value="4" />
                            <label htmlFor="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name="rating" value="5" />
                            <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                        <label htmlFor="review" className="form-label">Review</label>
                        <textarea row="10" cols="30" required value={newReview.review} onChange={handleChange} name="review" type="text" id="review" className="form-control" placeholder="review" required></textarea>
                        <button className="btn my-card-btn-success my-2" id="addReview" onClick={handleNewReviewClick}>Submit</button>
                        <button className="btn my-card-btn-info my-2" id="editReview" onClick={handleSaveEditedReviewClick}>Save</button>
                    </form>

                    <div className="scroll">
                        {reviews.map((ele) => {
                            return (
                                <div className="mt-3 mx-2" styles="width: 18rem;" key={ele._id}>

                                    <div>
                                        <p className="my-card-body">{`Username:${ele.author.username}`}</p>
                                        <p className="starability-result" data-rating={ele.rating}>
                                            {`Rating:${ele.rating}`}
                                        </p>

                                        <p className="my-card-body">{`Review:${ele.review}`}</p>
                                    </div>
                                    {(userId === ele.author._id) ? (
                                        <div>
                                            <button className="btn my-card-btn mx-1" onClick={handleEditReviewClick} value={ele._id}>Edit</button>
                                            <button className="btn my-card-btn-danger mx-1" onClick={handleDeleteReviewClick} value={ele._id}>Delete</button>
                                        </div>
                                    ) : null}


                                </div>

                            );
                        })}
                    </div>


                </div>


            </div>
        </div>

    );
}

export default CampgroundDetails;
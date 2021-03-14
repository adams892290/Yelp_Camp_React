import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getEditableCampgroundDetails, updateCampground } from "../functions/functions";
import Header from "./Header";
import { Redirect, useHistory } from "react-router-dom";

const EditCampground = () => {

    const { id } = useParams();
    const [campground, setCampground] = useState({});
    const [redirectCampground, setRedirectCampground] = useState(false);
    const [userId, setUserId] = useState("");
    const [contentRender, setContentRender] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");
        getEditableCampgroundDetails(id, token)
            .then((res) => {
                if (res.data.message) {
                    redirectUser();
                } else {
                    setContentRender(true);
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    setUserId(res.data.user_id);
                    setCampground(res.data.foundCampground);
                }
            })
            .catch((err) => {
                console.log("Errorrrr", err);
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "title") {
            setCampground({ _id: campground._id, title: e.target.value, location: campground.location, description: campground.description });
        } else if (e.target.name === "location") {
            setCampground({ _id: campground._id, title: campground.title, location: e.target.value, description: campground.description });

        } else if (e.target.name === "description") {
            setCampground({ _id: campground._id, title: campground.title, location: campground.location, description: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (campground.title.length > 0 && campground.description.length > 0 && campground.location.length > 0) {
            const token = localStorage.getItem("token");
            updateCampground(campground, token)
                .then((res) => {
                    if (res.data.message) {
                        redirectUser();

                    } else {
                        localStorage.clear();
                        localStorage.setItem("token", res.data.token);
                        redirectUser();
                    }
                })
                .catch((err) => {
                    console.log("Errorrr", err);
                });
        }



    }

    const reRender = () => {
        setUserId("");
    }

    const redirectUser = () => {
        setTimeout(() => {
            history.goBack();
        }, 5000);
    }

    return (
        <div>
            <Header user_id={userId} reRender={reRender} />
            {(redirectCampground) ? <Redirect to={`/campground/${id}`} /> : null}
            {(contentRender) ? (
                <div className="row">
                    <div className="col-6 offset-3">
                        <form onSubmit={handleSubmit}>
                            <label className="form-label" htmlFor="title" >Title</label>
                            <input className="form-control" required value={campground.title} type="text" name="title" id="title" onChange={handleChange} placeholder="title"></input>
                            <label className="form-label" htmlFor="location">Location</label>
                            <input className="form-control" required value={campground.location} type="text" name="location" id="location" onChange={handleChange} placeholder="location"></input>
                            <label className="form-label" htmlFor="description">Description</label>
                            <input className="form-control" required value={campground.description} type="text" name="description" id="description" onChange={handleChange} placeholder="description"></input>
                            <button className="btn my-card-btn-success mt-3 mx-2">Submit</button>
                        </form>
                    </div>

                </div>
            ) : (
                <div className="row">
                    <div className="col-6 offset-3 d-flex flex-column align-items-center mt-5">
                        <div className="loader"></div>

                        <span className="my-card-body">Access denied! :(, You will be redirected back in 5 seconds</span>

                    </div>

                </div>
            )}
        </div>

    );
}

export default EditCampground;
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { addCampground, verifyToken } from "../functions/functions";
import { Redirect, useHistory } from "react-router-dom";

const NewCampground = () => {

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);
    const [redirectAllCampground, setRedirectAllCampground] = useState(false);
    const [userId, setUserId] = useState("");
    const [contentRender, setContentRender] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");
        verifyToken(token)
            .then((res) => {
                if (res.data.message) {
                    localStorage.clear();
                    redirectUser();
                } else {
                    setContentRender(true);
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    setUserId(res.data.user_id);
                    document.getElementById("alert-info").style.display = "none";

                }
            })
            .catch((err) => {
                console.log("Errorr", err);
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "location") {
            setLocation(e.target.value);
        } else if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "description") {
            setDescription(e.target.value);
        } else if (e.target.name === "image") {
            setImage(e.target.files);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (title.length > 0 && description.length > 0 && location.length > 0 && image.length > 0) {
            document.getElementById("alert-info").style.display = "block";
            document.getElementById("alert-info").innerText = "Please wait while your campground is being created :)";
            addCampground({ title, location, description, image }, token)
                .then((res) => {
                    document.getElementById("alert-info").style.display = "none";

                    if (res.data.message) {
                        setContentRender(false);
                        setUserId("");
                        localStorage.clear();
                        redirectUser();
                    } else {
                        localStorage.clear();
                        localStorage.setItem("token", res.data.token);
                        setRedirectAllCampground(true);
                    }
                })
                .catch((err) => {
                    console.log("Errorrrr", err);
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
            {(redirectAllCampground) ? <Redirect to="/campground" /> : null}
            {(contentRender) ? (
                <div className="row">
                    <Header user_id={userId} reRender={reRender} />
                    <div className="col-6 offset-3">
                        <div className="alert alert-info alert-dismissible fade show" role="alert" id="alert-info">
                            <span id="info-message"></span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" name="title" id="title" className="form-control" onChange={handleChange} placeholder="title" required></input>
                            <label htmlFor="location" className="form-label">Location</label>
                            <input type="text" name="location" id="location" className="form-control" onChange={handleChange} placeholder="location" required></input>
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" name="description" id="description" className="form-control" onChange={handleChange} placeholder="description" required></input>
                            <label htmlFor="image" className="form-label">Image</label>
                            <input multiple type="file" name="image" id="image" className="form-control" onChange={handleChange} placeholder="image" required></input>
                            <button className="btn my-card-btn-success mt-3 mx-2">Submit</button>
                        </form>

                    </div>

                </div>
            ) : (
                <div className="row">
                    <div className="col-6 offset-3 d-flex flex-column align-items-center mt-5">
                        <div className="loader"></div>
                        <span className="my-card-body">Access Denied :(, You will be redirected back in 5 seconds</span>

                    </div>

                </div>)}



        </div>
    );

}

export default NewCampground;
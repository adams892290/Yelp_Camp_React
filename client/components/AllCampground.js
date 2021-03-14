import React, { useState, useEffect } from "react";
import Header from "./Header";
import { getAllCampground } from "../functions/functions";
import { Link } from "react-router-dom";

const Campground = (props) => {

    const { title, location, _id, image } = props.campground;
    return (

        <div className="my-card mb-3" styles="max-width: 540px;">
            <div className="row">
                <div className="col-md-4">
                    <img src={image[0]} alt="..." className="my-card-quick-image" />
                </div>
                <div className="col-md-8">
                    <div className="mx-2 my-card-body">
                        <h5 className="mx-2 ">{title}</h5>
                        <p className="mx-2">{location}</p>
                    </div>
                    <Link className="btn mx-3 my-card-btn" exact to={`/campground/${_id}`}>View</Link>
                </div>
            </div>
        </div>

    );
}

const AllCampgrounds = () => {

    const [allCampground, setCampground] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        getAllCampground(token)
            .then((res) => {
                if (res.data.user_id === null) {
                    localStorage.clear();
                } else {
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    setUserId(res.data.user_id);
                }
                setCampground(res.data.allCampgrounds);
            })
            .catch((err) => {
                console.log("Errorrrr", err);
            });

    }, []);

    const reRender = () => {
        setUserId("");
    }

    return (
        <div>
            <Header user_id={userId} reRender={reRender} />
            {(allCampground.length > 0) ? null : (<h4 className="my-card-body d-flex flex-column align-items-center mt-5 pt-5">
                No campgrounds to show yet.
            </h4>)}
            {allCampground.map((ele) => {
                return (
                    <div className="row" key={ele._id}>
                        <div className="col-6 offset-3">
                            <Campground campground={ele} />
                        </div>

                    </div>

                );
            })}


        </div>
    );
}



export default AllCampgrounds;
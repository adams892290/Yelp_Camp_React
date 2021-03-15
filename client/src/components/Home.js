import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { verifyToken } from "../functions/functions";

const Home = () => {

    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        verifyToken(token)
            .then((res) => {
                (res.data.message) ? null : setUserId(res.data.user_id);
            })
            .catch((err) => {
                console.log("Errorr", err);
            });
    });

    const reRender = () => {
        setUserId("");
    }

    return (
        <div>
            <Header user_id={userId} reRender={reRender} />

            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <main className="px-3 text-center">
                    <h1>YelpCamp</h1>
                    <p className="lead"> Welcome to YelpCamp! <br /> Jump right in and explore our many campgrounds. <br />
                Feel free to share some of your own and comment on others!</p>
                    <Link to="/campground" className="btn btn-lg btn-secondary font-weight-bold border-white bg-white">View
                Campgrounds</Link>
                </main>
            </div>
        </div>
    );
}

export default Home;
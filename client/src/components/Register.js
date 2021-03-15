import React, { useState, useEffect } from "react";
import Header from "./Header";
import { registerUser, verifyToken } from "../functions/functions";
import { Redirect, useHistory } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [contentRender, setContentRender] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");
        verifyToken(token)
            .then((res) => {
                if (res.data.message) {
                    setContentRender(true);
                } else {
                    setUserId(res.data.user_id);
                    redirectUser();
                }
            })
            .catch((err) => {
                console.log("Errorrr", err);
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "username") {
            setUsername(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.length > 0 && username.length > 0 && password.length > 0) {
            registerUser(email, password, username)
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    setContentRender(false);
                    setRedirect(true);
                })
                .catch((err) => {
                    console.log("Erroorr", err);
                });
        }

    }

    const redirectUser = () => {
        setTimeout(() => {
            history.goBack();
        }, 3000);
    }

    return (
        <div>
            {(redirect) ? <Redirect to="/" /> : null}
            {(contentRender) ? (
                <div className="row">
                    <Header user_id={userId} />

                    <div className="col-6 offset-3">
                        <form onSubmit={handleSubmit}>
                            <label className="form-label" htmlFor="username">Username</label>
                            <input onChange={handleChange} id="username" name="username" className="form-control" type="text" placeholder="username" required></input>
                            <label className="form-label" htmlFor="email">Email</label>
                            <input onChange={handleChange} id="email" className="form-control" placeholder="email" type="email" name="email" required></input>
                            <label className="form-label" htmlFor="password">Password</label>
                            <input onChange={handleChange} id="password" name="password" className="form-control" type="password" placeholder="password" required></input>
                            <button className="btn my-card-btn-success mt-3 mx-2">Register</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-6 offset-3 d-flex flex-column align-items-center mt-5">
                        <div className="loader"></div>
                        <span className="my-card-body">You are logged in!.You will be redirected back in 3 seconds</span>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Register;
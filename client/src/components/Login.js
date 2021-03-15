import React, { useState, useEffect } from "react";
import Header from "./Header";
import { loginUser, verifyToken } from "../functions/functions";
import { useHistory, Redirect } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                    const alert = document.getElementById("alert");
                    alert.style.display = "none";

                } else {
                    redirectUser();
                }
            })
            .catch((err) => {
                console.log("Errrorrr", err);
            });
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.length > 0 && password.length > 0) {
            loginUser(email, password)
                .then((res) => {
                    if (res.data.message) {
                        const alert = document.getElementById("alert");
                        alert.style.display = "block";
                        const message = document.getElementById("danger-message");
                        message.innerText = res.data.message;
                    } else {
                        localStorage.setItem("token", res.data.token);
                        setUserId(res.data.user_id);
                        setRedirect(true);
                    }
                })
                .catch((err) => {
                    console.log("Errorrr", err);
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
                        <div className="alert alert-danger alert-dismissible fade show" role="alert" id="alert">
                            <span id="danger-message"></span>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label" htmlFor="email">Email</label>
                            <input required onChange={handleChange} id="email" className="form-control" placeholder="email" type="email" name="email"></input>
                            <label className="form-label" htmlFor="password">Password</label>
                            <input required onChange={handleChange} id="password" name="password" className="form-control" type="password" placeholder="password"></input>
                            <button className="btn my-card-btn-success mt-3 mx-2">Login</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-6 offset-3 d-flex flex-column align-items-center mt-5">
                        <div className="loader"></div>
                        <span className="my-card-body">Logged in!.You will be redirected back in 3 seconds</span>
                    </div>
                </div>
            )}


        </div>
    );
}

export default Login;
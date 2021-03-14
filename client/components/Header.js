import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    const { user_id, reRender } = props;
    const handleClick = (e) => {
        localStorage.clear();
        reRender();
    }

    return (
        <div>

            <header className="mb-auto">
                <div>
                    <h3 className="float-md-left p-4 d-inline my-card-body">YelpCamp</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-right">
                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/campground">Campgrounds</Link>
                        {(user_id === "") ? (
                            <div className="nav nav-masthead justify-content-center float-md-right">
                                <Link exact className="nav-link" to="/login">Login</Link>
                                <Link exact className="nav-link" to="/register">Register</Link>
                            </div>
                        ) : (
                            <div className="nav nav-masthead justify-content-center float-md-right">
                                <Link exact className="nav-link" to="/campground/new">Add Campground</Link>
                                <Link exact className="nav-link" onClick={handleClick} to="#">Logout</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
        </div >
    );
}

export default Header;
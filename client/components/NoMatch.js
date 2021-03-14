import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const NoMatch = () => {

    const history = useHistory();

    useEffect(() => {
        redirectUser();
    });

    const redirectUser = () => {
        setTimeout(() => {
            history.goBack();
        }, 3000);
    }


    return (
        <div className="row">
            <div className="col-6 offset-3 d-flex flex-column align-items-center mt-5">
                <div className="loader"></div>
                <h2 className="my-card-body">Oops! Error 404 :(</h2>
                <h3 className="my-card-body">No page found. You will be directed back in 3 seconds</h3>
            </div>
        </div>
    );
}

export default NoMatch;
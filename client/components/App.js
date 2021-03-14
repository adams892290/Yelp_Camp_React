import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import AllCampgrounds from "./AllCampground";
import NewCampground from "./NewCampground";
import CampgroundDetails from "./CampgroundDetails";
import EditCampground from "./EditCampground";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";


const App = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/campground">
                <AllCampgrounds />
            </Route>
            <Route exact path="/campground/new">
                <NewCampground />
            </Route>
            <Route exact path="/campground/:id">
                <CampgroundDetails />
            </Route>
            <Route exact path="/campground/edit/:id">
                <EditCampground />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route path="*">
                <NoMatch />
            </Route>


        </Switch>
    );
}

export default App;
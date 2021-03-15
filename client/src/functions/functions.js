import axios from "axios";

export const addCampground = async (campground, token) => {
    const data = new FormData();
    data.append("title", campground.title);
    data.append("location", campground.location);
    data.append("description", campground.description);

    for (let i = 0; i < campground.image.length; i++) {
        data.append("image", campground.image[i]);
    }
    const config = { headers: { authorization: token } };

    const res = await axios.post("http://localhost:8000/campground", data, config);
    return res;
}

export const getAllCampground = async (token) => {
    const config = { headers: { authorization: token } };
    const res = await axios.get("http://localhost:8000/campground", config);
    return res;
}

export const getCampgroundDetails = async (id, token) => {
    const config = { headers: { authorization: token } };
    const res = await axios.get(`http://localhost:8000/campground/${id}`, config);
    return res;
}

export const updateCampground = async (campground, token) => {
    const data = new FormData();
    data.append("title", campground.title);
    data.append("location", campground.location);
    data.append("description", campground.description);
    const config = { headers: { authorization: token } };
    const res = await axios.patch(`http://localhost:8000/campground/${campground._id}`, data, config);
    return res;
}

export const deleteCampground = async (id, token) => {
    const config = { headers: { authorization: token } };

    const res = await axios.delete(`http://localhost:8000/campground/${id}`, config);
    return res;
}

export const addReview = async (id, review, token) => {
    const data = new FormData();
    data.append("rating", review.rating);
    data.append("review", review.review);
    const config = { headers: { authorization: token } };

    const res = await axios.post(`http://localhost:8000/campground/${id}/review`, data, config);
    return res;
}

export const editReview = async (review_id, review, token) => {
    const data = new FormData();
    data.append("rating", review.rating);
    data.append("review", review.review);

    const config = { headers: { authorization: token } };
    const res = await axios.patch(`http://localhost:8000/campground/review/${review_id}`, data, config);
    return res;
}

export const deleteReview = async (camp_id, review_id, token) => {
    const config = { headers: { authorization: token } };
    const res = await axios.delete(`http://localhost:8000/campground/${camp_id}/review/${review_id}`, config);
    return res;
}

export const loginUser = async (email, password) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    const res = await axios.post("http://localhost:8000/login", data);
    return res;
}

export const registerUser = async (email, password, username) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    const res = await axios.post("http://localhost:8000/register", data);
    return res;
}

export const verifyToken = async (token) => {
    const config = { headers: { authorization: token } };
    const res = await axios.get("http://localhost:8000/verifytoken", config);
    return res;
}

export const getEditableCampgroundDetails = async (id, token) => {
    const config = { headers: { authorization: token } };
    const res = await axios.get(`http://localhost:8000/campground/edit/${id}`, config);
    return res;
}
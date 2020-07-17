import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* fetchGiphy() {
  try {
    const response = yield axios.get("/api/user/giphy");
    yield put({
      type: "SET_GIPHY",
      payload: response.data.data.images.downsized_large,
    });
    console.log("fetchGifs", response.data.data.images.downsized_large);
  } catch (error) {
    console.log("error gifs", error);
  }
}

function* fetchVideos() {
  try {
    const response = yield axios.get("/api/shelf/videos");
    yield put({ type: "SET_VIDEOS", payload: response.data });
    console.log("fetchVideosS ", response.data);
  } catch (error) {
    console.log("error videos", error);
  }
}

function* fetchVideoss() {
  try {
    const response = yield axios.get("/api/shelf/videoss");
    yield put({ type: "SET_VIDEOSS", payload: response.data });
    console.log("fetchVideos response.data", response.data);
  } catch (error) {
    console.log("error videos", error);
  }
}

function* fetchFeedback() {
  try {
    const response = yield axios.get("/api/shelf/feedbackform");
    yield put({ type: "SET_FEEDBACK", payload: response.data });
    console.log("fetchVideos response.data", response.data);
  } catch (error) {
    console.log("error videos", error);
  }
}

// this is the saga that is used to edit the current data inside the server
function* editVideo(action) {
  try {
    console.log("this is the action payload", action.payload);
    console.log("this is the action payload ID", action.payload.id);
    yield axios.put(`/api/shelf/`, action.payload);
    const response = yield axios.get(`/api/shelf/${action.payload.id}`);
    console.log("this is the response.data", response.data);
    yield put({ type: "SET_DETAILS", payload: response.data });
  } catch (error) {
    console.log("error editing movie", error);
  }
}

function* deleteVideo(action) {
  try {
    yield axios.delete(`/api/shelf/${action.payload}`);

    yield put({ type: "FETCH_VIDEOS" });
  } catch (error) {
    alert(`Unable to delete item: ${action.payload}`);
  }
}

function* fetchDetails(action) {
  try {
    const response = yield axios.get(`/api/shelf/${action.payload}`);
    console.log("this is fetchDetails:", response.data);
    yield put({ type: "SET_DETAILSS", payload: response.data[0] });
  } catch (error) {
    console.log("Error getting movies ", error);
  }
} // end GET /details

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("FETCH_GIFS", fetchGiphy);
  yield takeLatest("FETCH_VIDEOS", fetchVideos);
  yield takeLatest("FETCH_VIDEOSS", fetchVideoss);
  yield takeLatest("DELETE_VIDEO", deleteVideo);
  yield takeLatest("EDIT_VIDEO", editVideo);
  yield takeLatest("EDIT_VIDEOS", fetchDetails);
  yield takeLatest("FETCH_FEEDBACK", fetchFeedback);
}

export default userSaga;

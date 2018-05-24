"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("firebase");
var react_native_router_flux_1 = require("react-native-router-flux");
var types_1 = require("./types");
exports.emailChanged = function (text) {
    return {
        type: types_1.EMAIL_CHANGED,
        payload: text
    };
};
exports.passwordChanged = function (text) {
    return {
        type: types_1.PASSWORD_CHANGED,
        payload: text
    };
};
exports.loginUser = function (_a) {
    var email = _a.email, password = _a.password;
    return function (dispatch) {
        dispatch({ type: types_1.LOGIN_USER });
        firebase_1.default.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) { return loginUserSuccess(dispatch, user); })
            .catch(function (error) {
            console.log(error);
            firebase_1.default.auth().createUserWithEmailAndPassword(email, password)
                .then(function (user) { return loginUserSuccess(dispatch, user); })
                .catch(function () { return loginUserFail(dispatch); });
        });
    };
};
var loginUserFail = function (dispatch) {
    dispatch({ type: types_1.LOGIN_USER_FAIL });
};
var loginUserSuccess = function (dispatch, user) {
    dispatch({
        type: types_1.LOGIN_USER_SUCCESS,
        payload: user
    });
    react_native_router_flux_1.Actions.main();
};

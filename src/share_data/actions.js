const apiUrl = 'https://atdevserver.com/Projects/laravel_api/api';
const token = sessionStorage.getItem('admin_login_token');

const requestLib = require('request-promise');
 const request = function (args) {
    return requestLib(args);
};
export const CREATE_BOOKING = 'CREATE_BOOKING';
export const BOOKING_CREATED = 'BOOKING_CREATED';
export const REQUEST_ALL_BOOKING_LIST = 'REQUEST_ALL_BOOKING_LIST';
export const RECEIVE_ALL_BOOKING_LIST = 'RECEIVE_ALL_BOOKING_LIST';
export const REQUEST_ALL_ADMIN_OPTION = 'REQUEST_ALL_ADMIN_OPTION';
export const RECEIVE_ALL_ADMIN_OPTION = 'RECEIVE_ALL_ADMIN_OPTION';
export const REQUEST_UPDATE_COUPON_AMOUNT = 'REQUEST_UPDATE_COUPON_AMOUNT';
export const RECEIVE_UPDATE_COUPON_AMOUNT = 'RECEIVE_UPDATE_COUPON_AMOUNT';
export const REQUEST_CREATE_RESTAURANT = 'REQUEST_CREATE_RESTAURANT';
export const RECEIVE_CREATED_RESTAURANT= 'RECEIVE_CREATED_RESTAURANT';
export const REQUEST_FIND_RESTAURANT = 'REQUEST_FIND_RESTAURANT';
export const RECEIVE_FIND_RESTAURANT= 'RECEIVE_FIND_RESTAURANT';
export const REQUEST_BOOKING_STATUS= 'REQUEST_BOOKING_STATUS';
export const RECEIVE_BOOKING_STATUS= 'RECEIVE_BOOKING_STATUS';
export const REQUEST_BOOKING_TRACK= 'REQUEST_BOOKING_TRACK';
export const RECEIVE_BOOKING_TRACK= 'RECEIVE_BOOKING_TRACK';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const CONTACT_CREATED = 'CONTACT_CREATED';

export const simpleAction = () => dispatch => {
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: 'result_of_simple_action'
    })
};

function createBookings(data) {
    return {
        type: CREATE_BOOKING,
        data
    };
}

function BookingCreated(json) {
    return {
        type: BOOKING_CREATED,
        bookings: json
    };
}
export function createBooking(data) {
    const url = apiUrl + '/booking';

    return function dopost(dispatch) {
        dispatch(createBookings(data));

        return request({
            url,
            data: data,
            method: 'POST',
            type: 'json',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(BookingCreated(response));
                return response
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
function requestAllBooking() {
    return {
        type: REQUEST_ALL_BOOKING_LIST
    };
}

function receiveAllBooking(data) {
    return {
        type: RECEIVE_ALL_BOOKING_LIST,
        bookings: data
    };
}

export function fetchAllBookingList() {
    // dispatch provided by magic middleware redux-thunk
    const url = apiUrl +'/booking_list';

    return function dofetch(dispatch) {
        dispatch(requestAllBooking());

        return request({
            url,
            method: 'POST',
            type: 'json',
            headers:{
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(receiveAllBooking(response));
                return response;
            })
            .catch(error => {
                console.log(dispatch, error, 'all_bookings');
            });
    };
}
function requestAllAdminOption() {
    return {
        type: REQUEST_ALL_ADMIN_OPTION
    };
}

function receiveAllAdminOption(data) {
    return {
        type: RECEIVE_ALL_ADMIN_OPTION,
        AdminOptions: data
    };
}

export function fetchAllAdminOption() {
    // dispatch provided by magic middleware redux-thunk
    const url = apiUrl +'/AdminOption';

    return function dofetch(dispatch) {
        dispatch(requestAllAdminOption());

        return request({
            url,
            method: 'Get',
            type: 'json',
            headers:{
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(receiveAllAdminOption(response));
                return response;
            })
            .catch(error => {
                console.log(dispatch, error, 'all_Admin_Option');
            });
    };
}
function requestUpdateCouponAmount() {
    return {
        type: REQUEST_UPDATE_COUPON_AMOUNT
    };
}

function receiveUpdateCouponAmount(json) {
    return {
        type: RECEIVE_UPDATE_COUPON_AMOUNT,
        AdminOption: json
    };
}

export function UpdateCouponStatus(id, data) {
    // dispatch provided by magic middleware redux-thunk
    const url = apiUrl +'/AdminOptionUpdate/'+ id;

    return function dofetch(dispatch) {
        dispatch(requestUpdateCouponAmount(data));

        return request({
            url,
            method: 'POST',
            data: JSON.stringify(data),
            type: 'json',
            crossOrigin: true,
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(receiveUpdateCouponAmount(response));
                return response;
            })
            .catch(error => {
                console.log(dispatch, error, 'AdminOptionUpdate');
            });
    };
}
function requestCreateRestaurant() {
    return {
        type: REQUEST_CREATE_RESTAURANT,
    };
}

function receiveCreateRestaurant(json) {
    return {
        type: RECEIVE_CREATED_RESTAURANT,
        AdminOption: json
    };
}

export function CreateRestaurant(data) {
    // dispatch provided by magic middleware redux-thunk
    const url = apiUrl +'/AdminOptionCreate';

    return function dofetch(dispatch) {
        dispatch(requestCreateRestaurant(data));

        return request({
            url,
            method: 'POST',
            data: JSON.stringify(data),
            type: 'json',
            crossOrigin: true,
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(receiveCreateRestaurant(response));
                return response;
            })
            .catch(error => {
                console.log(dispatch, error, 'AdminOptionCreated');
            });
    };
}
function requestFindRestaurant() {
    return {
        type: REQUEST_FIND_RESTAURANT,
    };
}

function receiveFindRestaurant(json) {
    return {
        type: RECEIVE_FIND_RESTAURANT,
        AdminOption_find: json
    };
}

export function fetchRestaurant(data) {
    // dispatch provided by magic middleware redux-thunk
    const url = apiUrl +'/Admin_Option_find';

    return function dofetch(dispatch) {
        dispatch(requestFindRestaurant(data));

        return request({
            url,
            method: 'POST',
            data: JSON.stringify(data),
            type: 'json',
            crossOrigin: true,
            contentType: 'application/json',
            headers:{
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(receiveFindRestaurant(response));
                return response;
            })
            .catch(error => {
                console.log(dispatch, error, 'AdminOptionCreated');
            });
    };
}
export function updateBooking(data) {
    const url = apiUrl + '/bookingupdate';

    return function dopost(dispatch) {
        dispatch(requestBookingstatus(data));

        return request({
            url,
            data: data,
            method: 'POST',
            type: 'json',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(receiveBookingstatus(response));
                return response
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
function requestBookingstatus() {
    return {
        type: REQUEST_BOOKING_STATUS
    };
}

function receiveBookingstatus(data) {
    return {
        type: RECEIVE_BOOKING_STATUS,
        bookings:data
    };
}

export function trackBooking(booking_token) {
    const url = apiUrl + '/booking_tracker/'+ booking_token;

    return function dopost(dispatch) {
        dispatch(requestBookingTrack(booking_token));

        return request({
            url,
            method: 'GET',
            type: 'json',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        })
            .then(response => {
                dispatch(receiveBookingTrack(response));
                return response
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
function requestBookingTrack() {
    return {
        type: REQUEST_BOOKING_TRACK
    };
}

function receiveBookingTrack(data) {
    return {
        type: RECEIVE_BOOKING_TRACK,
        bookings: data
    };
}

function createContacts(data) {
    return {
        type: CREATE_CONTACT,
        data
    };
}
function ContactCreated(json) {
    return {
        type: CONTACT_CREATED,
        bookings: json
    };
}

export function createContact(data) {
    const url = apiUrl + '/restaurantdata';

    return function dopost(dispatch) {
        dispatch(createContacts(data));

        return request({
            url,
            data: data,
            type:'json',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        }).then(response => {
                dispatch(ContactCreated(response));
                return response
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

// export function createContact(data) {
//     const url = 'http://rules.restaurantbite.com/api/v1/merchants/shop/search?distance_min=0.0&distance_max=50000000&page=0&size=100&search=REGIONAL&lt=39.6579328&ln=-105.0799494&serviceType=NO&opened_only=false';

//     return function dopost(dispatch) {
//         dispatch(createContacts(data));

//         return request({
//             url,
//             data: data,
//             type:'json',
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g'
//             }
//         }).then(response => {
//                 dispatch(ContactCreated(response));
//                 return response
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
// }

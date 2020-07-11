import { combineReducers } from 'redux';
import {
    CREATE_BOOKING,
    BOOKING_CREATED,
    REQUEST_ALL_BOOKING_LIST,
    RECEIVE_ALL_BOOKING_LIST,
    REQUEST_ALL_ADMIN_OPTION,
    RECEIVE_ALL_ADMIN_OPTION,
    REQUEST_UPDATE_COUPON_AMOUNT,
    RECEIVE_UPDATE_COUPON_AMOUNT,
    REQUEST_CREATE_RESTAURANT,
    RECEIVE_CREATED_RESTAURANT,
    REQUEST_FIND_RESTAURANT,
    RECEIVE_FIND_RESTAURANT,
    REQUEST_BOOKING_STATUS,
    RECEIVE_BOOKING_STATUS,
    CREATE_CONTACT,
    CONTACT_CREATED

} from './actions';

export const  documents = (

    state = {
        isFetching: false,
        isReady: false,
        booking: [],
    },
    action,

) => {
    switch (action.type) {
        case CREATE_BOOKING:
            return {
                ...state,
                isFetching: false,
                isReady: false,
                isUpdating: true,
                updated: false
            };
        case BOOKING_CREATED:
            return {
                ...state,
                isFetching: false,
                isReady: true,
                isUpdating: false,
                updated: true,
                booking: action.bookings
            };
        default:
            return state;
    }
};
const bookingList = (
    state = {
        isFetching: false,
        isReady: false,
        items: {}
    },
    action
) => {
    switch (action.type) {
        case REQUEST_ALL_BOOKING_LIST:
            return {
                ...state,
                isFetching: true,
                isReady: false
            };
        case RECEIVE_ALL_BOOKING_LIST:
            return {
                ...state,
                isFetching: false,
                isReady: true,
                items: action.bookings
            };
        default:
            return state;
    }
};
const All_Admin_Option = (
    state = {
        isFetching: false,
        isReady: false,
        items: {},
        AdminOption: {},
        AdminOption_find: {}
    },
    action
) => {
    switch (action.type) {
        case REQUEST_ALL_ADMIN_OPTION:
            return {
                ...state,
                isFetching: true,
                isReady: false
            };
        case RECEIVE_ALL_ADMIN_OPTION:
            return {
                ...state,
                isFetching: false,
                isReady: true,
                items: action.AdminOptions
            };
        case REQUEST_CREATE_RESTAURANT:
            return {
                ...state,
                isFetching: false,
                isReady: false,
                isUpdating: true,
                updated: false
            };
        case RECEIVE_CREATED_RESTAURANT:
            return {
                ...state,
                isFetching: false,
                isReady: true,
                isUpdating: false,
                updated: true,
                items: action.AdminOptions || state.AdminOptions
            };
        case REQUEST_UPDATE_COUPON_AMOUNT:
            return {
                ...state,
                isFetching: false,
                isReady: false,
                isUpdating: true,
                updated: false
            };
        case RECEIVE_UPDATE_COUPON_AMOUNT:
            return {
                ...state,
                isFetching: false,
                isReady: true,
                isUpdating: false,
                updated: true,
                AdminOption: action.AdminOption || state.AdminOption
            };
        case REQUEST_FIND_RESTAURANT:
            return {
                ...state,
                isFetching: false,
                isReady: false,
                isUpdating: true,
                updated: false
            };
        case RECEIVE_FIND_RESTAURANT:
            return {
                ...state,
                isFetching: false,
                isReady: true,
                isUpdating: false,
                updated: true,
                AdminOption_find: action.AdminOption_find
            };
        default:
            return state;
    }
};
export const  contact = (

    state = {
        isFetching: false,
        isReady: false,
    },
    action,

) => {
    switch (action.type) {
        case CREATE_CONTACT:
            return {
                ...state,
                isFetching: false,
                isReady: false,
                isUpdating: true,
                updated: false
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    documents,
    bookingList,
    All_Admin_Option,
    contact
});

export default rootReducer;

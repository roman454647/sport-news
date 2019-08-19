import { userConstants } from '../_constants';

export const initialState = {
    registering: false,
    error: null,
};

export function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state
    }
}
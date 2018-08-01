import { AnyAction } from 'redux';

const initialState = {
    items: [],
    total: 0
};

export const documentsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state;
    }
}

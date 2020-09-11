import { createSlice } from '@reduxjs/toolkit';
import { setupInitialState, getStateKeys } from '@/_helpers';

const initialFilePageValues = {
    files_list: null,
    numRequests: 0,
    numSamples: 0,
    numPooledNormals: 0,
    numDmpBams: 0,
    numArgosRequests: 0,
    numArgosSamples: 0,
    distArgosOncoTree: {},
};

const initialFilePageState = setupInitialState(initialFilePageValues);

const filePageReducer = createSlice({
    name: 'filePageReducer',
    initialState: initialFilePageState,
    reducers: {
        FETCH_FILES_LIST: (state, action) => {
            let stateKeys = getStateKeys(action);
            state[stateKeys.fetching] = true;
        },
        FILES_LIST_FULFILLED: (state, action) => {
            let stateKeys = getStateKeys(action);
            state[stateKeys.fetching] = false;
            state[stateKeys.fulfilled] = true;
            state[stateKeys.state_key] = action.payload.data;
        },
        FILES_LIST_ERROR: (state, action) => {
            let stateKeys = getStateKeys(action);
            state[stateKeys.fetching] = false;
            state[stateKeys.error] = action.payload.data;
        },
    },
});

export const { FETCH_FILES_LIST, FILES_LIST_FULFILLED, FILES_LIST_ERROR } = filePageReducer.actions;
export default filePageReducer.reducer;

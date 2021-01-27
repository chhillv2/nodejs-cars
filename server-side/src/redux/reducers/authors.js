import {
  AUTHORS_LIST,
} from "../types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHORS_LIST: {
      return action.payload;
    }
   
    default:
      return state;
  }
};

import {
  MOSTCONTACTED_LISTING,
} from "../types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case MOSTCONTACTED_LISTING: {
      return action.payload;
    }
    default:
      return state;
  }
};

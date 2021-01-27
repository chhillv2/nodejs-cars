import { TOPFIVEPERMONTH_LIST } from "../types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case TOPFIVEPERMONTH_LIST: {
      return action.payload;
    }
    default:
      return state;
  }
};

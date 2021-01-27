import {
  AVERAGE_LISTING,
  MOSTCONTACTED_LISTING,
  AUTHORS_LIST,
  TOPFIVEPERMONTH_LIST,
} from "./types";
import { createAction } from "redux-actions";
import { useDispatch } from "react-redux";
import * as API from "./api";

const averageAction = createAction(AVERAGE_LISTING);
const mostcontactedAction = createAction(MOSTCONTACTED_LISTING);
const authorsAction = createAction(AUTHORS_LIST);
const topfivepermonthAction = createAction(TOPFIVEPERMONTH_LIST);

export const useActions = () => {
  const dispatch = useDispatch();

  return {
    averageListingprice: async () => {
      let response, error;
      try {
        response = await API.averageListingprice.list();
        dispatch(averageAction(response));
      } catch (e) {
        console.log(e);
        error = e;
      }
      return { response, error };
    },
    distributionMake: async () => {
      let response, error;
      try {
        response = await API.distributionMake.list();
        dispatch(mostcontactedAction(response));
      } catch (e) {
        console.log(e);
        error = e;
      }
      return { response, error };
    },

    mostContactedlisting: async () => {
      let response, error;
      try {
        response = await API.mostContactedlisting.list();
        dispatch(authorsAction(response));
      } catch (e) {
        console.log(e);
        error = e;
      }
      return { response, error };
    },

    topfivepermonth: async () => {
      let response, error;
      try {
        response = await API.topfivepermonth.list();
        dispatch(topfivepermonthAction(response));
      } catch (e) {
        console.log(e);
        error = e;
      }
      return { response, error };
    },
  };
};

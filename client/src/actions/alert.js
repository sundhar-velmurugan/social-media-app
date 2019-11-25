import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4(); //return random long string
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  })
}
import {
  OPEN_QTY_MODAL,
  CLOSE_QTY_MODAL,
} from "../actionsTypes/ActionsTypes";

export function openQuantityModalAction() {
  return {
    type: OPEN_QTY_MODAL,
    payload: true,
  };
}

export function closeQuantityModalAction() {
  return {
    type: CLOSE_QTY_MODAL,
    payload: false,
  };
}

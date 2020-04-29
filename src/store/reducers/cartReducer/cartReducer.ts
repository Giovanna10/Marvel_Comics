import {
  Action,
  CartActionInterface,
  OPEN_QTY_MODAL,
  CLOSE_QTY_MODAL,
} from "../../actions/actionsTypes/ActionsTypes";
import { CartState } from "../../statesTypes/StatesTypes";

const initialState: CartState = {
  openModal: false,
};

export default function cartReducer(
  state: CartState = initialState,
  action: Action<CartActionInterface>
) {
  switch (action.type) {
    case OPEN_QTY_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case CLOSE_QTY_MODAL: {
      return {
        ...state,
        openModal: action.payload,
      };
    }
    default:
      return state;
  }
}

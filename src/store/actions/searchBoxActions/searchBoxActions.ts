import {OPEN_SEARCH_BOX, CLOSE_SEARCH_BOX} from '../actionsTypes/ActionsTypes';

export function openSearchBoxAction() {
  return {type: OPEN_SEARCH_BOX, payload: true};
}

export function closeSearchBoxAction() {
  return {type: CLOSE_SEARCH_BOX, payload: false};
}
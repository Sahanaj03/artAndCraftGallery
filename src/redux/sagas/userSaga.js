/* eslint-disable indent */
import {
  ADD_USER,
  EDIT_USER,
  GET_USERS,
  REMOVE_USER,
  SEARCH_USER,
} from 'constants/constants';
import {ADMIN_PRODUCTS} from 'constants/routes';
import {displayActionMessage} from 'helpers/utils';
import {all, call, put, select} from 'redux-saga/effects';
import {setLoading, setRequestStatus} from 'redux/actions/miscActions';
import {history} from 'routers/AppRouter';
import firebase from 'services/firebase';
import {
  addUserSuccess,
  clearUserSearchState,
  editUserSuccess,
  getUsersSuccess,
  deleteUserSuccess,
  searchUserSuccess,
} from '../actions/userActions';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch users'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* userSaga({type, payload}) {
  console.log('type', type);
  switch (type) {
    case GET_USERS:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getUsers, payload);

        if (result.users.length === 0) {
          handleError('No items found.');
        } else {
          yield put(
            getUsersSuccess({
              users: result.users,
              lastKey: result.lastKey ? result.lastKey : state.users.lastRefKey,
              total: result.total ? result.total : state.users.total,
            }),
          );
          yield put(setRequestStatus(''));
        }
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;

    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default userSaga;

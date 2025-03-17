import { call, put, takeEvery } from "redux-saga/effects";
import { createUserFailed, createUserPending, createUserSuccess, deleteUserFailed, deleteUserPending, deleteUserSuccess, editUserFailed, editUserPending, editUserSuccess, fetchUserFailed, fetchUserPending, fetchUserSuccess } from "./slice";
// import { IUser } from "../types/userType";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "@/types/ApiResponse";
import { PaginationData } from "@/types/PaginationData";
import { userService } from "@/services/user.service";
import { User } from "../types/userType";

export function* findUsers(action: PayloadAction<{ page: number, limit: number }>) {
  try {
    const { page, limit } = action.payload;
    const response: ApiResponse<User> = yield call(userService.getUser, page, limit);
    const result: PaginationData<User> = response.data;

    yield put(fetchUserSuccess(result));
  } catch (error) {
    console.log("Fetch User Error", error);
    yield put(fetchUserFailed());
  }
}

export function* createUser(action: PayloadAction<{ email: string, password: string }>) {
  try {
    const response: ApiResponse<User> = yield call(userService.createUser, action.payload.email, action.payload.password)
    if (response.success) {
      yield put(createUserSuccess())
      //fetching users if success
      yield put(fetchUserPending({ page: 1, limit: 10 }));
    } else {
      yield put(createUserFailed({ message: response.message ?? 'Unknown error' }))
    }
  } catch (error) {
    console.log("Create User Error", error)
  }
}

export function* editUser(action: PayloadAction<{ id: string, body: User }>) {
  try {
    const { id, body } = action.payload;
    const response: ApiResponse<User> = yield call(userService.editUser, id, body)
    if (response.data.success) {
      yield put(editUserSuccess())
      //fetching users if success
      yield put(fetchUserPending({ page: 1, limit: 10 }));
    }
    else {
      yield put(editUserFailed({ message: response.message ?? 'Unknown error' }))
    }

  } catch (error) {
    console.log("Edit User Error", error)
  }
}
export function* deleteUser(action: PayloadAction<{ id: string }>) {
  try {
    const response: ApiResponse<User> = yield call([userService, userService.deleteUser], action.payload.id)
    if (response.data.success) {
      yield put(deleteUserSuccess())
      //fetching users if success
      yield put(fetchUserPending({ page: 1, limit: 10 }));
    } else {
      yield put(deleteUserFailed({ message: response.message ?? 'Unknown error' }))
    }
  } catch (error) {
    console.log("Delete User Error", error)
  }
}

function* userSaga() {
  yield takeEvery(fetchUserPending.type, findUsers);
  yield takeEvery(createUserPending.type, createUser);
  yield takeEvery(editUserPending.type, editUser);
  yield takeEvery(deleteUserPending.type, deleteUser);

}
export default userSaga;

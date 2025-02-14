import { call, put, takeEvery } from "redux-saga/effects";
import { createUserFailed, createUserPending, createUserSuccess, deleteUserFailed, deleteUserPending, deleteUserSuccess, editUserFailed, editUserPending, editUserSuccess, fetchUserFailed, fetchUserPending, fetchUserSuccess } from "./userSlice";
import { IUser } from "../types/userType";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "@/types/ApiResponse";
import { PaginationData } from "@/types/PaginationData";

//Cần gắn token vào header để xác thực người dùng
//Token này sẽ được lấy từ localStorage sau khi người dùng đăng nhập
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOiI2N2FlYTQzNDIyYzBjYmQ0ZDA3MzJiZTEiLCJpYXQiOjE3Mzk1MjUwMDEsImV4cCI6MTczOTUyODYwMX0.q0f71Ru7eZ_7CBOxJD_a-J0iHC_9wBrfwvMgaUg5OpM';

const fetchUser = async (page: number, limit: number): Promise<ApiResponse<IUser>> => {
  const response = await fetch(`http://localhost:8080/api/v1/users?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
  const result: ApiResponse<IUser> = await response.json();
  if (result.success) {
    return result;
  } else {
    throw new Error('Fetch failed');
  }
}

const createUser = async (email: string, password: string): Promise<ApiResponse<IUser>> => {
  const response = await fetch('http://localhost:8080/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  const result = await response.json();
  return result;

}

const editUser = async (id: string, body: Partial<IUser>) => {
  console.log("ID", id)
  console.log("body", body)
  const response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  })
  const result = await response.json();
  return result;
}

const deleteUser = async (id: number) => {
  const response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  const result = await response.json();
  return result;
}

function* handleFetchUser(action: PayloadAction<{ page: number, limit: number }>) {
  try {
    const { page, limit } = action.payload;
    const response: ApiResponse<IUser> = yield call(fetchUser, page, limit);
    const result: PaginationData<IUser> = response.data;

    yield put(fetchUserSuccess(result));
  } catch (error) {
    console.log("Fetch User Error", error);
    yield put(fetchUserFailed());
  }
}

function* handleCreateUser(action: PayloadAction<{ email: string, password: string }>) {
  try {
    const response: ApiResponse<IUser> = yield call(createUser, action.payload.email, action.payload.password)
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

function* handleEditUser(action: PayloadAction<{ id: string, body: IUser }>) {
  try {
    const response: ApiResponse<IUser> = yield call(editUser, action.payload.id, action.payload.body)
    if (response.success) {
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

function* handleDeleteUser(action: PayloadAction<{ id: number }>) {
  try {
    const response: ApiResponse<IUser> = yield call(deleteUser, action.payload.id)
    if (response.success) {
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
  yield takeEvery(fetchUserPending.type, handleFetchUser);
  yield takeEvery(createUserPending.type, handleCreateUser);
  yield takeEvery(editUserPending.type, handleEditUser);
  yield takeEvery(deleteUserPending.type, handleDeleteUser);

}
export default userSaga;

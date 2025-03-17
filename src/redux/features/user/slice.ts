import { createAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { PaginationData } from "@/types/PaginationData";
import { User } from "../types/userType";

export const fetchUserPending = createAction<{ page: number, limit: number }>("fetchUserPending");
export const fetchUserSuccess = createAction<PaginationData<User>>("fetchUserSuccess");
export const fetchUserFailed = createAction("fetchUserFailed");

export const createUserPending = createAction<{ email: string, password: string }>("createUserPending");
export const createUserSuccess = createAction("createUserSuccess");
export const createUserFailed = createAction<{ message: string }>("createUserFailed");

export const editUserPending = createAction<{ id: string, body: Partial<User> }>("editUserPending");
export const editUserSuccess = createAction("editUserSuccess");
export const editUserFailed = createAction<{ message: string }>("editUserFailed");

export const deleteUserPending = createAction<{ id: string }>("deleteUserPending");
export const deleteUserSuccess = createAction("deleteUserSuccess");
export const deleteUserFailed = createAction<{ message: string }>("deleteUserFailed");

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //fetching User Data
      .addCase(fetchUserPending, (state) => {
        state.isPending = true
        state.errors = false
      })
      .addCase(fetchUserSuccess, (state, action) => {
        state.isPending = false
        state.errors = false
        // Make sure we're storing the array part of the data
        state.data = action.payload.data || []
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchUserFailed, (state) => {
        state.isPending = false
        state.errors = true
      })

      //Create New User
      .addCase(createUserPending, (state) => {
        state.isCreating = true
        state.isCreateSuccess = false
      })
      .addCase(createUserSuccess, (state) => {
        state.isCreating = false
        state.isCreateSuccess = true
        state.errors = false
      })
      .addCase(createUserFailed, (state, action) => {
        state.isCreating = false
        state.isCreateSuccess = false
        state.errors = true
        state.message = action.payload.message
      })

      //Edit User
      .addCase(editUserPending, (state) => {
        state.isEditing = true
        state.isEditSuccess = false
      })
      .addCase(editUserSuccess, (state) => {
        state.isEditing = false
        state.isEditSuccess = true
        state.errors = false
      })
      .addCase(editUserFailed, (state, action) => {
        state.isEditing = false
        state.isEditSuccess = false
        state.errors = true
        state.message = action.payload.message
      })

      //Delete User
      .addCase(deleteUserPending, (state) => {
        state.isDeleting = true
        state.isDeleteSuccess = false
      })
      .addCase(deleteUserSuccess, (state) => {
        state.isDeleting = false
        state.isDeleteSuccess = true
        state.errors = false
      })
      .addCase(deleteUserFailed, (state, action) => {
        state.isDeleting = false
        state.isDeleteSuccess = false
        state.errors = true
        state.message = action.payload.message
      });
  },
});


export default userSlice.reducer;

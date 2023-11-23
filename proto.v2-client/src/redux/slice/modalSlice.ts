import { Modal } from "./../../types/Modal";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export interface IModalState {
  activeModal: Modal | undefined;
  visibility: boolean;
}

const initialState: IModalState = { activeModal: undefined, visibility: false };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    OPEN_MODAL: (state, action) => {
      const { modal } = action.payload;
      state.activeModal = modal;
      state.visibility = true;
    },
    CLOSE_MODAL: (state) => {
      state.activeModal = undefined;
      state.visibility = false;
    },
    CHANGE_MODAL: (state, action) => {
      const { modal } = action.payload;
      state.activeModal = modal;
    },
  },
});

export const { OPEN_MODAL, CLOSE_MODAL, CHANGE_MODAL } = modalSlice.actions;

export const getActiveModalState = (state: RootState) =>
  state.modal.activeModal;
export const getVisibilityState = (state: RootState) => state.modal.visibility;

export const getModalState = (state: RootState) => state.modal;

export default modalSlice.reducer;

import { Modal } from "./../../types/Modal";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface IModalState {
  modal: Modal | undefined;
  visibility: boolean;
}

const initialState: IModalState = { modal: undefined, visibility: false };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    OPEN_MODAL: (state, action) => {
      const { modal } = action.payload;
      state.modal = modal;
      state.visibility = true;
    },
    CLOSE_MODAL: (state) => {
      state.modal = undefined;
      state.visibility = false;
    },
    CHANGE_MODAL: (state, action) => {
      const { modal } = action.payload;
      state.modal = modal;
    },
  },
});

export const { OPEN_MODAL, CLOSE_MODAL, CHANGE_MODAL } = modalSlice.actions;

// export const selectModal = (state: RootState) =>

export default modalSlice.reducer;

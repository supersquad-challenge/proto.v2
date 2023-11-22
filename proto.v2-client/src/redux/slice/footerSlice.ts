import { BlueButtonTitle } from "@/types/Footer";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IFooterState {
  blueButtonTitle: BlueButtonTitle | undefined;
  blueButtonVisibility: boolean;
  handleBlueButtonClick: () => void;
}

const initialState: IFooterState = {
  blueButtonTitle: undefined,
  blueButtonVisibility: true,
  handleBlueButtonClick: () => {},
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    SET_FOOTER_BLUEBUTTON: (state, action) => {
      const { blueButtonTitle, handleBlueButtonClick } = action.payload;
      state.blueButtonTitle = blueButtonTitle;
      state.blueButtonVisibility = true;
      state.handleBlueButtonClick = handleBlueButtonClick;
    },
    INITIALIZE_FOOTER_BLUEBUTTON: (state) => {
      state.blueButtonTitle = undefined;
      state.blueButtonVisibility = true;
      state.handleBlueButtonClick = () => {};
    },
    SHOW_FOOTER_BLUEBUTTON: (state) => {
      state.blueButtonVisibility = true;
    },
    REMOVE_FOOTER_BLUEBUTTON: (state) => {
      state.blueButtonTitle = undefined;
      state.blueButtonVisibility = false;
      state.handleBlueButtonClick = () => {};
    },
  },
});

export const {
  SET_FOOTER_BLUEBUTTON,
  INITIALIZE_FOOTER_BLUEBUTTON,
  SHOW_FOOTER_BLUEBUTTON,
  REMOVE_FOOTER_BLUEBUTTON,
} = footerSlice.actions;

export const getBlueButtonTitleState = (state: RootState) =>
  state.footer.blueButtonTitle;
export const getBlueButtonVisibilityState = (state: RootState) =>
  state.footer.blueButtonVisibility;
export const getHandleBlueButtonClickState = (state: RootState) =>
  state.footer.handleBlueButtonClick;

export default footerSlice.reducer;

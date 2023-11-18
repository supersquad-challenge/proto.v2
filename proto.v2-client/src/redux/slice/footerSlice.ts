import { BlueButtonTitle } from "@/types/Footer";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IFooterState {
  blueButtonTitle: BlueButtonTitle | undefined;
  handleBlueButtonClick: () => void;
}

const initialState: IFooterState = {
  blueButtonTitle: undefined,
  handleBlueButtonClick: () => {},
};

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    SET_FOOTER_BLUEBUTTON: (state, action) => {
      const { blueButtonTitle, handleBlueButtonClick } = action.payload;
      state.blueButtonTitle = blueButtonTitle;
      state.handleBlueButtonClick = handleBlueButtonClick;
    },
    INITIALIZE_FOOTER_BLUEBUTTON: (state) => {
      state.blueButtonTitle = undefined;
      state.handleBlueButtonClick = () => {};
    },
  },
});

export const { SET_FOOTER_BLUEBUTTON, INITIALIZE_FOOTER_BLUEBUTTON } =
  footerSlice.actions;

export const getBlueButtonTitleState = (state: RootState) =>
  state.footer.blueButtonTitle;
export const getHandleBlueButtonClickState = (state: RootState) =>
  state.footer.handleBlueButtonClick;

export default footerSlice.reducer;

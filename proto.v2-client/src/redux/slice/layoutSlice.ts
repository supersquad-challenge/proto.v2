import { BlueButtonTitle } from "@/types/Footer";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ILayoutState {
  handleGoBackButtonClick: () => void;
  blueButtonTitle: BlueButtonTitle | undefined;
  blueButtonVisibility: boolean;
  handleBlueButtonClick: () => void;
  isBlueButtonActive: boolean;
}

const initialState: ILayoutState = {
  handleGoBackButtonClick: () => {},
  blueButtonTitle: undefined,
  blueButtonVisibility: true,
  handleBlueButtonClick: () => {},
  isBlueButtonActive: true,
};

const layoutSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    SET_HEADER_GOBACK: (state, action) => {
      const { handleGoBackButtonClick } = action.payload;
      state.handleGoBackButtonClick = handleGoBackButtonClick;
    },
    SET_FOOTER_BLUEBUTTON: (state, action) => {
      const { blueButtonTitle, handleBlueButtonClick } = action.payload;
      state.blueButtonTitle = blueButtonTitle;
      state.blueButtonVisibility = true;
      state.handleBlueButtonClick = handleBlueButtonClick;
      state.isBlueButtonActive = true;
    },
    REMOVE_FOOTER_BLUEBUTTON: (state) => {
      state.blueButtonTitle = undefined;
      state.blueButtonVisibility = false;
      state.handleBlueButtonClick = () => {};
      state.isBlueButtonActive = true;
    },
    INITIALIZE_FOOTER_BLUEBUTTON: (state) => {
      state.blueButtonTitle = undefined;
      state.blueButtonVisibility = true;
      state.handleBlueButtonClick = () => {};
      state.isBlueButtonActive = true;
    },
    SHOW_FOOTER_BLUEBUTTON: (state) => {
      state.blueButtonVisibility = true;
      state.isBlueButtonActive = true;
    },
    DEACTIVATE_FOOTER_BLUEBUTTON: (state, action) => {
      const { blueButtonTitle, handleBlueButtonClick } = action.payload;
      state.blueButtonTitle = blueButtonTitle;
      state.blueButtonVisibility = true;
      state.isBlueButtonActive = false;
      state.handleBlueButtonClick = handleBlueButtonClick;
    },
  },
});

export const {
  SET_HEADER_GOBACK,
  SET_FOOTER_BLUEBUTTON,
  INITIALIZE_FOOTER_BLUEBUTTON,
  SHOW_FOOTER_BLUEBUTTON,
  REMOVE_FOOTER_BLUEBUTTON,
  DEACTIVATE_FOOTER_BLUEBUTTON: DEACTIVATE_FOOTER_BLUEBUTTON,
} = layoutSlice.actions;

export const getHandleGoBackButtonClickState = (state: RootState) =>
  state.layout.handleGoBackButtonClick;

export const getBlueButtonTitleState = (state: RootState) =>
  state.layout.blueButtonTitle;
export const getBlueButtonVisibilityState = (state: RootState) =>
  state.layout.blueButtonVisibility;
export const getHandleBlueButtonClickState = (state: RootState) =>
  state.layout.handleBlueButtonClick;
export const getIsBlueButtonActiveState = (state: RootState) =>
  state.layout.isBlueButtonActive;

export default layoutSlice.reducer;

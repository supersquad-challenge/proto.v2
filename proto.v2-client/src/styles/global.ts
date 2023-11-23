"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Poppin'
}

  // clash-display
  @font-face {
    font-family: 'ClashDisplayVariable';
    src: local('ClashDisplayVariable');
    font-style: normal;
    src: url('/static/fonts/clashdisplay/ClashDisplay-Variable.ttf') format('truetype');
  }
  
  // OpenSans
  @font-face {
    font-family: 'OpenSansExtraBold';
    src: local('OpenSansExtraBold');
    font-style: normal;
    src: url('/static/fonts/opensans/OpenSans-ExtraBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansBold';
    src: local('OpenSansBold');
    font-style: normal;
    src: url('/static/fonts/opensans/OpenSans-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansSemibold';
    src: local('OpenSansSemibold');
    font-style: normal;
    src: url('/static/fonts/opensans/OpenSans-SemiBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansMedium';
    src: local('OpenSansMedium');
    font-style: normal;
    src: url('/static/fonts/opensans/OpenSans-Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansRegular';
    src: local('OpenSansRegular');
    font-style: normal;
    src: url('/static/fonts/opensans/OpenSans-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansLight';
    src: local('OpenSansLight');
    font-style: normal;
    src: url('/static/fonts/opensans/OpenSans-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Poppin';
    src: local('PoppinExtraBold');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-ExtraBold.ttf');
    font-weight: 800;
  }
  @font-face {
    font-family: 'Poppin';
    src: local('PoppinBold');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Bold.ttf');
    font-weight: 700;
  }
  @font-face {
    font-family: 'Poppin';
    src: local('PoppinSemiBold');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-SemiBold.ttf');
    font-weight: 600;
  }
  @font-face {
    font-family: 'Poppin';
    src: local('PoppinMedium');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Medium.ttf');
    font-weight: 500;
  }
  @font-face { //400
    font-family: 'Poppin';
    src: local('PoppinRegular');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Regular.ttf');
    font-weight: 400;
  }
  @font-face { //300
    font-family: 'Poppin';
    src: local('PoppinLight');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Light.ttf');
    font-weight: 300;
  }
  @font-face {
    font-family: 'Poppin';
    src: local('PoppinExtraLight');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-ExtraLight.ttf');
    font-weight: 200;
  }
  @font-face {
    font-family: 'Poppin';
    src: local('PoppinThin');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Thin.ttf');
    font-weight: 100;
  }
`;
export default GlobalStyle;

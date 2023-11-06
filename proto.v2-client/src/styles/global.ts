import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
    font-family: 'PoppinExtraBold';
    src: local('PoppinExtraBold');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-ExtraBold.ttf');
  }
  @font-face {
    font-family: 'PoppinBold';
    src: local('PoppinBold');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Bold.ttf');
  }
  @font-face {
    font-family: 'PoppinSemiBold';
    src: local('PoppinSemiBold');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-SemiBold.ttf');
  }
  @font-face {
    font-family: 'PoppinMedium';
    src: local('PoppinMedium');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Medium.ttf');
  }
  @font-face {
    font-family: 'PoppinRegular';
    src: local('PoppinRegular');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Regular.ttf');
  }
  @font-face {
    font-family: 'PoppinLight';
    src: local('PoppinLight');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Light.ttf');
  }
  @font-face {
    font-family: 'PoppinExtraLight';
    src: local('PoppinExtraLight');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-ExtraLight.ttf');
  }
  @font-face {
    font-family: 'PoppinThin';
    src: local('PoppinThin');
    font-style: normal;
    src: url('/static/fonts/poppin/Poppins-Thin.ttf');
  }
`;
export default GlobalStyle;

import styled from 'styled-components';

const LoaderContainer = styled.span`
  width: 100%;
  height: 8px;
  display: inline-block;
  background-color: #000000;
  background-image: linear-gradient(
    45deg, 
    rgb(0, 240, 255) 
    25%, 
    transparent 
    25%, 
    transparent 
    50%, 
    rgb(0, 240, 255) 
    50%, 
    rgb(0, 240, 255) 
    75%, 
    transparent 
    75%, 
    transparent
    );
  font-size: 30px;
  background-size: 1em 1em;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #000;
  animation: barStripe 1s linear infinite;

@keyframes barStripe {
  0% {
    background-position: 1em 0;
  }
  100% {
    background-position: 0 0;
  }
}
`;

const StyledLoader = () => (
  <LoaderContainer />
);

export default StyledLoader;

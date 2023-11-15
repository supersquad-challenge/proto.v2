import styled from "styled-components";

type Props = {
  backgroundColor: string;
  color: string;
  title: string;
};

const Tag = ({ backgroundColor, color, title }: Props) => {
  return (
    <TagWrapper $backgroundColor={backgroundColor} $color={color}>
      {title}
    </TagWrapper>
  );
};

export default Tag;

const TagWrapper = styled.div<{ $backgroundColor: string; $color: string }>`
  padding: 7px 10px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
  font-size: 14px;
  font-weight: 500;

  border-radius: 10px;
  height: 32px;

  margin-left: 10px;
  box-sizing: border-box;
`;

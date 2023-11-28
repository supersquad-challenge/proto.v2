import colors from "@/styles/color";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

type Props = {
  profileSrc: string;
  setNewProfileSrc: Dispatch<SetStateAction<string>>;
  // file: File | undefined;
  // setFile: Dispatch<SetStateAction<File | undefined>>;
};

const ImageInputCircle = ({ profileSrc, setNewProfileSrc }: Props) => {
  const [backgroundImage, setBackgroundImage] = useState<string>(profileSrc);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setBackgroundImage(imageUrl);
      setNewProfileSrc(imageUrl);

      const file = event.target.files?.[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    }
  };

  return (
    <CircleContainer style={{ backgroundImage: `url(${backgroundImage})` }}>
      <HiddenInput type="file" accept="image/*" onChange={handleImageChange} />
      <EditLabel>Edit</EditLabel>
    </CircleContainer>
  );
};

export default ImageInputCircle;

const CircleContainer = styled.label`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const HiddenInput = styled.input`
  display: none;
`;

const EditLabel = styled.span`
  color: ${colors.white};

  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.36px;
`;

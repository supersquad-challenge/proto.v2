import Loading from "@/components/animation/Loading/Spinner/Loading";
import FullPageModal from "@/components/base/Modal/FullPageModal";
import postPhoto from "@/lib/api/axios/verification/postPhoto";
import { snapYourScaleSrc } from "@/lib/components/fullPageModal";
import { SET_HEADER_GOBACK } from "@/redux/slice/layoutSlice";
import {
  CHANGE_MODAL,
  CLOSE_MODAL,
  IModalState,
  OPEN_MODAL,
  getModalState,
} from "@/redux/slice/modalSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  userChallengeId: string;
};

const SnapYourScaleModal = ({ userChallengeId }: Props) => {
  // variables //
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const modal: IModalState = useSelector(getModalState);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect //
  useEffect(() => {
    dispatch(
      SET_HEADER_GOBACK({
        handleGoBackButtonClick: () => {
          dispatch(CLOSE_MODAL());
        },
      })
    );
  }, []);

  // handle functions //
  const handleBlueButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger click on the input element
    }
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsLoading(true); // 업로드 시작 시 isLoading을 true로 설정

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };

      try {
        const res = await postPhoto(userChallengeId, file);
        if (res && res.status === 200) {
          dispatch(OPEN_MODAL({ modal: "congrats_status" }));
        }
      } catch (error) {
      } finally {
        setIsLoading(false); // 업로드 완료 또는 에러 발생 시 isLoading을 false로 설정
      }
    }
  };

  return (
    <FullPageModal
      {...snapYourScaleSrc}
      onClickHandler={handleBlueButtonClick}
      goBackButtonClickHandler={() => {
        router.refresh();
        dispatch(CLOSE_MODAL());
      }}
    >
      <input
        ref={inputRef}
        id="file"
        accept="image/*"
        name="file"
        type="file"
        capture="environment"
        onChange={onUpload}
        style={{ display: "none" }}
      />
      {isLoading && <Loading />}
    </FullPageModal>
  );
};

export default SnapYourScaleModal;

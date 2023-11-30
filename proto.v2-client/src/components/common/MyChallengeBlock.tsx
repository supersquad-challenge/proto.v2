import colors from '@/styles/color';
import BaseBlock from '../base/Block/BaseBlock';
import styled from 'styled-components';
import CircularProgressBar from './CircularProgressBar';
import SmallArrowButton from '../base/Button/SmallArrowButton';
import { convertIsoDateToReadable } from '@/utils/dateFormatUtils';
type Props = {
  border?: string;
  margin?: string;
  successRate: number;
  thumbnailUrl: string;
  category: string;
  name: string;
  challengeStartAt: string;
  challengeEndAt: string;
  status: string;
  isPhotoUploadedToday: boolean;
  onClickHandler: () => void;
};

type MyChallengeExtendedStatus = {
  title: string;
  isCircularProgressBarPrimary: boolean;
  isButtonPrimary: boolean;
};

const MyChallengeBlock = ({
  border,
  margin,
  successRate,
  thumbnailUrl,
  category,
  name,
  challengeStartAt,
  challengeEndAt,
  status,
  isPhotoUploadedToday,
  onClickHandler,
}: Props) => {
  const today = new Date();
  const nextDayOfEndDay = new Date(challengeEndAt);
  nextDayOfEndDay.setDate(nextDayOfEndDay.getDate() + 1);
  let isChallengeEnded = false;
  if (today >= nextDayOfEndDay) {
    isChallengeEnded = true;
  }

  let myChallengeExtendedStatus: MyChallengeExtendedStatus = {
    title: '',
    isCircularProgressBarPrimary: false,
    isButtonPrimary: true,
  };
  if (status === 'ongoing' && isChallengeEnded) {
    myChallengeExtendedStatus.title = 'Get Payback';
    myChallengeExtendedStatus.isCircularProgressBarPrimary = true;
  } else if (status === 'ongoing' && !isPhotoUploadedToday) {
    myChallengeExtendedStatus.title = 'Verify Mission';
    myChallengeExtendedStatus.isCircularProgressBarPrimary = true;
  } else if (status === 'ongoing' && isPhotoUploadedToday) {
    myChallengeExtendedStatus.title = 'Mission Completed';
    myChallengeExtendedStatus.isButtonPrimary = false;
  } else if (status === 'complete') {
    myChallengeExtendedStatus.title = 'Read more';
  }
  return (
    <BlockWrapper $margin={margin} onClick={onClickHandler}>
      <BaseBlock
        backgroundColor={colors.white}
        borderRadius={20}
        padding="22px"
        onClickHandler={() => {}}
        border={border}
      >
        <div style={{ display: 'flex' }}>
          <CircularProgressBar
            progress={successRate}
            width={100}
            imageUrl={thumbnailUrl}
            isCircularProgressBarPrimary={
              myChallengeExtendedStatus.isCircularProgressBarPrimary
            }
          />
          <Wrapper>
            <Catergory>{category}</Catergory>
            <Name>{name}</Name>
            <Period>
              {convertIsoDateToReadable(challengeStartAt)} -{' '}
              {convertIsoDateToReadable(challengeEndAt)}
            </Period>
            <SmallArrowButton
              title={myChallengeExtendedStatus.title}
              margin="15px 0 0 0"
              backgroundColor={
                myChallengeExtendedStatus.isButtonPrimary ? colors.primary : colors.gray
              }
              onClickHandler={onClickHandler}
            />
          </Wrapper>
        </div>
      </BaseBlock>
    </BlockWrapper>
  );
};

export default MyChallengeBlock;

const BlockWrapper = styled.div<{ $margin?: string }>`
  width: 100%;
  margin: ${(props) => props.$margin};
  cursor: pointer;
`;

const Wrapper = styled.div`
  margin-left: 20px;
  width: auto;
  height: auto;
`;

const Catergory = styled.div`
  margin-bottom: 3px;
  color: ${colors.gray};
  font-size: 12px;
  font-weight: 500;
`;

const Name = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  max-width: 185px;

  line-height: 23.4px; /* 130% */
  letter-spacing: -0.36px;
`;

const Period = styled.div`
  color: ${colors.black};
  font-size: 14px;
  font-weight: 500;

  margin-top: 5px;
`;

"use client";
import SingleChallengeInfo from "@/components/common/explore/SingleChallengeInfo";
import DetailedChallengePage from "@/components/common/DetailedChallengePage";

const ExploreID = () => {
  return (
    <DetailedChallengePage>
      <SingleChallengeInfo title="Period" content="2 Weeks" detail="Everyday" />
      <SingleChallengeInfo
        title="How To"
        content="Take a picture"
        detail="Take a picture of your scale everyday to prove your weight.
          Remind to have your both feet shown!"
      />
      <SingleChallengeInfo
        title="Why this challenge?"
        content=""
        detail="Replacing one meal a day with salad is the first step to changing your eating habits healthier."
      />
    </DetailedChallengePage>
  );
};

<<<<<<< HEAD
export default ExploreID;
=======
export default ExploreChallenge;
const Container = styled.main`
  width: 100%;
  height: auto;
  background-color: ${colors.white};
  box-sizing: border-box;
`;

const ThumbnailContainer = styled.section`
  width: 100%;
  height: 200px;
  position: relative;
`;

const TagsContainer = styled.div`
  position: absolute;
  display: flex;
  right: 22px;
  bottom: 20px;

  z-index: 2;
`;

const InfoContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 0 22px;
  box-sizing: border-box;
  overflow: auto;
`;

const Name = styled.div`
  color: ${colors.black};
  font-size: 22px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const BottomMarginContainer = styled.div`
  width: 100%;
  height: 40px;
`;
>>>>>>> 00eae61 (Add: modals)

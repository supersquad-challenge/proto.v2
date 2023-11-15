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

export default ExploreID;

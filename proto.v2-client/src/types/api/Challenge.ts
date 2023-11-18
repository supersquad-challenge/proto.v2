export type AllChallenges = {
  challengeId: string;
  category: string;
  name: string;
  thumbnailUrl: string;
  participants: number;
};

export type AllChallengesByUserId = {
  userChallengeId: string;
  challengeId: string;
  status: string;
  category: string;
  name: string;
  thumbnailUrl: string;
  challengeStartAt: string;
  challengeEndAt: string;
};

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
  successRate: number;
  challengeStartAt: string;
  challengeEndAt: string;
  isPhotoUploadedToday: boolean;
  isPaybackPaid: boolean;
};

export type SingleChallengeByChallengeId = {
  challengeId: string;
  name: string;
  thumbnailUrl: string;
  participants: number;
  frequency: string;
  howTo: string;
  description: string;
};

export type SingleChallengeByUserChallengeId = {
  thumbnailUrl: string;
  name: string;
  participants: number;
  successRate: number;
  deposit: number;
  totalDeposit: number;
  cryptoSuccessPool: number;
  cryptoFailPool: number;
  challengeStartAt: string;
  challengeEndAt: string;
  frequency: string;
  howTo: string;
  description: string;
  status: string;
  isPhotoUploadedToday: boolean;
  isPaybackPaid: boolean;
};

export type SingleRegisteredChallenge = {
  message: string;
  userChallengeId: string;
};

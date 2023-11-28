export type AllChallengesT = {
  challengeId: string;
  category: string;
  name: string;
  thumbnailUrl: string;
  participants: number;
};

export type AllChallengesByUserIdT = {
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

export type SingleChallengeByChallengeIdT = {
  challengeId: string;
  name: string;
  thumbnailUrl: string;
  participants: number;
  frequency: string;
  howTo: string;
  description: string;
  category: string;
  profileUrls: string[];
};

export type SingleChallengeByUserChallengeIdT = {
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
  profileUrls: string[];
};

export type SingleRegisteredChallengeT = {
  message: string;
  userChallengeId: string;
};

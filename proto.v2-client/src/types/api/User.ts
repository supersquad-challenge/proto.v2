export type UserInfoT = {
  _id: string;
  email: string;
  googleId: string;
  name: string;
  profileUrl: string;
  locale: string;
  timezone: string;
  createdAt: string; // 날짜는 보통 문자열로 처리하거나 Date 객체로 변환할 수도 있습니다.
  __v: number;
  nickname: string;
  badge: BadgeT[]; // badge 배열에 대한 타입 정의
};

export type BadgeT = {
  challengeName: string;
};

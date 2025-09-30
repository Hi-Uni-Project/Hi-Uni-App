export interface TosData {
  serviceTosIsAgreed: boolean;
  personalInfoTosIsAgreed: boolean;
  marketingTosIsAgreed: boolean;
  serviceImprovementTosIsAgreed: boolean;
  inPersonTosIsAgreed: boolean;
}

export interface UnivData {
  univName: string;
  firstMajorName: string;
  secondMajorName: string;
  univEmail: string;
}

export interface SocialData {
  authToken: string;
  provider: string;
}

export interface RegisterFormData {
  tos: TosData;
  univ: UnivData;
  social: SocialData;
}

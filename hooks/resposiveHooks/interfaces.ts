export interface IMediaParameters {
  min?: number;
  max?: number;
}

export interface IUseMultiMatchMedia {
  [key: string]: IMediaParameters;
}

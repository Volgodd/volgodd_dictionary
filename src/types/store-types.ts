import type { JWTType, ParsedTheme, RawTheme, Word } from './data-types';

import type { OVERLAY_TYPE } from 'common/constants';

export type DataStore = {
  wordData: Word[] | undefined;
  themeData: ParsedTheme[] | undefined;
  getAndSetData: (jwt: JWTType) => void;
  setThemeData: (themeData: (RawTheme | ParsedTheme)[]) => void;
  setWordData: (wordData: Word[]) => void;
  resetData: () => void;
};

// type SetJwtProps = {jwt: JWTType}

export type UserStore = {
  jwt: JWTType | null;
  setJwt: ({ jwt }: { jwt: JWTType }) => void;
  clearJwt: () => void;
};

type OverlayType = OVERLAY_TYPE | undefined;
type OverlayMetadata = string | undefined;

type OpenOverlayProps = {
  overlayType: OverlayType;
  overlayMetadata?: OverlayMetadata;
};

export type OverlayStore = {
  overlayType: OverlayType;
  overlayMetadata: OverlayMetadata;
  openOverlay: ({ overlayType, overlayMetadata }: OpenOverlayProps) => void;
  closeOverlay: () => void;
};

//type SetThemesForLearnModeProps = { themesForLearnMode: ParsedTheme[] };

export type LearnModeStore = {
  themesForLearnMode: ParsedTheme[];
  translationFirst: boolean;
  resetLearnModeStore: () => void;
  setThemesForLearnMode: (themesForLearnMode: ParsedTheme[]) => void;
  setTranslationFirst: (arg: boolean) => void;
};

export type JWTType = string;

export type DataId = string;

export type WordLevel = 'VeryHard';

type ServerDataBase = {
  id: DataId;
  updatedAt: string;
  published_at: string;
  createdAt: string;
};

export type LoginData = {
  jwt: JWTType;
  user: Omit<ServerDataBase, 'published_at'> & {
    blocked: boolean;
    confirmed: boolean;
    email: string;
    provider: string;
    role: {
      description: string;
      id: string;
      name: string;
      type: string;
    };
    username: string;
  };
};

export type RawTheme = ServerDataBase & {
  name: string;
};

export type ParsedTheme = Pick<RawTheme, 'id' | 'name'> & {
  wordCount: number;
};

export type Word = ServerDataBase & {
  examples: string;
  foreign: string;
  level: WordLevel;
  native: string;
  themeIdList: DataId[];
};

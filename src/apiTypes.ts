export type PostResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  title: string;
  content: string;
  authorId: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string;
  };
};

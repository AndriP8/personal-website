import * as jwt from 'jsonwebtoken';

type User = {
  id: string;
  email: string;
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET ?? ''
  );
  return token;
};

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '');
  return decoded as User;
};

export const splitBearer = (bearer: string) => {
  const [, token] = bearer.split(' ');
  return token;
};

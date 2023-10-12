import * as jwt from 'jsonwebtoken';

type User = {
  id: string;
  email: string;
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.email },
    process.env.JWT_SECRET ?? ''
  );
  return token;
};

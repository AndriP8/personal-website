import * as jose from 'jose';

type User = {
  id: string;
  email: string;
};

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = 'HS256';

export const createJWT = async (user: User) => {
  const jwt = await new jose.SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg, typ: 'JWT' })
    .setIssuedAt()
    .sign(secret);

  return jwt;
};

export const decodeToken = async (token: string) => {
  const decoded = await jose.jwtVerify(token, secret);
  return decoded.payload as User;
};

export const splitBearer = (bearer: string) => {
  const [, token] = bearer.split(' ');
  return token;
};

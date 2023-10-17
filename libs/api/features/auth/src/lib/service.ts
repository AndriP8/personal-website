import {
  prismaClient,
  ResponseError,
  validate,
} from '@personal-website/api/shared/helper';
// Using bscrypt when issue https://github.com/kelektiv/node.bcrypt.js/issues/964 resolved
import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';

import { createJWT } from './jwt';
import { userValidation } from './validation';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const minPassword = 6;

export const createUserService = async (req: Request) => {
  const data = validate(userValidation, req);
  const countUser = await prismaClient.user.count({
    where: {
      email: data.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'Email already exist');
  }

  if (!data.email.match(emailRegex)) {
    throw new ResponseError(400, 'Email is not valid');
  } else if (data.password.length < minPassword) {
    throw new ResponseError(400, 'Password must contain min 6 character');
  } else {
    return prismaClient.user.create({
      data: {
        email: data.email,
        password: await hash(data.password, 5),
      },
    });
  }
};

export const loginUserService = async (req: Request, res: Response) => {
  const data = validate(userValidation, req);

  const user = await prismaClient.user.findUnique({
    where: {
      email: data.email,
    },
  });

  const isPasswordValid = user?.password
    ? await compare(data.password, user.password)
    : false;

  if (!isPasswordValid) {
    throw new ResponseError(400, 'Username or Password is invalid');
  } else {
    const token = createJWT({ id: user?.id, ...data });
    res.json({ token });
  }
};

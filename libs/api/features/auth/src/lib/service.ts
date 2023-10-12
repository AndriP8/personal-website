import {
  prismaClient,
  ResponseError,
  validate,
} from '@personal-website/api/shared/helper';
// Using bscrypt when issue https://github.com/kelektiv/node.bcrypt.js/issues/964 resolved
import { hash } from 'bcryptjs';
import { Request, Response } from 'express';

import { createJWT } from './jwt';
import { createUserValidation } from './validation';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const minPassword = 6;

export const createNewUser = async (req: Request, res: Response) => {
  const data = validate(createUserValidation, req);
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
    const user = await prismaClient.user.create({
      data: {
        email: data.email,
        password: await hash(data.password, 5),
      },
    });

    const token = createJWT(user);
    return res.json({ token: token });
  }
};

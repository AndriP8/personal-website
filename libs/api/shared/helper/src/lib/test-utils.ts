import { hash } from 'bcryptjs';

import { prismaClient } from './database';

export const createTestUser = async () => {
  const password = 'test123';

  return prismaClient.user.create({
    data: {
      email: 'test@gmail.com',
      password: await hash(password, 5),
    },
  });
};

export const removeTestUser = async () => {
  return prismaClient.user.deleteMany({
    where: {
      email: 'test@gmail.com',
    },
  });
};

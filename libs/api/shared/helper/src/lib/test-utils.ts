import { prismaClient } from './database';

export const removeTestUser = async () => {
  return prismaClient.user.deleteMany({
    where: {
      email: 'test@gmail.com',
    },
  });
};

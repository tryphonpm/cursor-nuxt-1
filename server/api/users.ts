import { User } from '../models/User';

export default defineEventHandler(async (event) => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération des utilisateurs',
    });
  }
});

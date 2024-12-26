import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'auth_token');

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Non authentifié',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Utilisateur non trouvé',
      });
    }

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Non authentifié',
    });
  }
});

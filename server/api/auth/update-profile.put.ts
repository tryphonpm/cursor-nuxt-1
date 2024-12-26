import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

interface JwtPayload {
  userId: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const token = getCookie(event, 'auth_token');

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Non authentifié',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as JwtPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Utilisateur non trouvé',
      });
    }

    // Vérifier si le nouvel email/username n'est pas déjà utilisé
    const existingUser = await User.findOne({
      $and: [
        { _id: { $ne: user._id } },
        { $or: [{ email: body.email }, { username: body.username }] },
      ],
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "L'email ou le nom d'utilisateur est déjà utilisé",
      });
    }

    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.username = body.username;
    user.email = body.email;
    await user.save();

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la mise à jour du profil',
    });
  }
});

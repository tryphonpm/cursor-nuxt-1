import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    // Récupérer le token depuis les headers
    const authHeader = getHeader(event, 'Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'Token manquant ou invalide',
      });
    }

    const token = authHeader.split(' ')[1];

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    // Récupérer l'utilisateur
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Utilisateur non trouvé',
      });
    }

    // Retourner les informations de validation
    return {
      valid: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw createError({
        statusCode: 401,
        message: 'Token invalide ou expiré',
      });
    }

    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la vérification du token',
    });
  }
});

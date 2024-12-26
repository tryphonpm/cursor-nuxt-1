import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  try {
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Identifiants invalides',
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Identifiants invalides',
      });
    }

    // Générer le JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    // Retourner le token et les informations de l'utilisateur
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la connexion',
    });
  }
});

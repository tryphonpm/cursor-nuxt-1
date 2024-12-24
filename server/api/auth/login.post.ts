import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect',
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '24h',
    });

    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la connexion',
    });
  }
});

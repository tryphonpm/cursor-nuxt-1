import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '~/server/models/user';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, username, email, password } = body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message:
          existingUser.email === email
            ? 'Cet email est déjà utilisé'
            : "Ce nom d'utilisateur est déjà utilisé",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    // Générer le token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    return {
      success: true,
      message: 'Inscription réussie',
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
      message: error.message || "Erreur lors de l'inscription",
    });
  }
});

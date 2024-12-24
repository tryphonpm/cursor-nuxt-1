import bcrypt from 'bcrypt';
import { User } from '../../models/User';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email, password } = body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà",
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
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
      message: "Erreur lors de la création de l'utilisateur",
    });
  }
});

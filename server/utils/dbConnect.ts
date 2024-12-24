import mongoose from 'mongoose';

export default async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI manquant dans les variables d'environnement");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🎯 Connecté à MongoDB');
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error);
  }
};

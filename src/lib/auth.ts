import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

interface TokenData {
  id: string;
  name: string;
  fields: {
    userField: string;
  };
}

export function generateToken(customerId: string, customerName: string): string {
  // Debug environment variables
  console.log('Environment check:', {
    key: env.VITE_WORKSPACE_KEY,
    hasSecret: !!env.VITE_WORKSPACE_SECRET
  });

  if (!env.VITE_WORKSPACE_KEY || !env.VITE_WORKSPACE_SECRET) {
    throw new Error('Missing required environment variables');
  }

  const tokenData: TokenData = {
    id: customerId,
    name: customerName,
    fields: {
      userField: '<user field value>',
    },
  };

  const options: jwt.SignOptions = {
    issuer: env.VITE_WORKSPACE_KEY,
    expiresIn: 7200,
    algorithm: 'HS512',
  };

  try {
    return jwt.sign(
      tokenData, 
      String(env.VITE_WORKSPACE_SECRET), 
      options
    );
  } catch (error) {
    console.error('JWT signing error:', error);
    throw error;
  }
}

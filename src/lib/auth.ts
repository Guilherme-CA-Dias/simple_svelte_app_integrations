import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

interface TokenData {
  id: string;
  name: string;
  fields: {
    userField: string;
  };
}

const WORKSPACE_KEY = env.VITE_WORKSPACE_KEY;
const WORKSPACE_SECRET = env.VITE_WORKSPACE_SECRET;

export function generateToken(customerId: string, customerName: string): string {
  const tokenData: TokenData = {
    id: customerId,
    name: customerName,
    fields: {
      userField: '<user field value>',
    },
  };

  const options = {
    issuer: WORKSPACE_KEY,
    expiresIn: 7200,
    algorithm: 'HS512' as const,
  };

  return jwt.sign(tokenData, WORKSPACE_SECRET, options);
}

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequest } from 'http-errors';

import { config } from '../config';

export function generateAccessToken(id, role) {
  return jwt.sign(
    {
      id,
      role,
      type: 'ACCESS',
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    },
  );
}

export function verifyToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new BadRequest('invalid_token');
  }
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

export function comparePasswords(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword);
}

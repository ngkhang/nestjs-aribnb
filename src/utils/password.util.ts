/* eslint-disable no-console */
import * as bcrypt from 'bcrypt';

/**
 * PasswordService provides methods for hashing and comparing passwords using the bcrypt library.
 * @link https://docs.nestjs.com/security/encryption-and-hashing
 */
class PasswordService {
  private readonly saltRounds: number = 10;

  /**
   * Hashes a plain text password.
   * @param plaintextPass The plain text password to hash.
   * @returns A Promise that resolves to the hashed password.
   * @throws Will log an error if hashing fails.
   */
  hashPassword = async (plaintextPass: string): Promise<string> => {
    try {
      return bcrypt.hashSync(plaintextPass, this.saltRounds);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  };

  /**
   * Compares a plain text password with a hashed password.
   * @param plaintextPass The plain text password to compare.
   * @param hashPass The hashed password to compare against.
   * @returns A Promise that resolves to a boolean indicating whether the passwords match.
   * @throws Will log an error if comparison fails.
   */
  comparePassword = async (
    plaintextPass: string,
    hashPass: string
  ): Promise<boolean> => {
    try {
      return bcrypt.compareSync(plaintextPass, hashPass);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  };
}

export const passwordService = new PasswordService();

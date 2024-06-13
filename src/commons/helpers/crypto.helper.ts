import * as CryptoJS from 'crypto-js';

export const encrypt = (plainText: string, secret: string): string => {
  return CryptoJS.AES.encrypt(plainText, secret).toString();
};

export const decrypt = (ciphertext: string, secret: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};

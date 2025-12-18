import crypto from "crypto";

const ALGO = "aes-256-cbc";
const KEY = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPT_SECRET)
  .digest("base64")
  .substring(0, 32);

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (data) => {
  const [iv, encrypted] = data.split(":");
  const decipher = crypto.createDecipheriv(
    ALGO,
    KEY,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

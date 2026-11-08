import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "fh-admin-session";
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is missing");
  }

  return secret;
}

function sign(value) {
  return createHmac("sha256", getSecret())
    .update(value)
    .digest("hex");
}

export function createAdminSession() {
  const timestamp = Date.now().toString();
  return `${timestamp}.${sign(timestamp)}`;
}

export function verifyAdminSession(token) {
  if (!token) return false;

  const [timestamp, signature] = token.split(".");
  if (!timestamp || !signature) return false;

  const age = Date.now() - Number(timestamp);

  if (!Number.isFinite(age) || age < 0 || age > SESSION_DURATION) {
    return false;
  }

  const expected = sign(timestamp);

  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

export function isAdminRequest(request) {
  const cookieHeader = request.headers.get("cookie") || "";

  const cookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${COOKIE_NAME}=`));

  const token = cookie?.slice(COOKIE_NAME.length + 1);

  return verifyAdminSession(token);
}

export { COOKIE_NAME, SESSION_DURATION };
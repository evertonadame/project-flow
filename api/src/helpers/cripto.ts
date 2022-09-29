const algorithm = 'sha256';

export async function createHash(plainString: string) {
  const { createHmac } = await import('crypto');
  return createHmac(algorithm, process.env.API_HASH_KEY)
    .update(plainString)
    .digest('hex');
}

/**
 *
 * @param hashString hashaed string
 * @param plainString plain string
 * @returns boolean
 */
export async function compareHash(hashString: string, plainString: string) {
  const { timingSafeEqual } = await import('crypto');
  const newHash = await createHash(plainString);

  if (newHash.length !== hashString.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(newHash, 'utf-8'),
    Buffer.from(hashString, 'utf-8'),
  );
}

/**
 * Checks a password against Have I Been Pwned's list of passwords exposed in
 * data breaches. Uses k-anonymity: only the first 5 hex characters of the
 * password's SHA-1 hash are sent, never the password or its full hash.
 *
 * Returns how many times the password appears in breaches (0 if none), or
 * null if the check couldn't run (offline, service down). Callers should let
 * the user continue when it returns null.
 */
export async function pwnedPasswordCount(password: string): Promise<number | null> {
  try {
    const bytes = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(password));
    const hash = Array.from(new Uint8Array(bytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { 'Add-Padding': 'true' },
    });
    if (!res.ok) return null;

    for (const line of (await res.text()).split('\n')) {
      const [candidate, count] = line.trim().split(':');
      if (candidate === suffix) return parseInt(count, 10) || 0;
    }
    return 0;
  } catch {
    return null;
  }
}

export const BREACHED_PASSWORD_MESSAGE =
  'That password has appeared in a known data breach, so it is easy for attackers to guess. Please choose a different one.';

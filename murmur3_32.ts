export function murmur3_32(key: Uint8Array, seed: number): number {
	const c1 = 0xcc9e2d51;
	const c2 = 0x1b873593;
	const r1 = 15;
	const r2 = 13;
	const m = 5;
	const n = 0xe6546b64;
	const len = key.length | 0;
	let hash = Math.floor(seed) | 0;

	// Process the key in 4-byte chunks
	const numChunks = Math.floor(len / 4);
	for (let i = 0; i < numChunks; i++) {
		let k =
			(key[i * 4] & 0xff) |
			((key[i * 4 + 1] & 0xff) << 8) |
			((key[i * 4 + 2] & 0xff) << 16) |
			((key[i * 4 + 3] & 0xff) << 24);

		k = Math.imul(k, c1);
		k = (k << r1) | (k >>> (32 - r1));
		k = Math.imul(k, c2);

		hash ^= k;
		hash = (hash << r2) | (hash >>> (32 - r2));
		hash = Math.imul(hash, m) + n;
	}

	// Process any remaining bytes
	let remainingBytes = 0;
	for (let i = len & 3; i > 0; i--) {
		remainingBytes <<= 8;
		remainingBytes |= key[len - i] & 0xff;
	}

	if (remainingBytes) {
		remainingBytes = Math.imul(remainingBytes, c1);
		remainingBytes = (remainingBytes << r1) | (remainingBytes >>> (32 - r1));
		remainingBytes = Math.imul(remainingBytes, c2);
		hash ^= remainingBytes;
	}

	// Finalization mix
	hash ^= len;
	hash ^= hash >>> 16;
	hash = Math.imul(hash, 0x85ebca6b);
	hash ^= hash >>> 13;
	hash = Math.imul(hash, 0xc2b2ae35);
	hash ^= hash >>> 16;

	return hash >>> 0; // Return unsigned 32-bit integer
}

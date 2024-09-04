export function murmur3_64(key: Uint8Array, seed: bigint): bigint {
	const c1 = 0x87c37b91114253d5n;
	const c2 = 0x4cf5ad432745937fn;
	const r1 = 31n;
	const r2 = 27n;
	const r3 = 33n;
	const m = 5n;
	const n1 = BigInt(0x52dce729);
	const n2 = BigInt(0x38495ab5);
	const len = key.length;

	let hash1 = seed;
	let hash2 = seed;

	// Process the key in 16-byte chunks
	const numChunks = Math.floor(len / 16);
	for (let i = 0; i < numChunks; i++) {
		let k1 = BigInt.asUintN(
			64,
			BigInt(key[i * 16]) |
				(BigInt(key[i * 16 + 1]) << 8n) |
				(BigInt(key[i * 16 + 2]) << 16n) |
				(BigInt(key[i * 16 + 3]) << 24n) |
				(BigInt(key[i * 16 + 4]) << 32n) |
				(BigInt(key[i * 16 + 5]) << 40n) |
				(BigInt(key[i * 16 + 6]) << 48n) |
				(BigInt(key[i * 16 + 7]) << 56n)
		);

		let k2 = BigInt.asUintN(
			64,
			BigInt(key[i * 16 + 8]) |
				(BigInt(key[i * 16 + 9]) << 8n) |
				(BigInt(key[i * 16 + 10]) << 16n) |
				(BigInt(key[i * 16 + 11]) << 24n) |
				(BigInt(key[i * 16 + 12]) << 32n) |
				(BigInt(key[i * 16 + 13]) << 40n) |
				(BigInt(key[i * 16 + 14]) << 48n) |
				(BigInt(key[i * 16 + 15]) << 56n)
		);

		k1 = BigInt.asUintN(64, k1 * c1);
		k1 = BigInt.asUintN(64, (k1 << r1) | (k1 >> (64n - r1)));
		k1 = BigInt.asUintN(64, k1 * c2);
		hash1 ^= k1;

		hash1 = BigInt.asUintN(64, (hash1 << r2) | (hash1 >> (64n - r2)));
		hash1 = BigInt.asUintN(64, hash1 + hash2);
		hash1 = BigInt.asUintN(64, hash1 * m + n1);

		k2 = BigInt.asUintN(64, k2 * c2);
		k2 = BigInt.asUintN(64, (k2 << r3) | (k2 >> (64n - r3)));
		k2 = BigInt.asUintN(64, k2 * c1);
		hash2 ^= k2;

		hash2 = BigInt.asUintN(64, (hash2 << r2) | (hash2 >> (64n - r2)));
		hash2 = BigInt.asUintN(64, hash2 + hash1);
		hash2 = BigInt.asUintN(64, hash2 * m + n2);
	}

	// Process any remaining bytes
	let remainingBytes = BigInt(0);
	for (let i = len & 15; i > 0; i--) {
		remainingBytes = BigInt.asUintN(64, remainingBytes << 8n);
		remainingBytes |= BigInt(key[len - i]);
	}

	if (remainingBytes) {
		remainingBytes = BigInt.asUintN(64, remainingBytes * c1);
		remainingBytes = BigInt.asUintN(64, (remainingBytes << r1) | (remainingBytes >> (64n - r1)));
		remainingBytes = BigInt.asUintN(64, remainingBytes * c2);
		hash1 ^= remainingBytes;
	}

	// Finalization mix
	hash1 ^= BigInt(len);
	hash2 ^= BigInt(len);

	hash1 = BigInt.asUintN(64, hash1 + hash2);
	hash2 = BigInt.asUintN(64, hash2 + hash1);

	hash1 ^= hash1 >> 33n;
	hash1 = BigInt.asUintN(64, hash1 * BigInt(0xff51afd7ed558ccdn));
	hash1 ^= hash1 >> 33n;
	hash1 = BigInt.asUintN(64, hash1 * BigInt(0xc4ceb9fe1a85ec53n));
	hash1 ^= hash1 >> 33n;

	hash2 ^= hash2 >> 33n;
	hash2 = BigInt.asUintN(64, hash2 * BigInt(0xff51afd7ed558ccdn));
	hash2 ^= hash2 >> 33n;
	hash2 = BigInt.asUintN(64, hash2 * BigInt(0xc4ceb9fe1a85ec53n));
	hash2 ^= hash2 >> 33n;

	hash1 = BigInt.asUintN(64, hash1 + hash2);
	hash2 = BigInt.asUintN(64, hash2 + hash1);

	return BigInt.asUintN(64, hash1);
}

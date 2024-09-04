# Murmur3 Hash Functions

This TypeScript package provides implementations of the Murmur3 hash functions, specifically the 32-bit and 64-bit variants.

## Usage

```typescript
import { murmur3_32, murmur3_64 } from './index.ts';

// 32-bit Murmur3 hash
const hash32 = murmur3_32('Hello, World!');

// 64-bit Murmur3 hash
const hash64 = murmur3_64('Hello, World!');
```

## API

### murmur3_32(key: string, seed?: number): number

Computes the 32-bit Murmur3 hash of the given key.

- `key`: The input string to hash
- `seed` (optional): A seed value for the hash (default: 0)

Returns a 32-bit integer.

### murmur3_64(key: string, seed?: number): bigint

Computes the 64-bit Murmur3 hash of the given key.

- `key`: The input string to hash
- `seed` (optional): A seed value for the hash (default: 0)

Returns a 64-bit BigInt.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

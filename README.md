# Prisma Custom Extensions

## Overview
This project is a custom client extension designed to enhance the usability of the Prisma client with additional features. It aims to simplify daily usage for developers by providing extended functionalities.

## Features

- **Cache Extension**: Implements caching mechanisms to improve performance and reduce database load. This extension is particularly useful for applications with frequent read operations, as it minimizes database queries by caching results.

- **Custom Find Extension**: Provides enhanced querying capabilities beyond the standard Prisma client. This extension allows for more complex queries and data retrieval operations, making it easier to work with large datasets.

## Installation

To install the Prisma Custom Extensions, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/prisma-custom-extensions.git
   ```

2. Navigate to the project directory:
   ```bash
   cd prisma-custom-extensions
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Cache Extension
The cache extension is located in the `src/extensions/cache` directory. It includes:

- `extension.ts`: The main implementation of the caching logic.
- `extension.test.ts`: Unit tests for the caching extension.
- `type.ts`: Type definitions related to caching.

To use the cache extension, import it into your project and configure it as needed. Here's a basic example:

```typescript
import { CacheExtension } from './src/extensions/cache/extension';

// Example usage
prisma.$extends(PrismaCustomFindExtension());
const results = prisma.findFirstWithCache({ /* query options */ });

```

### Custom Find Extension
The custom find extension is located in the `src/extensions/customFind` directory. It includes:

- `extension.ts`: The main implementation of the custom find logic.
- `extension.test.ts`: Unit tests for the custom find extension.
- `type.ts`: Type definitions related to custom find operations.

Example usage:

```typescript
import { CustomFindExtension } from './src/extensions/customFind/extension';

prisma.$extends(PrismaCustomFindExtension());

const results = prisma.findAndCountMany({ /* query options */ });
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
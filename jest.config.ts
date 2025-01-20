import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', // Diretório raiz do projeto Next.js
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Configuração para aliases
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Configuração correta do transform
  },
  transformIgnorePatterns: [
    '/node_modules/(?!lucide-react)', // Garante que `lucide-react` seja transformado
  ],
};

export default createJestConfig(customJestConfig);

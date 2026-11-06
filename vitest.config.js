import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setupTests.js',
        css: false,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{js,jsx}'],
            exclude: [
                'node_modules/',
                'src/main.jsx',
                'src/test/**',
                '**/*.d.ts',
            ],
        },
    },
});

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/_shared/index.ts'],
  format: ['esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  outDir: 'dist',
});

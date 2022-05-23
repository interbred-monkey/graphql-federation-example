require('esbuild').build({
  entryPoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  target: 'es2019',
  platform: 'node',
  format: 'cjs',
});

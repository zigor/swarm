import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/main.js',
  dest: 'dist/main.js',
  format: 'umd',
  sourceMap: false,
  moduleName: "swarm",
  plugins: [
    eslint({      
    }),
    /*uglify(),*/    
  ],
};
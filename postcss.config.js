import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
    }),
  ],
};

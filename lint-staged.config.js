const formatThenLint = 'eslint -c .eslintrc.js --fix';
const formatOnly = 'prettier --write';
const checkTypes = () => 'tsc -p tsconfig.json --noEmit';

module.exports = {
  '*.ts?(x)': checkTypes,
  '*.{js,ts}': formatThenLint,
  '*.{scss,css,md,json}': formatOnly,
};

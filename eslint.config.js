import antfu from '@antfu/eslint-config';

export default antfu({
  rules: {
    'no-irregular-whitespace': 0,
    'no-console': 0,
  },
  stylistic: {
    semi: true,
  },
});

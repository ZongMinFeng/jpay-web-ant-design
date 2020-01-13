module.exports = {
  root: true,
  env: {
    node: true
  },
  //烦得很，去掉eslint校验
  // 'extends': [
  //   //   'plugin:vue/essential',
  //   //   '@vue/standard'
  //   // ],
  'extends': ["plugin:vue/essential"],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

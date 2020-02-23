const path = require('path');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    'node': true,
    'browser': true
  },
  extends: [
    '@chiedolabs/eslint-config-nextjs',
    'plugin:jest/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: {
          resolve: {
            extensions: ['*', '.js', '.jsx'],
            alias: {
              '~api': path.resolve(__dirname, './apollo'),
              '~lib': path.resolve(__dirname, './lib'),
              '~components': path.resolve(__dirname, './components')
            }
          }
        }
      }
    }
  },
  globals: {
    shallow: true,
    render: true,
    mount: true,
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
  rules: {
    'comma-dangle': [
      'error', {
        'functions': 'ignore'
      }
    ],
    'no-param-reassign': [
      'error', {
        'props': false
      }
    ],
    'no-underscore-dangle': [
      'error', {
        'allow': [
          '_id'
        ]
      }
    ],
    'import/no-extraneous-dependencies': [
      'error', {
        'devDependencies': true
      }
    ],
    'jsx-a11y/label-has-associated-control': [
      'error', {
        'required': {
          'some': ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/label-has-for': [
      'error', {
        'required': {
          'some': ['nesting', 'id']
        }
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
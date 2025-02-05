module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
        'jest': true,
    },
    'rules': {
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        'no-underscore-dangle': 'off',
        'consistent-return': 'off',
        'import/prefer-default-export': 'off'
    },
    'globals': {
        "fetch": false
    }
}
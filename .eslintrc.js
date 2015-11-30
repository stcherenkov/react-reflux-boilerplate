module.exports = {
    env: {
        browser: true,
        es6: true,
        jasmine: true
    },
    ecmaFeatures: {
        arrowFunctions: true,
        blockBindings: true,
        classes: true,
        defaultParams: true,
        destructuring: true,
        modules: true,
        objectLiteralShorthandMethods: true,
        objectLiteralShorthandProperties: true,
        spread: true,
        templateStrings: true,
        jsx: true
    },
    rules: {
        indent: [1, 4],
        'jsx-quotes': [1, 'prefer-double'],
        quotes: [1, 'single'],
        'vars-on-top': 1,
        yoda: [2, 'never'],
        curly: 1,
        'dot-location': [1, 'property'],
        'dot-notation': 1,
        semi: [1, 'never'],
        'eol-last': 1,
        camelcase: [2, { properties: 'always' }],
        'block-spacing': [2, 'always'],
        'consistent-this': [2, 'that'],
        'no-trailing-spaces': [2, { 'skipBlankLines': true }],
        // React rules
        'react/prefer-es6-class': 1
    },
    plugins: [
        'react'
    ]
}

// lowercase-single-dashed-names-only-0
const namingPattern = /^-?[a-z0-9]+(-[a-z0-9]+)*$/;

module.exports = {
  extends: ['./node_modules/prettier-stylelint/config.js', 'stylelint-config-recommended-scss'],
  namingPattern,
  plugins: [
    'stylelint-a11y',
    'stylelint-at-rule-no-children',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-declaration-strict-value',
    'stylelint-high-performance-animation',
    'stylelint-images',
    'stylelint-no-indistinguishable-colors',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-scss',
    'stylelint-suitcss',
    'stylelint-z-index-value-constraint'
  ],
  rules: {
    'a11y/content-property-no-static-value': null,
    'a11y/font-size-is-readable': true,
    'a11y/line-height-is-vertical-rhythmed': null,
    'a11y/media-prefers-reduced-motion': null,
    'a11y/no-display-none': true,
    'a11y/no-obsolete-attribute': true,
    'a11y/no-obsolete-element': true,
    'a11y/no-outline-none': true,
    'a11y/no-spread-text': null,
    'a11y/no-text-align-justify': true,
    'a11y/selector-pseudo-class-focus': null,
    'aditayvm/at-rule-no-children': [
      {
        ignore: ['each', 'for', 'if', 'mixin']
      }
    ],
    'at-rule-blacklist': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment']
      }
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-newline-after': null,
    'at-rule-name-space-after': 'always-single-line',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'content',
          'each',
          'else',
          'error',
          'extend',
          'for',
          'if',
          'import-normalize',
          'include',
          'mixin'
        ]
      }
    ],
    'at-rule-no-vendor-prefix': true,
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-semicolon-space-before': 'never',
    'at-rule-whitelist': null,
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': null,
    'block-closing-brace-newline-before': 'always',
    'block-closing-brace-space-before': null,
    'block-closing-brace-space-after': null,
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-newline-before': null,
    'block-opening-brace-space-after': null,
    'block-opening-brace-space-before': 'always',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-hex': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands']
      }
    ],
    'comment-no-empty': true,
    'comment-whitespace-inside': 'always',
    'comment-word-blacklist': null,
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
    'custom-property-pattern': null,
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': null,
    'declaration-block-semicolon-space-after': null,
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 0,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-newline-after': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
    'declaration-no-important': true,
    'declaration-property-unit-blacklist': null,
    'declaration-property-unit-whitelist': null,
    'declaration-property-value-blacklist': null,
    'declaration-property-value-whitelist': null,
    'font-family-no-duplicate-names': true,
    'font-family-name-quotes': 'always-where-recommended',
    'font-family-no-missing-generic-family-keyword': true,
    'font-weight-notation': 'named-where-possible',
    'function-blacklist': null,
    'function-calc-no-unspaced-operator': true,
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-newline-before': 'never-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-url-no-scheme-relative': true,
    'function-url-quotes': 'always',
    'function-url-scheme-blacklist': null,
    'function-url-scheme-whitelist': null,
    'function-whitelist': null,
    'function-whitespace-after': 'always',
    'images/broken': true,
    'images/prefer-data-uri': 256,
    indentation: [
      2,
      {
        indentInsideParens: 'once-at-root-twice-in-block'
      }
    ],
    'keyframe-declaration-no-important': true,
    'keyframes-name-pattern': null,
    'length-zero-no-unit': true,
    'max-empty-lines': 1,
    'max-line-length': [
      100,
      {
        ignore: ['comments'],
        ignorePattern: '/^@import\\s+/'
      }
    ],
    'max-nesting-depth': [
      5,
      {
        ignoreAtRules: ['media']
      }
    ],
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-blacklist': null,
    'media-feature-name-case': 'lower',
    'media-feature-name-no-unknown': true,
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-name-value-whitelist': null,
    'media-feature-name-whitelist': null,
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-newline-before': null,
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',
    'no-descending-specificity': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-eol-whitespace': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': null,
    'no-missing-end-of-source-newline': true,
    'number-leading-zero': 'never',
    'number-no-trailing-zeros': true,
    'number-max-precision': 3,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-low-performance-animation-properties': [
      true,
      {
        ignore: 'paint-properties',
        ignoreProperties: ['background-color', 'color']
      }
    ],
    'plugin/no-unsupported-browser-features': null,
    'plugin/stylelint-no-indistinguishable-colors': null,
    'plugin/z-index-value-constraint': {
      min: 1,
      max: 3
    },
    'property-blacklist': null,
    'property-case': 'lower',
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['critical-selector']
      }
    ],
    'property-no-vendor-prefix': true,
    'property-whitelist': null,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    // 'scale-unlimited/declaration-strict-value': ['background-color', 'border-color', 'color', 'font-family', 'z-index'],
    'scss/selector-no-redundant-nesting-selector': true,
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-blacklist': null,
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-whitelist': null,
    'selector-attribute-quotes': 'always',
    // 'selector-class-pattern': namingPattern,
    'selector-combinator-blacklist': null,
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-combinator-whitelist': null,
    'selector-descendant-combinator-no-non-space': true,
    'selector-id-pattern': namingPattern,
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-newline-before': null,
    'selector-list-comma-space-after': null,
    'selector-list-comma-space-before': 'never',
    'selector-max-attribute': 1,
    'selector-max-class': null,
    'selector-max-combinators': 3,
    'selector-max-compound-selectors': null,
    'selector-max-empty-lines': 1,
    'selector-max-id': 1,
    'selector-max-pseudo-class': 2,
    'selector-max-specificity': null,
    'selector-max-type': [
      2,
      {
        ignore: ['child', 'descendant']
      }
    ],
    'selector-max-universal': 0,
    'selector-nested-pattern': null,
    'selector-no-qualifying-type': null,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-blacklist': null,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-class-whitelist': null,
    'selector-pseudo-element-blacklist': null,
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': true,
    'selector-pseudo-element-whitelist': null,
    'selector-type-case': 'lower',
    'selector-type-no-unknown': null,
    'shorthand-property-no-redundant-values': true,
    'string-no-newline': true,
    'string-quotes': 'single',
    'suitcss/custom-property-no-outside-root': true,
    'suitcss/root-no-standard-properties': true,
    'suitcss/selector-root-no-composition': true,
    'time-min-milliseconds': 100,
    // 'unit-blacklist': ['rem', 'em'],
    'unit-case': 'lower',
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['x']
      }
    ]
  },
  // 'unit-whitelist': ['%', 'deg', 'px', 's', 'vh', 'vmax', 'vmin', 'vw'],
  'value-keyword-case': 'lower',
  'value-list-comma-newline-after': 'always-multi-line',
  'value-list-comma-newline-before': null,
  'value-list-comma-space-after': 'always-single-line',
  'value-list-comma-space-before': 'never',
  'value-list-max-empty-lines': 0,
  'value-no-vendor-prefix': true
};

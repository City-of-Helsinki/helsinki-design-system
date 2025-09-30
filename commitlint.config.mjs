export default {
  extends: [
    '@commitlint/config-conventional'
  ],
  ignores: [
    (message) => message.includes('Signed-off-by: dependabot[bot]')
  ],
  rules: {
    'header-max-length': [
      2,
      'always',
      72
    ],
    'body-max-line-length': [
      2,
      'always',
      72
    ],
    'body-leading-blank': [
      2,
      'always'
    ],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'deps',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { env } from '@alepop/stencil-env';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';

export const config: Config = {
  namespace: 'crds-components',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs-readme' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  nodeResolve: {
    browser: true,
    preferBuiltins: true
  },
  plugins: [
    env(),
    sass({
      injectGlobalPaths: [
        'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/variables',
        'node_modules/crds-styles/assets/stylesheets/variables',
        'node_modules/crds-styles/assets/stylesheets/overrides',
        'src/assets/stylesheets/globals/all'
      ]
    }),
    builtins(),
    globals(),
    replace({
      'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN),
      'process.env.CONTENTFUL_SPACE_ID': JSON.stringify(process.env.CONTENTFUL_SPACE_ID),
      'process.env.CONTENTFUL_ENV': JSON.stringify(process.env.CONTENTFUL_ENV),
      'process.env.CRDS_INTERACTIONS_ENDPOINT': JSON.stringify(process.env.CRDS_INTERACTIONS_ENDPOINT),
      'process.env.CRDS_GQL_ENDPOINT': JSON.stringify(process.env.CRDS_GQL_ENDPOINT)
    })
  ]
};

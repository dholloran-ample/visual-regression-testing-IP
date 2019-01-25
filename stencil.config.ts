import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { env } from "@alepop/stencil-env";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import replace from "rollup-plugin-replace";

export const config: Config = {
  namespace: "crds-components",
  outputTargets: [
    { type: "dist" },
    { type: "docs" },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  nodeResolve: {
    browser: true
  },
  plugins: [
    env(), //
    sass(),
    builtins(),
    globals(),
    replace({
      "process.env.CONTENTFUL_ACCESS_TOKEN": JSON.stringify(
        process.env.CONTENTFUL_ACCESS_TOKEN
      ),
      "process.env.CONTENTFUL_SPACE_ID": JSON.stringify(
        process.env.CONTENTFUL_SPACE_ID
      ),
      "process.env.CONTENTFUL_ENV": JSON.stringify(process.env.CONTENTFUL_ENV),
      "process.env.CRDS_INTERACTIONS_ENDPOINT": JSON.stringify(
        process.env.CRDS_INTERACTIONS_ENDPOINT
      )
    })
  ]
};

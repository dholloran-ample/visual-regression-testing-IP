import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

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
  plugins: [sass(), builtins(), globals()]
};

import axios from 'axios';
import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if(args.path === "index.js"){
          return { path: args.path, namespace: 'a' };
        }
        if(args.path.includes("./") || args.path.includes("../")){
          const formattedURL = new URL(args.path, args.importer + "/");
          return {
            namespace: "a",
            path: formattedURL.href
          }
        }
        return { path: `https://unpkg.com/${args.path}`, namespace: 'a' }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const tiny = require("medium-test-pkg");
              console.log(message);
            `,
          };
        }
        const {data} = await axios.get(args.path);
        return {
          loader: "jsx",
          contents: data
        }
      });
    },
  };
};
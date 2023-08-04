import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: "fileCache"
});

export const unpkgPathPlugin = (input: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if(args.path === "index.js"){
          return { path: args.path, namespace: 'a' };
        }
        if(args.path.includes("./") || args.path.includes("../")){
          const formattedURL = new URL(args.path, "https://unpkg.com" + args.resolveDir + "/");
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
            contents: input,
          };
        }
        const cachedResult = await localforage.getItem<esbuild.OnLoadResult>(args.path);
        if(cachedResult){
          return cachedResult
        }
        const {data, request} = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname
        }
        localforage.setItem(args.path, result);
      });
    },
  };
};

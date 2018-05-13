declare module "@webpack-contrib/config-loader" {
  import webpack from "webpack";
  interface Result {
    config: webpack.Configuration;
    configPath: string;
  }
  interface Options {
    configPath?: string;
    cwd?: string;
    require?: string;
    schema?: string;
  }
  function loader(options?: Options): Promise<Result>;
  export default loader;
}

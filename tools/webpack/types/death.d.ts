// TODO(laat): contribute to upstream definitelyTyped
declare module "death" {
  interface Options {
    uncaughtException?: true;
    debug?: true;
    SIGHUP?: true;
  }

  interface Callback {
    (signal: string, err: any): any;
  }

  /**
   * Gracefully cleanup when termination signals are sent to your process.
   */
  function death(options: Options): (callback: Callback) => () => {};
  /**
   * Gracefully cleanup when termination signals are sent to your process.
   */
  function death(callback: Callback): () => {};
  export = death;
}

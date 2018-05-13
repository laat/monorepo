// TODO(laat): contribute to upstream definitelyTyped
declare module "opn" {
  import { ChildProcess } from "child_process";
  interface Options {
    wait?: boolean;
    app: string | string[];
  }
  /**
   * Cross-Platform open.
   *
   * Uses the command `open` on macOS, `start` on Windows and `xdg-open` on other platforms.
   */
  function opn(target: string, options?: Options): Promise<ChildProcess>;
  export = opn;
}

import onKill from "death";
import webpack from "webpack";
import loadConfig from "@webpack-contrib/config-loader";

onKill(() => {
  process.exit();
});

interface Options {
  configPath?: string;
  cwd?: string;
}

const main = async ({ configPath, cwd = process.cwd() }: Options) => {
  const { config } = await loadConfig({ configPath, cwd });
  const compiler = webpack(config);
};

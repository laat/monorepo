workspace(name = "bazel_testing2")

######################################################################
# Skylib (skylark library)
######################################################################

git_repository(
    name = "bazel_skylib",
    remote = "https://github.com/bazelbuild/bazel-skylib.git",
    tag = "0.3.1",  # change this to use a different release
)

######################################################################
# Node.JS
######################################################################
git_repository(
    name = "build_bazel_rules_nodejs",
    remote = "https://github.com/bazelbuild/rules_nodejs.git",
    tag = "0.8.0",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")

node_repositories(package_json = ["//:package.json"])

######################################################################
# Go rules
# ts_devserver needs the Go rules.
######################################################################
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "f70c35a8c779bb92f7521ecb5a1c6604e9c3edd431e50b6376d7497abc8ad3c1",
    url = "https://github.com/bazelbuild/rules_go/releases/download/0.11.0/rules_go-0.11.0.tar.gz",
)

load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains()

######################################################################
# WEB Testing (transitive dep by rules_typescript)
######################################################################
http_archive(
    name = "io_bazel_rules_webtesting",
    url = "https://github.com/bazelbuild/rules_webtesting/archive/ca7b8062d9cf4ef2fde9193c7d37a0764c4262d7.zip",
    strip_prefix = "rules_webtesting-ca7b8062d9cf4ef2fde9193c7d37a0764c4262d7",
    sha256 = "28c73cf9d310fa6dba30e66bdb98071341c99c3feb8662f2d3883a632de97d72",
)
load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")
web_test_repositories()
browser_repositories(
    chromium = True,
    firefox = True,
)

######################################################################
# Typescript
######################################################################

git_repository(
    name = "build_bazel_rules_typescript",
    remote = "https://github.com/bazelbuild/rules_typescript.git",
    tag = "v0.13.0",
)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

ts_setup_workspace()


######################################################################
# External yarn deps
######################################################################

yarn_install(
    name = "mustache_runtime_deps",
    package_json = "//tools/mustache:package.json",
    yarn_lock = "//tools/mustache:yarn.lock",
)

yarn_install(
    name = "design-tokens_runtime_deps",
    package_json = "//tools/design-tokens:package.json",
    yarn_lock = "//tools/design-tokens:yarn.lock",
)

yarn_install(
    name = "webpack_runtime_deps",
    package_json = "//tools/webpack:package.json",
    yarn_lock = "//tools/webpack:yarn.lock",
)

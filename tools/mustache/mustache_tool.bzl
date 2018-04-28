def mustache_toolchain(ctx):
    return struct(
        mustache = ctx.executable._mustache,
    )

def mustache_tool(ctx, json, template, partials, output, toolchain=None):
    if not toolchain:
        toolchain = mustache_toolchain(ctx)

    args = ctx.actions.args()
    for partial in partials:
        args.add('-p')
        args.add(partial.path)
    args.add(json.path)
    args.add(template.path)
    args.add(output.path)

    ctx.actions.run(
        inputs = [json, template] + partials,
        outputs = [output],
        executable = toolchain.mustache,
        mnemonic = "MustacheBuild",
        arguments = [args],
    )

mustache_tool_attrs = {
    "_mustache": attr.label(
        default = Label("//tools/mustache:mustache"),
        executable = True,
        cfg = "host",
    ),
}

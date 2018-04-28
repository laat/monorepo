def _theo_impl(ctx):
    args = ctx.actions.args()

    args.add(ctx.file.entry_point.path)
    args.add('--transform')
    args.add(ctx.attr.transform)
    args.add('--format')
    args.add(ctx.attr.fmt)
    args.add('--dest')
    args.add(ctx.outputs.target.dirname)

    ctx.actions.run(
        inputs = [ctx.file.entry_point] + ctx.files.srcs,
        outputs = [ctx.outputs.target],
        executable = ctx.executable._theo,
        mnemonic = "MustacheBuild",
        arguments = [args],
    )

theo_transform = rule(
    attrs = {
        "entry_point": attr.label(
            mandatory = True,
            allow_files = True,
            single_file = True,
        ),
        "srcs": attr.label_list(
            allow_files = True,
        ),
        "transform": attr.string(
            default = "web",
        ),
        "fmt": attr.string(),
        "_theo": attr.label(
            default = Label("//tools/theo:theo"),
            executable = True,
            cfg = "host",
        ),
    },
    outputs = {
        "target": "%{name}.%{fmt}",
    },
    implementation = _theo_impl,
)

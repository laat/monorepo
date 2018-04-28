load(
    "@bazel_skylib//:lib.bzl",
    "paths",
)

def theo(ctx, entry_point, srcs, transform, fmt, setup, output, theo):
    inputs = [entry_point] + srcs
    args = ctx.actions.args()
    
    args.add(entry_point.path)
    args.add('--transform')
    args.add(transform)
    args.add('--format')
    args.add(fmt)
    args.add('--dest')
    args.add(output.dirname)
    if setup:
        inputs.append(setup)
        args.add('--setup')
        args.add(setup.path)

    ctx.actions.run(
        inputs = inputs,
        outputs = [output],
        executable = theo,
        mnemonic = "MustacheBuild",
        arguments = [args],
    )

def _theo_impl(ctx):
    fmt = ctx.attr.fmt
    entry_point = ctx.file.entry_point
    output = ctx.actions.declare_file(
        paths.replace_extension(entry_point.path, '.' + fmt)
    )

    theo(
        ctx,
        entry_point,
        ctx.files.srcs,
        ctx.attr.transform,
        fmt,
        ctx.file.setup,
        output,
        ctx.executable._theo
    )

    return DefaultInfo(files=depset([output]))

tokens_transform = rule(
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
        "setup": attr.label(
            allow_files = True,
            single_file = True,
        ),
        "fmt": attr.string(),
        "_theo": attr.label(
            default = Label("//tools/design-tokens:theo"),
            executable = True,
            cfg = "host",
        ),
    },
    implementation = _theo_impl,
)

def sass_tokens(**kwargs):
    tokens_transform(
        transform = "web",
        fmt = "scss",
        **kwargs
    )

def html_tokens(**kwargs):
    tokens_transform(
        transform = "web",
        fmt = "html",
        **kwargs
    )
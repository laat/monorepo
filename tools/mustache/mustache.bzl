load(
    "@bazel_skylib//:lib.bzl",
    "dicts",
)
load(
    ":mustache_tool.bzl",
    "mustache_tool",
    "mustache_tool_attrs",
)

def _mustache_impl(ctx):
    mustache_tool(
        ctx,
        ctx.file.json,
        ctx.file.template,
        ctx.files.partials,
        ctx.outputs.out
    )
    return [
        DefaultInfo(files=depset([ctx.outputs.out])),
    ]

mustache = rule(
    attrs = dicts.add(
        {
            "json": attr.label(
                mandatory = True,
                allow_files = True,
                single_file = True,
            ),
            "template": attr.label(
                mandatory = True,
                allow_files = True,
                single_file = True,
            ),
            "partials": attr.label_list(
                allow_files = True,
            ),
            "out": attr.output(),
        },
        mustache_tool_attrs,
    ),
    implementation = _mustache_impl,
)

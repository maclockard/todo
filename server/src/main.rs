extern crate web_view;

use web_view::*;

fn main() {
    let size = (800, 600);
    let resizable = true;
    let debug = true;
    let init_cb = |_webview| {};
    let frontend_cb = |_webview: &mut _, _arg: &_, _userdata: &mut _| {};
    let userdata = ();
    run(
        "// TODO",
        Content::Url("file:///Users/mlockard/workspace/git/personal/todo/ui/lib/index.html"),
        Some(size),
        resizable,
        debug,
        init_cb,
        frontend_cb,
        userdata,
    );
}

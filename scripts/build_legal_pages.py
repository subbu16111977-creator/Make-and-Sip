import re, html, sys
def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\w*])_(.+?)_(?![\w*])", r"<em>\1</em>", t)
    t = re.sub(r"\b([\w.+-]+@[\w-]+\.[\w.]+)\b", r'<a href="mailto:\1">\1</a>', t)
    return t
def convert(md):
    out, items = [], []
    def flush():
        if items: out.append("<ul>" + "".join(f"<li>{inline(i)}</li>" for i in items) + "</ul>"); items.clear()
    title = ""
    for line in md.splitlines():
        if line.startswith("# "): flush(); title = line[2:]; out.append(f"<h1>{inline(title)}</h1>")
        elif line.startswith("## "): flush(); out.append(f"<h2>{inline(line[3:])}</h2>")
        elif line.startswith("- "): items.append(line[2:])
        elif line.strip(): flush(); out.append(f"<p>{inline(line)}</p>")
        else: flush()
    flush(); return title, "\n".join(out)
PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>
:root{{--bg:#fbf8f1;--fg:#1d2a24;--muted:#5b675f;--accent:#8a6a2f;--line:#e4dccb}}
@media (prefers-color-scheme:dark){{:root{{--bg:#101a15;--fg:#efe9da;--muted:#a9b3aa;--accent:#c9a45c;--line:#27362d}}}}
body{{margin:0;background:var(--bg);color:var(--fg);font:17px/1.65 Georgia,"Times New Roman",serif}}
main{{max-width:42rem;margin:0 auto;padding:2.5rem 1.25rem 4rem}}
h1{{font-size:2rem;line-height:1.2;margin:0 0 .5rem}} h2{{font-size:1.2rem;margin:2rem 0 .4rem;padding-top:1rem;border-top:1px solid var(--line)}}
p,li{{margin:.5rem 0}} em{{color:var(--muted)}} a{{color:var(--accent)}} nav{{margin-bottom:2rem;font:.9rem system-ui,sans-serif}} nav a{{margin-right:1rem}}
</style></head><body><main>
<nav><a href="../">Make &amp; Sip</a><a href="../privacy/">Privacy Policy</a><a href="../terms/">Terms of Use</a></nav>
{body}
</main></body></html>"""
for src, dst in [("docs/legal/privacy-policy.md","docs/privacy/index.html"),("docs/legal/terms-of-use.md","docs/terms/index.html")]:
    t, b = convert(open(src).read()); open(dst,"w").write(PAGE.format(title=html.escape(t), body=b))
home = PAGE.format(title="Make &amp; Sip", body="<h1>Make &amp; Sip</h1><p>A drinks pantry app. Tell it what you have and it shows which drinks you can make now, which are almost there, and what to buy.</p><p><a href=\"privacy/\">Privacy Policy</a> · <a href=\"terms/\">Terms of Use</a></p><p>Contact: <a href=\"mailto:subbu16111977@gmail.com\">subbu16111977@gmail.com</a></p>").replace('href="../','href="./').replace('href="./privacy/','href="privacy/')
open("docs/index.html","w").write(home)

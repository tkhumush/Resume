#!/usr/bin/env python3
"""Convert README.md (the resume) into a styled, print-ready PDF.

Usage: python3 scripts/build_pdf.py [input.md] [output.pdf]
Defaults: README.md -> Taymur_Khumush_Resume.pdf
"""
import re
import sys
from pathlib import Path

import markdown
from weasyprint import HTML

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "README.md"
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "Taymur_Khumush_Resume.pdf"

text = SRC.read_text(encoding="utf-8")

# Drop the leading H1 (we render the name from a styled header block instead).
lines = text.splitlines()
name = "Taymur Khumush"
if lines and lines[0].startswith("# "):
    name = lines[0][2:].strip()
    lines = lines[1:]
body_md = "\n".join(lines).lstrip()

html_body = markdown.markdown(body_md, extensions=["extra", "sane_lists"])

# Auto-link bare emails so they're clickable in the PDF.
html_body = re.sub(
    r"(?<![\">])\b([\w.+-]+@[\w-]+\.[\w.-]+)\b",
    r'<a href="mailto:\1">\1</a>',
    html_body,
)

CSS = """
@page { size: Letter; margin: 0.5in 0.65in; }
* { box-sizing: border-box; }
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 9.7pt; line-height: 1.32; color: #1a1a1a; margin: 0;
}
h1.name { font-size: 21pt; font-weight: 700; margin: 0 0 1pt; letter-spacing: 0.3px; }
.contact { font-size: 9pt; color: #555; margin: 0 0 7pt; }
.contact a { color: #555; text-decoration: none; }
h2 {
  font-size: 10.3pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px;
  color: #14506b; border-bottom: 1px solid #cdd6db;
  padding-bottom: 1.5pt; margin: 10pt 0 4pt; page-break-after: avoid;
}
p { margin: 2pt 0 5pt; }
ul { margin: 2pt 0 5pt; padding-left: 15pt; }
li { margin: 1pt 0; }
a { color: #14506b; text-decoration: none; }
strong { color: #111; }
em { color: #5a6b73; font-style: normal; font-size: 8.8pt; }
/* Keep each project's title with its description paragraph. */
p { page-break-inside: avoid; }
"""

doc = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<style>{CSS}</style></head><body>
<h1 class="name">{name}</h1>
{html_body}
</body></html>"""

# The first rendered <p> after the name is the contact line; tag it for styling.
doc = doc.replace("<p>Virginia", '<p class="contact">Virginia', 1)

HTML(string=doc, base_url=str(ROOT)).write_pdf(str(OUT))
print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")

"""Applies the shared public-page restyle transforms. Reports every match so a
silent no-op is impossible. Content strings are moved verbatim, never rewritten."""
import re, sys

HERO_TRIO = re.compile(
    r'[ \t]*<div className="section-label inline-flex mb-4">(?P<eyebrow>[^<]+)</div>\n'
    r'[ \t]*<h1 className="section-title text-5xl lg:text-6xl mb-6">(?P<title>[^<]+)</h1>\n'
    r'[ \t]*<p className="section-body max-w-2xl">\n'
    r'(?P<dek>(?:[^\n]*\n)+?)'
    r'[ \t]*</p>\n'
)

CENTERED_HEADER = re.compile(
    r'[ \t]*<motion\.div\n'
    r'(?:[ \t]*(?:initial|whileInView|viewport|transition)=\{[^\n]*\n)+'
    r'[ \t]*className="text-center mb-16"\n'
    r'[ \t]*>\n'
    r'[ \t]*<div className="section-label inline-flex mb-4">(?P<eyebrow>[^<]+)</div>\n'
    r'[ \t]*<h2 className="section-title(?P<h2cls>[^"]*)">(?P<title>[^<]+)</h2>\n'
    r'[ \t]*</motion\.div>\n'
)

DECOR = re.compile(
    r'[ \t]*<div className="sr-aurora" />\n'
    r'(?:[ \t]*<[A-Z][A-Za-z]* className="sr-art[^\n]*\n(?:[ \t]*style=\{\{[^\n]*\n)?)?'
    r'[ \t]*<div className="absolute inset-0 grid-bg opacity-\d+" />\n'
)

def squash(text):
    """Collapse a multi-line JSX text block into one clean string."""
    return ' '.join(l.strip() for l in text.strip().splitlines() if l.strip())

def apply(path):
    src = open(path).read()
    hits = []

    def hero_sub(m):
        hits.append(f'hero h1  "{m["eyebrow"]}" / "{m["title"]}"')
        indent = re.match(r'[ \t]*', m.group(0)).group(0)
        dek = squash(m['dek']).replace('"', '&quot;')
        return (f'{indent}<SectionHeader\n'
                f'{indent}  as="h1"\n'
                f'{indent}  eyebrow="{m["eyebrow"]}"\n'
                f'{indent}  title="{m["title"]}"\n'
                f'{indent}  dek="{dek}"\n'
                f'{indent}/>\n')

    def centered_sub(m):
        hits.append(f'section  "{m["eyebrow"]}" / "{m["title"]}"')
        indent = re.match(r'[ \t]*', m.group(0)).group(0)
        return (f'{indent}<SectionHeader\n'
                f'{indent}  eyebrow="{m["eyebrow"]}"\n'
                f'{indent}  title="{m["title"]}"\n'
                f'{indent}  className="mb-16"\n'
                f'{indent}/>\n')

    def decor_sub(m):
        hits.append('decor -> DiamondField')
        indent = re.match(r'[ \t]*', m.group(0)).group(0)
        return f'{indent}<DiamondField variant="hero" />\n'

    src = HERO_TRIO.sub(hero_sub, src)
    src = CENTERED_HEADER.sub(centered_sub, src)
    src = DECOR.sub(decor_sub, src)

    open(path, 'w').write(src)
    return hits

for path in sys.argv[1:]:
    hits = apply(path)
    print(f'{path}: {len(hits)} transform(s)')
    for h in hits:
        print(f'    {h}')

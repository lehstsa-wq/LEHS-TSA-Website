"""Adds the components/sections import to a page and drops LineArt imports that
the decorative-layer swap made unused. Verifies before removing."""
import re, sys

def fix(path):
    s = open(path).read()
    notes = []

    used = [n for n in ('SectionHeader', 'Reveal', 'Section', 'StatCard', 'Counter',
                        'SegmentedToggle', 'LogoMarquee', 'DiamondField')
            if re.search(rf'<{n}[\s/>]', s) or re.search(rf'\b{n}\b(?=\s*[,}}])', s)]
    used = [n for n in used if re.search(rf'<{n}[\s/>]', s)]

    if used and "from '../components/sections'" not in s:
        anchor = re.search(r"^import .*\n(?=(?:import .*\n)*)", s, re.M)
        last_import = list(re.finditer(r'^import [^\n]*;\n', s, re.M))[-1]
        ins = f"import {{ {', '.join(used)} }} from '../components/sections';\n"
        s = s[:last_import.end()] + ins + s[last_import.end():]
        notes.append(f"import added: {', '.join(used)}")

    # Drop LineArt named imports that no longer appear in the JSX.
    m = re.search(r"import \{([^}]*)\} from '\.\./components/art/LineArt';\n", s)
    if m:
        names = [n.strip() for n in m.group(1).split(',') if n.strip()]
        still = [n for n in names if re.search(rf'<{n}[\s/>]', s)]
        if not still:
            s = s[:m.start()] + s[m.end():]
            notes.append(f"LineArt import removed ({', '.join(names)})")
        elif still != names:
            s = s[:m.start()] + f"import {{ {', '.join(still)} }} from '../components/art/LineArt';\n" + s[m.end():]
            notes.append(f"LineArt import trimmed to {', '.join(still)}")

    open(path, 'w').write(s)
    return notes

for p in sys.argv[1:]:
    for n in fix(p):
        print(f'{p}: {n}')

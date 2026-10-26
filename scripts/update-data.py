#!/usr/bin/env python3
"""Relit les sources officielles qui bougent et les compare à src/data/params-2026.json.

Usage : python3 scripts/update-data.py [--write]
  sans --write : affiche les écarts et sort en code 2 s'il y en a (le cron échoue alors) ;
  avec --write : écrit aussi data/official-latest.json (valeurs lues + date + URL), jamais params-2026.json,
                 qui ne change qu'après relecture humaine de la règle (RECETTE §17.4).

Sources (OGL v3.0, aucune page de concurrent) :
  1. GOV.UK bank-holidays.json : jours fériés des trois calendriers, 2025 à 2027 ;
  2. legislation.gov.uk, SI 2022/71 annexe 3 : niveaux de PCN hors Londres (60/40, 70/50, 90/60, 105/75) ;
  3. GOV.UK, page du Private Parking Code of Practice : détecte l'annonce d'une date d'entrée en vigueur.
Dépendances : Python 3.10+ (stdlib seulement).
"""
import datetime as dt
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARAMS = ROOT / "src" / "data" / "params-2026.json"
OUT = ROOT / "data" / "official-latest.json"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
BH = "https://www.gov.uk/bank-holidays.json"
SCH3 = "https://www.legislation.gov.uk/uksi/2022/71/schedule/3/data.xml"
CODE = "https://www.gov.uk/api/content/government/publications/private-parking-code-of-practice"


def get(url: str, tries: int = 4) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for i in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except OSError:
            if i == tries - 1:
                raise
            time.sleep(5 * (i + 1))
    raise RuntimeError(url)


def main() -> int:
    p = json.loads(PARAMS.read_text())
    gaps: list[str] = []
    seen: dict = {"read_at": dt.date.today().isoformat()}

    bh = json.loads(get(BH))
    for key, cal in (("ew", "england-and-wales"), ("scotland", "scotland"), ("ni", "northern-ireland")):
        dates = [e["date"] for e in bh[cal]["events"] if "2025-01-01" <= e["date"] <= "2027-12-31"]
        seen[f"bankHolidays.{key}"] = dates
        if dates != p["bankHolidays"][key]:
            gaps.append(f"bank holidays {key}: GOV.UK {sorted(set(dates) ^ set(p['bankHolidays'][key]))}")

    txt = re.sub(r"<[^>]+>", " ", get(SCH3).decode("utf8", "ignore"))
    for n in (60, 40, 70, 50, 90, 105, 75):
        if f"£{n}" not in txt:
            gaps.append(f"SI 2022/71 Sch 3: £{n} not found any more")
    e = p["england"]
    seen["england"] = {"band1": e["band1"], "band2": e["band2"]}

    code = json.loads(get(CODE))
    body = json.dumps(code)
    m = re.findall(r"(?:comes|came) into force on ([0-9]{1,2} [A-Z][a-z]+ 20[0-9]{2})", body)
    seen["code.inForceAnnounced"] = m[:3]
    if m:
        gaps.append(f"Private Parking Code: in-force date now announced ({m[0]}): update params and pages")
    seen["code.updated"] = code.get("public_updated_at")

    if "--write" in sys.argv:
        OUT.parent.mkdir(exist_ok=True)
        OUT.write_text(json.dumps({"sources": [BH, SCH3, CODE], **seen}, indent=1, ensure_ascii=False))
    for g in gaps:
        print("ÉCART", g)
    print("OK" if not gaps else f"{len(gaps)} écart(s)")
    return 2 if gaps else 0


if __name__ == "__main__":
    sys.exit(main())

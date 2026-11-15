# Critical extension faces

The five precomposed Turkish extension characters (Ğ ğ İ Ş ş) have small presentation subsets for Anton 400 and Ubuntu 400/500/700. All other characters continue to use the existing full unicode-range faces. Font outlines, horizontal metrics and layout dependencies are retained; `scripts/subset-critical-fonts.py` checks each encoded glyph against its original before writing the files.

Run `python scripts/subset-critical-fonts.py` with `fonttools[woff]` installed, then `node scripts/version-design-css.cjs` to update public stylesheet references. Source font SHA-256 values and generated sizes are recorded in `critical-subsets.json`.

The display subset is distributed under the SIL Open Font License in `LICENSE-Anton-OFL.txt`, and the Ubuntu subsets under `LICENSE-Ubuntu-UFL.txt`. Existing copyright records are retained. Derivative font-internal family names distinguish the subsets; CSS aliases preserve the established site typography. These font assets are subject to their own licences rather than the repository's code licence.

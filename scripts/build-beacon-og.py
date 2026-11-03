"""Build Beacon's share image from the existing vector mark and Poppins font."""
from pathlib import Path
import sys, types, subprocess
try:
 import brotli
except ImportError:
 # Node's built-in Brotli decoder avoids adding another runtime dependency.
 sys.modules['brotli']=types.SimpleNamespace(decompress=lambda data:subprocess.run(['node','-e',"process.stdin.on('data',d=>chunks.push(d));const chunks=[];process.stdin.on('end',()=>process.stdout.write(require('node:zlib').brotliDecompressSync(Buffer.concat(chunks))));"],input=data,capture_output=True,check=True).stdout)
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
font=TTFont('assets/fonts/font-14.woff2');glyphs=font.getGlyphSet();cmap=font.getBestCmap();scale=136/font['head'].unitsPerEm
paths=[];advance=0
for ch in 'Vertex':
 name=cmap[ord(ch)];pen=SVGPathPen(glyphs);glyphs[name].draw(pen);paths.append(f'<path transform="translate({advance} 0)" d="{pen.getCommands()}"/>');advance+=font['hmtx'][name][0]
word_width=advance*scale;logo_w=180;gap=40;total=logo_w+gap+word_width;x=(1200-total)/2
logo=Path('assets/logo.svg').read_text();logo=logo[logo.index('>')+1:logo.rfind('</svg>')].replace('white','#F4C95D')
svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0f0f10"/><g fill="#F4C95D"><svg x="{x-24.5*180/176}" y="{315-113.5*180/176}" width="{225*180/176}" height="{225*180/176}" viewBox="0 0 225 225">{logo}</svg><g transform="translate({x+logo_w+gap} 365) scale({scale} {-scale})">'+''.join(paths)+'</g></g></svg>'
Path('assets/beacon-og.svg').write_text(svg)
subprocess.run(['inkscape','assets/beacon-og.svg','--export-type=png','--export-filename=assets/beacon-og.png'],check=True)

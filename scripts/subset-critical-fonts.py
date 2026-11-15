"""Build small glyph-identical Turkish extension faces; pip install fonttools[woff]."""
from pathlib import Path
import hashlib,json,re
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.pens.recordingPen import DecomposingRecordingPen
root=Path(__file__).resolve().parents[1]
chars=[0x11e,0x11f,0x130,0x15e,0x15f]
records=[]
for number,family,weight in [(1,'Anton',400),(34,'Ubuntu',400),(40,'Ubuntu',500),(46,'Ubuntu',700)]:
 source=root/f'assets/fonts/font-{number}.woff2'
 original=TTFont(source,recalcTimestamp=False);font=TTFont(source,recalcTimestamp=False)
 cmap=original.getBestCmap();wanted=[cp for cp in chars if cp in cmap]
 options=subset.Options();options.name_IDs=['*'];options.layout_features=['*'];options.recalc_timestamp=False
 builder=subset.Subsetter(options=options);builder.populate(unicodes=wanted);builder.subset(font)
 # The Ubuntu licence requires a distinguishable derivative family name;
 # the display face also avoids the original reserved font name internally.
 internal=(original['name'].getDebugName(1)+' derivative Vertex Critical') if family=='Ubuntu' else 'Vertex Critical Display'
 for platform,encoding,language in {(n.platformID,n.platEncID,n.langID) for n in font['name'].names}:
  for key,value in [(1,internal),(3,internal+';'+str(weight)),(4,internal+' '+str(weight)),(6,re.sub('[^A-Za-z0-9-]','',internal)+'-'+str(weight)),(16,internal)]:
   font['name'].setName(value,key,platform,encoding,language)
 temporary=root/'assets/fonts/critical-build.woff2';font.save(temporary)
 check=TTFont(temporary);assert set(check.getBestCmap())==set(wanted)
 for cp in wanted:
  a,b=cmap[cp],check.getBestCmap()[cp]
  assert original['hmtx'][a]==check['hmtx'][b]
  before=DecomposingRecordingPen(original.getGlyphSet());original.getGlyphSet()[a].draw(before)
  after=DecomposingRecordingPen(check.getGlyphSet());check.getGlyphSet()[b].draw(after)
  assert before.value==after.value
 digest=hashlib.sha256(temporary.read_bytes()).hexdigest()[:12]
 name=f'critical-{family.lower()}-{weight}-{digest}.woff2';target=temporary.with_name(name);temporary.rename(target)
 records.append({'family':family,'weight':weight,'source':source.name,'file':name,'unicodeRange':','.join('U+'+format(cp,'04X') for cp in wanted),'originalBytes':source.stat().st_size,'bytes':target.stat().st_size,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest()})
css=root/'assets/fonts/fonts.css';text=css.read_text().split('/* Vertex critical extension faces.')[0].rstrip()
text+='\n\n/* Vertex critical extension faces. Other codepoints retain the original faces. */\n'
for r in records:text+="@font-face{font-family:'"+r['family']+"';font-style:normal;font-weight:"+str(r['weight'])+";font-display:swap;src:url('/assets/fonts/"+r['file']+"') format('woff2');unicode-range:"+r['unicodeRange']+"}\n"
css.write_text(text)
(root/'assets/fonts/critical-subsets.json').write_text(json.dumps({'schemaVersion':1,'faces':records},indent=2)+'\n')
print(json.dumps(records,indent=2))

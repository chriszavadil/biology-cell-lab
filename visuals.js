import {escapeHTML as e} from './core.js';
const paths={
 cell:'M20 11c0 5-3 9-8 9s-8-4-8-9 3-7 8-7 8 2 8 7Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
 home:'m3 10 9-7 9 7 M5 9v11h5v-6h4v6h5V9',
 book:'M3 4h6a4 4 0 0 1 3 2 4 4 0 0 1 3-2h6v15h-6a4 4 0 0 0-3 2 4 4 0 0 0-3-2H3Z M12 6v15',
 spark:'m12 2 2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5Z M20 2v4 M18 4h4',
 layers:'m12 3 10 5-10 5L2 8Z M2 12l10 5 10-5 M2 16l10 5 10-5',
 cards:'M7 7h13v14H7Z M4 17H2V2h13v2',
 orbit:'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M21 12a9 9 0 1 1-9-9 M21 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
 route:'M5 5h10a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h10 M3 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0 M17 18l3 3-3 3',
 bolt:'m13 2-9 12h7l-1 8 10-13h-7Z',
 drop:'M12 2s-7 8-7 13a7 7 0 0 0 14 0C19 10 12 2 12 2Z',
 flask:'M9 2h6 M10 2v7L4 19q-1 3 3 3h10q4 0 3-3L14 9V2 M7 15h10',
 arrow:'M4 12h15 m-6-6 6 6-6 6',
 chevron:'m9 5 7 7-7 7',
 check:'m5 12 4 4L19 6',
 close:'m6 6 12 12 M18 6 6 18',
 play:'m8 4 13 8-13 8Z',
 volume:'M11 4 6 8H2v8h4l5 4Z M15 8a6 6 0 0 1 0 8 M18 4a12 12 0 0 1 0 16',
 chart:'M4 3v18h17 M8 16v-4 M13 16V8 M18 16V4',
 refresh:'M20 7a9 9 0 1 0 1 8 M20 2v6h-6',
 help:'M9 8a3 3 0 0 1 6 0c0 3-3 2-3 5 M12 17v1 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
 download:'M12 3v12 m-5-5 5 5 5-5 M4 16v5h16v-5',
 trophy:'M8 3h8v7a4 4 0 0 1-8 0Z M8 5H3v3a5 5 0 0 0 5 5 M16 5h5v3a5 5 0 0 1-5 5 M12 14v6 M7 21h10',
 moon:'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',
 clock:'M12 7v5l3 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
 pin:'M8 3h8l-1 6 3 4H6l3-4Z M12 13v9',
 search:'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z m-1 5 6 6',
 shield:'m12 2 8 3v7c0 5-8 10-8 10S4 17 4 12V5Z m-4 10 3 3 5-6',
};
export const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.cell}"/></svg>`;
const mito=`<path d="M-40 0C-44-24-10-29 10-17S49-9 39 13 9 26-11 16-36 19-40 0Z" fill="#f4c59c" stroke="#b66c3e" stroke-width="2"/><path d="m-27-3 12-9-1 22 12-17 5 19 9-18 12 11" fill="none" stroke="#b66c3e" stroke-width="3" stroke-linecap="round"/>`;
const chloro=`<ellipse rx="40" ry="24" fill="#8fcfb0" stroke="#34765c" stroke-width="2"/>${[-20,0,20].map(x=>[-7,0,7].map(y=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="3.5" fill="#509677" stroke="#34765c" stroke-width="1"/>`).join('')).join('')}`;
const golgi=`${[-21,-7,7,21].map((y,i)=>`<path d="M-38 ${y}Q0 ${y+18+i*2} 38 ${y}" fill="none" stroke="${['#d7899c','#c97b92','#bd6f89','#ad627d'][i]}" stroke-width="8" stroke-linecap="round"/>`).join('')}<circle cx="49" cy="13" r="7" fill="#e1a6b6"/>`;
const rough=`<path d="M-40-23q30-18 73 0M-44-6q30-18 74 0M-40 11q30-18 71 0M-32 27q30-15 60-3" stroke="#8479b8" fill="none" stroke-width="8" stroke-linecap="round"/>${[[-25,-29],[1,-34],[26,-28],[-32,-12],[-4,-17],[24,-12],[-22,5],[3,0],[24,8],[-12,21],[20,20]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.4" fill="#494b74"/>`).join('')}`;
const smooth=`<path d="M-35-15q30-34 37-1t29 0M-36 5q28-28 36 0t34 0M-26 25q28-22 34-4t28-7" stroke="#8dafaa" fill="none" stroke-width="8" stroke-linecap="round"/>`;
export function cellSVG(kind='animal', selected='', labels=true, interactive=true, challenge=false) {
  const plant=kind==='plant', bacteria=kind==='bacteria';
  const names={membrane:'Cell membrane',cytoplasm:'Cytoplasm',nucleus:'Nucleus',nucleolus:'Nucleolus',ribosomes:'Ribosomes','rough-er':'Rough ER','smooth-er':'Smooth ER',golgi:'Golgi apparatus',mitochondrion:'Mitochondrion',vesicle:'Vesicle',lysosome:'Lysosome',peroxisome:'Peroxisome',cytoskeleton:'Cytoskeleton',wall:'Cell wall',chloroplast:'Chloroplast',vacuole:'Central vacuole',nucleoid:'Nucleoid',flagellum:'Flagellum'};
  const group=(id,art,x=0,y=0,s=1)=>`<g ${interactive?`data-org="${id}" role="button" tabindex="0" aria-label="${names[id]}"`:''} class="cell-part ${selected===id?'selected':''}" transform="translate(${x} ${y}) scale(${s})"><title>${names[id]}</title>${art}</g>`;
  const label=(x,y,text)=>labels&&!challenge?`<text x="${x}" y="${y}" class="diagram-label" text-anchor="middle">${text}</text>`:'';
  let svg='';
  if(bacteria) {
    svg+=group('flagellum','<path d="M412 207c65-52 23 85 81 22s-33-73 22-107" fill="none" stroke="#66877d" stroke-width="6"/>');
    svg+=group('wall','<rect x="44" y="92" width="398" height="210" rx="105" fill="#b8dbcd" stroke="#34745d" stroke-width="10"/>');
    svg+=group('membrane','<rect x="57" y="104" width="372" height="186" rx="93" fill="#eaf3eb" stroke="#7bafa1" stroke-width="5"/>');
    svg+=group('cytoplasm','<rect x="68" y="115" width="350" height="165" rx="82" fill="#eef5e9"/>');
    svg+=group('nucleoid','<path d="M-85-10c20-70 120 75 145-5s-111-4-89 42 106-45 40-64-69 57-20 71" fill="none" stroke="#967ba9" stroke-width="6" stroke-linecap="round"/>',258,199);
    svg+=group('ribosomes',[[112,189],[142,145],[150,245],[318,146],[357,234],[385,184],[274,255],[211,134],[115,222]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="#bf8d64"/>`).join(''));
    svg+=label(240,73,'CELL WALL')+label(259,248,'NUCLEOID')+label(141,325,'RIBOSOMES');
  } else {
    if(plant) svg+=group('wall','<rect x="32" y="26" width="455" height="328" rx="54" fill="#b5d8c0" stroke="#488260" stroke-width="10"/>');
    const outline=plant?'<rect x="44" y="38" width="431" height="304" rx="45" fill="#eef4e6" stroke="#84b493" stroke-width="4"/>':'<path d="M78 90C125 20 278 14 398 57S506 263 420 314 217 372 106 314 14 175 78 90Z" fill="#f4eef8" stroke="#a996c3" stroke-width="5"/>';
    svg+=group('membrane',outline);
    svg+=group('cytoplasm',plant?'<rect x="54" y="48" width="411" height="284" rx="36" fill="#edf4e7"/>':'<path d="M91 99C136 38 275 28 389 70S490 251 411 303 221 356 115 303 32 179 91 99Z" fill="#f5f0f9"/>');
    svg+=group('cytoskeleton','<path d="M77 247 166 98 286 72M161 316l150-52 142-5M79 156l64-84M293 319l130-92" fill="none" stroke="#c4c8da" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 5"/>');
    if(plant) {
      svg+=group('vacuole','<rect x="181" y="96" width="220" height="193" rx="62" fill="#d7e9ed" stroke="#87bdc8" stroke-width="3"/>');
      svg+=label(290,190,'CENTRAL VACUOLE');
      svg+=group('chloroplast',chloro,116,78,.83)+group('chloroplast',chloro,430,192,.78)+group('chloroplast',chloro,291, 60,.78);
    }
    const nx=plant?112:185,ny=plant?191:159,ns=plant?.78:1;
    svg+=group('nucleus','<circle r="62" fill="#d8c9eb" stroke="#a38bbf" stroke-width="3"/><path d="M-31-17q31-22 48 3t-22 29-21-34M-21 32q40-15 43-43" fill="none" stroke="#b5a0cf" stroke-width="4"/>',nx,ny,ns);
    svg+=group('nucleolus','<circle r="20" fill="#9780b6" stroke="#75618f" stroke-width="2"/>',nx+13*ns,ny-5*ns,ns);
    svg+=group('rough-er',rough,plant?117:202,plant?277:251,plant?.68:.9);
    svg+=group('smooth-er',smooth,plant?121:105,plant?319:280,plant?.50:.62);
    svg+=group('golgi',golgi,plant?340:367,plant?316:211,plant?.64:1);
    svg+=group('mitochondrion',mito,plant?426:362,plant?86:107,plant?.65:.9);
    if(!plant) svg+=group('mitochondrion',mito,303,308,.75);
    svg+=group('vesicle','<circle r="15" fill="#e8b8c6" stroke="#c9859d" stroke-width="2"/>',plant?440:431,plant?277:274,.8);
    if(!plant) svg+=group('lysosome','<circle r="22" fill="#c3d6e8" stroke="#7993b0" stroke-width="2"/><circle cx="-5" cy="-4" r="3" fill="#7993b0"/><circle cx="7" cy="5" r="3" fill="#7993b0"/>',278,77,.85);
    svg+=group('peroxisome','<circle r="17" fill="#eadab2" stroke="#b49d64" stroke-width="2"/><path d="M-7 0h14M0-7V7" stroke="#b49d64" stroke-width="2"/>',plant?189:410,plant? 60:135,.75);
    const dots=plant?[[160,121],[163,211],[404,299],[362, 70]]:[[83,208],[130,230],[285,160],[295,190],[321,139],[242,111]];
    svg+=group('ribosomes',dots.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="#796991"/>`).join(''));
    svg+=label(nx-4,ny+42*ns,'NUCLEUS');
    if(!plant) svg+=label(368, 60,'MITOCHONDRION')+label(371,261,'GOLGI')+label(204,299,'ROUGH ER');
    else svg+=label(88, 16,'CELL WALL');
  }
  return `<svg class="cell-diagram" viewBox="0 0 540 380" role="group" aria-label="Illustrative ${kind} cell; not to scale">${svg}</svg>`;
}
export function waterSVG(kind,condition) {
  const plant=kind==='plant';
  const size=condition==='hypo'?82:condition==='hyper'?46:64;
  const color=condition==='hypo'?'#d1e7ed':condition==='hyper'?'#e7dced':'#dde3f0';
  const waterDirection=condition==='hypo'?'in':condition==='hyper'?'out':'both';
  const cell=plant?`<rect x="77" y="26" width="176" height="168" rx="23" fill="#edf3e8" stroke="#548468" stroke-width="8"/><rect x="${165-size}" y="${110-size*.90}" width="${size*2}" height="${size*1.80}" rx="22" fill="${color}" stroke="#96afba" stroke-width="3"/><ellipse cx="166" cy="110" rx="${size*.67}" ry="${size*.60}" fill="#b9d9e0"/>`:`<circle cx="165" cy="110" r="${size}" fill="${color}" stroke="#ad97c2" stroke-width="4" ${condition==='hypo'?'stroke-dasharray="13 5"':''}/><circle cx="151" cy="109" r="22" fill="#b79ccc"/>`;
  const arrows=waterDirection==='in'?'<path d="M15 111h46m-13-10 13 10-13 10M315 111h-46m13-10-13 10 13 10"/>':waterDirection==='out'?'<path d="M61 111H15m13-10-13 10 13 10M269 111h46m-13-10 13 10-13 10"/>':'<path d="M15 105h43m-11-8 11 8-11 8M58 126H15m11-8-11 8 11 8M272 105h43m-11-8 11 8-11 8M315 126h-43m11-8-11 8 11 8"/>';
  return `<svg viewBox="0 0 330 225" role="img" aria-label="${e(kind)} cell in ${e(condition)}tonic surroundings; water ${waterDirection}">${cell}<g fill="none" stroke="#498299" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${arrows}</g></svg>`;
}

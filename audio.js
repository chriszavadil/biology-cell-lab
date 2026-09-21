/* Local synthesized feedback: no files, network, microphone, or speech service. */
export const AUDIO_KEY='cell-lab.audio.v1';
export const DEFAULT_AUDIO=Object.freeze({enabled:true,volume:0.6});
export const CUES=Object.freeze({
 correct:[[659.25,0,0.20],[880,0.10,0.22],[1318.51,0.21,0.28]],
 incorrect:[[392,0,0.19],[293.66,0.16,0.26]],
 complete:[[523.25,0,0.22],[783.99,0.13,0.32]]
});
export function cleanAudio(raw){
 return {enabled:typeof raw?.enabled==='boolean'?raw.enabled:true,
 volume:typeof raw?.volume==='number'&&Number.isFinite(raw.volume)?Math.min(1,Math.max(0,raw.volume)):0.6};
}
export function scheduleCue(ctx,destination,kind){
 if(!Object.hasOwn(CUES,kind))return [];
 const nodes=[],base=ctx.currentTime+0.012,peak=kind==='incorrect'?0.14:0.18;
 for(const [frequency,offset,duration] of CUES[kind]){
  const oscillator=ctx.createOscillator(),envelope=ctx.createGain(),start=base+offset,end=start+duration;
  oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,start);
  envelope.gain.setValueAtTime(0,start);envelope.gain.linearRampToValueAtTime(peak,start+0.012);
  envelope.gain.exponentialRampToValueAtTime(0.0001,end-0.015);envelope.gain.linearRampToValueAtTime(0,end);
  oscillator.connect(envelope);envelope.connect(destination);
  oscillator.start(start);oscillator.stop(end+0.015);
  nodes.push({oscillator,envelope});
 }
 return nodes;
}
export function createFeedbackAudio({env=globalThis,onError=()=>{}}={}){
 let settings={...DEFAULT_AUDIO},context=null,master=null,generation=0,warned=false;
 const active=new Set();
 try{settings=cleanAudio(JSON.parse(env.localStorage.getItem(AUDIO_KEY)));}catch{/* In-memory defaults work without storage. */}
 function stop(){
  generation++;
  for(const node of active){try{node.envelope.gain.cancelScheduledValues(0);node.envelope.gain.value=0;node.oscillator.stop();node.oscillator.disconnect();node.envelope.disconnect();}catch{}}
  active.clear();
 }
 function applyVolume(){if(master&&context.state!=='closed')master.gain.setValueAtTime(settings.enabled?settings.volume:0,context.currentTime);}
 function setSettings(next){
  settings=cleanAudio({...settings,...next});stop();applyVolume();
  try{env.localStorage.setItem(AUDIO_KEY,JSON.stringify(settings));return true;}catch{return false;}
 }
 function sync(){try{settings=cleanAudio(JSON.parse(env.localStorage.getItem(AUDIO_KEY)));stop();applyVolume();}catch{}}
 async function play(kind){
  stop();const token=generation;
  if(!settings.enabled||settings.volume===0||!Object.hasOwn(CUES,kind)||env.document?.hidden)return false;
  try{
   if(!context||context.state==='closed'){
    const Constructor=env.AudioContext||env.webkitAudioContext;
    if(!Constructor)throw new Error('Web Audio unavailable');
    context=new Constructor({latencyHint:'interactive'});master=context.createGain();master.connect(context.destination);
   }
   applyVolume();
   if(context.state!=='running'){
    let timer;
    try{await Promise.race([context.resume(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Audio resume timed out')),1500);})]);}
    finally{clearTimeout(timer);}
   }
   if(token!==generation||!settings.enabled||settings.volume===0||env.document?.hidden)return false;
   if(context.state!=='running')throw new Error('Audio is interrupted');
   const nodes=scheduleCue(context,master,kind);
   for(const node of nodes){active.add(node);node.oscillator.onended=()=>{try{node.oscillator.disconnect();node.envelope.disconnect();}catch{}active.delete(node);};}
   warned=false;return true;
  }catch{if(token!==generation)return false;stop();if(!warned){warned=true;try{onError('Sound could not play. Check your device volume, or try the sound previews in Help.');}catch{}}return false;}
 }
 return {play,stop,setSettings,sync,getSettings:()=>({...settings})};
}

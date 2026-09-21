import test from 'node:test';
import assert from 'node:assert/strict';
import {AUDIO_KEY,CUES,cleanAudio,createFeedbackAudio,scheduleCue} from '../audio.js';
function harness(state='running'){
 const store=new Map([['cell-lab.progress.v1','untouched']]),contexts=[];
 class Param{setValueAtTime(){}linearRampToValueAtTime(){}exponentialRampToValueAtTime(){}cancelScheduledValues(){}}
 class Context{
  constructor(){this.state=state;this.currentTime=0;this.destination={};this.oscillators=[];this.resumes=0;contexts.push(this);}
  createGain(){return {gain:new Param(),connect(){},disconnect(){}};}
  createOscillator(){const o={frequency:new Param(),starts:[],stops:[],connect(){},disconnect(){},start(t){this.starts.push(t);},stop(t){this.stops.push(t);}};this.oscillators.push(o);return o;}
  resume(){this.resumes++;this.state='running';return Promise.resolve();}
 }
 const env={AudioContext:Context,document:{hidden:false},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}};
 return {env,contexts,store};
}
test('sound preferences default on at 60%, sanitize malformed input and clamp volume',()=>{
 assert.deepEqual(cleanAudio(null),{enabled:true,volume:0.6});assert.deepEqual(cleanAudio({enabled:false,volume:5}),{enabled:false,volume:1});
 for(const volume of [NaN,Infinity,'0.5',null])assert.equal(cleanAudio({volume}).volume,0.6);
 assert.equal(cleanAudio({volume:-1}).volume,0);
});
test('no audio context or sound on page load; first answer initializes one reusable context',async()=>{
 const h=harness(),a=createFeedbackAudio(h);assert.equal(h.contexts.length,0);assert(await a.play('correct'));assert.equal(h.contexts.length,1);
 assert.equal(h.contexts[0].oscillators.length,3);assert(await a.play('incorrect'));assert.equal(h.contexts.length,1);assert.equal(h.contexts[0].oscillators.length,5);
});
test('muted and zero-volume sounds never initialize or play',async()=>{
 const h=harness(),a=createFeedbackAudio(h);a.setSettings({enabled:false});assert.equal(await a.play('correct'),false);a.setSettings({enabled:true,volume:0});assert.equal(await a.play('incorrect'),false);assert.equal(h.contexts.length,0);
});
test('sound settings persist without touching quiz progress, and synchronize when requested',()=>{
 const h=harness(),a=createFeedbackAudio(h);a.setSettings({enabled:false,volume:0.3});const b=createFeedbackAudio(h);assert.deepEqual(b.getSettings(),{enabled:false,volume:0.3});
 a.setSettings({enabled:true});b.sync();assert.equal(b.getSettings().enabled,true);assert.equal(h.store.get('cell-lab.progress.v1'),'untouched');assert(h.store.has(AUDIO_KEY));
});
test('suspended and interrupted contexts resume before producing notes',async()=>{
 for(const state of ['suspended','interrupted']){const h=harness(state),a=createFeedbackAudio(h);assert(await a.play('correct'));assert.equal(h.contexts[0].resumes,1);}
});
test('a closed context is recreated on the next user action',async()=>{
 const h=harness(),a=createFeedbackAudio(h);await a.play('correct');h.contexts[0].state='closed';assert(await a.play('incorrect'));assert.equal(h.contexts.length,2);
});
test('missing AudioContext and denied storage cannot throw or interfere with grading',async()=>{
 let warnings=0;const a=createFeedbackAudio({env:{},onError:()=>warnings++});assert.equal(a.setSettings({enabled:true}),false);assert.equal(await a.play('correct'),false);assert.equal(await a.play('incorrect'),false);assert.equal(warnings,1);
});
test('muting stops current notes immediately and cancels a pending resume',async()=>{
 const h=harness(),a=createFeedbackAudio(h);await a.play('correct');a.setSettings({enabled:false});assert(h.contexts[0].oscillators.every(o=>o.stops.length===2));
 a.setSettings({enabled:true});h.contexts[0].state='suspended';let finish;h.contexts[0].resume=()=>new Promise(r=>finish=()=>{h.contexts[0].state='running';r();});
 const pending=a.play('incorrect');a.setSettings({enabled:false});finish();assert.equal(await pending,false);assert.equal(h.contexts[0].oscillators.length,3);
});
test('failed resume resolves safely; hidden tabs do not start sound',async()=>{
 const h=harness(),a=createFeedbackAudio(h);await a.play('correct');h.contexts[0].state='suspended';h.contexts[0].resume=()=>Promise.reject(new Error('denied'));assert.equal(await a.play('correct'),false);
 h.env.document.hidden=true;assert.equal(await a.play('correct'),false);
});
test('all cues are distinct, brief, bounded in frequency, and use scheduled start/stop',()=>{
 const h=harness();const c=new h.env.AudioContext();for(const kind of Object.keys(CUES)){const nodes=scheduleCue(c,c.destination,kind);assert.equal(nodes.length,CUES[kind].length);for(const n of nodes){assert.equal(n.oscillator.starts.length,1);assert(n.oscillator.stops[0]<0.6);}}
 assert.notDeepEqual(CUES.correct,CUES.incorrect);assert.deepEqual(scheduleCue(c,c.destination,'invalid'),[]);
 for(const notes of Object.values(CUES))for(const [hz,offset,duration] of notes){assert(hz>200&&hz<1500);assert(offset+duration<=0.6);}
});

import { DATA } from './data.js';
import { STORAGE_KEY, SESSION_KEY, emptyProgress, cleanProgress, escapeHTML as e, shuffle, grade, stats, recordAnswer, makeDeck, localDate } from './core.js';
import { icon, cellSVG, waterSVG } from './visuals.js';
import { AUDIO_KEY, createFeedbackAudio } from './audio.js';

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const byId = Object.fromEntries(DATA.questions.map(q=>[q.id,q]));
const topics = Object.fromEntries(DATA.topics.map(t=>[t.id,t]));
const app = $('#app');
const feedbackAudio=createFeedbackAudio({onError:message=>toast(message)});
let storageWarning='', roundWarning='', savedSnapshot=null, progress=loadProgress(), round=loadRound();
let cardSession=null, explorer={tab:'cells',kind:'animal',selected:'nucleus',labels:true,challenge:false,target:'',feedback:null,found:0};
let water='hypo', pathway=0, revealGuide=new Set(), toastTimer, offlineReady=false;

// Sync before edits so another tab cannot replace newer saved study work with an old snapshot.
function syncProgress(){
 try{const raw=localStorage.getItem(STORAGE_KEY);if(raw===savedSnapshot)return false;
 const next=raw?cleanProgress(JSON.parse(raw),DATA):emptyProgress();progress=next;savedSnapshot=raw;storageWarning='';return true;
 }catch{return false;}
}
function captureFocus(){
 const el=document.activeElement;if(!el||el===document.body)return null;
 if(el.id)return {selector:'#'+CSS.escape(el.id)};
 if(el.dataset?.org)return {selector:el.tagName.toLowerCase()+'[data-org="'+CSS.escape(el.dataset.org)+'"]'};
 if(el.dataset?.action){let selector='[data-action="'+CSS.escape(el.dataset.action)+'"]';
 for(const k of ['value','index','id'])if(el.dataset[k]!==undefined)selector+='[data-'+k+'="'+CSS.escape(el.dataset[k])+'"]';
 return {selector,action:el.dataset.action};}
 return null;
}
function restoreFocus(f){
 if(!f)return;let target=$(f.selector);
 if(!target&&['add-step','remove-step','clear-order'].includes(f.action))target=$('[data-action="add-step"]')||$('#check-answer');
 if(target&&!target.disabled)target.focus({preventScroll:true});
}

function loadProgress(){
  try {const raw=localStorage.getItem(STORAGE_KEY); savedSnapshot=raw; return raw?cleanProgress(JSON.parse(raw),DATA):emptyProgress();}
  catch {storageWarning='Saved progress could not be read. Your app still works; use a progress backup to restore it.'; return emptyProgress();}
}
function save(){
  try {const raw=JSON.stringify(progress);localStorage.setItem(STORAGE_KEY,raw);savedSnapshot=raw;storageWarning='';$('[data-storage-warning]')?.remove();}
  catch {storageWarning='This browser is not saving progress. Keep this tab open or export a backup.'; toast(storageWarning);}
}
function loadRound(){
  try{
    const r=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');
    if(!r||r.schema!==1||!Array.isArray(r.entries)||!r.entries.length||r.entries.length>500) return null;
    if(!r.entries.every(x=>x&&byId[x.id]&&typeof x.answered==='boolean')||new Set(r.entries.map(x=>x.id)).size!==r.entries.length) return null;
    r.index=Math.max(0,Math.min(r.entries.length-1,Math.floor(r.index)||0));
    r.mode=r.mode==='exam'?'exam':'practice';
    for(const entry of r.entries){
      const q=byId[entry.id];
      if(['multi','order'].includes(q.type)){if(!Array.isArray(entry.response)||!entry.response.every(v=>typeof v==='string'))return null;}
      else if(typeof entry.response!=='string')return null;
      if(['multi','order'].includes(q.type)){const allowed=q.options||q.answer;if(new Set(entry.response).size!==entry.response.length||entry.response.some(v=>!allowed.includes(v)))return null;}
      if(q.type==='choice'&&entry.response&&!q.options.includes(entry.response))return null;
      if(entry.answered){entry.correct=grade(q,entry.response);}
      else entry.correct=null;
      entry.options=q.options?(Array.isArray(entry.options)&&entry.options.length===q.options.length&&new Set(entry.options).size===q.options.length&&entry.options.every(x=>q.options.includes(x))?entry.options:shuffle(q.options)):undefined;
      if(q.type==='order' && (!Array.isArray(entry.pool)||entry.pool.length!==q.answer.length||!q.answer.every(x=>entry.pool.includes(x))))entry.pool=shuffle(q.answer);
    }
    r.done=r.done===true&&r.entries.every(x=>x.answered);r.summarySaved=r.summarySaved===true;
    const first=r.entries.findIndex(x=>!x.answered);
    if(first>=0){if(r.entries.slice(first).some(x=>x.answered))return null;if(r.index!==first&&!(r.index===first-1&&r.entries[r.index].answered))r.index=first;}
    return r;
  }catch{return null;}
}
function saveRound(){try {sessionStorage.setItem(SESSION_KEY,JSON.stringify(round));roundWarning='';}catch{roundWarning='This browser cannot save the current round. Keep this tab open until you finish.';}}
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4000);}
function go(hash){if(location.hash===hash){render();window.scrollTo({top:0,behavior:'instant'});}else location.hash=hash;}
function route(){const [path,query='']=(location.hash.slice(1)||'home').split('?');return {path,params:new URLSearchParams(query)};}
function stopSpeech(){if('speechSynthesis'in window)speechSynthesis.cancel();}
function speak(text){
  if(!('speechSynthesis'in window)){toast('Read-aloud is not supported by this browser.');return;}
  stopSpeech(); const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.9;
  const voices=speechSynthesis.getVoices(); const v=voices.find(x=>x.localService&&x.lang==='en-US')||voices.find(x=>x.lang.startsWith('en'));
  if(v)u.voice=v;
  u.onerror=ev=>{if(!['interrupted','canceled'].includes(ev.error))toast('The device voice is unavailable. Try another browser or check your sound settings.');};
  speechSynthesis.speak(u);
}
function button(text,action,cls='primary',attrs=''){return `<button class="button ${cls}" data-action="${action}" ${attrs}>${text}</button>`;}
function topicOptions(selected='all'){return `<option value="all" ${selected==='all'?'selected':''}>All Unit 2 topics + basics</option>`+DATA.topics.map(t=>`<option value="${t.id}" ${selected===t.id?'selected':''}>${e(t.name)}</option>`).join('');}
function pageHeading(kicker,title,subtitle,extra=''){return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1 id="page-title" tabindex="-1">${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div>${extra}</div>`;}
function reference(ids){return `<details class="references"><summary>Reference reading</summary>${[...new Set(ids)].map(id=>{const s=DATA.sources[id];return s.url?`<a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${e(s.title)} ↗</a>`:`<p>${e(s.title)}. ${e(s.note)}</p>`;}).join('')}</details>`;}
function soundToggle(where='header'){
 const s=feedbackAudio.getSettings(),on=s.enabled&&s.volume>0;
 return `<button id="${where}-sound" type="button" class="${where==='header'?'sound-toggle':'button secondary'}" data-action="toggle-sound" role="switch" aria-label="Answer sounds" aria-checked="${on}" title="${on?'Mute answer sounds':'Turn on answer sounds'}">${icon(on?'volume':'volume-off')}<span>${on?'Sound on':'Sound off'}</span></button>`;
}
function refreshSoundControls(){
 const s=feedbackAudio.getSettings(),on=s.enabled&&s.volume>0;
 $$('[data-action="toggle-sound"]').forEach(b=>{b.setAttribute('aria-checked',String(on));b.title=on?'Mute answer sounds':'Turn on answer sounds';b.innerHTML=icon(on?'volume':'volume-off')+'<span>'+ (on?'Sound on':'Sound off')+'</span>';});
 $$('[data-action="preview-sound"]').forEach(b=>b.disabled=!on);
 if($('#sound-volume'))$('#sound-volume').value=Math.round(s.volume*100);
 if($('#sound-value'))$('#sound-value').textContent=Math.round(s.volume*100)+'%';
}
function setSoundPrefs(next){
 const saved=feedbackAudio.setSettings(next);refreshSoundControls();
 if(!saved)toast('Sound setting changed for this tab. This browser is not saving preferences.');
 return saved;
}
function soundSettings(){
 const s=feedbackAudio.getSettings(),on=s.enabled&&s.volume>0;
 return `<section class="panel sound-panel"><span class="mini-icon mint">${icon('volume')}</span><h2>A little sound, a little encouragement</h2><p>A bright chime for a correct answer, and a gentle two-note sound for a missed one. You can mute them any time with the speaker button at the top.</p><div class="button-row">${soundToggle('settings')}</div><label class="sound-volume-label" for="sound-volume">Answer sound volume <output id="sound-value" for="sound-volume">${Math.round(s.volume*100)}%</output></label><input id="sound-volume" type="range" min="0" max="100" step="10" value="${Math.round(s.volume*100)}"><div class="button-row sound-previews">${button('Try correct sound','preview-sound','secondary',`data-value="correct" ${on?'':'disabled'}`)}${button('Try wrong sound','preview-sound','secondary',`data-value="incorrect" ${on?'':'disabled'}`)}</div><p class="small-text muted">Practice and Find the part use answer sounds. Test yourself saves silently and plays a completion chime only at the end. Sounds work offline and do not change your scores. These controls do not mute the optional Listen buttons.</p><p class="small-text muted">Not hearing anything? Try a preview and check your device volume and silent settings. Sound preferences stay in this browser.</p></section>`;
}

function header(active){
 const s=stats(progress,DATA), nav=[['home','home','Home'],['guide','book','Study guide'],['quiz','spark','Practice'],['cards','cards','Cards'],['explore','orbit','Explore']];
 return `<header class="topbar"><div class="topbar-inner"><a class="brand" href="#home" aria-label="Cell Lab home"><span class="brand-mark">${icon('cell')}</span><span>cell<span class="brand-light">lab</span><small>BIOLOGY, MADE CLEAR</small></span></a><nav class="desktop-nav" aria-label="Main navigation">${nav.map(([id,ic,label])=>`<a href="#${id}" ${active===id?'aria-current="page"':''}>${label}</a>`).join('')}</nav><div class="header-right"><a class="streak-link" href="#progress" aria-label="View progress: ${s.streak} day study streak">${icon('spark')}<span>${s.streak?`${s.streak} day streak`:'Your study space'}</span></a>${soundToggle()}<a class="help-link" href="#help" aria-label="App help and sources">${icon('help')}</a></div></div></header>
 <nav class="mobile-nav" aria-label="Mobile navigation">${[...nav.slice(0,1),['guide','book','Guide'],...nav.slice(2,4),['explore','orbit','Explore']].map(([id,ic,label])=>`<a href="#${id}" ${active===id?'aria-current="page"':''}>${icon(ic)}<span>${label}</span></a>`).join('')}</nav>`;
}
function footer(){return `<footer class="footer"><span>${icon('cell')} Little by little, it clicks.</span><div><a href="#progress">Your progress</a><a href="#help">Sources & app info</a><span class="offline-status">${offlineReady?'Ready offline · v'+DATA.version:'Cell Lab v'+DATA.version}</span></div></footer>`;}
function render(){
  const focusBefore=captureFocus();stopSpeech(); const r=route();let active=r.path.split('/')[0];let content='';
  switch(active){
    case 'home':content=home();break;
    case 'guide':content=guidePage(r.path);break;
    case 'quiz':content=quizPage(r);break;
    case 'cards':content=cardsPage(r);break;
    case 'explore':content=explorePage();break;
    case 'progress':content=progressPage();break;
    case 'help':content=helpPage();break;
    default:active='home';content=home();
  }
  app.innerHTML=header(active)+`<main id="main" class="shell" tabindex="-1">${storageWarning||roundWarning?`<div class="notice warn" data-storage-warning>${e(storageWarning||roundWarning)}</div>`:''}${content}</main>`+footer();
  document.title=`${({home:'Your study space',guide:'Study guide',quiz:'Practice',cards:'Flashcards',explore:'Explore cells',progress:'Your progress',help:'Help & sources'})[active]} · Cell Lab`;
  if(active==='quiz'&&round&&!round.done&&r.path!=='quiz/setup') updateCheckButton();
  restoreFocus(focusBefore);
}
function home(){
 const s=stats(progress,DATA),pct=Math.min(100,s.today/10*100),inProgress=round&&!round.done;
 return `<section class="hero"><div class="hero-copy"><span class="pill mint">${icon('book')} HONORS BIOLOGY · UNIT 2</span><h1 id="page-title" tabindex="-1">Small cells.<br><em>Big discoveries.</em></h1><p>Your own little biology lab. Understand the ideas,<br class="desktop-only"> practice at your pace, and make them stick.</p><div class="button-row">${button(`${icon(inProgress?'play':'spark')}${inProgress?'Continue your round':'Let’s practice'}${icon('arrow')}`,inProgress?'resume-quiz':'quick-quiz') }<a class="text-link" href="#guide">Open study guide ${icon('arrow')}</a></div><div class="hero-meta"><span>${DATA.questions.length} practice questions</span><i></i><span>7 class prompts</span><i></i><span>No timer. No pressure.</span></div></div><div class="hero-art" aria-hidden="true"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><span class="art-label art-top">A WHOLE WORLD, IN ONE CELL</span>${cellSVG('animal','',false,false)}<span class="floating-tag tag-one"><i class="dot lavender"></i> Nucleus</span><span class="floating-tag tag-two"><i class="dot peach"></i> Mitochondrion</span><span class="art-caption">Take a closer look. There’s a lot going on.</span></div></section>
 <section class="dashboard-strip" aria-label="Study progress"><div class="daily-goal"><span class="mini-icon mint">${icon('spark')}</span><div><strong>Today’s small win</strong><p>${s.today>=10?'You reached your 10-question goal. Nicely done.':`${Math.min(s.today,10)} of 10 questions · a little practice goes a long way`}</p></div><div class="goal-track" role="progressbar" aria-label="Daily ten-question goal" aria-valuenow="${Math.min(10,s.today)}" aria-valuemin="0" aria-valuemax="10"><i style="width:${pct}%"></i></div></div><a href="#progress" class="progress-link"><strong>${s.explored}<span> / ${DATA.questions.length}</span></strong><small>questions explored</small>${icon('arrow')}</a></section>
 <section><div class="section-heading"><div><span class="eyebrow">FIND YOUR FLOW</span><h2>A good place to start</h2></div><a href="#progress" class="text-link">Your progress ${icon('arrow')}</a></div><div class="feature-grid">
 <a class="feature-card feature-mint" href="#guide"><span class="feature-icon">${icon('book')}</span><span class="card-topnote">THE CLASS ESSENTIALS</span><h3>Your 7-question guide</h3><p>Every prompt from the worksheet, with clear answers and a way to explain it yourself.</p><div class="card-bottom"><span>${s.ready} of 7 feeling confident</span>${icon('arrow')}</div></a>
 <a class="feature-card feature-lavender" href="#cards"><span class="feature-icon">${icon('cards')}</span><span class="card-topnote">A LITTLE EVERY DAY</span><h3>Flip. Think. Remember.</h3><p>${DATA.flashcards.length} flashcards for quick recall. Say it out loud, then check your understanding.</p><div class="card-bottom"><span>Study at your own pace</span>${icon('arrow')}</div></a>
 <a class="feature-card feature-rose" href="#explore"><span class="feature-icon">${icon('orbit')}</span><span class="card-topnote">SEE HOW IT WORKS</span><h3>Step inside a cell</h3><p>Explore cell parts, follow a protein’s journey, and see what happens when water moves.</p><div class="card-bottom"><span>3 interactive mini-labs</span>${icon('arrow')}</div></a></div></section>
 <section class="topic-section"><div class="section-heading"><div><span class="eyebrow">ONE IDEA AT A TIME</span><h2>Pick a topic to practice</h2></div><span class="muted small-text">Mixed question types · explanations included</span></div><div class="topic-grid">${DATA.topics.map(t=>{const qs=DATA.questions.filter(q=>q.topic===t.id),seen=qs.filter(q=>progress.attempts[q.id]).length;return `<a href="#quiz/setup?topic=${t.id}" class="topic-tile"><span class="mini-icon ${t.tone}">${icon(t.icon)}</span><div><h3>${e(t.name)}</h3><p>${qs.length} questions${seen?' · '+seen+' explored':''}</p></div>${icon('chevron')}</a>`;}).join('')}</div></section>
 ${s.review.length?`<section class="review-callout"><span class="mini-icon peach">${icon('refresh')}</span><div><h3>A second look makes a difference</h3><p>${s.review.length} question${s.review.length===1?' needs':'s need'} another try. Let’s turn those into understanding.</p></div>${button('Review missed questions','review-quiz','secondary')}</section>`:''}`;
}
function guidePage(path){
 const id=Number(path.split('/')[1]),g=DATA.guides.find(x=>x.id===id);
 if(!g){return pageHeading('YOUR CLASS ESSENTIALS','The seven-question study guide','The exact prompts from your worksheet, with explanations that make sense.')+`<div class="notice">${icon('book')}<span>Try explaining an answer first. Then reveal the model, check the key ideas, and rate your confidence. This is self-review, not automatic essay grading.</span></div><div class="guide-list">${DATA.guides.map(g=>`<a class="guide-list-card" href="#guide/${g.id}"><span class="guide-number">0${g.id}</span><div><span class="eyebrow">${e(topics[g.topic].short)}</span><h2>${e(g.title)}</h2><p>${e(g.prompt)}</p></div><span class="guide-status ${progress.guides[g.id]?.confidence==='ready'?'ready':''}">${progress.guides[g.id]?.confidence==='ready'?icon('check'):icon('arrow')}</span></a>`).join('')}</div>`;}
 const s=progress.guides[g.id]||{draft:'',checks:[],confidence:''},isOpen=revealGuide.has(g.id);
 return `<a class="back-link" href="#guide">← All seven questions</a>`+pageHeading(`STUDY GUIDE · QUESTION ${g.id} OF 7`,e(g.title),e(topics[g.topic].name),`<button class="button subtle" data-action="speak-guide" data-id="${g.id}">${icon('volume')} Read question</button>`)+
 `<div class="guide-layout"><aside class="guide-sidebar" aria-label="Study guide questions">${DATA.guides.map(x=>`<a href="#guide/${x.id}" ${x.id===g.id?'aria-current="page"':''}><span>${x.id}</span>${e(x.title)}${progress.guides[x.id]?.confidence==='ready'?icon('check'):''}</a>`).join('')}</aside><div class="guide-main"><section class="panel prompt-panel"><div class="eyebrow">FROM YOUR WORKSHEET</div><h2 class="worksheet-prompt">${e(g.prompt)}</h2><label for="guide-draft">Your explanation <span class="muted">— write it, or say it out loud</span></label><textarea id="guide-draft" data-guide="${g.id}" rows="4" maxlength="12000" placeholder="Try it in your own words. Your draft stays on this device.">${e(s.draft)}</textarea><div class="draft-foot"><span id="draft-status" class="muted small-text">Saved on this device as you type</span>${button(`${icon(isOpen?'close':'book')}${isOpen?'Hide model answer':'Reveal model answer'}`,'reveal-guide','primary',`data-id="${g.id}" aria-expanded="${isOpen}"`)}</div></section>
 ${isOpen?`<section class="panel model-answer"><div class="section-heading compact"><span class="eyebrow">A STRONG ANSWER</span>${button(icon('volume')+' Listen','speak-answer','subtle small',`data-id="${g.id}"`)}</div><p class="answer-lead">${e(g.answer)}</p>${guideVisual(g)}<div class="simple-explanation"><span class="eyebrow">IN PLAIN ENGLISH</span><p>${e(g.simple)}</p></div><details class="detail-note"><summary>A little more detail</summary><p>${e(g.detail)}</p></details><div class="memory-note">${icon('spark')}<div><strong>Make it stick</strong><p>${e(g.memory)}</p></div></div><div class="pitfall"><strong>Watch out for this</strong><p>${e(g.pitfall)}</p></div>${reference(g.sources)}</section>
 <section class="panel"><span class="eyebrow">CHECK YOUR OWN EXPLANATION</span><h2>Did you include the key ideas?</h2><p class="muted">Check an idea only when you can explain it without looking.</p><div class="checklist">${g.checklist.map((text,i)=>`<label><input type="checkbox" data-guide-check="${g.id}" value="${i}" ${s.checks.includes(i)?'checked':''}><span>${e(text)}</span></label>`).join('')}</div><div class="confidence-row">${button('Still learning','confidence','secondary'+(s.confidence==='learning'?' selected':''),`data-id="${g.id}" data-value="learning"`)}${button(icon('check')+' I can explain this','confidence','primary'+(s.confidence==='ready'?' selected':''),`data-id="${g.id}" data-value="ready" ${s.checks.length===g.checklist.length?'':'disabled'}`)}</div><p class="small-text muted">Confidence is your self-rating, separate from quiz accuracy.</p></section>`:''}
 <div class="guide-navigation"><a class="button secondary" href="#quiz/setup?topic=${g.topic}">${icon('spark')} Practice this topic</a><a class="button ${g.id<7?'primary':'secondary'}" href="#${g.id<7?'guide/'+(g.id+1):'guide'}">${g.id<7?'Next question':'Back to guide'} ${icon('arrow')}</a></div></div></div>`;
}
function guideVisual(g){
 if(g.kind==='traits')return `<div class="traits-grid">${DATA.traits.map((t,i)=>`<div><span class="trait-number">${i+1}</span><h3>${e(t.name)}</h3><p>${e(t.example)}</p></div>`).join('')}</div>`;
 if(g.kind==='levels')return `<div class="level-flow">${DATA.levels.map((l,i)=>`<span><small>${i+1}</small>${e(l)}</span>${i<7?'<b aria-hidden="true">→</b>':''}`).join('')}</div>`;
 if(g.kind==='pathway')return `<a class="inline-lab" href="#explore" data-action="open-pathway">${icon('route')} Follow the protein in the mini-lab ${icon('arrow')}</a>`;
 if(g.kind==='osmosis')return `<a class="inline-lab" href="#explore" data-action="open-water">${icon('drop')} Compare animal and plant cells in the water lab ${icon('arrow')}</a>`;
 return '';
}
function quizPage(r){
 if(r.path==='quiz/results'&&round?.done)return resultsPage();
 if(r.path==='quiz/setup'||!round||round.done)return setupPage(r.params);
 return questionPage();
}
function setupPage(params){
 const topic=topics[params.get('topic')]?params.get('topic'):'all',s=stats(progress,DATA);
 return pageHeading('MAKE IT STICK','A little practice, a lot of progress','Choose your pace. Every question comes with an explanation.')+
 `<div class="quiz-setup-layout"><section class="panel quiz-setup"><div class="section-heading compact"><span class="mini-icon lavender">${icon('spark')}</span><span class="pill">${DATA.questions.length} QUESTIONS IN THE BANK</span></div><h2>Build your practice round</h2><p>Freshly shuffled questions and answer choices. No repeated question within a round.</p><div class="field"><label for="quiz-topic">What would you like to practice?</label><select id="quiz-topic">${topicOptions(topic)}</select></div><div class="field-row"><div class="field"><label for="quiz-count">Round length</label><select id="quiz-count"><option value="10">10 questions</option><option value="20">20 questions</option><option value="all">All matching questions</option></select></div><div class="field"><label for="quiz-format">Question style</label><select id="quiz-format"><option value="all">A mix of everything</option><option value="choice">Multiple choice</option><option value="typed">Type the term</option><option value="order">Put in order</option><option value="multi">Select all that apply</option></select></div></div><fieldset class="mode-picker"><legend>When should answers appear?</legend><label><input type="radio" name="quiz-mode" value="practice" checked><span><strong>Learn as you go</strong><small>Explanations after each question</small></span></label><label><input type="radio" name="quiz-mode" value="exam"><span><strong>Test yourself</strong><small>Answers only at the end · no timer</small></span></label></fieldset><p id="pool-count" class="muted small-text">${DATA.questions.filter(q=>topic==='all'||q.topic===topic).length} matching questions available. Shorter pools use every match.</p>${button(icon('play')+' Start my round '+icon('arrow'),'start-quiz','primary full')}</section>
 <aside class="setup-aside"><div class="panel soft-mint"><span class="eyebrow">A GOOD STUDY ROUTINE</span><h2>Understand.<br>Recall.<br>Try again.</h2><p>Start with a topic you are learning, answer without notes, then read the “why.” A missed answer is a useful clue, not a failure.</p><a class="text-link" href="#guide">Visit the study guide ${icon('arrow')}</a></div>${s.review.length?`<div class="panel"><h3>${s.review.length} ready for a second look</h3><p>Practice questions you most recently missed.</p>${button('Review missed questions','review-quiz','secondary full')}</div>`:''}${round&&!round.done?`<div class="panel"><h3>Your round is waiting</h3><p>You’re on question ${round.index+1} of ${round.entries.length}.</p>${button('Continue previous round','resume-quiz','secondary full')}</div>`:''}</aside></div>`;
}
function startQuiz(opts={}){
 if(round&&!round.done&&!opts.resume && !confirm('Start a new round? Your already-graded answers stay saved, but the unfinished round will be replaced.'))return;
 const deck=makeDeck(DATA.questions,progress,opts);
 if(!deck.length){toast('No questions match that selection. Try another topic or question style.');return;}
 round={schema:1,id:Date.now().toString(36),index:0,done:false,summarySaved:false,mode:opts.mode==='exam'?'exam':'practice',review:!!opts.review,entries:deck.map(q=>{
   let pool=q.type==='order'?shuffle(q.answer):undefined;
   if(pool&&pool.every((v,i)=>v===q.answer[i]))pool.reverse();
   return {id:q.id,options:q.options?shuffle(q.options):undefined,pool,response:['multi','order'].includes(q.type)?[]:'',answered:false,correct:null};
 })}; saveRound();go('#quiz/run');
}
function questionPage(){
 const entry=round.entries[round.index],q=byId[entry.id],t=topics[q.topic],show=entry.answered&&round.mode!=='exam',n=round.entries.length;
 const correctSoFar=round.entries.filter(x=>x.answered&&x.correct).length;
 return `<div class="quiz-top"><a href="#home" class="back-link">← Pause & exit</a><span class="pill ${round.mode==='exam'?'lavender':'mint'}">${round.mode==='exam'?'TEST YOURSELF':round.review?'SECOND LOOK':'LEARN AS YOU GO'}</span></div><div class="quiz-progress-head"><span>Question <strong>${round.index+1}</strong> of ${n}</span><span>${round.mode==='exam'?'Answers at the end':`${correctSoFar} correct this round`}</span></div><div class="quiz-progress" role="progressbar" aria-label="Round progress" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${round.entries.filter(x=>x.answered).length}"><i style="width:${round.entries.filter(x=>x.answered).length/n*100}%"></i></div>
 <section class="question-card"><div class="question-meta"><span class="topic-tag ${t.tone}">${icon(t.icon)}${e(t.short)}</span><button class="icon-button" data-action="speak-question" aria-label="Read question aloud">${icon('volume')}</button></div><h1 id="page-title" tabindex="-1">${e(q.prompt)}</h1><p class="question-instruction">${({choice:'Choose one answer.',typed:'Type the biology term, not a full sentence. Case, punctuation, and accepted synonyms do not matter.',multi:'Choose all that apply. A correct answer includes every correct choice and no extras.',order:'Tap the steps below in the correct order. Tap a placed step to remove it.'})[q.type]}</p>
 <form id="answer-form" novalidate>${questionInput(q,entry,show)}<div id="answer-feedback" class="answer-feedback ${show?(entry.correct?'correct':'incorrect'):''}" ${entry.answered?'':'hidden'} tabindex="-1" role="status">${entry.answered?(show?`<strong>${icon(entry.correct?'check':'refresh')}${entry.correct?'You’ve got it.':'Let’s make this one clearer.'}</strong>${!entry.correct?`<p><b>Correct answer:</b> ${e(answerText(q))}</p>`:''}<p>${e(q.why)}</p>${q.guide?`<a href="#guide/${q.guide}">Review study-guide question ${q.guide} ↗</a>`:''}`:`<strong>${icon('check')} Response saved.</strong><p>You’ll see the answer and explanation at the end.</p>`):''}</div>
 <div class="question-actions">${!entry.answered?'<button id="check-answer" type="submit" class="button primary" disabled>'+ (round.mode==='exam'?'Save answer':'Check answer')+' '+icon('arrow')+'</button>':button((round.index===n-1?'See my results':'Next question')+' '+icon('arrow'),'next-question','primary')}</div></form></section><p class="quiz-reassurance">${icon('shield')} ${storageWarning||roundWarning?'Keep this tab open: browser storage is unavailable. You can export your progress from Help.':'Already-graded answers are saved on this device. You can leave and resume this round.'}</p>`;
}
function questionInput(q,entry,show){
 const disabled=entry.answered?'disabled':'';
 if(q.type==='typed')return `<label class="sr-only" for="typed-answer">Your answer</label><input id="typed-answer" class="typed-answer" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="150" placeholder="Type the term here…" value="${e(entry.response)}" ${disabled}>`;
 if(['choice','multi'].includes(q.type))return `<fieldset class="answer-options"><legend class="sr-only">${q.type==='multi'?'Select all correct answers':'Choose an answer'}</legend>${entry.options.map((opt,i)=>{const checked=q.type==='multi'?entry.response.includes(opt):entry.response===opt;const right=q.type==='multi'?q.answer.includes(opt):q.answer===opt;return `<label class="answer-option ${show&&right?'is-correct':''} ${show&&checked&&!right?'is-wrong':''} ${checked?'is-selected':''}"><input type="${q.type==='multi'?'checkbox':'radio'}" name="answer" value="${e(opt)}" ${checked?'checked':''} ${disabled}><span class="option-letter">${q.type==='multi'?icon('check'):String.fromCharCode(65+i)}</span><span>${e(opt)}</span>${show&&right?icon('check','result-mark'):show&&checked?icon('close','result-mark'):''}</label>`;}).join('')}</fieldset>`;
 const picked=entry.response;
 return `<div class="order-zone"><div class="order-label">YOUR SEQUENCE <span>${picked.length} / ${q.answer.length}</span></div><div class="order-placed">${picked.length?picked.map((text,i)=>`<button type="button" class="order-step" data-action="remove-step" data-index="${i}" ${disabled}><b>${i+1}</b><span>${e(text)}</span>${!entry.answered?icon('close'):''}</button>`).join(''):'<p class="muted">Start by choosing the first step below.</p>'}</div></div><div class="order-pool">${entry.pool.filter(x=>!picked.includes(x)).map(text=>`<button type="button" class="order-chip" data-action="add-step" data-value="${e(text)}" ${disabled}>+ ${e(text)}</button>`).join('')}</div>${picked.length&&!entry.answered?button('Clear sequence','clear-order','subtle small','type="button"'):''}`;
}
function answerText(q){return Array.isArray(q.answer)?q.answer.join(q.type==='order'?' → ':'; '):q.answer;}
function updateCheckButton(){
 const b=$('#check-answer');if(!b||!round)return;
 const q=byId[round.entries[round.index].id],r=round.entries[round.index].response;
 b.disabled=q.type==='order'?r.length!==q.answer.length:q.type==='multi'?r.length===0:!String(r).trim();
}
function checkAnswer(){
 syncProgress();
 if(!round||round.done)return;
 const entry=round.entries[round.index],q=byId[entry.id];
 if(entry.answered||$('#check-answer')?.disabled)return;
 entry.correct=grade(q,entry.response);entry.answered=true;
 recordAnswer(progress,q.id,entry.correct);save();saveRound();
 if(round.mode!=='exam')void feedbackAudio.play(entry.correct?'correct':'incorrect');
 render();$('#answer-feedback')?.focus({preventScroll:true});
 $('#answer-feedback')?.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function nextQuestion(){
 if(!round||round.done||!round.entries[round.index].answered)return;
 if(round.index<round.entries.length-1){round.index++;saveRound();render();window.scrollTo({top:0,behavior:'instant'});$('#page-title')?.focus({preventScroll:true});}
 else {round.done=true;if(!round.summarySaved){progress.rounds.push({at:new Date().toISOString(),total:round.entries.length,correct:round.entries.filter(x=>x.correct).length,mode:round.mode});progress.rounds=progress.rounds.slice(-50);round.summarySaved=true;save();}saveRound();if(round.mode==='exam')void feedbackAudio.play('complete');go('#quiz/results');}
}
function resultsPage(){
 const correct=round.entries.filter(x=>x.correct).length,total=round.entries.length,pct=Math.round(correct/total*100),wrong=round.entries.filter(x=>!x.correct);
 return `<section class="results-hero"><span class="results-medallion">${icon(pct>=80?'trophy':'spark')}</span><div class="eyebrow">ROUND COMPLETE</div><h1 id="page-title" tabindex="-1">${pct===100?'Look at you, making connections.':pct>=70?'It’s starting to click.':'A little clearer than before.'}</h1><p>${pct===100?'Every answer was correct. Try another topic to keep building.':'Read through the explanations, then give the tricky ones another try.'}</p><div class="result-score"><strong>${correct}<span> / ${total}</span></strong><span>${pct}% correct in this round</span></div><div class="button-row centered">${wrong.length?button(icon('refresh')+' Retry this round’s missed questions','retry-round','primary'):button(icon('spark')+' Try another mix','quick-quiz','primary')}<a class="button secondary" href="#quiz/setup">Choose a topic</a></div></section>
 <section class="results-review"><div class="section-heading"><h2>Your answer review</h2><span class="muted">${wrong.length} to revisit · ${correct} correct</span></div>${round.entries.map((entry,i)=>{const q=byId[entry.id],response=Array.isArray(entry.response)?entry.response.join(q.type==='order'?' → ':'; '):entry.response;return `<details class="result-item ${entry.correct?'result-right':'result-wrong'}" ${!entry.correct?'open':''}><summary><span class="result-icon">${icon(entry.correct?'check':'refresh')}</span><span><small>${i+1} · ${e(topics[q.topic].short)}</small>${e(q.prompt)}</span>${icon('chevron')}</summary><div class="result-detail"><p><strong>Your answer:</strong> ${e(response)}</p>${!entry.correct?`<p><strong>Correct answer:</strong> ${e(answerText(q))}</p>`:''}<p>${e(q.why)}</p>${q.guide?`<a class="text-link" href="#guide/${q.guide}">Study-guide question ${q.guide} ${icon('arrow')}</a>`:''}</div></details>`;}).join('')}</section>`;
}
function retryRound(){
 const ids=round?.entries.filter(x=>!x.correct).map(x=>x.id)||[];
 if(!ids.length){toast('No missed questions in this round. Nice work.');return;}
 const missed=shuffle(ids.map(id=>byId[id]));
 round={schema:1,id:Date.now().toString(36),index:0,done:false,summarySaved:false,mode:'practice',review:true,entries:missed.map(q=>({id:q.id,options:q.options?shuffle(q.options):undefined,pool:q.type==='order'?shuffle(q.answer):undefined,response:['multi','order'].includes(q.type)?[]:'',answered:false,correct:null}))};
 saveRound();go('#quiz/run');
}
function startCards(filter='all',reviewOnly=false){
 const eligible=DATA.flashcards.filter(c=>(filter==='all'||c.topic===filter)&&(!reviewOnly||progress.cards[c.id]==='review'));
 cardSession={filter,deck:shuffle(eligible),index:0,flipped:false,done:false,known:0,again:0};render();
}
function cardsPage(){
 if(!cardSession)cardSession={filter:'all',deck:shuffle(DATA.flashcards),index:0,flipped:false,done:false,known:0,again:0};
 const c=cardSession,card=c.deck[c.index],known=stats(progress,DATA).known;
 let inner='';
 if(!c.deck.length){inner=`<div class="empty-state panel">${icon('cards')}<h2>No cards need review here.</h2><p>Choose another topic or study the full deck.</p>${button('Study all cards','all-cards','primary')}</div>`;}
 else if(c.done){inner=`<div class="empty-state panel"><span class="results-medallion">${icon('spark')}</span><h2>A little more in your memory.</h2><p>You marked ${c.known} “Got it” and ${c.again} “Study again” in this pass. These are self-ratings, not quiz scores.</p><div class="button-row centered">${button('Review tricky cards','review-cards','primary')}${button('Shuffle a new pass','shuffle-cards','secondary')}</div></div>`;}
 else inner=`<div class="flash-progress"><span>Card ${c.index+1} of ${c.deck.length}</span><span>${e(topics[card.topic].short)}</span></div><button class="flashcard ${c.flipped?'flipped':''}" data-action="flip-card" aria-label="${c.flipped?'Answer. '+e(card.back)+'. Tap to show the term.':'Term: '+e(card.front)+'. Tap to reveal the explanation.'}"><span class="eyebrow">${c.flipped?'THE IDEA':'WHAT DO YOU REMEMBER?'}</span><${c.flipped?'p':'h2'} class="flash-main">${e(c.flipped?card.back:card.front)}</${c.flipped?'p':'h2'}>${c.flipped?`<span class="flash-tip">${e(card.tip)}</span>`:''}<span class="flip-hint">${icon('refresh')}${c.flipped?'Tap to see the term':'Tap to reveal'}</span></button><div class="card-controls"><button class="button subtle" data-action="speak-card">${icon('volume')} Listen</button><button class="button subtle" data-action="flip-card">${icon('refresh')} Flip card</button></div><div class="flash-rating">${button('Study again','rate-card','secondary',`data-value="review" ${c.flipped?'':'disabled'}`)}${button(icon('check')+' Got it','rate-card','primary',`data-value="known" ${c.flipped?'':'disabled'}`)}</div><p class="muted small-text centered">Reveal the explanation before rating your recall. Cards you miss are saved for another pass.</p>`;
 return pageHeading('QUICK RECALL','Flip. Think. Remember.','Try explaining the term before you turn the card over.')+`<div class="cards-toolbar"><div class="field"><label for="card-topic">Study topic</label><select id="card-topic">${topicOptions(c.filter)}</select></div><div class="button-row">${button(icon('refresh')+' Shuffle','shuffle-cards','secondary small')}${button('Tricky cards','review-cards','secondary small')}</div><span class="muted small-text">${known} of ${DATA.flashcards.length} marked “Got it”</span></div><section class="flash-stage">${inner}</section>`;
}
function rateCard(value){
 const c=cardSession;if(!c||c.done||!c.flipped)return;
 progress.cards[c.deck[c.index].id]=value;value==='known'?c.known++:c.again++;save();
 if(c.index===c.deck.length-1)c.done=true;else c.index++;
 c.flipped=false;render();$('.flashcard')?.focus({preventScroll:true});
}
function explorePage(){
 const tabs=[['cells','orbit','Cell explorer'],['protein','route','Protein journey'],['water','drop','Water lab']];
 return pageHeading('A CLOSER LOOK','Big ideas, little worlds','Explore the structures. Connect their jobs. See the patterns.')+`<div class="lab-tabs" role="tablist" aria-label="Interactive mini-labs">${tabs.map(([id,ic,name])=>`<button role="tab" id="lab-tab-${id}" aria-controls="lab-panel" tabindex="${explorer.tab===id?'0':'-1'}" aria-selected="${explorer.tab===id}" data-action="lab-tab" data-value="${id}">${icon(ic)}${name}</button>`).join('')}</div><section role="tabpanel" id="lab-panel" aria-labelledby="lab-tab-${explorer.tab}" aria-label="${e(tabs.find(x=>x[0]===explorer.tab)?.[2]||'Cell explorer')}">${explorer.tab==='protein'?proteinLab():explorer.tab==='water'?waterLab():cellLab()}</section>`;
}
function cellLab(){
 const x=explorer,available=DATA.organelles.filter(o=>o.cells.includes(x.kind));
 if(!available.some(o=>o.id===x.selected))x.selected=available[0].id;
 if(x.challenge&&!available.some(o=>o.id===x.target))x.target=shuffle(available.filter(o=>!['cytoplasm','cytoskeleton'].includes(o.id)))[0].id;
 const o=DATA.organelles.find(o=>o.id===x.selected),target=DATA.organelles.find(o=>o.id===x.target);
 return `<div class="cell-toolbar"><div class="segmented" aria-label="Cell type">${[['animal','Animal'],['plant','Plant'],['bacteria','Bacterial']].map(([id,name])=>`<button data-action="cell-type" data-value="${id}" aria-pressed="${x.kind===id}">${name}</button>`).join('')}</div><div class="button-row"><button class="button subtle small" data-action="toggle-labels" aria-pressed="${x.labels}" ${x.challenge?'disabled':''}>${x.labels?'Hide labels':'Show labels'}</button>${button(icon('search')+(x.challenge?' End challenge':' Find the part'),'toggle-challenge',x.challenge?'primary small':'secondary small')}</div></div>
 ${x.challenge?`<div class="challenge-prompt"><div><span class="eyebrow">FIND THE PART · ${x.found} FOUND</span><h2>Which structure’s main job is “${e(target.tag.toLowerCase())}”?</h2><p>Tap it in the diagram or choose its name below.</p></div>${x.feedback?.correct?button('Next part '+icon('arrow'),'next-target','primary small'):''}${x.feedback?`<p class="challenge-feedback ${x.feedback.correct?'success':'try-again'}" role="status">${x.feedback.correct?'Yes! '+e(target.name)+'.':'Not that part. Take another look and try again.'}</p>`:''}</div>`:''}
 <div class="cell-lab-layout"><div class="panel diagram-panel"><div class="diagram-heading"><span class="eyebrow">${x.kind==='plant'?'A PHOTOSYNTHETIC PLANT CELL':x.kind==='bacteria'?'A TYPICAL WALLED BACTERIUM':'A REPRESENTATIVE ANIMAL CELL'}</span><span class="live-dot">${x.challenge?'Find the structure':'Tap to explore'}</span></div>${cellSVG(x.kind,x.challenge?(x.feedback?.correct?x.target:''):x.selected,x.labels,true,x.challenge)}<p class="diagram-note">Illustrative, not to scale. Cells vary; not every real cell has every structure shown.</p></div>
 <aside class="panel organelle-info" aria-live="polite">${x.challenge&&!x.feedback?.correct?`<span class="mini-icon lavender">${icon('search')}</span><span class="eyebrow">LOOK CLOSELY</span><h2>Match the job<br>to the structure.</h2><p>The names below are another way to select a part. Diagram practice is separate from quiz accuracy.</p>`:`<span class="mini-icon ${x.kind==='plant'?'mint':'lavender'}">${icon('cell')}</span><span class="eyebrow">${e((x.challenge?target:o).tag)}</span><h2>${e((x.challenge?target:o).name)}</h2><p class="organelle-function">${e((x.challenge?target:o).function)}</p><div class="analogy"><strong>Think of it this way</strong><p>${e((x.challenge?target:o).analogy)}</p></div><div class="pitfall"><strong>Keep it clear</strong><p>${e((x.challenge?target:o).pitfall)}</p></div>${button(icon('volume')+' Read explanation','speak-organelle','subtle small')}`}</aside></div>
 <div class="organelle-picker" aria-label="Choose a cell structure">${available.map(part=>`<button data-org="${part.id}" class="${!x.challenge&&part.id===x.selected?'selected':''}" ${!x.challenge?`aria-pressed="${part.id===x.selected}"`:''}>${e(part.name)}</button>`).join('')}</div><p class="muted small-text">${x.kind==='plant'?'This plant diagram represents a photosynthetic cell. A typical underground root does not have chloroplasts.':x.kind==='bacteria'?'Bacteria have DNA and ribosomes, but no membrane-bound nucleus. Some bacteria lack a wall or flagellum.':'The diagram shows a typical animal cell. Plant cells also have mitochondria, ribosomes, ER, and Golgi.'}</p>${reference(['organelles','cells'])}`;
}
const journey=[
 {label:'Build',place:'Ribosome on rough ER',body:'A ribosome reads mRNA and assembles the protein. The growing protein enters the rough ER, where it can fold and begin processing.',note:'The nucleus made the mRNA instructions, not the protein.',icon:'layers',part:'rough-er'},
 {label:'Carry',place:'Transport vesicle',body:'A membrane-bound vesicle buds from the ER and carries the protein toward the Golgi apparatus.',note:'The cargo is now inside a membrane-wrapped package.',icon:'orbit',part:'vesicle'},
 {label:'Prepare',place:'Golgi apparatus',body:'The Golgi modifies and sorts the protein, then packages it for the correct destination.',note:'The Golgi is a processing and shipping center, not the protein builder.',icon:'layers',part:'golgi'},
 {label:'Deliver',place:'Secretory vesicle',body:'A secretory vesicle carries the packaged protein from the Golgi to the cell membrane.',note:'This is another vesicle stage, after the Golgi.',icon:'route',part:'vesicle'},
 {label:'Release',place:'Cell membrane · exocytosis',body:'The secretory vesicle fuses with the cell membrane. The protein is released outside the cell by exocytosis.',note:'Exo = out. The vesicle membrane joins the cell membrane.',icon:'arrow',part:'membrane'},
];
function proteinLab(){const step=journey[pathway];return `<div class="notice">${icon('route')}<span>Follow one protein that is destined to leave the cell. This is the secretory route, not the route of every protein.</span></div><div class="pathway-steps" aria-label="Protein journey steps">${journey.map((j,i)=>`<button class="${i===pathway?'active':''} ${i<pathway?'visited':''}" data-action="path-step" data-index="${i}" aria-current="${i===pathway?'step':'false'}"><span>${i<pathway?icon('check'):i+1}</span><strong>${j.label}</strong><small>${j.place}</small></button>`).join('')}</div><div class="cell-lab-layout"><div class="panel diagram-panel">${cellSVG('animal',step.part,true,false)}<p class="diagram-note">Highlighted: ${e(step.place)}. Diagram is illustrative, not to scale.</p></div><div class="panel journey-detail"><span class="eyebrow">STEP ${pathway+1} OF 5</span><span class="mini-icon lavender">${icon(step.icon)}</span><h2>${e(step.place)}</h2><p class="organelle-function">${e(step.body)}</p><div class="memory-note">${icon('spark')}<p>${e(step.note)}</p></div><div class="button-row">${button('← Previous','path-prev','secondary',pathway===0?'disabled':'')}${button(pathway<4?'Next step →':'Start again','path-next','primary')}</div>${button(icon('volume')+' Listen','speak-path','subtle small')}</div></div><div class="notice soft-mint"><strong>Three-organelle summary:</strong><span>Rough ER → Golgi apparatus → secretory vesicle. Remember the transport vesicle between ER and Golgi, plus exocytosis at the end.</span></div>${reference(['protein'])}`;}
function waterLab(){
 const states={hypo:{title:'Hypotonic surroundings',desc:'There are fewer nonpenetrating solutes outside than inside. Water tends to move into the cell.',direction:'Net water movement: inward',animal:'Swelling; may lyse',plant:'Turgid (firm)',a:'An animal cell lacks a rigid wall. Too much water entry can stretch and rupture its membrane.',p:'The wall resists expansion. Pressure builds as the cell fills, making the plant cell firm.',tip:'The wall is not waterproof. It resists expansion as water enters.'},iso:{title:'Isotonic surroundings',desc:'Effective solute concentrations are balanced. Water moves in both directions without net osmotic movement.',direction:'No net water movement',animal:'Normal volume',plant:'Flaccid (less firm)',a:'The cell does not gain or lose water overall. Individual water molecules still move.',p:'With little turgor pressure, the plant cell is less firm than in hypotonic surroundings.',tip:'Equilibrium means no net movement, not that molecules stop.'},hyper:{title:'Hypertonic surroundings',desc:'There are more nonpenetrating solutes outside than inside. Water tends to move out of the cell.',direction:'Net water movement: outward',animal:'Shrinking',plant:'Plasmolyzed',a:'Losing water causes the animal cell to shrink. In red blood cells, this is called crenation.',p:'The cell contents shrink. The membrane can pull away from the cell wall: plasmolysis.',tip:'A shrinking vacuole means less support. The rigid wall can remain while the contents shrink.'}};
 const s=states[water];return `<div class="panel water-controls"><span class="eyebrow">CHANGE THE SURROUNDINGS</span><h2>Where will the water go?</h2><p>Compare the solution outside the cell with the inside. Here, solutes are assumed not to cross the membrane.</p><div class="water-selector">${[['hypo','Fewer solutes outside','Hypotonic'],['iso','Balanced solutes','Isotonic'],['hyper','More solutes outside','Hypertonic']].map(([id,label,term])=>`<button data-action="water-state" data-value="${id}" aria-pressed="${water===id}"><strong>${label}</strong><span>${term}</span></button>`).join('')}</div></div><div class="water-heading" aria-live="polite"><span class="pill blue">${icon('drop')}${s.direction}</span><h2>${s.title}</h2><p>${s.desc}</p></div><div class="water-cells"><section class="panel"><span class="eyebrow">ANIMAL CELL</span>${waterSVG('animal',water)}<h3>${s.animal}</h3><p>${s.a}</p></section><section class="panel"><span class="eyebrow">PLANT CELL</span>${waterSVG('plant',water)}<h3>${s.plant}</h3><p>${s.p}</p></section></div><div class="notice soft-mint">${icon('spark')}<span>${s.tip}</span></div><p class="diagram-note">A simplified visual comparison, not a quantitative or real-time simulation. The swollen animal cell illustrates risk of lysis, not a guaranteed final size.</p>${reference(['transport','organelles'])}`;
}
function progressPage(){
 const s=stats(progress,DATA),achievements=[{title:'First little step',text:'Complete a practice round',done:progress.rounds.length>0,ic:'spark'},{title:'Making connections',text:'Explore 25 distinct questions',done:s.explored>=25,ic:'route'},{title:'Cell explorer',text:'Explore 75 distinct questions',done:s.explored>=75,ic:'orbit'},{title:'The seven essentials',text:'Self-rate all seven guide answers as confident',done:s.ready===7,ic:'book'},{title:'Memory in motion',text:'Mark 25 flashcards “Got it”',done:s.known>=25,ic:'cards'},{title:'A little every day',text:'Study on 3 consecutive days',done:s.streak>=3,ic:'trophy'}];
 return pageHeading('YOUR STUDY STORY','Look how far you’ve come','This is practice feedback, not a prediction of a school grade.')+`<div class="stats-grid"><div class="panel stat"><span>Questions explored</span><strong>${s.explored}<small> / ${DATA.questions.length}</small></strong><p>Unique questions attempted</p></div><div class="panel stat"><span>Quiz accuracy</span><strong>${s.accuracy===null?'—':s.accuracy+'%'}</strong><p>${s.correct} correct / ${s.attempts} attempts, including retries</p></div><div class="panel stat"><span>Guide confidence</span><strong>${s.ready}<small> / 7</small></strong><p>Your own “I can explain this” ratings</p></div><div class="panel stat"><span>Study streak</span><strong>${s.streak}<small> day${s.streak===1?'':'s'}</small></strong><p>Days with at least one graded quiz answer</p></div></div>
 <section class="panel"><div class="section-heading"><h2>Your topic map</h2>${s.review.length?button(`Review ${s.review.length} missed`,'review-quiz','secondary small'):''}</div><p class="muted">Bars show how much of each question bank you’ve tried. Accuracy is based on all attempts, including retries.</p><div class="topic-progress-list">${DATA.topics.map(t=>{const qs=DATA.questions.filter(q=>q.topic===t.id),seen=qs.filter(q=>progress.attempts[q.id]),attempts=seen.reduce((n,q)=>n+progress.attempts[q.id].seen,0),correct=seen.reduce((n,q)=>n+progress.attempts[q.id].correct,0);return `<a href="#quiz/setup?topic=${t.id}"><span class="mini-icon ${t.tone}">${icon(t.icon)}</span><div><div class="topic-progress-label"><strong>${e(t.name)}</strong><span>${seen.length} / ${qs.length} explored</span></div><div class="thin-track"><i style="width:${seen.length/qs.length*100}%"></i></div></div><span class="accuracy-tag">${attempts?Math.round(correct/attempts*100)+'%':'Not started'}</span>${icon('chevron')}</a>`;}).join('')}</div></section>
 <section><div class="section-heading"><h2>Little milestones</h2><span class="muted">${achievements.filter(a=>a.done).length} of ${achievements.length} reached</span></div><div class="achievement-grid">${achievements.map(a=>`<div class="achievement ${a.done?'earned':''}"><span class="mini-icon ${a.done?'mint':'neutral'}">${icon(a.ic)}</span><h3>${a.title}</h3><p>${a.text}</p><span class="achievement-state">${a.done?'✓ Reached':'Still growing'}</span></div>`).join('')}</div></section>
 ${progress.rounds.length?`<section class="panel"><h2>Recent rounds</h2><div class="round-list">${progress.rounds.slice(-8).reverse().map(r=>`<div><span>${Number.isNaN(new Date(r.at).getTime())?'Practice round':new Date(r.at).toLocaleDateString(undefined,{month:'short',day:'numeric'})}<small>${r.mode==='exam'?'Test yourself':'Learn as you go'}</small></span><strong>${r.correct} / ${r.total}</strong></div>`).join('')}</div></section>`:''}<div class="notice">${icon('shield')}<span>Progress lives in this browser, on this device. <a href="#help">Export a backup</a> to move it to another device. Flashcard self-ratings do not affect quiz accuracy.</span></div>`;
}
function helpPage(){
 return pageHeading('A FEW USEFUL DETAILS','Your lab, your pace','How to use Cell Lab, keep your progress, and check the sources.')+`<div class="help-grid">${soundSettings()}<section class="panel"><span class="mini-icon mint">${icon('book')}</span><h2>Start here</h2><p>Begin with the seven study-guide prompts, then practice a topic or shuffle a quiz. Use flashcards for recall and the explorer to connect structures with their functions.</p><p><strong>Written answers:</strong> compare your explanation with the model and checklist. The app does not pretend to automatically grade open-ended biology explanations.</p><p><strong>Typed quiz answers:</strong> enter the requested term. Capitalization, punctuation, spacing, and explicitly accepted synonyms are normalized. Standard dotted abbreviations such as A.T.P. and R.E.R. are accepted too. Incorrect terms are not accepted merely because they contain the right word.</p><p><strong>Review queue:</strong> a missed question stays there until you correctly answer it in a later quiz.</p><p><strong>Read aloud:</strong> uses your browser’s device voice. Availability and offline speech support vary; some voices may use an online speech service.</p></section>
 <section class="panel"><span class="mini-icon lavender">${icon('download')}</span><h2>Keep it on your phone</h2><p>On iPhone, open this site in Safari, tap the Share button, then choose <strong>Add to Home Screen</strong>. On supported Android browsers, use <strong>Install app</strong> or <strong>Add to Home screen</strong> in the browser menu.</p><p>The app caches its study content after a successful online visit. Wait for <strong>Ready offline</strong> in the footer before relying on it offline. External reference pages still need internet.</p><p><strong>Updates:</strong> when a new version is ready, an update banner appears. Finish your current answer, then update. Saved progress is kept.</p><div class="notice soft-mint">No account, subscription, or AI API key needed. No computer at home needs to stay on.</div></section>
 <section class="panel"><span class="mini-icon blue">${icon('shield')}</span><h2>Your progress belongs here</h2><p>Your answers, drafts, flashcard ratings, and quiz results are stored locally in this browser. The app has no analytics or server that receives study answers. GitHub serves the public app files.</p><p>Progress does not automatically sync between phones, browsers, or home-screen installs. Clearing website data can erase it, so export a backup to keep it safe.</p><div class="button-row">${button(icon('download')+' Export progress','export-progress','primary')}<label class="button secondary import-button">Import backup<input id="import-progress" type="file" accept="application/json,.json" class="sr-only"></label></div><p class="small-text muted">An import replaces this browser’s progress after confirmation. Treat exported files as personal: they include written study drafts.</p><details class="reset-zone"><summary>Reset this app’s progress</summary><p>This only deletes Cell Lab progress in this browser, not your Spanish app or other websites.</p>${button('Reset Cell Lab progress','reset-progress','danger')}</details></section>
 <section class="panel"><span class="mini-icon rose">${icon('flask')}</span><h2>About the content</h2><p>Cell Lab includes <strong>all seven prompts</strong> from the supplied Honors Biology Unit 2 worksheet, plus <strong>${DATA.questions.length} original practice questions</strong> and <strong>${DATA.flashcards.length} recall cards</strong>. The extra chemistry topic revisits basic biology building blocks.</p><p>The six characteristics use the class reading’s grouping: respond to the environment; grow and develop; produce offspring; maintain homeostasis; have complex chemistry; consist of cells.</p><p>Model answers are study aids, not a teacher-approved answer key. A teacher may accept other valid examples or use different phrasing. Cell diagrams are original simplified schematics, not to scale.</p><p>The worksheet photo, student name, school name, and personal information are not included in the public repository.</p><p class="muted small-text">Cell Lab v${DATA.version} · Content reviewed September 21, 2026</p></section></div>
 <section class="panel source-panel"><span class="eyebrow">CHECK THE IDEAS</span><h2>Reference shelf</h2><p>These are further-reading references used to check the concepts. Explanations, questions, and diagrams in this app are original study material; the app is not affiliated with the publishers or the school.</p><div class="source-list">${Object.entries(DATA.sources).map(([id,s])=>s.url?`<a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${icon('book')}<span>${e(s.title)}</span>${icon('arrow')}</a>`:`<div>${icon('book')}<span><strong>${e(s.title)}</strong><small>${e(s.note)}</small></span></div>`).join('')}</div></section>`;
}
// A single delegated event path keeps repeated rendering from stacking listeners.
document.addEventListener('click',event=>{
 syncProgress();
 if(event.target.closest('.skip-link')){event.preventDefault();$('#main')?.focus();return;}
 const part=event.target.closest('[data-org]');if(part){event.preventDefault();selectOrganelle(part.dataset.org);return;}
 const el=event.target.closest('[data-action]');if(!el||el.disabled)return;
 const action=el.dataset.action;
 if(el.tagName==='A'||el.closest('form'))event.preventDefault();
 switch(action){
  case 'quick-quiz':startQuiz({count:10});break;
  case 'start-quiz':startQuiz({topic:$('#quiz-topic').value,format:$('#quiz-format').value,count:$('#quiz-count').value,mode:$('input[name="quiz-mode"]:checked').value});break;
  case 'resume-quiz':go('#quiz/run');break;
  case 'review-quiz':startQuiz({review:true,count:'all'});break;
  case 'retry-round':retryRound();break;
  case 'next-question':nextQuestion();break;
  case 'speak-question':speak(byId[round.entries[round.index].id].prompt);break;
  case 'add-step':case 'remove-step':case 'clear-order':{
    const entry=round?.entries[round.index];if(!entry||entry.answered)break;
    if(action==='add-step'&&!entry.response.includes(el.dataset.value)&&byId[entry.id].answer.includes(el.dataset.value))entry.response.push(el.dataset.value);
    if(action==='remove-step')entry.response.splice(Number(el.dataset.index),1);
    if(action==='clear-order')entry.response=[];
    const y=window.scrollY;saveRound();render();window.scrollTo(0,y);break;
  }
  case 'reveal-guide':{const id=Number(el.dataset.id);revealGuide.has(id)?revealGuide.delete(id):revealGuide.add(id);const y=window.scrollY;render();window.scrollTo(0,y);break;}
  case 'confidence':{const id=Number(el.dataset.id),g=DATA.guides.find(g=>g.id===id),s=getGuide(id);if(el.dataset.value==='ready'&&s.checks.length!==g.checklist.length)break;s.confidence=el.dataset.value;save();const y=window.scrollY;render();window.scrollTo(0,y);toast(s.confidence==='ready'?'Confidence saved. Try explaining it again tomorrow.':'Saved. A little more practice will help.');break;}
  case 'speak-guide':speak(DATA.guides.find(g=>g.id===Number(el.dataset.id)).prompt);break;
  case 'speak-answer':{const g=DATA.guides.find(g=>g.id===Number(el.dataset.id));speak(g.answer+(g.kind==='traits'?'. '+DATA.traits.map(t=>t.name+'. Example: '+t.example).join(' '):''));break;}
  case 'flip-card':if(cardSession&&!cardSession.done){cardSession.flipped=!cardSession.flipped;render();$('.flashcard')?.focus({preventScroll:true});}break;
  case 'rate-card':rateCard(el.dataset.value);break;
  case 'shuffle-cards':startCards(cardSession?.filter||'all');break;
  case 'all-cards':startCards();break;
  case 'review-cards':startCards(cardSession?.filter||'all',true);break;
  case 'speak-card':{const c=cardSession?.deck[cardSession.index];if(c)speak(cardSession.flipped?c.back+'. '+c.tip:c.front);break;}
  case 'lab-tab':explorer.tab=el.dataset.value;render();break;
  case 'cell-type':explorer.kind=el.dataset.value;explorer.feedback=null;explorer.target='';render();break;
  case 'toggle-labels':explorer.labels=!explorer.labels;render();break;
  case 'toggle-challenge':explorer.challenge=!explorer.challenge;explorer.feedback=null;explorer.target='';render();break;
  case 'next-target':{const candidates=DATA.organelles.filter(o=>o.cells.includes(explorer.kind)&&!['cytoplasm','cytoskeleton',explorer.target].includes(o.id));explorer.target=shuffle(candidates)[0].id;explorer.feedback=null;render();break;}
  case 'speak-organelle':{const o=DATA.organelles.find(o=>o.id===(explorer.challenge?explorer.target:explorer.selected));if(o)speak(o.name+'. '+o.function+'. '+o.pitfall);break;}
  case 'open-pathway':explorer.tab='protein';go('#explore');break;
  case 'open-water':explorer.tab='water';go('#explore');break;
  case 'path-step':pathway=Number(el.dataset.index);render();break;
  case 'path-prev':pathway=Math.max(0,pathway-1);render();break;
  case 'path-next':pathway=(pathway+1)%journey.length;render();break;
  case 'speak-path':speak(journey[pathway].place+'. '+journey[pathway].body);break;
  case 'water-state':water=el.dataset.value;render();break;
  case 'toggle-sound':{const s=feedbackAudio.getSettings(),on=!(s.enabled&&s.volume>0);const saved=setSoundPrefs({enabled:on,volume:s.volume||0.6});if(on)void feedbackAudio.play('correct');if(saved)toast(on?'Answer sounds on.':'Answer sounds muted.');break;}
  case 'preview-sound':void feedbackAudio.play(el.dataset.value);break;
  case 'export-progress':exportProgress();break;
  case 'reset-progress':if(confirm('Delete all Cell Lab progress, written drafts, and the current round in this browser? This cannot be undone without an exported backup.')){progress=emptyProgress();round=null;cardSession=null;revealGuide.clear();save();saveRound();render();toast('Cell Lab progress reset.');}break;
 }
});
function getGuide(id){return progress.guides[id]??=( {draft:'',checks:[],confidence:''} );}
function selectOrganelle(id){
 if(!DATA.organelles.some(o=>o.id===id&&o.cells.includes(explorer.kind)))return;
 if(explorer.challenge){if(explorer.feedback?.correct)return;const correct=id===explorer.target;explorer.feedback={correct};void feedbackAudio.play(correct?'correct':'incorrect');if(correct)explorer.found++;}
 else explorer.selected=id;
 const y=window.scrollY;render();window.scrollTo(0,y);
}
document.addEventListener('keydown',event=>{
 const tab=event.target.closest('[role=tab]');
 if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const ids=['cells','protein','water'];let i=ids.indexOf(explorer.tab);i=event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'?1:2))%3;explorer.tab=ids[i];render();$('#lab-tab-'+ids[i])?.focus();return;}
 const part=event.target.closest('svg [data-org]');if(part&&['Enter',' '].includes(event.key)){event.preventDefault();selectOrganelle(part.dataset.org);}});
document.addEventListener('submit',event=>{if(event.target.id==='answer-form'){event.preventDefault();checkAnswer();}});
document.addEventListener('input',event=>{
 syncProgress();
 const el=event.target;
 if(el.id==='sound-volume'){const volume=Number(el.value)/100;setSoundPrefs({volume,enabled:volume>0});}
 if(el.id==='guide-draft'){const s=getGuide(Number(el.dataset.guide));s.draft=el.value;save();$('#draft-status').textContent=storageWarning?'Draft kept for this tab only':'Draft saved on this device';}
 if(el.id==='typed-answer'&&round){round.entries[round.index].response=el.value;saveRound();updateCheckButton();}
});
document.addEventListener('change',event=>{
 syncProgress();
 const el=event.target;
 if(el.name==='answer'&&round){const entry=round.entries[round.index];if(entry.answered)return;const q=byId[entry.id];entry.response=q.type==='multi'?$$('input[name="answer"]:checked').map(x=>x.value):el.value;$$('.answer-option').forEach(label=>label.classList.toggle('is-selected',$('input',label).checked));saveRound();updateCheckButton();}
 if(el.dataset.guideCheck){const id=Number(el.dataset.guideCheck),s=getGuide(id);s.checks=$$(`[data-guide-check="${id}"]:checked`).map(x=>Number(x.value));const g=DATA.guides.find(g=>g.id===id);if(s.checks.length<g.checklist.length&&s.confidence==='ready')s.confidence='learning';save();const b=$('[data-action="confidence"][data-value="ready"]');if(b)b.disabled=s.checks.length!==g.checklist.length;$$('[data-action=confidence]').forEach(x=>x.classList.toggle('selected',x.dataset.value===s.confidence));}
 if(['quiz-topic','quiz-format','quiz-count'].includes(el.id)){const topic=$('#quiz-topic').value,format=$('#quiz-format').value,n=DATA.questions.filter(q=>(topic==='all'||q.topic===topic)&&(format==='all'||q.type===format)).length;$('#pool-count').textContent=`${n} matching question${n===1?'':'s'} available. Shorter pools use every match.`;$('[data-action="start-quiz"]').disabled=n===0;}
 if(el.id==='card-topic')startCards(el.value);
 if(el.id==='import-progress')importProgress(el.files?.[0]);
});
function exportProgress(){
 const blob=new Blob([JSON.stringify({...progress,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`cell-lab-progress-${localDate()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Progress backup created. Keep it somewhere safe.');
}
async function importProgress(file){
 if(!file)return;
 try{if(file.size>1_000_000)throw new Error('That file is too large for a Cell Lab progress backup.');const next=cleanProgress(JSON.parse(await file.text()),DATA);const s=stats(next,DATA);if(!confirm(`Replace this browser’s Cell Lab progress with the backup (${s.attempts} quiz attempts, ${s.ready} confident guide answers)?`))return;progress=next;round=null;cardSession=null;save();saveRound();render();toast('Progress restored from your backup.');}
 catch(error){toast('Import not completed: '+(error instanceof SyntaxError?'The file is not valid JSON.':error.message));}
 finally{if($('#import-progress'))$('#import-progress').value='';}
}
window.addEventListener('storage',event=>{if(event.key!==STORAGE_KEY&&event.key!==null)return;if(syncProgress()&&!document.activeElement?.matches('input,textarea,select')){const y=scrollY;render();scrollTo(0,y);}});
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'});$('#page-title')?.focus({preventScroll:true});});
window.addEventListener('pagehide',()=>{feedbackAudio.stop();stopSpeech();saveRound();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)feedbackAudio.stop();});
window.addEventListener('storage',event=>{if(event.key===AUDIO_KEY||event.key===null){feedbackAudio.sync();refreshSoundControls();}});
render();
if('serviceWorker'in navigator){
 navigator.serviceWorker.register('./sw.js').then(reg=>{
   const showUpdate=()=>{if(reg.waiting&&navigator.serviceWorker.controller)$('#update-banner').hidden=false;};
   showUpdate();reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')showUpdate();});});
   $('#install-update').onclick=()=>{if(reg.waiting){save();saveRound();reg.waiting.postMessage({type:'ACTIVATE_UPDATE'});}};
   let refreshing=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!refreshing&&!$('#update-banner').hidden){refreshing=true;location.reload();}});
   navigator.serviceWorker.ready.then(()=>{offlineReady=true;$$('.offline-status').forEach(x=>x.textContent='Ready offline · v'+DATA.version);});
 }).catch(()=>{/* Online app remains fully usable without offline caching. */});
}

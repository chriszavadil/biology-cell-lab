import test from 'node:test';
import assert from 'node:assert/strict';
import {DATA} from '../data.js';
import {grade,normalizeAnswer,shuffle,makeDeck,emptyProgress,recordAnswer,stats,cleanProgress,localDate,streak,escapeHTML} from '../core.js';

test('content inventory: all 7 class prompts, 122 questions, 47 flashcards, 8 topics',()=>{
 assert.equal(DATA.guides.length,7);assert.equal(DATA.questions.length,122);assert.equal(DATA.flashcards.length,47);assert.equal(DATA.topics.length,8);
 assert.deepEqual(DATA.guides.map(g=>g.id),[1,2,3,4,5,6,7]);
});
test('all ids unique and all questions have a valid topic, explanation and source mapping',()=>{
 assert.equal(new Set(DATA.questions.map(q=>q.id)).size,DATA.questions.length);
 assert.equal(new Set(DATA.flashcards.map(q=>q.id)).size,DATA.flashcards.length);
 for(const q of DATA.questions){const t=DATA.topics.find(t=>t.id===q.topic);assert(t,q.id);assert(q.prompt.length>15);assert(q.why.length>25);assert(t.sources.every(s=>DATA.sources[s]));if(q.guide)assert(DATA.guides.some(g=>g.id===q.guide));}
});
test('all correct answers grade correctly in every question type',()=>{
 for(const q of DATA.questions)assert.equal(grade(q,q.answer),true,q.id);
});
test('every multiple choice has exactly four distinct answers and one correct answer',()=>{
 for(const q of DATA.questions.filter(q=>q.type==='choice')){assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);for(const option of q.options)assert.equal(grade(q,option),option===q.answer,q.id);}
});
test('all typed aliases handle uppercase, leading articles, punctuation and outer whitespace',()=>{
 for(const q of DATA.questions.filter(q=>q.type==='typed'))for(const alias of q.aliases){assert(grade(q,alias),q.id);assert(grade(q,'  '+alias.toUpperCase()+'!!!  '),q.id+' '+alias);assert(grade(q,'The '+normalizeAnswer(alias)+'.'),q.id);}
});
test('typed grading never accepts blank, contradictory sentences or substring-only matches',()=>{
 for(const q of DATA.questions.filter(q=>q.type==='typed')){assert(!grade(q,''));assert(!grade(q,'  '));assert(!grade(q,'not '+q.answer));assert(!grade(q,q.answer+' or something else'));assert(!grade(q,'definitely not '+q.answer));}
});
test('normalization preserves word boundaries and handles Unicode accents',()=>{
 assert.equal(normalizeAnswer('  The GOLGI-apparatus!!! '),'golgi apparatus');assert.equal(normalizeAnswer('MÍTOCHONDRIA.'),'mitochondria');assert.notEqual(normalizeAnswer('cellwall'),normalizeAnswer('cell wall'));
});
test('ordering requires all steps in the correct order',()=>{
 for(const q of DATA.questions.filter(q=>q.type==='order')){assert(!grade(q,q.answer.slice(1)));assert(!grade(q,[...q.answer].reverse()));assert(!grade(q,[...q.answer,q.answer[0]]));assert(!grade(q,q.answer.join(' → ')));}
});
test('select-all accepts reordered correct set but rejects partial, extra and duplicate choices',()=>{
 for(const q of DATA.questions.filter(q=>q.type==='multi')){assert(grade(q,[...q.answer].reverse()));assert(!grade(q,q.answer.slice(1)));assert(!grade(q,[...q.answer,q.options.find(x=>!q.answer.includes(x))]));assert(!grade(q,[...q.answer,q.answer[0]]));}
});
test('shuffle preserves original input and exact contents over 100 rounds',()=>{
 const a=[1,2,3,4,5,6];for(let i=0;i<100;i++){const shuffled=shuffle(a);assert.deepEqual([...shuffled].sort(),a);assert.notStrictEqual(shuffled,a);}assert.deepEqual(a,[1,2,3,4,5,6]);
});
test('answers remain correct after 1000 answer-option shuffles',()=>{
 const eligible=DATA.questions.filter(q=>q.type==='choice');for(let i=0;i<1000;i++){const q=eligible[i%eligible.length],options=shuffle(q.options);assert.equal(options.filter(o=>grade(q,o)).length,1,q.id);}
});
test('question deck does not repeat and honors topic and format filters',()=>{
 for(const t of ['all',...DATA.topics.map(t=>t.id)])for(const format of ['all','choice','typed','order','multi']){
 const d=makeDeck(DATA.questions,emptyProgress(),{topic:t,format,count:20});assert(d.length<=20);assert.equal(new Set(d.map(q=>q.id)).size,d.length);assert(d.every(q=>(t==='all'||q.topic===t)&&(format==='all'||q.type===format)));
 }
});
test('short pools safely produce short rounds and all returns every eligible question',()=>{
 const p=emptyProgress();const d=makeDeck(DATA.questions,p,{topic:'energy',format:'order',count:10});assert.equal(d.length,0);
 assert.equal(makeDeck(DATA.questions,p,{count:'all'}).length,122);
 assert.equal(makeDeck(DATA.questions,p,{topic:'protein',format:'order',count:20}).length,2);
});
test('review queue tracks latest quiz outcome and accuracy retains all attempts',()=>{
 const p=emptyProgress(),q=DATA.questions[0];recordAnswer(p,q.id,false);assert.deepEqual(stats(p,DATA).review,[q.id]);assert.equal(stats(p,DATA).accuracy,0);
 recordAnswer(p,q.id,true);const s=stats(p,DATA);assert.deepEqual(s.review,[]);assert.equal(s.accuracy,50);assert.equal(s.explored,1);assert.equal(s.attempts,2);assert.equal(s.correct,1);
});
test('adaptive rounds prioritize missed, then untried, then previously correct questions',()=>{
 const p=emptyProgress();recordAnswer(p,'q001',true);recordAnswer(p,'q002',false);const d=makeDeck(DATA.questions,p,{count:'all'});assert.equal(d[0].id,'q002');assert.equal(d.at(-1).id,'q001');
});
test('review-only deck excludes unseen and most-recently correct questions',()=>{
 const p=emptyProgress();recordAnswer(p,'q001',true);recordAnswer(p,'q002',false);assert.deepEqual(makeDeck(DATA.questions,p,{review:true,count:'all'}).map(x=>x.id),['q002']);
});
test('flashcard confidence and guide self-ratings do not change quiz accuracy',()=>{
 const p=emptyProgress();p.cards[DATA.flashcards[0].id]='known';p.guides[1]={confidence:'ready',checks:[0,1,2,3],draft:'hello'};const s=stats(p,DATA);assert.equal(s.attempts,0);assert.equal(s.accuracy,null);assert.equal(s.known,1);assert.equal(s.ready,1);
});
test('streak tolerates an unfinished current day and uses calendar days',()=>{
 const days={'2026-09-19':{answered:1},'2026-09-20':{answered:1}};assert.equal(streak(days,new Date(2026,8,21,1)),2);assert.equal(streak(days,new Date(2026,8,22)),0);days['2026-09-21']={answered:2};assert.equal(streak(days,new Date(2026,8,21,18)),3);
});
test('streak handles month and DST-boundary-style date changes',()=>{
 assert.equal(streak({'2026-02-28':{answered:1},'2026-03-01':{answered:1}},new Date(2026,2,1)),2);assert.equal(localDate(new Date(2026,0,2,23)), '2026-01-02');
});
test('storage import restores valid drafts, quiz attempts, and flags',()=>{
 const p=emptyProgress();recordAnswer(p,'q002',true);p.guides[1]={draft:'My explanation.',checks:[0,2],confidence:'learning'};p.cards['f-nucleus']='known';const clean=cleanProgress(JSON.parse(JSON.stringify(p)),DATA);assert.deepEqual(clean,p);
});
test('storage import rejects invalid schemas and clamps malformed counts',()=>{
 for(const raw of [null,{},[],{schema:2}])assert.throws(()=>cleanProgress(raw,DATA));
 const p=emptyProgress();p.attempts.q001={seen:5,correct:999,lastCorrect:true};p.attempts.bad={seen:99,correct:99};p.days['not a date']={answered:999};p.guides[1]={checks:[0,0,1,999,-1],draft:'x'.repeat(15000),confidence:'bogus'};
 const c=cleanProgress(p,DATA);assert.equal(c.attempts.q001.correct,5);assert(!c.attempts.bad);assert.equal(Object.keys(c.days).length,0);assert.equal(c.guides[1].draft.length,12000);assert.deepEqual(c.guides[1].checks,[0,1]);assert.equal(c.guides[1].confidence,'');
});
test('HTML escaping prevents drafts and imported text from injecting markup',()=>{
 assert.equal(escapeHTML('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');assert.equal(escapeHTML("A & B's"),'A &amp; B&#39;s');
});
test('all guide prompts include self-checklists, pitfalls, and plain-language explanations',()=>{
 for(const g of DATA.guides){assert.equal(g.checklist.length,4);assert(g.answer.length>30);assert(g.simple.length>30);assert(g.pitfall.length>30);assert(g.sources.every(s=>DATA.sources[s]));}
});
test('curriculum follows class six-trait grouping and correct root/protein/water distinctions',()=>{
 assert(DATA.traits.some(t=>t.name==='Have complex chemistry'));assert.equal(DATA.traits.length,6);assert(DATA.guides[3].answer.includes('Ribosomes on the rough ER'));assert(DATA.guides[4].answer.includes('normally lacks chloroplasts'));assert(DATA.guides[6].answer.includes('turgid'));
});

test('handoff: dotted abbreviations are correct without accepting contradictions',()=>{
 for(const [id,forms] of [['q088',['A.T.P.','A. T. P.']],['q064',['Rough E.R.','R.E.R.','R. E. R.']],['q076',['m.R.N.A.','m. R. N. A.']]]){
  const q=DATA.questions.find(q=>q.id===id);for(const s of forms){assert(grade(q,s),s);assert(!grade(q,'not '+s),s);assert(!grade(q,s+' or DNA'),s);}
 }
 assert.equal(grade(DATA.questions.find(q=>q.id==='q106'),'turgor pressure'),false);
});
test('handoff: every subset of every select-all question has exactly one passing set',()=>{
 for(const q of DATA.questions.filter(q=>q.type==='multi')){
  let passing=0;for(let mask=0;mask<(1<<q.options.length);mask++){
   const selected=q.options.filter((_,i)=>mask&(1<<i));const expected=selected.length===q.answer.length&&q.answer.every(x=>selected.includes(x));
   assert.equal(grade(q,selected),expected,q.id+':'+mask);if(expected)passing++;
  }assert.equal(passing,1,q.id);
 }
});
test('handoff: all 40,488 ordering permutations have only one passing order per question',()=>{
 function* perms(a){if(!a.length){yield [];return;}for(let i=0;i<a.length;i++)for(const tail of perms(a.filter((_,j)=>j!==i)))yield [a[i],...tail];}
 for(const q of DATA.questions.filter(q=>q.type==='order')){let passing=0;for(const a of perms(q.answer)){const expected=a.every((x,i)=>x===q.answer[i]);assert.equal(grade(q,a),expected,q.id);if(expected)passing++;}assert.equal(passing,1);}
});
test('handoff: imported confidence must satisfy the same checklist as the UI',()=>{
 const p=emptyProgress();p.guides[1]={draft:'test',confidence:'ready',checks:[0]};assert.equal(cleanProgress(p,DATA).guides[1].confidence,'learning');
 p.guides[1].checks=[0,1,2,3];assert.equal(cleanProgress(p,DATA).guides[1].confidence,'ready');
});

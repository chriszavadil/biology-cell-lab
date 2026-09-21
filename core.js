/* Pure quiz and progress logic. No network, no grading by substring matching. */
export const STORAGE_KEY = 'cell-lab.progress.v1';
export const SESSION_KEY = 'cell-lab.round.v1';
export function normalizeAnswer(value) {
  return String(value ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
    .replace(/^(the|a|an)\s+/, '');
}
export function shuffle(items, rng = Math.random) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; --i) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function grade(question, response) {
  if (!question) return false;
  if (question.type === 'typed') {
    const n = normalizeAnswer(response);
    return Boolean(n) && question.aliases.some(a => normalizeAnswer(a) === n);
  }
  if (question.type === 'choice') return response === question.answer;
  if (!Array.isArray(response)) return false;
  if (question.type === 'order') return response.length === question.answer.length && question.answer.every((a, i) => response[i] === a);
  if (question.type === 'multi') {
    const chosen = new Set(response);
    return chosen.size === response.length && chosen.size === question.answer.length && question.answer.every(a => chosen.has(a));
  }
  return false;
}
export const emptyProgress = () => ({schema: 1, attempts: {}, days: {}, guides: {}, cards: {}, rounds: [], goal: 10});
const object = x => x && typeof x === 'object' && !Array.isArray(x);
const int = (n, max = 1000000) => Number.isFinite(n) ? Math.min(max, Math.max(0, Math.floor(n))) : 0;
export function cleanProgress(raw, data) {
  if (!object(raw) || raw.schema !== 1) throw new Error('This is not a supported Cell Lab progress file.');
  const p = emptyProgress();
  for (const q of data.questions) {
    const a = raw.attempts?.[q.id];
    if (object(a) && int(a.seen) > 0) p.attempts[q.id] = {seen: int(a.seen), correct: Math.min(int(a.seen), int(a.correct)), lastCorrect: a.lastCorrect === true, at: typeof a.at === 'string' ? a.at.slice(0, 30) : ''};
  }
  if (object(raw.days)) for (const [day, d] of Object.entries(raw.days).slice(-1000)) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(day) && object(d)) p.days[day] = {answered: int(d.answered), correct: Math.min(int(d.answered), int(d.correct))};
  }
  for (const g of data.guides) {
    const s = raw.guides?.[g.id];
    if (object(s)) p.guides[g.id] = {draft: String(s.draft || '').slice(0, 12000), checks: Array.isArray(s.checks) ? [...new Set(s.checks.filter(i => Number.isInteger(i) && i >= 0 && i < g.checklist.length))] : [], confidence: ['ready','learning'].includes(s.confidence) ? s.confidence : ''};
  }
  for (const c of data.flashcards) if (['known','review'].includes(raw.cards?.[c.id])) p.cards[c.id] = raw.cards[c.id];
  if (Array.isArray(raw.rounds)) p.rounds = raw.rounds.slice(-50).filter(r => object(r) && typeof r.at === 'string').map(r => ({at:r.at.slice(0,30), total:int(r.total,500), correct:Math.min(int(r.total,500),int(r.correct,500)), mode: r.mode === 'exam' ? 'exam':'practice'}));
  return p;
}
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function streak(days, today = new Date()) {
  const d = new Date(today.getFullYear(),today.getMonth(),today.getDate(),12);
  if (!days[localDate(d)]?.answered) d.setDate(d.getDate()-1);
  let n=0;
  while(days[localDate(d)]?.answered && n<1000) {n++; d.setDate(d.getDate()-1);}
  return n;
}
export function stats(progress, data) {
  const a=Object.values(progress.attempts);
  const attempts=a.reduce((s,v)=>s+v.seen,0), correct=a.reduce((s,v)=>s+v.correct,0);
  return {attempts, correct, accuracy: attempts ? Math.round(correct/attempts*100) : null,
    explored:a.length, review:data.questions.filter(q=>progress.attempts[q.id] && !progress.attempts[q.id].lastCorrect).map(q=>q.id),
    ready:data.guides.filter(g=>progress.guides[g.id]?.confidence==='ready').length,
    known:data.flashcards.filter(c=>progress.cards[c.id]==='known').length,
    streak:streak(progress.days), today:progress.days[localDate()]?.answered || 0};
}
export function recordAnswer(progress, qid, correct, now = new Date()) {
  const prev=progress.attempts[qid] || {seen:0,correct:0};
  progress.attempts[qid]={seen:prev.seen+1,correct:prev.correct+(correct?1:0),lastCorrect:correct,at:now.toISOString()};
  const key=localDate(now), day=progress.days[key]||{answered:0,correct:0};
  progress.days[key]={answered:day.answered+1,correct:day.correct+(correct?1:0)};
}
export function makeDeck(questions, progress, {topic='all',format='all',count=10,review=false,adaptive=true}={}) {
  let eligible=questions.filter(q=>(topic==='all'||q.topic===topic)&&(format==='all'||q.type===format));
  if(review) eligible=eligible.filter(q=>progress.attempts[q.id]&&!progress.attempts[q.id].lastCorrect);
  let deck=shuffle(eligible);
  if(adaptive && !review) {
    const priority=q=>!progress.attempts[q.id]?1:progress.attempts[q.id].lastCorrect?2:0;
    deck.sort((a,b)=>priority(a)-priority(b));
  }
  return deck.slice(0,count==='all'?deck.length:Math.max(1,Number(count)||10));
}
export function escapeHTML(s) { return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

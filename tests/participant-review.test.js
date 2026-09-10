const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(readFileSync('testimonios/review-data.js', 'utf8'), context);
vm.runInNewContext(readFileSync('revision/links.js', 'utf8'), context);
const people = context.window.HMP_REVIEW_DATA;
const links = context.window.HMP_CONSENT_REVIEW_LINKS;
const page = readFileSync('revision/index.html', 'utf8');
const app = readFileSync('revision/app.js', 'utf8');
const root = readFileSync('index.html', 'utf8');

test('every participant has one unique individual review link', () => {
  assert.equal(people.length, 18);
  assert.equal(Object.keys(links).length, 18);
  assert.equal(new Set(Object.values(links)).size, 18);
  assert.deepEqual(new Set(Object.values(links)), new Set(people.map((person) => person.name)));
});

test('individual review surface contains no route back to the full archive', () => {
  assert.doesNotMatch(page, /href=["']\/testimonios\//);
  assert.doesNotMatch(page, /hb-global-nav|voiceSearch|peopleGrid/);
  assert.doesNotMatch(app, /location\.(assign|replace)|window\.open/);
  assert.match(app, /Tu autorización todavía no está registrada/);
});

test('root no longer redirects visitors to the complete archive', () => {
  assert.doesNotMatch(root, /http-equiv=["']refresh/);
  assert.doesNotMatch(root, /href=["']\/testimonios\//);
});

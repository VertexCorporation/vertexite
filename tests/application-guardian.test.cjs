'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function fixture() {
  const ids = {};
  class Element {
    constructor() { this.children=[]; this.events={}; this.value=''; this.attrs={}; }
    append(...elements) { for (const element of elements) {ids[element.id]=element; this.children.push(element);} }
    after(element) { this.next=element; }
    setAttribute(key,value) { this.attrs[key]=value; }
    setCustomValidity(message) { this.validationMessage=message; }
    addEventListener(type,listener) { this.events[type]=listener; }
  }
  const dateGroup=new Element();
  const birth=new Element(), form=new Element(), applicantEmail=new Element();
  birth.form=form;
  birth.closest=() => dateGroup;
  ids.joinBirthDate=birth;
  ids.joinEmail=applicantEmail;
  const document={documentElement:{lang:'tr'},getElementById:id=>ids[id],createElement:()=>new Element()};
  const window={};
  const DateStub=class extends Date { constructor() {super('2026-11-21T21:00:00Z');} };
  vm.runInNewContext(fs.readFileSync('js/application-guardian.js','utf8'),{document,window,Date:DateStub,Intl,queueMicrotask});
  return {name:ids.joinGuardianName,email:ids.joinGuardianEmail,applicantEmail,group:dateGroup.next,
    payload:window.VertexApplicationGuardian.payload,
    ageWarning:ids.joinAgeWarning, pick(value){birth.value=value;birth.events.input();}};
}

test('under fourteen is blocked, ages fourteen through seventeen show both required inputs, and eighteen clears them', () => {
  const form=fixture();
  form.pick('2012-11-23');
  assert.equal(form.group.hidden,true);
  assert.equal(form.ageWarning.hidden,false);
  assert.match(form.ageWarning.textContent,/13 yaşının üzerinde/);
  form.pick('2012-11-22');
  assert.equal(form.group.hidden,false);
  assert.equal(form.ageWarning.hidden,true);
  for(const input of [form.name,form.email]){
    assert.equal(input.required,true);
    assert.equal(input.disabled,false);
  }
  form.name.value='Example Guardian';
  form.email.value='guardian@example.invalid';
  assert.equal(form.payload().guardianEmail,'guardian@example.invalid');
  form.applicantEmail.value=form.email.value;
  form.applicantEmail.events.input();
  assert.match(form.email.validationMessage,/farklı/);
  form.pick('2008-11-22');
  assert.equal(form.group.hidden,true);
  assert.equal(form.name.required,false);
  assert.equal(form.email.value,'');
  assert.equal(Object.keys(form.payload()).length,0);
});

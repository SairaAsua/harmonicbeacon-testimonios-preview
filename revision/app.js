(function () {
  'use strict';

  var root = document.documentElement;
  var host = document.getElementById('reviewRoot');
  var languageButton = document.getElementById('langSwitch');
  var people = Array.isArray(window.HMP_REVIEW_DATA) ? window.HMP_REVIEW_DATA : [];
  var translations = window.HMP_TESTIMONIAL_TRANSLATIONS || { profiles: {}, clips: {} };
  var links = window.HMP_CONSENT_REVIEW_LINKS || {};

  function language() { return root.getAttribute('data-active-lang') === 'en' ? 'en' : 'es'; }
  function label(es, en) { return language() === 'en' ? en : es; }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (typeof text === 'string') node.textContent = text;
    return node;
  }
  function profileCopy(person) { return translations.profiles[person.name] || {}; }
  function clipCopy(clip) { return translations.clips[clip.code] || {}; }
  function kindLabel(kind) {
    if (kind === 'beacon') return label('El Beacon', 'The Beacon');
    if (kind === 'myth') return label('El mito', 'The myth');
    return label('La experiencia', 'The experience');
  }
  function dateLabel(clip) {
    if (language() === 'es') return clip.dateLabel;
    return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(clip.date + 'T12:00:00Z'));
  }
  function pauseVideos() {
    host.querySelectorAll('video').forEach(function (video) { video.pause(); });
  }
  function clipView(clip, person) {
    var translated = clipCopy(clip);
    var article = el('article', 'clip');
    var video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = person.avatar;
    video.src = clip.video;
    video.setAttribute('aria-label', label(clip.title, translated.titleEn || clip.title) + ' — ' + person.name);
    var copy = el('div');
    copy.appendChild(el('span', 'clip-kicker', kindLabel(clip.kind) + ' · ' + dateLabel(clip)));
    copy.appendChild(el('h2', '', label(clip.title, translated.titleEn || clip.title)));
    copy.appendChild(el('p', '', label(clip.summary, translated.summaryEn || clip.summary)));
    copy.appendChild(el('blockquote', '', '“' + label(clip.quote, translated.quoteEn || clip.quote) + '”'));
    article.appendChild(video);
    article.appendChild(copy);
    return article;
  }
  function renderInvalid() {
    var box = el('section', 'invalid');
    box.appendChild(el('span', 'eyebrow', 'Harmonic Beacon'));
    box.appendChild(el('h1', '', label('Este enlace de revisión no es válido', 'This review link is not valid')));
    box.appendChild(el('p', '', label('Pedile a la persona que te lo compartió que compruebe la dirección completa.', 'Ask the person who shared it with you to check the complete address.')));
    host.replaceChildren(box);
  }
  function renderPerson(person) {
    var translated = profileCopy(person);
    document.title = label('Revisión de ', 'Review for ') + person.name + ' · Harmonic Beacon';
    var intro = el('section', 'review-intro');
    intro.appendChild(el('span', 'eyebrow', label('Enlace individual de revisión', 'Individual review link')));
    intro.appendChild(el('h1', '', label('Hola, ', 'Hello, ') + person.name));
    intro.appendChild(el('p', '', label('Preparamos este espacio para que puedas revisar únicamente el material testimonial que seleccionamos de tu participación en Proyección Armónica del Mito.', 'We prepared this space so you can review only the testimonial material selected from your participation in Harmonic Myth Projection.')));
    var consent = el('div', 'consent-note');
    consent.appendChild(el('strong', '', label('Tu autorización todavía no está registrada', 'Your authorization has not yet been recorded')));
    consent.appendChild(el('span', '', label('Revisá tu nombre, la imagen inspirada en tu relato, los textos, las traducciones y los videos. Después respondé el mensaje de WhatsApp indicando si autorizás su publicación en esta web, si querés pedir cambios o si preferís que no se publique.', 'Review your name, the image inspired by your account, the text, translations, and videos. Then reply to the WhatsApp message to tell us whether you authorize publication on this website, would like to request changes, or prefer that it not be published.')));
    intro.appendChild(consent);

    var profile = el('article', 'profile');
    var head = el('div', 'profile-head');
    var figure = document.createElement('figure');
    var image = document.createElement('img');
    image.className = 'myth-image';
    image.src = person.mythImage || person.avatar;
    image.alt = label('Imagen inspirada en el relato de ', 'Image inspired by the account of ') + person.name;
    figure.appendChild(image);
    figure.appendChild(el('figcaption', 'image-caption', label('Imagen inspirada en tu relato', 'Image inspired by your account')));
    var copy = el('div');
    copy.appendChild(el('span', 'eyebrow', person.context || label('Participante', 'Participant')));
    copy.appendChild(el('h2', 'profile-title', person.name));
    copy.appendChild(el('p', 'profile-intro', label(person.intro, translated.introEn || person.intro)));
    copy.appendChild(el('span', 'ai-label', label('Interpretación visual generada con IA', 'AI-generated visual interpretation')));
    var testimony = el('div', 'testimony');
    testimony.appendChild(el('span', '', label('En tu propia voz', 'In your own words')));
    testimony.appendChild(el('blockquote', '', '“' + label(translated.testimonyEs || '', translated.testimonyEn || translated.testimonyEs || '') + '”'));
    copy.appendChild(testimony);
    head.appendChild(figure);
    head.appendChild(copy);
    profile.appendChild(head);
    var clips = el('div', 'clips');
    person.clips.slice().sort(function (a, b) { return a.date.localeCompare(b.date) || a.code.localeCompare(b.code); }).forEach(function (clip) {
      clips.appendChild(clipView(clip, person));
    });
    profile.appendChild(clips);
    host.replaceChildren(intro, profile);
  }
  function render() {
    pauseVideos();
    var token = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    var name = links[token];
    var person = people.find(function (item) { return item.name === name; });
    if (!person) return renderInvalid();
    renderPerson(person);
  }
  function setLanguage(lang) {
    root.setAttribute('data-active-lang', lang);
    root.setAttribute('lang', lang);
    render();
  }
  languageButton.addEventListener('click', function () { setLanguage(language() === 'es' ? 'en' : 'es'); });
  window.addEventListener('hashchange', render);
  setLanguage('es');
}());

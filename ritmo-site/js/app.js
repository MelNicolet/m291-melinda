/* Ritmo — logique du site (JavaScript pur, aucune librairie). Données gardées dans localStorage. */
(() => {
  'use strict';

  /* ---------- Données ---------- */
  // id | titre | artiste | genre | pays | humeur | énergie | ambiance
  const RAW = [
    'e1|Malamente|Rosalía|flamenco pop|espagne|energique|3|ville',
    'e2|Corazón Partío|Alejandro Sanz|pop espagnole|espagne|romantique|2|soiree',
    'e3|Como el agua|Camarón de la Isla|flamenco|espagne|festive|3|ville',
    'e4|Entre dos aguas|Paco de Lucía|flamenco|espagne|posee|1|maison',
    'e5|Pienso en tu mirá|Rosalía|flamenco pop|espagne|romantique|1|soiree',
    'e6|Bailando|Enrique Iglesias|pop latine|espagne|festive|2|plage',
    'e7|Despechá|Rosalía|pop latino|espagne|energique|3|plage',
    'e8|La niña de la escuela|Lola Índigo|pop espagnole|espagne|festive|2|ville',
    'i1|Zitti e buoni|Måneskin|rock italien|italie|energique|3|soiree',
    'i2|Più bella cosa|Eros Ramazzotti|pop italienne|italie|romantique|1|soiree',
    'i3|A far l’amore comincia tu|Raffaella Carrà|disco italienne|italie|festive|3|ville',
    'i4|Nel blu dipinto di blu|Domenico Modugno|canzone|italie|posee|1|maison',
    'i5|La solitudine|Laura Pausini|pop italienne|italie|romantique|2|plage',
    'i6|Beggin’|Måneskin|rock italien|italie|festive|2|ville',
    'i7|Azzurro|Adriano Celentano|canzone|italie|festive|3|soiree',
    'i8|La mia risposta|Laura Pausini|pop italienne|italie|posee|2|maison',
    'p1|Chuva|Mariza|fado|portugal|energique|3|plage',
    'p2|Povo Que Lavas no Rio|Amália Rodrigues|fado|portugal|romantique|1|soiree',
    'p3|Amar pelos dois|Salvador Sobral|pop portugaise|portugal|festive|3|ville',
    'p4|O Pastor|Madredeus|fado|portugal|posee|1|maison',
    'p5|A Bia da Mouraria|Carminho|fado|portugal|romantique|2|soiree',
    'p6|Pica do 7|António Zambujo|pop portugaise|portugal|posee|2|plage',
    'p7|Desfado|Ana Moura|fado|portugal|romantique|2|ville',
    'a1|La vida es un carnaval|Celia Cruz|salsa|amerique|energique|3|soiree',
    'a2|La Incondicional|Luis Miguel|bolero|amerique|romantique|1|soiree',
    'a3|Hips Don’t Lie|Shakira|pop latino|amerique|festive|3|plage',
    'a4|Chega de Saudade|João Gilberto|bossa nova|amerique|posee|1|maison',
    'a5|La Gota Fría|Carlos Vives|vallenato|amerique|festive|2|ville',
    'a6|Bachata Rosa|Juan Luis Guerra|bachata|amerique|romantique|2|soiree',
    'a7|Tití Me Preguntó|Bad Bunny|reggaeton|amerique|festive|3|ville'
  ];
  const CATALOG_DEFAUT = RAW.map((l, i) => {
    const [id, title, artist, genre, country, mood, energy, scene] = l.split('|');
    return { id, title, artist, genre, country, mood, energy: +energy, scene, dur: 150 + (i * 17) % 90, cover: i % 4 };
  });
  let CATALOG = CATALOG_DEFAUT;
  let BY_ID = Object.fromEntries(CATALOG.map(t => [t.id, t]));

  function appliquerCatalogue(liste) {
    if (!Array.isArray(liste) || !liste.length) return;

    CATALOG = liste.map((item, index) => ({
      id: item.id ?? `track-${index + 1}`,
      title: item.title ?? item.titre ?? 'Sans titre',
      artist: item.artist ?? item.artiste ?? 'Artiste inconnu',
      genre: item.genre ?? item.style ?? 'Inconnu',
      country: item.country ?? item.pays ?? 'inconnu',
      mood: item.mood ?? item.humeur ?? 'posee',
      energy: Number(item.energy ?? item.energie ?? 2),
      scene: item.scene ?? item.ambiance ?? 'maison',
      dur: Number(item.dur ?? 180),
      cover: Number(item.cover ?? (index % 4))
    }));

    BY_ID = Object.fromEntries(CATALOG.map(t => [t.id, t]));
  }

  async function chargerCatalogue() {
    try {
      const reponse = await fetch('data.json');
      if (!reponse.ok) {
        throw new Error('Impossible de charger data.json (' + reponse.status + ')');
      }

      const donnees = await reponse.json();
      appliquerCatalogue(donnees);
    } catch (erreur) {
      console.warn('Le fichier data.json n’est pas disponible ; utilisation des données de secours.', erreur);
      CATALOG = CATALOG_DEFAUT;
      BY_ID = Object.fromEntries(CATALOG.map(t => [t.id, t]));
    }
  }

  const COVERS = [
    ['#F8D3D6', '#E8692B', '#E79AA8', '#5E8F62'],
    ['#FBE0C8', '#D9541E', '#5E8F62', '#2F5A3A'],
    ['#CFE2C6', '#E8692B', '#F4C3C7', '#2F5A3A'],
    ['#F4C3C7', '#F0B23A', '#E8692B', '#5E8F62']
  ];

  const NAMES = {
    espagne:  { energique: 'Feu de flamenco',     romantique: 'Soirée flamenco',    festive: 'Fiesta à Séville',    posee: 'Sieste andalouse' },
    italie:   { energique: 'Vespa sur la côte',   romantique: 'Dolce sérénade',     festive: 'Aperitivo à Naples',  posee: 'Dimanche à Florence' },
    portugal: { energique: 'Vent de l’Atlantique', romantique: 'Nuit de fado',       festive: 'Fête à Lisbonne',     posee: 'Matin sur le Tage' },
    amerique: { energique: 'Salsa en feu',        romantique: 'Bolero sous la lune', festive: 'Carnaval de Rio',     posee: 'Dimanche bossa nova' }
  };

  const QUESTIONS = [
    { id: 'humeur', q: 'Quelle humeur aujourd’hui ?', opts: [['energique', 'Énergique', '🔥'], ['romantique', 'Romantique', '💗'], ['festive', 'Festive', '🎉'], ['posee', 'Posée', '🌿']] },
    { id: 'pays', q: 'Quel pays t’attire ?', opts: [['espagne', 'Espagne', '💃'], ['italie', 'Italie', '🍋'], ['portugal', 'Portugal', '🌊'], ['amerique', 'Amérique latine', '🌴']] },
    { id: 'energie', q: 'Quel niveau d’énergie ?', opts: [['1', 'Douce', '🌙'], ['2', 'Modérée', '🌤️'], ['3', 'Intense', '⚡']] },
    { id: 'ambiance', q: 'Quelle ambiance ?', opts: [['soiree', 'Soirée', '🌃'], ['plage', 'Plage', '🏖️'], ['ville', 'Ville', '🏙️'], ['maison', 'À la maison', '🏠']] }
  ];

  /* ---------- État (localStorage) ---------- */
  const KEY = 'ritmo.v1';
  const defaults = () => ({ quiz: null, history: [], fav: [], mine: [], user: null, last: null, player: { queue: [], src: '', idx: 0, playing: false, base: 0, ts: 0 } });
  let S;
  try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = defaults(); }
  // Audio cannot continue across a full-page navigation, so never restore a false "playing" state.
  S.player = Object.assign(defaults().player, S.player || {}, { playing: false, base: 0 });
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* stockage indisponible */ } };

  /* ---------- Outils ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const Q = new URLSearchParams(location.search);
  const PAGE = document.body.dataset.page;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ico = n => `<svg aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const mmss = s => { s = Math.max(0, Math.floor(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const fmtDate = iso => new Date(iso).toLocaleString('fr-CH', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

  let toastTimer;
  function toast(msg) {
    let t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); $('.app').appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2200);
  }

  /* ---------- Génération de playlist ---------- */
  function generate(a) {
    const scored = CATALOG.map(t => ({
      t,
      s: (t.country === a.pays ? 4 : 0) + (t.mood === a.humeur ? 3 : 0) + (2 - Math.abs(t.energy - +a.energie)) + (t.scene === a.ambiance ? 1 : 0)
    })).sort((x, y) => y.s - x.s || x.t.id.localeCompare(y.t.id));
    return {
      id: Date.now().toString(36),
      name: NAMES[a.pays][a.humeur],
      tracks: scored.slice(0, 5).map(x => x.t.id),
      answers: a,
      date: new Date().toISOString()
    };
  }

  /* ---------- Aperçus musicaux Apple Music (API publique, sans clé) ---------- */
  const audio = new Audio();
  audio.preload = 'none';
  const previewCache = new Map();
  let loadedId = '';
  let playbackRequest = 0;
  const clean = value => String(value).toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  function previewFor(t) {
    if (previewCache.has(t.id)) return previewCache.get(t.id);
    const request = fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(`${t.title} ${t.artist}`)}&entity=song&limit=10`)
      .then(response => {
        if (!response.ok) throw new Error('Recherche musicale indisponible');
        return response.json();
      })
      .then(data => {
        const title = clean(t.title), artist = clean(t.artist);
        const matches = data.results.filter(track =>
          track.previewUrl && clean(track.trackName).includes(title) && clean(track.artistName).includes(artist)
        );
        matches.sort((a, b) =>
          (clean(b.trackName) === title ? 1 : 0) + (clean(b.artistName) === artist ? 1 : 0) -
          ((clean(a.trackName) === title ? 1 : 0) + (clean(a.artistName) === artist ? 1 : 0))
        );
        return matches.length ? matches[0].previewUrl : null;
      })
      .catch(() => null);
    previewCache.set(t.id, request);
    return request;
  }
  const setPlayerStatus = message => {
    const status = $('#player-status');
    if (status) status.textContent = message;
  };
  const P = () => S.player;
  const pos = () => loadedId === (cur() && cur().id) ? audio.currentTime || 0 : 0;
  const duration = () => loadedId === (cur() && cur().id) && Number.isFinite(audio.duration) ? audio.duration : 30;
  const cur = () => BY_ID[P().queue[P().idx]];
  async function playCurrent() {
    const t = cur();
    if (!t) return;
    const request = ++playbackRequest;
    if (loadedId !== t.id) audio.pause();
    setPlayerStatus('Recherche d’un aperçu musical…');
    const url = await previewFor(t);
    if (request !== playbackRequest || !P().playing || cur() !== t) return;
    if (!url) {
      P().playing = false; save();
      setPlayerStatus('Aucun extrait vérifié disponible pour ce morceau. Essaie la recherche Spotify.');
      refresh();
      return;
    }
    if (loadedId !== t.id) {
      audio.pause();
      audio.src = url;
      loadedId = t.id;
    }
    try {
      await audio.play();
      setPlayerStatus('Aperçu Apple Music prêt — extrait jusqu’à 30 secondes.');
    } catch (error) {
      P().playing = false; save();
      setPlayerStatus('Aperçu prêt. Appuie de nouveau sur Lire pour autoriser la lecture.');
      refresh();
    }
  }
  function startQueue(src, ids, idx, playing = true) {
    S.player = { queue: ids, src, idx, playing, base: 0, ts: 0 }; save();
    if (playing) playCurrent();
    else { playbackRequest++; audio.pause(); }
  }
  function toggle() {
    const p = P(); if (!p.queue.length) return;
    p.playing = !p.playing;
    if (p.playing) { save(); playCurrent(); }
    else { playbackRequest++; audio.pause(); save(); }
  }
  function step(d) {
    const p = P(); const n = p.idx + d;
    if (n < 0 || n >= p.queue.length) {
      if (d > 0) { p.playing = false; playbackRequest++; audio.pause(); }
      save(); return;
    }
    p.idx = n; save();
    if (p.playing) playCurrent();
    else { playbackRequest++; audio.pause(); }
  }
  audio.addEventListener('ended', () => {
    const before = cur() && cur().id;
    if (P().playing) step(1);
    if (before !== (cur() && cur().id) && onTrackChange) onTrackChange();
    refresh();
  });
  audio.addEventListener('error', () => {
    if (!P().playing) return;
    P().playing = false; save();
    setPlayerStatus('La lecture de cet extrait a échoué. Essaie la recherche Spotify.');
    refresh();
  });
  function queueFromKey(key, fallbackId) {
    if (key === 'mine' && loggedIn()) return S.mine.slice();
    if (key === 'fav' && loggedIn()) return S.fav.slice();
    if (key && key.startsWith('h:')) { const h = findEntry(key.slice(2)); if (h) return h.tracks.slice(); }
    return [fallbackId];
  }

  /* ---------- Lignes de morceaux ---------- */
  function trackRow(t, n, key, removable) {
    return `<li data-id="${t.id}"><span class="num">${n}</span>
      <a class="morceau" href="chanson.html?id=${t.id}&amp;q=${encodeURIComponent(key)}"><strong>${esc(t.title)}</strong><small>${esc(t.artist)}</small></a>
      ${removable === 'add' ? `<button class="cmd cmd--rond" type="button" data-ajouter="${t.id}" aria-label="Ajouter ${esc(t.title)} à ma playlist">${ico('plus')}</button>`
        : removable ? `<button class="cmd cmd--rond cmd--retirer" type="button" data-retirer="${t.id}" aria-label="Retirer ${esc(t.title)}">${ico('plus')}</button>` : ''}</li>`;
  }
  const emptyBlock = (msg, cta) => `<div class="vide"><p>${msg}</p><a class="btn btn--principal" href="quiz.html?nouveau=1">${cta || 'Commencer le questionnaire'}</a></div>`;

  /* ---------- Accès réservé aux comptes ---------- */
  const loggedIn = () => !!S.user;
  const hist = () => loggedIn() ? S.history : [];                       // sans compte : pas d’historique
  const findEntry = id => hist().find(h => h.id === id) || (S.last && S.last.id === id ? S.last : null);
  const lockBlock = msg => `<div class="vide"><p>${msg}</p><a class="btn btn--principal" href="connexion.html?next=${PAGE}.html">Se connecter / S’inscrire</a></div>`;
  function needLogin(msg) {                                              // message puis envoi vers la connexion
    toast(msg);
    const back = location.pathname.split('/').pop() + location.search;
    setTimeout(() => { location.href = 'connexion.html?next=' + encodeURIComponent(back); }, 1200);
  }

  /* ---------- Rafraîchissement de l’interface lecteur ---------- */
  let isHere = () => false;     // défini par chaque page : la lecture en cours concerne-t-elle cette page ?
  let onTrackChange = null;
  let lastSig = '';
  function refresh() {
    const p = P(), t = cur();
    const playingHere = isHere() && p.playing;
    $$('[data-act=play]').forEach(b => {
      b.innerHTML = ico(playingHere ? 'pause' : 'lire');
      b.setAttribute('aria-label', playingHere ? 'Pause' : 'Lire');
    });
    $$('.morceaux li[data-id]').forEach(li => li.classList.toggle('est-lu', isHere() && t && li.dataset.id === t.id));
    // mini-lecteur
    const mini = $('#mini');
    if (mini) {
      if (!t) { mini.hidden = true; }
      else {
        mini.hidden = false;
        const sig = t.id + p.playing + p.src;
        if (sig !== lastSig) {
          lastSig = sig;
          mini.innerHTML = `<a href="chanson.html?id=${t.id}&amp;q=${encodeURIComponent(p.src)}"><strong>${esc(t.title)}</strong><small>${esc(t.artist)}</small></a>
            <button class="cmd cmd--lire" type="button" data-mini="play" aria-label="${p.playing ? 'Pause' : 'Lire'}">${ico(p.playing ? 'pause' : 'lire')}</button>
            <button class="cmd" type="button" data-mini="next" aria-label="Morceau suivant">${ico('suiv')}</button>
            <div class="mini-barre" aria-hidden="true"><span></span></div>`;
        }
        const bar = $('.mini-barre span', mini); if (bar) bar.style.width = Math.min(100, pos() / t.dur * 100) + '%';
      }
    }
    // barre de progression + temps de la page chanson
    const pr = $('#prog');
    if (pr && t && isHere()) {
      pr.style.width = Math.min(100, pos() / duration() * 100) + '%';
      $('#t-cur').textContent = mmss(pos());
      $('#t-tot').textContent = mmss(duration());
    }
  }
  function tick() {
    refresh();
  }

  /* ---------- Éléments communs ---------- */
  function initCommon() {
    const c = $('.compte');
    if (c && S.user) { c.textContent = S.user.email[0].toUpperCase(); c.setAttribute('aria-label', 'Mon compte (' + S.user.email + ')'); }
    const mini = $('#mini');
    if (mini) mini.addEventListener('click', e => {
      const b = e.target.closest('[data-mini]'); if (!b) return;
      if (b.dataset.mini === 'play') toggle(); else step(1);
      lastSig = ''; refresh();
    });
    setInterval(tick, 500);
  }

  /* ---------- Contrôles de liste (résultat, ma playlist, favoris) ---------- */
  function bindListControls(key, getIds) {
    isHere = () => P().src === key && P().queue.length > 0;
    const ctrl = $('#ctrl'); if (!ctrl) return;
    ctrl.addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const ids = getIds(); if (!ids.length) return;
      const same = P().src === key && P().queue.join() === ids.join();
      if (b.dataset.act === 'play') { same ? toggle() : startQueue(key, ids, 0); }
      else if (!same) startQueue(key, ids, 0);
      else step(b.dataset.act === 'next' ? 1 : -1);
      refresh();
    });
  }

  /* ---------- Pages ---------- */
  const pages = {};

  pages.index = () => {
    if (S.quiz && Object.keys(S.quiz.answers).length) $('#reprise').hidden = false;
    if (S.user) $('#lien-connexion').textContent = 'Mon compte';
  };

  pages.quiz = () => {
    if (Q.get('nouveau') || !S.quiz) { S.quiz = { step: 0, answers: {} }; save(); }
    const fs = $('#choix'), q = $('#question'), prec = $('#prec'), suiv = $('#suiv');
    const bar = $('#barre'), etat = $('#etat');
    function draw(focus) {
      const st = Math.min(S.quiz.step, QUESTIONS.length - 1), Qn = QUESTIONS[st];
      q.textContent = Qn.q;
      $$('label', fs).forEach(l => l.remove());
      Qn.opts.forEach(([v, label, emo]) => {
        const l = document.createElement('label');
        l.innerHTML = `<input type="radio" name="reponse" value="${v}"><span class="opt"><span class="ico" aria-hidden="true">${emo}</span><span>${label}</span></span>`;
        const inp = $('input', l);
        inp.checked = S.quiz.answers[Qn.id] === v;
        inp.addEventListener('change', () => { S.quiz.answers[Qn.id] = v; save(); suiv.disabled = false; });
        fs.appendChild(l);
      });
      suiv.disabled = !S.quiz.answers[Qn.id];
      $('#suiv-txt').textContent = st === QUESTIONS.length - 1 ? 'Voir ma playlist' : 'Suivant';
      $('span', bar).style.width = ((st + 1) / QUESTIONS.length * 100) + '%';
      bar.setAttribute('aria-valuenow', st + 1);
      etat.textContent = `Question ${st + 1}/${QUESTIONS.length}`;
      if (focus) q.focus();
    }
    prec.addEventListener('click', () => {
      if (S.quiz.step === 0) { location.href = 'index.html'; return; }
      S.quiz.step--; save(); draw(true);
    });
    suiv.addEventListener('click', () => {
      if (S.quiz.step < QUESTIONS.length - 1) { S.quiz.step++; save(); draw(true); return; }
      $('#charge').hidden = false;
      const entry = generate(S.quiz.answers);
      setTimeout(() => {
        S.last = entry;                                  // dernier résultat, visible même sans compte
        if (loggedIn()) { S.history.unshift(entry); S.history = S.history.slice(0, 20); }
        S.quiz = null; save();
        location.href = 'resultat.html?h=' + entry.id;
      }, 700);
    });
    draw(false);
  };

  pages.resultat = () => {
    const entry = findEntry(Q.get('h')) || hist()[0] || S.last;
    const box = $('#liste'), ctrl = $('#ctrl'), status = $('#statut');
    if (!entry) {
      $('#nom').textContent = 'Pas encore de playlist';
      box.outerHTML = emptyBlock('Réponds à 4 questions pour découvrir ta playlist.');
      ctrl.hidden = true; $('#actions').hidden = true; status.hidden = true; return;
    }
    const key = 'h:' + entry.id;
    $('#nom').textContent = entry.name;
    document.title = `Ritmo — ${entry.name}`;
    box.innerHTML = entry.tracks.map((id, i) => trackRow(BY_ID[id], i + 1, key, 'add')).join('');
    status.textContent = `Ta playlist « ${entry.name} » est prête !` + (loggedIn() ? '' : ' Connecte-toi pour la garder.');
    bindListControls(key, () => entry.tracks);
    box.addEventListener('click', e => {                       // ajout morceau par morceau
      const b = e.target.closest('[data-ajouter]'); if (!b) return;
      if (!loggedIn()) { needLogin('Connecte-toi pour créer ta playlist'); return; }
      const id = b.dataset.ajouter, t = BY_ID[id];
      if (S.mine.includes(id)) { toast('Déjà dans Ma playlist'); return; }
      S.mine.push(id); save(); toast(`« ${t.title} » ajouté à Ma playlist`);
    });
    $('#ajouter').addEventListener('click', () => {
      if (!loggedIn()) { needLogin('Connecte-toi pour créer ta playlist'); return; }
      let n = 0; entry.tracks.forEach(id => { if (!S.mine.includes(id)) { S.mine.push(id); n++; } }); save();
      toast(n ? `${n} morceau${n > 1 ? 'x' : ''} ajouté${n > 1 ? 's' : ''} à Ma playlist` : 'Déjà dans Ma playlist');
    });
  };

  pages.chanson = () => {
    const id = BY_ID[Q.get('id')] ? Q.get('id') : CATALOG[0].id;
    const key = Q.get('q') || 'x';
    let ids = queueFromKey(key, id);
    if (!ids.includes(id)) ids = [id];
    let viewId = id;
    const p0 = P();
    if (!(p0.src === key && p0.queue[p0.idx] === id)) startQueue(key, ids, ids.indexOf(id), false);
    isHere = () => P().src === key && P().queue[P().idx] === viewId;
    onTrackChange = () => { if (P().src === key && cur() && cur().id !== viewId) show(cur().id); };

    function cover(t) {
      const c = COVERS[t.cover], dx = 150 + (t.dur % 60), dy = 110 + (t.dur % 30);
      return `<svg viewBox="0 0 342 290" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Pochette d’album : un soleil sur des vagues">
        <rect width="342" height="290" fill="${c[0]}"/><circle cx="${dx}" cy="${dy}" r="84" fill="${c[1]}"/>
        <path d="M0 185c40-30 80-30 120 0s80 30 120 0 70-22 102-6v111H0z" fill="${c[2]}"/>
        <path d="M0 228c40-26 80-26 120 0s80 26 120 0 70-18 102-4v66H0z" fill="${c[3]}"/></svg>`;
    }
    function show(tid) {
      viewId = tid; const t = BY_ID[tid], i = ids.indexOf(tid);
      $('#titre').textContent = t.title; $('#artiste').textContent = t.artist;
      $('#genre').textContent = 'Genre : ' + t.genre;
      $('#spotify-link').href = `https://open.spotify.com/search/${encodeURIComponent(`${t.title} ${t.artist}`)}`;
      $('#pochette').innerHTML = cover(t);
      $('#t-tot').textContent = mmss(30);
      setPlayerStatus('Recherche d’un aperçu musical…');
      previewFor(t).then(url => {
        if (viewId === tid && !P().playing) setPlayerStatus(url
          ? 'Aperçu Apple Music prêt — extrait jusqu’à 30 secondes.'
          : 'Aucun extrait vérifié disponible pour ce morceau. Essaie la recherche Spotify.');
      });
      const fav = loggedIn() && S.fav.includes(tid); const f = $('#fav');
      f.setAttribute('aria-pressed', fav); f.setAttribute('aria-label', fav ? 'Retirer des favoris' : 'Ajouter aux favoris');
      $('[data-act=prev]').disabled = i <= 0; $('[data-act=next]').disabled = i >= ids.length - 1;
      document.title = `Ritmo — ${t.title}`;
      history.replaceState(null, '', `chanson.html?id=${tid}&q=${encodeURIComponent(key)}`);
      refresh();
    }
    $('#ctrl').addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
      const i = ids.indexOf(viewId);
      if (b.dataset.act === 'play') {
        (P().src === key && P().queue[P().idx] === viewId) ? toggle() : startQueue(key, ids, i, true);
      } else {
        const n = i + (b.dataset.act === 'next' ? 1 : -1);
        if (n < 0 || n >= ids.length) return;
        startQueue(key, ids, n, P().playing && P().src === key);
        show(ids[n]);
      }
      refresh();
    });
    $('#fav').addEventListener('click', () => {
      if (!loggedIn()) { needLogin('Connecte-toi pour ajouter des favoris'); return; }
      const k = S.fav.indexOf(viewId);
      if (k >= 0) { S.fav.splice(k, 1); toast('Retiré des favoris'); } else { S.fav.push(viewId); toast('Ajouté aux favoris'); }
      save(); show(viewId);
    });
    $('#plus').addEventListener('click', () => {
      if (!loggedIn()) { needLogin('Connecte-toi pour créer ta playlist'); return; }
      if (S.mine.includes(viewId)) { toast('Déjà dans Ma playlist'); return; }
      S.mine.push(viewId); save(); toast('Ajouté à Ma playlist');
    });
    show(id);
  };

  function simpleList(key, listName, emptyMsg, lockMsg) {
    return () => {
      const box = $('#liste'), ctrl = $('#ctrl');
      if (!loggedIn()) { box.innerHTML = ''; ctrl.hidden = true; $('#vide').innerHTML = lockBlock(lockMsg); return; }
      const draw = () => {
        const ids = S[listName];
        if (!ids.length) { box.innerHTML = ''; ctrl.hidden = true; $('#vide').innerHTML = emptyBlock(emptyMsg); return; }
        $('#vide').innerHTML = ''; ctrl.hidden = false;
        box.innerHTML = ids.map((id, i) => trackRow(BY_ID[id], i + 1, key, true)).join('');
        refresh();
      };
      bindListControls(key, () => S[listName]);
      box.addEventListener('click', e => {
        const b = e.target.closest('[data-retirer]'); if (!b) return;
        S[listName] = S[listName].filter(x => x !== b.dataset.retirer); save(); toast('Morceau retiré'); draw();
      });
      draw();
    };
  }
  pages.playlist = () => {
    const box = $('#liste');
    const ctrl = $('#ctrl');
    const vide = $('#vide');
    const recherche = $('#recherche-playlist');
    const resultat = $('#resultat-playlist');

    function render() {
      if (!loggedIn()) {
        box.innerHTML = '';
        ctrl.hidden = true;
        vide.innerHTML = lockBlock('Connecte-toi ou inscris-toi pour créer ta playlist.');
        if (recherche) recherche.hidden = true;
        if (resultat) resultat.textContent = '';
        return;
      }

      const ids = S.mine || [];
      const terme = (recherche ? recherche.value : '').trim().toLowerCase();
      const visibles = terme === '' ? ids : ids.filter(id => {
        const t = BY_ID[id];
        if (!t) return false;
        const texte = [t.title, t.artist, t.genre, t.country].join(' ').toLowerCase();
        return texte.includes(terme);
      });

      if (recherche) recherche.hidden = false;
      if (!ids.length) {
        box.innerHTML = '';
        ctrl.hidden = true;
        vide.innerHTML = emptyBlock('Ta playlist est vide. Ajoute des morceaux avec le bouton + ou depuis un résultat.');
        if (resultat) resultat.textContent = '';
        return;
      }

      if (!visibles.length) {
        box.innerHTML = '';
        ctrl.hidden = true;
        vide.innerHTML = '';
        if (resultat) resultat.textContent = terme ? `Aucun morceau ne correspond à « ${terme} ».` : '';
        return;
      }

      vide.innerHTML = '';
      if (resultat) resultat.textContent = terme ? `${visibles.length} morceau${visibles.length > 1 ? 'x' : ''} trouvé${visibles.length > 1 ? 's' : ''}.` : '';
      ctrl.hidden = false;
      box.innerHTML = visibles.map((id, i) => trackRow(BY_ID[id], i + 1, 'mine', true)).join('');
      refresh();
    }

    bindListControls('mine', () => S.mine || []);
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-retirer]'); if (!b) return;
      S.mine = S.mine.filter(x => x !== b.dataset.retirer); save(); toast('Morceau retiré'); render();
    });

    if (recherche) {
      recherche.addEventListener('input', render);
      recherche.value = '';
    }

    render();
  };
  pages.favoris = simpleList('fav', 'fav', 'Aucun favori pour l’instant. Touche l’étoile sur un morceau pour le garder ici.', 'Connecte-toi ou inscris-toi pour garder tes morceaux favoris.');

  pages.historique = () => {
    const box = $('#liste');
    if (!loggedIn()) { box.outerHTML = lockBlock('Connecte-toi ou inscris-toi pour retrouver tes playlists passées.'); return; }
    const vide = document.createElement('div');
    box.after(vide);
    const draw = () => {
      if (!S.history.length) { box.innerHTML = ''; vide.innerHTML = emptyBlock('Aucun questionnaire terminé pour l’instant.'); return; }
      vide.innerHTML = '';
      box.innerHTML = S.history.map(h => `<li data-id="${h.id}"><a class="morceau" href="resultat.html?h=${h.id}"><strong>${esc(h.name)}</strong><small>${fmtDate(h.date)} · ${h.tracks.length} morceaux</small></a>
        <button class="cmd cmd--rond cmd--retirer" type="button" data-suppr="${h.id}" aria-label="Supprimer la playlist ${esc(h.name)}">${ico('plus')}</button></li>`).join('');
    };
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-suppr]'); if (!b) return;
      S.history = S.history.filter(h => h.id !== b.dataset.suppr);
      if (S.last && S.last.id === b.dataset.suppr) S.last = null;
      save(); toast('Playlist supprimée'); draw();
    });
    draw();
  };

  pages.connexion = () => {
    const form = $('#form'), deja = $('#deja'), err = $('#erreur');
    function vue() {
      form.hidden = !!S.user; deja.hidden = !S.user;
      if (S.user) $('#qui').textContent = S.user.email;
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('#email').value.trim(), mdp = $('#mdp').value;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.textContent = 'Entre une adresse e-mail valide, par exemple elena@exemple.ch.'; $('#email').focus(); return; }
      if (mdp.length < 6) { err.textContent = 'Le mot de passe doit contenir au moins 6 caractères.'; $('#mdp').focus(); return; }
      S.user = { email };   // démonstration : le mot de passe n’est pas conservé
      if (S.last && !S.history.some(h => h.id === S.last.id)) S.history.unshift(S.last);   // garde la playlist faite avant l’inscription
      save();
      const next = Q.get('next');
      location.href = /^[a-z]+\.html(\?[A-Za-z0-9=&%._:~-]*)?$/.test(next || '') ? next : 'index.html';
    });
    $('#sortir').addEventListener('click', () => { S.user = null; S.player = defaults().player; save(); location.href = 'index.html'; });
    vue();
  };

  /* ---------- Démarrage ---------- */
  async function demarrer() {
    await chargerCatalogue();
    initCommon();
    if (pages[PAGE]) pages[PAGE]();
    refresh();
  }

  demarrer();
})();

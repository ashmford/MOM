// page.js — fetches a generic page from Sanity by slug and renders it.
// Used by page.html for all Rachel-created pages.

const PROJECT_ID  = 'o2xenqpa';
const DATASET     = 'production';
const API_VERSION = '2024-01-01';

function imageUrl(asset) {
  if (!asset) return null;
  return asset.url || null;
}

function setText(selector, value) {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function setHeadline(selector, plain, italic) {
  const el = document.querySelector(selector);
  if (!el) return;
  let html = '';
  if (plain)  html += plain + ' ';
  if (italic) html += `<em>${italic}</em>`;
  if (html)   el.innerHTML = html.trim();
}

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

async function fetchPage(slug) {
  const query = encodeURIComponent(`*[_type == "genericPage" && slug.current == "${slug}"][0]{
    seoTitle, seoDescription, seoImage{ asset->{ url } },
    title, slug,
    heroType, heroLabel, heroHeadline, heroHeadlineItalic, heroSubhead,
    heroImage{ asset->{ url }, alt }, heroVideoUrl,
    blocks[]{ ..., image{ asset->{ url }, alt }, logos[]{ name, url, logo{ asset->{ url }, alt } }, stats[]{ number, label }, testimonials[]{ quote, name, detail } },
    donateHeadlinePlain, donateHeadlineItalic, donateBody,
    donatePrimaryLabel, donatePrimaryUrl,
    donateSecondaryLabel, donateSecondaryUrl
  }`);

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.result || null;
  } catch (e) {
    console.warn('MOM: Could not fetch page content.', e);
    return null;
  }
}

function renderHero(d) {
  const hero = document.getElementById('pageHero');
  const label = document.getElementById('pageHeroLabel');
  const h1 = document.getElementById('pageHeroHeadline');
  const sub = document.getElementById('pageHeroSub');
  const media = document.getElementById('pageHeroMedia');
  const video = document.getElementById('pageHeroVideo');
  const img = document.getElementById('pageHeroImg');
  const toggle = document.getElementById('pageVideoToggle');

  if (!hero) return;

  // Set browser title
  if (d.title) document.title = `${d.title} — Mending Our Mistakes`;

  // Set text
  if (label && d.heroLabel) label.textContent = d.heroLabel;
  if (h1) {
    if (d.heroHeadlineItalic) {
      h1.innerHTML = `${d.heroHeadline || ''} <em>${d.heroHeadlineItalic}</em>`;
    } else {
      h1.textContent = d.heroHeadline || '';
    }
  }
  if (sub && d.heroSubhead) sub.textContent = d.heroSubhead;

  // Hero type
  if (d.heroType === 'text' || (!d.heroImage && !d.heroVideoUrl)) {
    hero.classList.add('text-only');
    if (media) media.style.display = 'none';
    return;
  }

  // Split hero — image or video
  const imgUrl = imageUrl(d.heroImage?.asset);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (img && imgUrl) {
    img.src = imgUrl;
    img.alt = d.heroImage?.alt || '';
  }

  if (video && d.heroVideoUrl && !prefersReduced) {
    const source = document.createElement('source');
    source.src = d.heroVideoUrl;
    source.type = 'video/mp4';
    video.appendChild(source);
    if (imgUrl) video.poster = imgUrl;
    video.style.display = '';
    video.load();
    video.play().catch(() => {});

    if (toggle) {
      toggle.style.display = 'flex';
      const iconPause = toggle.querySelector('.icon-pause');
      const iconPlay  = toggle.querySelector('.icon-play');
      toggle.addEventListener('click', () => {
        const paused = video.paused;
        if (paused) {
          video.play();
          toggle.setAttribute('aria-label', 'Pause background video');
          toggle.setAttribute('aria-pressed', 'false');
          if (iconPause) iconPause.style.display = '';
          if (iconPlay)  iconPlay.style.display  = 'none';
        } else {
          video.pause();
          toggle.setAttribute('aria-label', 'Play background video');
          toggle.setAttribute('aria-pressed', 'true');
          if (iconPause) iconPause.style.display = 'none';
          if (iconPlay)  iconPlay.style.display  = '';
        }
      });
    }
  }
}

function renderDonateCta(d) {
  setHeadline('.donate-cta h2', d.donateHeadlinePlain, d.donateHeadlineItalic);
  setText('#pageDonateCTABody', d.donateBody);
  const primary = document.getElementById('pageDonateCTAPrimary');
  if (primary) {
    if (d.donatePrimaryLabel) primary.textContent = d.donatePrimaryLabel;
    if (d.donatePrimaryUrl)   primary.href = d.donatePrimaryUrl;
  }
  const secondary = document.getElementById('pageDonateCTASecondary');
  if (secondary) {
    if (d.donateSecondaryLabel) { secondary.textContent = d.donateSecondaryLabel; secondary.style.display = ''; }
    if (d.donateSecondaryUrl)   secondary.href = d.donateSecondaryUrl;
  }
}

async function initPage() {
  const slug = getSlug();
  if (!slug) {
    document.getElementById('pageHeroHeadline').textContent = 'Page not found';
    return;
  }

  const d = await fetchPage(slug);
  if (!d) {
    document.getElementById('pageHeroHeadline').textContent = 'Page not found';
    return;
  }

  renderHero(d);
  if (window.applySeo) window.applySeo(d);
  if (window.renderBlocks) window.renderBlocks(d.blocks, '#pageBlocksAnchor');
  renderDonateCta(d);
}

document.addEventListener('DOMContentLoaded', initPage);

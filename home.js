// home.js — fetches all homepage content from Sanity and populates the DOM.
// Included only on index.html. Falls back gracefully to hardcoded HTML
// if the fetch fails or fields are missing.

const PROJECT_ID  = 'o2xenqpa';
const DATASET     = 'production';
const API_VERSION = '2024-01-01';

// Sanity image URL — uses the direct url field from asset->
function imageUrl(asset) {
  if (!asset) return null;
  return asset.url || null;
}

// Safe text setter — only updates if value exists
function setText(selector, value) {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

// Safe href setter
function setHref(selector, value) {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) el.href = value;
}

// Headline with italic split: plain + <em>italic</em> + optional suffix
function setHeadline(selector, plain, italic, suffix) {
  const el = document.querySelector(selector);
  if (!el) return;
  let html = '';
  if (plain)  html += plain + ' ';
  if (italic) html += `<em>${italic}</em>`;
  if (suffix) html += ' ' + suffix;
  if (html)   el.innerHTML = html.trim();
}

async function fetchHomeContent() {
  const query = encodeURIComponent(`*[_type == "homePage"][0]{
    heroEyebrow,
    heroHeadlinePlain, heroHeadlineItalic,
    heroSubhead,
    heroPrimaryLabel, heroPrimaryUrl,
    heroSecondaryLabel, heroSecondaryUrl,
    heroLocationLine,
    heroImage{ asset->{ _ref, url }, alt },
    heroVideoUrl,
    missionImage{ asset->{ _ref, url }, alt },
    missionHeadlinePlain, missionHeadlineItalic, missionHeadlineSuffix,
    missionBody,
    missionDetails[]{ label, description },
    serveHeadlinePlain, serveHeadlineItalic,
    serveCards[]{ title, body, linkLabel, linkUrl },
    servicesHeadlinePlain, servicesHeadlineItalic,
    servicesIntro,
    serviceCards[]{ name, description },
    servicesPrimaryLabel, servicesPrimaryUrl,
    servicesSecondaryLabel, servicesSecondaryUrl,
    statsHeadlinePlain, statsHeadlineItalic,
    statsIntro,
    stats[]{ number, label },
    statsSource,
    testimonialsHeadlinePlain, testimonialsHeadlineItalic,
    testimonials[]{ quote, name, detail },
    donateHeadlinePlain, donateHeadlineItalic,
    donateBody,
    donatePrimaryLabel, donatePrimaryUrl,
    donateSecondaryLabel, donateSecondaryUrl
  }`);

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.result || null;
  } catch (e) {
    console.warn('MOM: Could not fetch homepage content from Sanity.', e);
    return null;
  }
}

function populateHero(d) {
  setText('.hero-eyebrow span', d.heroEyebrow);
  setHeadline('.hero h1', d.heroHeadlinePlain, d.heroHeadlineItalic, null);

  setText('.hero-sub', d.heroSubhead);

  const ctaPrimary = document.querySelector('.hero-ctas .btn-primary');
  if (ctaPrimary) {
    if (d.heroPrimaryLabel) ctaPrimary.textContent = d.heroPrimaryLabel;
    if (d.heroPrimaryUrl)   ctaPrimary.href = d.heroPrimaryUrl;
  }

  const ctaSecondary = document.querySelector('.hero-ctas .btn-outline');
  if (ctaSecondary) {
    if (d.heroSecondaryLabel) ctaSecondary.textContent = d.heroSecondaryLabel;
    if (d.heroSecondaryUrl)   ctaSecondary.href = d.heroSecondaryUrl;
  }

  setText('.hero-location', d.heroLocationLine);

  // Fallback image
  const fallbackImg = document.querySelector('.hero-fallback');
  const heroImgUrl = imageUrl(d.heroImage?.asset);
  if (fallbackImg && heroImgUrl) {
    fallbackImg.src = heroImgUrl;
    fallbackImg.alt = d.heroImage?.alt || '';
  }

  // Video
  const video = document.querySelector('.hero-video');
  if (video && d.heroVideoUrl) {
    // Update poster to match fallback image
    if (heroImgUrl) video.poster = heroImgUrl;
    // Inject source element and reload
    const existingSource = video.querySelector('source');
    if (existingSource) existingSource.remove();
    const source = document.createElement('source');
    source.src = d.heroVideoUrl;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.style.display = '';
    const btn = document.getElementById('videoToggle');
    if (btn) btn.style.display = '';
    video.load();
    video.play().catch(() => {});
  }
}

function populateMission(d) {
  const img = document.querySelector('.mission-image img');
  const missionImgUrl = imageUrl(d.missionImage?.asset);
  if (img && missionImgUrl) {
    img.src = missionImgUrl;
    img.alt = d.missionImage?.alt || '';
  }

  setHeadline('#mission-heading', d.missionHeadlinePlain, d.missionHeadlineItalic, d.missionHeadlineSuffix);
  setText('.mission-text > p', d.missionBody);

  if (d.missionDetails?.length) {
    const items = document.querySelectorAll('.mission-detail-item');
    d.missionDetails.forEach((row, i) => {
      if (!items[i]) return;
      const dt = items[i].querySelector('dt');
      const dd = items[i].querySelector('dd');
      if (dt && row.label)       dt.textContent = row.label;
      if (dd && row.description) dd.textContent = row.description;
    });
  }
}

function populateServe(d) {
  setHeadline('#serve-heading', d.serveHeadlinePlain, d.serveHeadlineItalic, null);

  if (d.serveCards?.length) {
    const cards = document.querySelectorAll('.serve-card');
    d.serveCards.forEach((card, i) => {
      if (!cards[i]) return;
      const h3   = cards[i].querySelector('h3');
      const p    = cards[i].querySelector('p');
      const link = cards[i].querySelector('.serve-link');
      if (h3   && card.title)     h3.textContent   = card.title;
      if (p    && card.body)      p.textContent    = card.body;
      if (link && card.linkLabel) link.textContent = card.linkLabel + ' →';
      if (link && card.linkUrl)   link.href        = card.linkUrl;
    });
  }
}

function populateServices(d) {
  setHeadline('#services-heading', d.servicesHeadlinePlain, d.servicesHeadlineItalic, null);
  setText('.services-desc', d.servicesIntro);

  if (d.serviceCards?.length) {
    const cards = document.querySelectorAll('.service-card');
    d.serviceCards.forEach((card, i) => {
      if (!cards[i]) return;
      const h3 = cards[i].querySelector('h3');
      const p  = cards[i].querySelector('p');
      if (h3 && card.name)        h3.textContent = card.name;
      if (p  && card.description) p.textContent  = card.description;
    });
  }

  const svcPrimary = document.querySelector('.services-cta .btn-primary');
  if (svcPrimary) {
    if (d.servicesPrimaryLabel) svcPrimary.textContent = d.servicesPrimaryLabel;
    if (d.servicesPrimaryUrl)   svcPrimary.href = d.servicesPrimaryUrl;
  }

  const svcSecondary = document.querySelector('.services-cta .btn-outline');
  if (svcSecondary) {
    if (d.servicesSecondaryLabel) svcSecondary.textContent = d.servicesSecondaryLabel;
    if (d.servicesSecondaryUrl)   svcSecondary.href = d.servicesSecondaryUrl;
  }
}

function populateStats(d) {
  setHeadline('#stats-heading', d.statsHeadlinePlain, d.statsHeadlineItalic, null);
  setText('.stats-inner > p:not(.stats-eyebrow):not(.stats-source)', d.statsIntro);
  setText('.stats-source', d.statsSource);

  if (d.stats?.length) {
    const items = document.querySelectorAll('.stat-item');
    d.stats.forEach((stat, i) => {
      if (!items[i]) return;
      const num   = items[i].querySelector('.num');
      const label = items[i].querySelector('.label');
      if (num   && stat.number) num.textContent   = stat.number;
      if (label && stat.label)  label.textContent = stat.label;
    });
  }
}

function populateTestimonials(d) {
  setHeadline('#testimonials-heading', d.testimonialsHeadlinePlain, d.testimonialsHeadlineItalic, null);

  if (d.testimonials?.length) {
    const cards = document.querySelectorAll('.testimonial-card');
    d.testimonials.forEach((t, i) => {
      if (!cards[i]) return;
      const quote  = cards[i].querySelector('.testimonial-quote');
      const name   = cards[i].querySelector('.testimonial-name');
      const detail = cards[i].querySelector('.testimonial-detail');
      if (quote  && t.quote)  quote.textContent  = `"${t.quote}"`;
      if (name   && t.name)   name.textContent   = t.name;
      if (detail && t.detail) detail.textContent = t.detail;
    });
  }
}

function populateDonate(d) {
  setHeadline('.donate-cta h2', d.donateHeadlinePlain, d.donateHeadlineItalic, null);
  setText('.donate-cta p', d.donateBody);

  const donPrimary = document.querySelector('.donate-cta-actions .btn-primary');
  if (donPrimary) {
    if (d.donatePrimaryLabel) donPrimary.textContent = d.donatePrimaryLabel;
    if (d.donatePrimaryUrl)   donPrimary.href = d.donatePrimaryUrl;
  }

  const donSecondary = document.querySelector('.donate-cta-actions .btn-outline');
  if (donSecondary) {
    if (d.donateSecondaryLabel) donSecondary.textContent = d.donateSecondaryLabel;
    if (d.donateSecondaryUrl)   donSecondary.href = d.donateSecondaryUrl;
  }
}

async function initHomePage() {
  const d = await fetchHomeContent();
  if (!d) return; // No content from Sanity — hardcoded HTML stays in place

  populateHero(d);
  populateMission(d);
  populateServe(d);
  populateServices(d);
  populateStats(d);
  populateTestimonials(d);
  populateDonate(d);
}

document.addEventListener('DOMContentLoaded', initHomePage);

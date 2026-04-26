const PROJECT_ID  = 'o2xenqpa';
const DATASET     = 'production';
const API_VERSION = '2024-01-01';

function imageUrl(asset) { return asset?.url || null; }

function setText(id, value) {
  if (!value) return;
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHeadline(id, plain, italic) {
  const el = document.getElementById(id);
  if (!el) return;
  let html = '';
  if (plain)  html += plain + ' ';
  if (italic) html += `<em>${italic}</em>`;
  if (html)   el.innerHTML = html.trim();
}

async function fetchPartners() {
  const query = encodeURIComponent(`*[_type == "partnersPage"][0]{
    heroLabel, heroHeadlinePlain, heroHeadlineItalic, heroSubhead,
    heroCtaLabel, heroCtaUrl,
    heroImage{ asset->{ url }, alt }, heroVideoUrl,
    introLabel, introHeadlinePlain, introHeadlineItalic, introBody, contactEmail,
    categories[]{ label, headlinePlain, headlineItalic, body },
    currentPartnersLabel, currentPartnersHeadlinePlain, currentPartnersHeadlineItalic,
    partners[]{ name, url },
    bottomCtaHeadlinePlain, bottomCtaHeadlineItalic, bottomCtaBody,
    bottomCtaBtnLabel, bottomCtaBtnUrl,
    additionalBlocks[]{ ..., image{ asset->{ url }, alt }, logos[]{ name, url, logo{ asset->{ url }, alt } }, stats[]{ number, label }, testimonials[]{ quote, name, detail } }
  }`);

  try {
    const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`);
    const data = await res.json();
    return data?.result || null;
  } catch (e) {
    console.warn('MOM: Could not fetch partners page.', e);
    return null;
  }
}

function populateHero(d) {
  setText('heroLabel', d.heroLabel);
  setHeadline('heroHeadline', d.heroHeadlinePlain, d.heroHeadlineItalic);
  setText('heroSubhead', d.heroSubhead);

  const cta = document.getElementById('heroCta');
  if (cta && d.heroCtaLabel && d.heroCtaUrl) {
    cta.textContent = d.heroCtaLabel;
    cta.href = d.heroCtaUrl;
    cta.style.display = '';
  }

  const hero = document.querySelector('.interior-hero');
  const media = document.getElementById('interiorHeroMedia');
  const img = document.getElementById('interiorHeroImg');
  const video = document.getElementById('interiorHeroVideo');
  const toggle = document.getElementById('interiorVideoToggle');
  const imgUrl = imageUrl(d.heroImage?.asset);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!imgUrl && !d.heroVideoUrl) {
    if (hero) hero.classList.add('text-only');
    if (media) media.style.display = 'none';
    return;
  }

  if (img && imgUrl) { img.src = imgUrl; img.alt = d.heroImage?.alt || ''; }

  if (video && d.heroVideoUrl && !prefersReduced) {
    const source = document.createElement('source');
    source.src = d.heroVideoUrl; source.type = 'video/mp4';
    video.appendChild(source);
    if (imgUrl) video.poster = imgUrl;
    video.style.display = ''; video.load(); video.play().catch(() => {});
    if (toggle) {
      toggle.style.display = 'flex';
      const iconPause = toggle.querySelector('.icon-pause');
      const iconPlay  = toggle.querySelector('.icon-play');
      toggle.addEventListener('click', () => {
        const paused = video.paused;
        video[paused ? 'play' : 'pause']();
        toggle.setAttribute('aria-label', paused ? 'Pause background video' : 'Play background video');
        toggle.setAttribute('aria-pressed', paused ? 'false' : 'true');
        if (iconPause) iconPause.style.display = paused ? '' : 'none';
        if (iconPlay)  iconPlay.style.display  = paused ? 'none' : '';
      });
    }
  }
}

function populateIntro(d) {
  setText('introLabel', d.introLabel);
  setHeadline('intro-heading', d.introHeadlinePlain, d.introHeadlineItalic);
  setText('introBody', d.introBody);
  if (d.contactEmail) {
    const emailEl = document.getElementById('contactEmail');
    if (emailEl) {
      emailEl.href = `mailto:${d.contactEmail}`;
      emailEl.textContent = d.contactEmail;
    }
    const footerEmail = document.getElementById('footerEmail');
    if (footerEmail) footerEmail.href = `mailto:${d.contactEmail}`;
  }
}

function populateCategories(d) {
  if (!d.categories?.length) return;
  const labels   = ['cat1Label', 'cat2Label', 'cat3Label'];
  const headlines = ['cat1-heading', 'cat2-heading', 'cat3-heading'];
  const bodies   = ['cat1Body', 'cat2Body', 'cat3Body'];

  d.categories.forEach((cat, i) => {
    if (i > 2) return;
    setText(labels[i], cat.label);
    setHeadline(headlines[i], cat.headlinePlain, cat.headlineItalic);
    setText(bodies[i], cat.body);
  });
}

function populatePartnersList(d) {
  setText('currentPartnersLabel', d.currentPartnersLabel);
  setHeadline('partners-list-heading', d.currentPartnersHeadlinePlain, d.currentPartnersHeadlineItalic);

  if (d.partners?.length) {
    const list = document.getElementById('partnersList');
    if (list) {
      list.innerHTML = d.partners.map(p => `
        <li class="partners-list-item">
          ${p.url
            ? `<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>`
            : `<span>${p.name}</span>`
          }
        </li>`).join('');
    }
  }
}

function populateBottomCta(d) {
  setHeadline('bottomCtaHeadline', d.bottomCtaHeadlinePlain, d.bottomCtaHeadlineItalic);
  setText('bottomCtaBody', d.bottomCtaBody);
  const btn = document.getElementById('bottomCtaBtn');
  if (btn) {
    if (d.bottomCtaBtnLabel) btn.textContent = d.bottomCtaBtnLabel;
    if (d.bottomCtaBtnUrl)   btn.href = d.bottomCtaBtnUrl;
  }
}

async function initPartnersPage() {
  const d = await fetchPartners();
  if (!d) return;

  populateHero(d);
  populateIntro(d);
  populateCategories(d);
  populatePartnersList(d);
  populateBottomCta(d);

  setText('footerTagline', d.footerTagline);
  setText('footerCopyright', d.footerCopyright);
  setText('footerCounties', d.footerCounties);

  if (window.renderBlocks) window.renderBlocks(d.additionalBlocks, '#additionalBlocksAnchor');
}

document.addEventListener('DOMContentLoaded', initPartnersPage);

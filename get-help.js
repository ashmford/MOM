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

function populateInteriorHero(d) {
  setText('heroLabel', d.heroLabel);
  setHeadline('heroHeadline', d.heroHeadlinePlain, d.heroHeadlineItalic);
  setText('heroSubhead', d.heroSubhead);

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

function injectEmbed(containerId, embedCode) {
  if (!embedCode) return;
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = embedCode;
  // Re-execute any script tags in the embed code
  container.querySelectorAll('script').forEach(oldScript => {
    const newScript = document.createElement('script');
    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

async function initGetHelpPage() {
  const query = encodeURIComponent(`*[_type == "getHelpPage"][0]{
    heroLabel, heroHeadlinePlain, heroHeadlineItalic, heroSubhead,
    heroImage{ asset->{ url }, alt }, heroVideoUrl,
    formSectionLabel, formHeadlinePlain, formHeadlineItalic, formIntro,
    formEmbedCode,
    additionalBlocks[]{ ..., image{ asset->{ url }, alt }, stats[]{ number, label }, testimonials[]{ quote, name, detail } }
  }`);

  try {
    const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`);
    const data = await res.json();
    const d = data?.result;
    if (!d) return;

    populateInteriorHero(d);
    setText('formSectionLabel', d.formSectionLabel);
    setHeadline('form-heading', d.formHeadlinePlain, d.formHeadlineItalic);
    setText('formIntro', d.formIntro);
    injectEmbed('formEmbed', d.formEmbedCode);

    setText('footerTagline', d.footerTagline);
    setText('footerCopyright', d.footerCopyright);
    setText('footerCounties', d.footerCounties);

    if (window.renderBlocks) window.renderBlocks(d.additionalBlocks, '#additionalBlocksAnchor');
  } catch (e) {
    console.warn('MOM: Could not fetch get help page.', e);
  }
}

document.addEventListener('DOMContentLoaded', initGetHelpPage);

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

function setHtml(selector, value) {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}

function setHeadline(selector, plain, italic, suffix) {
  const el = document.querySelector(selector);
  if (!el) return;
  let html = '';
  if (plain)  html += plain + ' ';
  if (italic) html += `<em>${italic}</em>`;
  if (suffix) html += ' ' + suffix;
  if (html)   el.innerHTML = html.trim();
}

function setImage(selector, asset, alt) {
  const img = document.querySelector(selector);
  const url = imageUrl(asset);
  if (img && url) {
    img.src = url;
    img.alt = alt || '';
  }
}

async function fetchAboutContent() {
  const query = encodeURIComponent(`*[_type == "aboutPage"][0]{
    heroLabel, heroHeadline, heroSubhead,
    heroImage{ asset->{ url }, alt }, heroVideoUrl,
    missionImage{ asset->{ url }, alt },
    missionHeadlinePlain, missionHeadlineItalic, missionHeadlineSuffix,
    missionBody, visionBody,
    problemHeadlinePlain, problemHeadlineItalic,
    problemBody1, problemBody2, problemBody3,
    quoteText, quoteAttribution,
    peopleHeadlinePlain, peopleHeadlineItalic,
    peopleImage{ asset->{ url }, alt },
    people[]{ name, title, linkedinUrl },
    philosophyHeadlinePlain, philosophyHeadlineItalic,
    philosophyBody1, philosophyBody2,
    donateHeadlinePlain, donateHeadlineItalic,
    donateBody,
    donatePrimaryLabel, donatePrimaryUrl,
    donateSecondaryLabel, donateSecondaryUrl,
    additionalBlocks[]{ ..., image{ asset->{ url }, alt }, logos[]{ name, url, logo{ asset->{ url }, alt } }, stats[]{ number, label }, testimonials[]{ quote, name, detail } }
  }`);

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.result || null;
  } catch (e) {
    console.warn('MOM: Could not fetch about page content.', e);
    return null;
  }
}

function populateAbout(d) {
  // Hero
  setText('#aboutHeroLabel', d.heroLabel);
  setText('#aboutHeroHeadline', d.heroHeadline);
  setText('#aboutHeroSub', d.heroSubhead);

  // Interior hero media and layout
  const hero = document.getElementById('interiorHero');
  const heroMedia = document.getElementById('interiorHeroMedia');
  const heroImg = document.getElementById('interiorHeroImg');
  const heroVideo = document.getElementById('interiorHeroVideo');
  const heroToggle = document.getElementById('interiorVideoToggle');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Image position


  const heroImgUrl = imageUrl(d.heroImage?.asset);

  // No image and no video — text-only mode
  if (!heroImgUrl && !d.heroVideoUrl) {
    if (hero) hero.classList.add('text-only');
    if (heroMedia) heroMedia.style.display = 'none';
  } else {
    // Set fallback image
    if (heroImg && heroImgUrl) {
      heroImg.src = heroImgUrl;
      heroImg.alt = d.heroImage?.alt || '';
    }

    // Video
    if (heroVideo && d.heroVideoUrl && !prefersReduced) {
      const source = document.createElement('source');
      source.src = d.heroVideoUrl;
      source.type = 'video/mp4';
      heroVideo.appendChild(source);
      if (heroImgUrl) heroVideo.poster = heroImgUrl;
      heroVideo.style.display = '';
      heroVideo.load();
      heroVideo.play().catch(() => {});

      if (heroToggle) {
        heroToggle.style.display = 'flex';
        const iconPause = heroToggle.querySelector('.icon-pause');
        const iconPlay = heroToggle.querySelector('.icon-play');
        heroToggle.addEventListener('click', () => {
          const paused = heroVideo.paused;
          if (paused) {
            heroVideo.play();
            heroToggle.setAttribute('aria-label', 'Pause background video');
            heroToggle.setAttribute('aria-pressed', 'false');
            if (iconPause) iconPause.style.display = '';
            if (iconPlay) iconPlay.style.display = 'none';
          } else {
            heroVideo.pause();
            heroToggle.setAttribute('aria-label', 'Play background video');
            heroToggle.setAttribute('aria-pressed', 'true');
            if (iconPause) iconPause.style.display = 'none';
            if (iconPlay) iconPlay.style.display = '';
          }
        });
      }
    }
  }

  // Mission & Vision
  setImage('#aboutMissionImg', d.missionImage?.asset, d.missionImage?.alt);
  setHeadline('#aboutMissionHeadline', d.missionHeadlinePlain, d.missionHeadlineItalic, d.missionHeadlineSuffix);
  setText('#aboutMissionBody', d.missionBody);
  setText('#aboutVisionBody', d.visionBody);

  // Problem
  setHeadline('#aboutProblemHeadline', d.problemHeadlinePlain, d.problemHeadlineItalic, null);
  setText('#aboutProblemBody1', d.problemBody1);
  setText('#aboutProblemBody2', d.problemBody2);
  setText('#aboutProblemBody3', d.problemBody3);

  // Quote
  if (d.quoteText) {
    const quote = document.querySelector('#aboutQuoteText');
    if (quote) quote.textContent = `"${d.quoteText}"`;
  }
  setText('#aboutQuoteCite', d.quoteAttribution);

  // People
  setHeadline('#people-heading', d.peopleHeadlinePlain, d.peopleHeadlineItalic, null);

  // People section image
  const peopleImg = document.getElementById('aboutPeopleImg');
  const peopleImgWrap = document.getElementById('aboutPeopleImageWrap');
  const peopleImgUrl = imageUrl(d.peopleImage?.asset);
  if (peopleImg && peopleImgUrl) {
    peopleImg.src = peopleImgUrl;
    peopleImg.alt = d.peopleImage?.alt || '';
  } else if (peopleImgWrap && !peopleImgUrl) {
    // No image yet — keep placeholder box visible, just styled as empty
    peopleImgWrap.style.opacity = '0.3';
  }

  if (d.people?.length) {
    const list = document.getElementById('peopleList');
    if (list) {
      list.innerHTML = d.people.map(p => {
        const linkedin = p.linkedinUrl
          ? `<a href="${p.linkedinUrl}" class="about-people-linkedin" target="_blank" rel="noopener" aria-label="LinkedIn profile for ${p.name}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>`
          : '';
        return `
          <li class="about-people-item">
            <div class="about-people-info">
              <div class="about-people-name">${p.name || ''}</div>
              ${p.title ? `<div class="about-people-title">${p.title}</div>` : ''}
            </div>
            ${linkedin}
          </li>`;
      }).join('');
    }
  }

  // Philosophy
  setHeadline('#aboutPhilosophyHeadline', d.philosophyHeadlinePlain, d.philosophyHeadlineItalic, null);
  setText('#aboutPhilosophyBody1', d.philosophyBody1);
  setText('#aboutPhilosophyBody2', d.philosophyBody2);

  // Donate CTA
  setHeadline('.donate-cta h2', d.donateHeadlinePlain, d.donateHeadlineItalic, null);
  setText('#donateCTABody', d.donateBody);
  const primary = document.getElementById('donateCTAPrimary');
  if (primary) {
    if (d.donatePrimaryLabel) primary.textContent = d.donatePrimaryLabel;
    if (d.donatePrimaryUrl)   primary.href = d.donatePrimaryUrl;
  }
  const secondary = document.getElementById('donateCTASecondary');
  if (secondary && d.donateSecondaryLabel && d.donateSecondaryUrl) {
    secondary.textContent = d.donateSecondaryLabel;
    secondary.href = d.donateSecondaryUrl;
    secondary.style.display = '';
  }

  // Footer from siteSettings (shared)
  setText('#footerTagline', d.footerTagline);
  setText('#footerCopyright', d.footerCopyright);
  setText('#footerCounties', d.footerCounties);
  const emailEl = document.getElementById('footerEmail');
  if (emailEl && d.contactEmail) emailEl.href = `mailto:${d.contactEmail}`;
  if (window.renderBlocks) window.renderBlocks(d.additionalBlocks, '#additionalBlocksAnchor');
}

async function initAboutPage() {
  const d = await fetchAboutContent();
  if (!d) return;
  populateAbout(d);
}

document.addEventListener('DOMContentLoaded', initAboutPage);

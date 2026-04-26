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
    missionImage{ asset->{ url }, alt },
    missionHeadlinePlain, missionHeadlineItalic, missionHeadlineSuffix,
    missionBody, visionBody,
    problemHeadlinePlain, problemHeadlineItalic,
    problemBody1, problemBody2, problemBody3,
    quoteText, quoteAttribution,
    peopleHeadlinePlain, peopleHeadlineItalic,
    founderImage{ asset->{ url }, alt },
    founderName, founderTitle,
    boardMembers[]{ name, title },
    philosophyHeadlinePlain, philosophyHeadlineItalic,
    philosophyBody1, philosophyBody2,
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
    console.warn('MOM: Could not fetch about page content.', e);
    return null;
  }
}

function populateAbout(d) {
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
  setImage('#founderImg', d.founderImage?.asset, d.founderImage?.alt);
  setText('#founderName', d.founderName);
  setText('#founderTitle', d.founderTitle);

  if (d.boardMembers?.length) {
    const list = document.getElementById('boardList');
    if (list) {
      list.innerHTML = d.boardMembers.map(m => `
        <li class="about-board-item">
          <div class="about-board-name">${m.name || '[Board Member Name]'}</div>
          <div class="about-board-title">${m.title || '[Title or Affiliation]'}</div>
        </li>
      `).join('');
    }
  }

  // Philosophy
  setHeadline('#philosophy-heading', d.philosophyHeadlinePlain, d.philosophyHeadlineItalic, null);
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
  if (secondary) {
    if (d.donateSecondaryLabel) secondary.textContent = d.donateSecondaryLabel;
    if (d.donateSecondaryUrl)   secondary.href = d.donateSecondaryUrl;
  }

  // Footer from siteSettings (shared)
  setText('#footerTagline', d.footerTagline);
  setText('#footerCopyright', d.footerCopyright);
  setText('#footerCounties', d.footerCounties);
  const emailEl = document.getElementById('footerEmail');
  if (emailEl && d.contactEmail) emailEl.href = `mailto:${d.contactEmail}`;
}

async function initAboutPage() {
  const d = await fetchAboutContent();
  if (!d) return;
  populateAbout(d);
}

document.addEventListener('DOMContentLoaded', initAboutPage);

const SANITY_PROJECT_ID = 'o2xenqpa';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

async function fetchNav() {
  const query = encodeURIComponent(
    `*[_type == "siteSettings"][0]{ navigation[]{ label, url, visible } }`
  );
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.result?.navigation || null;
  } catch (e) {
    return null;
  }
}

function buildNavLinks(items) {
  return items
    .filter(item => item.visible)
    .map(item => {
      const isDonate = item.url === '/donate.html' || item.label.toLowerCase() === 'donate';
      if (isDonate) return '';
      return `<li><a href="${item.url}">${item.label}</a></li>`;
    })
    .join('');
}

async function initNav() {
  const navItems = await fetchNav();
  if (!navItems) return;

  const linksList = document.querySelector('.nav-links');
  if (linksList) {
    linksList.innerHTML = buildNavLinks(navItems);
  }

  const donateItem = navItems.find(i => i.label.toLowerCase() === 'donate');
  const donateBtn = document.querySelector('.btn-donate');
  if (donateBtn && donateItem) {
    donateBtn.href = donateItem.url;
    donateBtn.style.display = donateItem.visible ? '' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', initNav);

// seo.js — injects SEO and Open Graph meta tags from Sanity data.
// Include on every page. Call applySeo(data) after fetching page content.

window.applySeo = function(d) {
  if (!d) return;

  const siteName = 'Mending Our Mistakes';
  const defaultDesc = 'Supporting noncustodial parents in Arkansas navigating family court with case navigation, employment support, legal guidance, and peer support.';
  const pageUrl = window.location.href;

  const title = d.seoTitle
    ? `${d.seoTitle} — ${siteName}`
    : document.title || siteName;

  const desc = d.seoDescription || defaultDesc;

  const imgUrl = d.seoImage?.asset?.url || null;

  // Title
  document.title = title;
  setMeta('og:title', title);
  setMeta('twitter:title', title);

  // Description
  setMeta('description', desc);
  setMeta('og:description', desc);
  setMeta('twitter:description', desc);

  // URL
  setMeta('og:url', pageUrl);

  // Site name
  setMeta('og:site_name', siteName);

  // Type
  setMeta('og:type', 'website');

  // Twitter card
  setMeta('twitter:card', imgUrl ? 'summary_large_image' : 'summary');

  // Image
  if (imgUrl) {
    setMeta('og:image', imgUrl);
    setMeta('twitter:image', imgUrl);
  }
}

function setMeta(name, content) {
  if (!content) return;

  // Try property first (og:*), then name
  let el = document.querySelector(`meta[property="${name}"]`)
        || document.querySelector(`meta[name="${name}"]`);

  if (!el) {
    el = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
    } else {
      el.setAttribute('name', name);
    }
    document.head.appendChild(el);
  }

  el.setAttribute('content', content);
}

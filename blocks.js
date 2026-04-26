// blocks.js — renders additionalBlocks arrays fetched from Sanity.
// Included on every page. Call renderBlocks(blocks, containerSelector) 
// after fetching page content.

function blockImageUrl(asset) {
  if (!asset) return null;
  return asset.url || null;
}

function headlineHtml(plain, italic) {
  let html = '';
  if (plain)  html += plain + ' ';
  if (italic) html += `<em>${italic}</em>`;
  return html.trim();
}

function renderRichTextBlock(b) {
  const headline = headlineHtml(b.headline, b.headlineItalic);
  return `
    <section class="block-richtext" aria-label="${b.headline || 'Content block'}">
      <div class="section-inner">
        ${headline ? `<h2 class="display">${headline}</h2>` : ''}
        ${b.body ? `<p class="block-body">${b.body}</p>` : ''}
      </div>
    </section>`;
}

function renderStatBlock(b) {
  const headline = headlineHtml(b.headline, b.headlineItalic);
  const stats = (b.stats || []).map(s => `
    <div class="stat-item">
      <div class="num">${s.number || ''}</div>
      <div class="label">${s.label || ''}</div>
    </div>`).join('');
  return `
    <section class="stats block-stats" aria-label="Statistics">
      <div class="stats-inner">
        ${b.intro ? `<p class="stats-eyebrow">${b.intro}</p>` : ''}
        ${headline ? `<h2 class="display" style="color:#fff;margin-bottom:8px;">${headline}</h2>` : ''}
        <div class="stats-grid">${stats}</div>
        ${b.source ? `<p class="stats-source">${b.source}</p>` : ''}
      </div>
    </section>`;
}

function renderQuoteBlock(b) {
  return `
    <div class="about-quote block-quote" role="region" aria-label="Quote">
      <div class="about-quote-inner">
        <div class="about-quote-mark"></div>
        ${b.quote ? `<blockquote>"${b.quote}"</blockquote>` : ''}
        ${b.attribution ? `<cite>${b.attribution}</cite>` : ''}
      </div>
    </div>`;
}

function renderImageTextBlock(b) {
  const headline = headlineHtml(b.headline, b.headlineItalic);
  const imgUrl = blockImageUrl(b.image?.asset);
  const reversed = b.imagePosition === 'right' ? 'style="direction:rtl;"' : '';
  const innerStyle = b.imagePosition === 'right' ? 'style="direction:ltr;"' : '';
  return `
    <section class="mission block-imagetext" aria-label="${b.headline || 'Content'}">
      <div class="section-inner">
        <div class="mission-layout" ${reversed}>
          <div class="mission-image" ${innerStyle}>
            ${imgUrl ? `<img src="${imgUrl}" alt="${b.image?.alt || ''}" loading="lazy">` : ''}
          </div>
          <div class="mission-text" ${innerStyle}>
            ${headline ? `<h2 class="display">${headline}</h2>` : ''}
            ${b.body ? `<p>${b.body}</p>` : ''}
          </div>
        </div>
      </div>
    </section>`;
}

function renderCtaBlock(b) {
  const headline = headlineHtml(b.headline, b.headlineItalic);
  const primary = b.primaryLabel && b.primaryUrl
    ? `<a href="${b.primaryUrl}" class="btn-primary btn-large">${b.primaryLabel}</a>` : '';
  const secondary = b.secondaryLabel && b.secondaryUrl
    ? `<a href="${b.secondaryUrl}" class="btn-outline btn-large">${b.secondaryLabel}</a>` : '';
  return `
    <div class="donate-cta block-cta" role="region" aria-label="${b.headline || 'Call to action'}">
      <div class="donate-cta-inner">
        <div>
          ${headline ? `<h2>${headline}</h2>` : ''}
          ${b.body ? `<p>${b.body}</p>` : ''}
        </div>
        <div class="donate-cta-actions">
          ${primary}${secondary}
        </div>
      </div>
    </div>`;
}

function renderPartnerLogoBlock(b) {
  const logos = (b.logos || []).map(p => {
    const imgUrl = blockImageUrl(p.logo?.asset);
    const img = imgUrl
      ? `<img src="${imgUrl}" alt="${p.logo?.alt || p.name || ''}" loading="lazy">`
      : `<span class="partner-logo-name">${p.name || ''}</span>`;
    return p.url
      ? `<a href="${p.url}" class="partner-logo-item" target="_blank" rel="noopener">${img}</a>`
      : `<div class="partner-logo-item">${img}</div>`;
  }).join('');
  return `
    <section class="block-partners" aria-label="Partners">
      <div class="section-inner">
        ${b.headline ? `<div class="section-label"><span>${b.headline}</span></div>` : ''}
        <div class="partner-logo-grid">${logos}</div>
      </div>
    </section>`;
}

function renderTestimonialRowBlock(b) {
  const cards = (b.testimonials || []).map(t => `
    <div class="testimonial-card">
      <div class="testimonial-mark"></div>
      <p class="testimonial-quote">"${t.quote || ''}"</p>
      <div class="testimonial-name">${t.name || ''}</div>
      <div class="testimonial-detail">${t.detail || ''}</div>
    </div>`).join('');
  return `
    <section class="testimonials block-testimonials" aria-label="Testimonials">
      <div class="section-inner">
        ${b.headline ? `<h2 class="display">${b.headline}</h2>` : ''}
        <div class="testimonials-grid">${cards}</div>
      </div>
    </section>`;
}

function renderBlock(block) {
  switch (block._type) {
    case 'richTextBlock':       return renderRichTextBlock(block);
    case 'statBlock':           return renderStatBlock(block);
    case 'quoteBlock':          return renderQuoteBlock(block);
    case 'imageTextBlock':      return renderImageTextBlock(block);
    case 'ctaBlock':            return renderCtaBlock(block);
    case 'partnerLogoBlock':    return renderPartnerLogoBlock(block);
    case 'testimonialRowBlock': return renderTestimonialRowBlock(block);
    default: return '';
  }
}

window.renderBlocks = function(blocks, containerSelector) {
  if (!blocks?.length) return;
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const html = blocks.map(renderBlock).join('');
  container.insertAdjacentHTML('beforebegin', html);
};

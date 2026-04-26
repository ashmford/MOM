export default {
  name: 'genericPage',
  title: 'Pages',
  type: 'document',

  groups: [
    { name: 'hero',      title: 'Hero' },
    { name: 'content',   title: 'Content Blocks' },
    { name: 'donateCta', title: 'Donate CTA' },
  ],

  fields: [
    // ─── PAGE IDENTITY ────────────────────────────────
    {
      name: 'title',
      title: 'Page title',
      type: 'string',
      description: 'Used as the browser tab title and the default H1.',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Page slug',
      type: 'slug',
      description: 'The URL path for this page. E.g. "resources" becomes /page.html?slug=resources',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },

    // ─── HERO ─────────────────────────────────────────
    {
      name: 'heroType',
      title: 'Hero style',
      type: 'string',
      group: 'hero',
      options: {
        list: [
          { title: 'Split — image or video beside text', value: 'split' },
          { title: 'Text only — warm tan background', value: 'text' },
        ],
        layout: 'radio'
      },
      initialValue: 'split',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroLabel',
      title: 'Page label',
      type: 'string',
      group: 'hero',
      description: 'Small label above the headline.'
    },
    {
      name: 'heroHeadline',
      title: 'Page headline (H1)',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroHeadlineItalic',
      title: 'Headline — italic portion',
      type: 'string',
      group: 'hero',
      description: 'Optional. This portion renders in purple italic.'
    },
    {
      name: 'heroSubhead',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'Optional. One sentence below the H1.'
    },
    {
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Used when hero style is "Split". Leave blank for text-only.',
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }]
    },
    {
      name: 'heroVideoUrl',
      title: 'Hero video URL',
      type: 'url',
      group: 'hero',
      description: 'Optional. Paste a direct .mp4 URL. Used instead of image if provided.'
    },

    // ─── CONTENT BLOCKS ───────────────────────────────
    {
      name: 'blocks',
      title: 'Content blocks',
      type: 'array',
      group: 'content',
      description: 'Add, remove, and reorder content blocks. These appear below the hero.',
      of: [
        { type: 'richTextBlock' },
        { type: 'statBlock' },
        { type: 'quoteBlock' },
        { type: 'imageTextBlock' },
        { type: 'ctaBlock' },
        { type: 'partnerLogoBlock' },
        { type: 'testimonialRowBlock' },
      ]
    },

    // ─── DONATE CTA ───────────────────────────────────
    {
      name: 'donateHeadlinePlain',
      title: 'Donate CTA headline — plain portion',
      type: 'string',
      group: 'donateCta',
    },
    {
      name: 'donateHeadlineItalic',
      title: 'Donate CTA headline — italic portion',
      type: 'string',
      group: 'donateCta',
    },
    {
      name: 'donateBody',
      title: 'Donate CTA body',
      type: 'text',
      rows: 3,
      group: 'donateCta',
    },
    {
      name: 'donatePrimaryLabel',
      title: 'Primary button label',
      type: 'string',
      group: 'donateCta',
      initialValue: 'Donate now'
    },
    {
      name: 'donatePrimaryUrl',
      title: 'Primary button URL',
      type: 'string',
      group: 'donateCta',
      initialValue: '/donate.html'
    },
    {
      name: 'donateSecondaryLabel',
      title: 'Secondary button label',
      type: 'string',
      group: 'donateCta',
    },
    {
      name: 'donateSecondaryUrl',
      title: 'Secondary button URL',
      type: 'string',
      group: 'donateCta',
    },
  ],

  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
      return { title: title || 'Untitled page', subtitle: subtitle ? `/page.html?slug=${subtitle}` : '' }
    }
  }
}

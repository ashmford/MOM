export default {
  name: 'partnersPage',
  title: 'Partners Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero',       title: 'Hero' },
    { name: 'intro',      title: 'Intro' },
    { name: 'categories', title: 'Partnership Categories' },
    { name: 'list',       title: 'Current Partners' },
    { name: 'bottomCta',  title: 'Bottom CTA' },
    { name: 'blocks',     title: 'Additional Blocks' },
  ],

  fields: [
    // HERO
    { name: 'heroLabel',    title: 'Hero label',    type: 'string', group: 'hero' },
    { name: 'heroHeadlinePlain',  title: 'Hero headline — plain portion',  type: 'string', group: 'hero' },
    { name: 'heroHeadlineItalic', title: 'Hero headline — italic portion', type: 'string', group: 'hero' },
    { name: 'heroSubhead',  title: 'Hero subhead',  type: 'text', rows: 2, group: 'hero' },
    { name: 'heroCtaLabel', title: 'Hero CTA label', type: 'string', group: 'hero', description: 'Optional. E.g. "Become a partner"' },
    { name: 'heroCtaUrl',   title: 'Hero CTA URL',   type: 'string', group: 'hero', description: 'E.g. mailto:admin@mendingourmistakes.org' },
    { name: 'heroImage',    title: 'Hero image',     type: 'image', group: 'hero', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] },
    { name: 'heroVideoUrl', title: 'Hero video URL', type: 'url', group: 'hero' },

    // INTRO
    { name: 'introLabel',         title: 'Intro section label', type: 'string', group: 'intro', initialValue: 'Partnership' },
    { name: 'introHeadlinePlain', title: 'Intro headline — plain portion',  type: 'string', group: 'intro' },
    { name: 'introHeadlineItalic',title: 'Intro headline — italic portion', type: 'string', group: 'intro' },
    { name: 'introBody',          title: 'Intro paragraph', type: 'text', rows: 4, group: 'intro' },
    { name: 'contactEmail',       title: 'Contact email', type: 'string', group: 'intro', initialValue: 'admin@mendingourmistakes.org' },

    // CATEGORIES
    {
      name: 'categories',
      title: 'Partnership categories',
      type: 'array',
      group: 'categories',
      description: 'Three categories. Drag to reorder.',
      of: [{
        type: 'object',
        fields: [
          { name: 'label',         title: 'Section label',            type: 'string' },
          { name: 'headlinePlain', title: 'Headline — plain portion', type: 'string' },
          { name: 'headlineItalic',title: 'Headline — italic portion',type: 'string' },
          { name: 'body',          title: 'Body paragraph',           type: 'text', rows: 5 },
        ],
        preview: { select: { title: 'label', subtitle: 'headlinePlain' } }
      }]
    },

    // CURRENT PARTNERS LIST
    { name: 'currentPartnersLabel',         title: 'Section label',    type: 'string', group: 'list', initialValue: 'Our partners' },
    { name: 'currentPartnersHeadlinePlain', title: 'Headline — plain', type: 'string', group: 'list' },
    { name: 'currentPartnersHeadlineItalic',title: 'Headline — italic',type: 'string', group: 'list' },
    {
      name: 'partners',
      title: 'Partners',
      type: 'array',
      group: 'list',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Partner name', type: 'string', validation: Rule => Rule.required() },
          { name: 'url',  title: 'Website URL',  type: 'url', description: 'Optional.' },
        ],
        preview: { select: { title: 'name', subtitle: 'url' } }
      }]
    },

    // BOTTOM CTA
    { name: 'bottomCtaHeadlinePlain',  title: 'Bottom CTA headline — plain',  type: 'string', group: 'bottomCta' },
    { name: 'bottomCtaHeadlineItalic', title: 'Bottom CTA headline — italic', type: 'string', group: 'bottomCta' },
    { name: 'bottomCtaBody',           title: 'Bottom CTA body',              type: 'text', rows: 3, group: 'bottomCta' },
    { name: 'bottomCtaBtnLabel',       title: 'Button label',                 type: 'string', group: 'bottomCta', initialValue: 'Email us' },
    { name: 'bottomCtaBtnUrl',         title: 'Button URL',                   type: 'string', group: 'bottomCta', initialValue: 'mailto:admin@mendingourmistakes.org' },

    // ADDITIONAL BLOCKS
    {
      name: 'additionalBlocks',
      title: 'Additional content blocks',
      type: 'array',
      group: 'blocks',
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
  ],

  preview: { prepare() { return { title: 'Partners Page' } } }
}

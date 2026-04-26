import { additionalBlocksField } from './blocks'

export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero',         title: 'Hero' },
    { name: 'mission',      title: 'Mission' },
    { name: 'serve',        title: 'Who We Serve' },
    { name: 'services',     title: 'Services' },
    { name: 'stats',        title: 'Stats' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'donateCta',    title: 'Donate CTA' },
    { name: 'blocks',       title: 'Additional Blocks' },
  ],

  fields: [

    // ─── HERO ────────────────────────────────────────────
    {
      name: 'heroEyebrow',
      title: 'Eyebrow text',
      type: 'string',
      group: 'hero',
      description: 'Small label above the headline. E.g. "Mending Our Mistakes, Inc."',
    },
    {
      name: 'heroHeadlinePlain',
      title: 'Headline — plain portion',
      type: 'string',
      group: 'hero',
      description: 'The non-italic part of the headline. E.g. "When the system steps back,"',
    },
    {
      name: 'heroHeadlineItalic',
      title: 'Headline — italic portion',
      type: 'string',
      group: 'hero',
      description: 'The italic/purple portion. E.g. "we step in."',
    },
    {
      name: 'heroSubhead',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      group: 'hero',
    },
    {
      name: 'heroPrimaryLabel',
      title: 'Primary button label',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroPrimaryUrl',
      title: 'Primary button URL',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroSecondaryLabel',
      title: 'Secondary button label',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroSecondaryUrl',
      title: 'Secondary button URL',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroLocationLine',
      title: 'Location line',
      type: 'string',
      group: 'hero',
      description: 'E.g. "Serving Garland · Hot Spring · Saline · Grant Counties"',
    },
    {
      name: 'heroImage',
      title: 'Fallback image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers.',
        },
      ],
    },
    {
      name: 'heroVideoUrl',
      title: 'Background video URL',
      type: 'url',
      group: 'hero',
      description: 'Upload your broll video to Sanity or a CDN and paste the URL here. Leave blank to use the fallback image only.',
    },

    // ─── MISSION ─────────────────────────────────────────
    {
      name: 'missionImage',
      title: 'Mission section image',
      type: 'image',
      group: 'mission',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: Rule => Rule.required().error('Alt text is required for accessibility.'),
        },
      ],
    },
    {
      name: 'missionHeadlinePlain',
      title: 'Mission headline — plain portion',
      type: 'string',
      group: 'mission',
    },
    {
      name: 'missionHeadlineItalic',
      title: 'Mission headline — italic portion',
      type: 'string',
      group: 'mission',
    },
    {
      name: 'missionHeadlineSuffix',
      title: 'Mission headline — plain suffix',
      type: 'string',
      group: 'mission',
      description: 'Any plain text after the italic portion. E.g. "lives."',
    },
    {
      name: 'missionBody',
      title: 'Mission body paragraph',
      type: 'text',
      rows: 3,
      group: 'mission',
    },
    {
      name: 'missionDetails',
      title: 'Mission detail rows',
      type: 'array',
      group: 'mission',
      description: 'Three rows of label + description shown below the body text.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'label', subtitle: 'description' } },
        },
      ],
    },

    // ─── WHO WE SERVE ─────────────────────────────────────
    {
      name: 'serveHeadlinePlain',
      title: 'Who we serve headline — plain portion',
      type: 'string',
      group: 'serve',
    },
    {
      name: 'serveHeadlineItalic',
      title: 'Who we serve headline — italic portion',
      type: 'string',
      group: 'serve',
    },
    {
      name: 'serveCards',
      title: 'Audience cards',
      type: 'array',
      group: 'serve',
      description: 'Three cards, one per audience. Order is fixed.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Card title', type: 'string' },
            { name: 'body', title: 'Card body', type: 'text', rows: 3 },
            { name: 'linkLabel', title: 'Link label', type: 'string' },
            { name: 'linkUrl', title: 'Link URL', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
    },

    // ─── SERVICES ─────────────────────────────────────────
    {
      name: 'servicesHeadlinePlain',
      title: 'Services headline — plain portion',
      type: 'string',
      group: 'services',
    },
    {
      name: 'servicesHeadlineItalic',
      title: 'Services headline — italic portion',
      type: 'string',
      group: 'services',
    },
    {
      name: 'servicesIntro',
      title: 'Services intro paragraph',
      type: 'text',
      rows: 3,
      group: 'services',
    },
    {
      name: 'serviceCards',
      title: 'Service cards',
      type: 'array',
      group: 'services',
      description: 'Eight services displayed in the grid. Order determines numbering.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Service name', type: 'string' },
            { name: 'description', title: 'Short description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'name', subtitle: 'description' } },
        },
      ],
    },
    {
      name: 'servicesPrimaryLabel',
      title: 'Primary CTA label',
      type: 'string',
      group: 'services',
    },
    {
      name: 'servicesPrimaryUrl',
      title: 'Primary CTA URL',
      type: 'string',
      group: 'services',
    },
    {
      name: 'servicesSecondaryLabel',
      title: 'Secondary CTA label',
      type: 'string',
      group: 'services',
    },
    {
      name: 'servicesSecondaryUrl',
      title: 'Secondary CTA URL',
      type: 'string',
      group: 'services',
    },

    // ─── STATS ────────────────────────────────────────────
    {
      name: 'statsHeadlinePlain',
      title: 'Stats headline — plain portion',
      type: 'string',
      group: 'stats',
    },
    {
      name: 'statsHeadlineItalic',
      title: 'Stats headline — italic portion',
      type: 'string',
      group: 'stats',
    },
    {
      name: 'statsIntro',
      title: 'Stats intro sentence',
      type: 'string',
      group: 'stats',
    },
    {
      name: 'stats',
      title: 'Stat items',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number or value', type: 'string', description: 'E.g. "21%" or "$1,000"' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        },
      ],
    },
    {
      name: 'statsSource',
      title: 'Source attribution',
      type: 'string',
      group: 'stats',
      description: 'E.g. "Source · MDRC Evaluation of Texas NCP Choices"',
    },

    // ─── TESTIMONIALS ─────────────────────────────────────
    {
      name: 'testimonialsHeadlinePlain',
      title: 'Testimonials headline — plain portion',
      type: 'string',
      group: 'testimonials',
    },
    {
      name: 'testimonialsHeadlineItalic',
      title: 'Testimonials headline — italic portion',
      type: 'string',
      group: 'testimonials',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'testimonials',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
            { name: 'name', title: 'Name or attribution', type: 'string' },
            { name: 'detail', title: 'Detail line', type: 'string', description: 'E.g. "Hot Spring County" or "Arkansas DHS"' },
          ],
          preview: { select: { title: 'name', subtitle: 'quote' } },
        },
      ],
    },

    // ─── DONATE CTA ───────────────────────────────────────
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
      title: 'Donate CTA body paragraph',
      type: 'text',
      rows: 3,
      group: 'donateCta',
    },
    {
      name: 'donatePrimaryLabel',
      title: 'Primary button label',
      type: 'string',
      group: 'donateCta',
    },
    {
      name: 'donatePrimaryUrl',
      title: 'Primary button URL',
      type: 'string',
      group: 'donateCta',
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


    // ─── ADDITIONAL BLOCKS ────────────────────────────
    additionalBlocksField,

  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
};

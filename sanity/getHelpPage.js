export default {
  name: 'getHelpPage',
  title: 'Get Help Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero',    title: 'Hero' },
    { name: 'form',    title: 'Form' },
    { name: 'blocks',  title: 'Additional Blocks' },
  ],

  fields: [
    { name: 'heroLabel',          title: 'Hero label',              type: 'string', group: 'hero' },
    { name: 'heroHeadlinePlain',  title: 'Hero headline — plain',   type: 'string', group: 'hero' },
    { name: 'heroHeadlineItalic', title: 'Hero headline — italic',  type: 'string', group: 'hero' },
    { name: 'heroSubhead',        title: 'Hero subhead',            type: 'text', rows: 2, group: 'hero' },
    { name: 'heroImage',          title: 'Hero image',              type: 'image', group: 'hero', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] },
    { name: 'heroVideoUrl',       title: 'Hero video URL',          type: 'url', group: 'hero' },

    { name: 'formSectionLabel',   title: 'Form section label',      type: 'string', group: 'form', initialValue: 'Intake form' },
    { name: 'formHeadlinePlain',  title: 'Form headline — plain',   type: 'string', group: 'form' },
    { name: 'formHeadlineItalic', title: 'Form headline — italic',  type: 'string', group: 'form' },
    { name: 'formIntro',          title: 'Form intro paragraph',    type: 'text', rows: 3, group: 'form', description: 'Optional. Appears above the form.' },
    {
      name: 'formEmbedCode',
      title: 'Form embed code',
      type: 'text',
      rows: 6,
      group: 'form',
      description: 'Paste your full Tally embed code here (the <script> or <iframe> tag from Tally.so). It will render on the page automatically.'
    },

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
        { type: 'testimonialRowBlock' },
      ]
    },
  ],

  preview: { prepare() { return { title: 'Get Help Page' } } }
}

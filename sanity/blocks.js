// blocks.js — reusable block types for the additionalBlocks field.
// Import and spread into any page schema's additionalBlocks array field.

export const blockTypes = [

  {
    type: 'object',
    name: 'richTextBlock',
    title: 'Text block',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'string',
        description: 'Optional. Leave blank for body-only block.'
      },
      {
        name: 'headlineItalic',
        title: 'Headline — italic portion',
        type: 'string',
        description: 'Optional. This portion renders in purple italic.'
      },
      {
        name: 'body',
        title: 'Body text',
        type: 'text',
        rows: 5,
        validation: Rule => Rule.required()
      }
    ],
    preview: {
      select: { title: 'headline', subtitle: 'body' },
      prepare({ title, subtitle }) {
        return { title: title || 'Text block', subtitle }
      }
    }
  },

  {
    type: 'object',
    name: 'statBlock',
    title: 'Stats block',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'string'
      },
      {
        name: 'headlineItalic',
        title: 'Headline — italic portion',
        type: 'string'
      },
      {
        name: 'intro',
        title: 'Intro sentence',
        type: 'string'
      },
      {
        name: 'stats',
        title: 'Stats',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'number', title: 'Number or value', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' }
            ],
            preview: { select: { title: 'number', subtitle: 'label' } }
          }
        ]
      },
      {
        name: 'source',
        title: 'Source attribution',
        type: 'string'
      }
    ],
    preview: {
      select: { title: 'headline' },
      prepare({ title }) {
        return { title: title || 'Stats block' }
      }
    }
  },

  {
    type: 'object',
    name: 'quoteBlock',
    title: 'Quote block',
    fields: [
      {
        name: 'quote',
        title: 'Quote',
        type: 'text',
        rows: 3,
        description: 'Do not include quotation marks — added automatically.',
        validation: Rule => Rule.required()
      },
      {
        name: 'attribution',
        title: 'Attribution',
        type: 'string'
      }
    ],
    preview: {
      select: { title: 'attribution', subtitle: 'quote' },
      prepare({ title, subtitle }) {
        return { title: title || 'Quote block', subtitle }
      }
    }
  },

  {
    type: 'object',
    name: 'imageTextBlock',
    title: 'Image + text block',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
        fields: [{ name: 'alt', title: 'Alt text', type: 'string', validation: Rule => Rule.required().error('Alt text required.') }]
      },
      {
        name: 'imagePosition',
        title: 'Image position',
        type: 'string',
        options: {
          list: [
            { title: 'Image on left', value: 'left' },
            { title: 'Image on right', value: 'right' }
          ],
          layout: 'radio'
        },
        initialValue: 'left'
      },
      {
        name: 'headline',
        title: 'Headline',
        type: 'string'
      },
      {
        name: 'headlineItalic',
        title: 'Headline — italic portion',
        type: 'string'
      },
      {
        name: 'body',
        title: 'Body text',
        type: 'text',
        rows: 4
      }
    ],
    preview: {
      select: { title: 'headline', media: 'image' },
      prepare({ title, media }) {
        return { title: title || 'Image + text block', media }
      }
    }
  },

  {
    type: 'object',
    name: 'ctaBlock',
    title: 'CTA block',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'string'
      },
      {
        name: 'headlineItalic',
        title: 'Headline — italic portion',
        type: 'string'
      },
      {
        name: 'body',
        title: 'Body text',
        type: 'text',
        rows: 3
      },
      {
        name: 'primaryLabel',
        title: 'Primary button label',
        type: 'string'
      },
      {
        name: 'primaryUrl',
        title: 'Primary button URL',
        type: 'string'
      },
      {
        name: 'secondaryLabel',
        title: 'Secondary button label',
        type: 'string',
        description: 'Optional.'
      },
      {
        name: 'secondaryUrl',
        title: 'Secondary button URL',
        type: 'string'
      }
    ],
    preview: {
      select: { title: 'headline', subtitle: 'primaryLabel' },
      prepare({ title, subtitle }) {
        return { title: title || 'CTA block', subtitle }
      }
    }
  },

  {
    type: 'object',
    name: 'partnerLogoBlock',
    title: 'Partner logos block',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'string',
        description: 'Optional. E.g. "Our partners"'
      },
      {
        name: 'logos',
        title: 'Partner logos',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Partner name', type: 'string' },
              {
                name: 'logo',
                title: 'Logo',
                type: 'image',
                fields: [{ name: 'alt', title: 'Alt text', type: 'string' }]
              },
              { name: 'url', title: 'Link URL', type: 'url', description: 'Optional.' }
            ],
            preview: { select: { title: 'name', media: 'logo' } }
          }
        ]
      }
    ],
    preview: {
      select: { title: 'headline' },
      prepare({ title }) {
        return { title: title || 'Partner logos block' }
      }
    }
  },

  {
    type: 'object',
    name: 'testimonialRowBlock',
    title: 'Testimonials block',
    fields: [
      {
        name: 'headline',
        title: 'Headline',
        type: 'string',
        description: 'Optional.'
      },
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        description: 'Add one to three testimonials.',
        validation: Rule => Rule.max(3).error('Maximum three testimonials per block.'),
        of: [
          {
            type: 'object',
            fields: [
              { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
              { name: 'name', title: 'Name or attribution', type: 'string' },
              { name: 'detail', title: 'Detail line', type: 'string' }
            ],
            preview: { select: { title: 'name', subtitle: 'quote' } }
          }
        ]
      }
    ],
    preview: {
      select: { title: 'headline' },
      prepare({ title }) {
        return { title: title || 'Testimonials block' }
      }
    }
  }

]

// The additionalBlocks field definition — paste into any page schema's fields array
export const additionalBlocksField = {
  name: 'additionalBlocks',
  title: 'Additional content blocks',
  type: 'array',
  description: 'Optional. Add, remove, and reorder content blocks below the main page content.',
  of: blockTypes
}

import { additionalBlocksField } from './blocks'

export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero', title: 'Page Hero' },
    { name: 'mission',     title: 'Mission & Vision' },
    { name: 'problem',     title: 'The Problem' },
    { name: 'quote',       title: 'Founder Quote' },
    { name: 'people',      title: 'Founder & Board' },
    { name: 'philosophy',  title: 'Philosophy' },
    { name: 'donateCta',   title: 'Donate CTA' },
    { name: 'blocks',      title: 'Additional Blocks' },
  ],

  fields: [


    // ─── HERO ─────────────────────────────────────────
    {
      name: 'heroLabel',
      title: 'Page label',
      type: 'string',
      group: 'hero',
      description: 'Small label above the headline. E.g. "About"'
    },
    {
      name: 'heroHeadline',
      title: 'Page headline (H1)',
      type: 'string',
      group: 'hero',
    },

    // ─── MISSION & VISION ─────────────────────────────
    {
      name: 'missionImage',
      title: 'Mission section image',
      type: 'image',
      group: 'mission',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string', validation: Rule => Rule.required().error('Alt text required for accessibility.') }]
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
      description: 'Any plain text after the italic portion. E.g. "lives."'
    },
    {
      name: 'missionBody',
      title: 'Mission statement',
      type: 'text',
      rows: 3,
      group: 'mission',
    },
    {
      name: 'visionBody',
      title: 'Vision statement',
      type: 'text',
      rows: 3,
      group: 'mission',
    },

    // ─── THE PROBLEM ──────────────────────────────────
    {
      name: 'problemHeadlinePlain',
      title: 'Problem headline — plain portion',
      type: 'string',
      group: 'problem',
    },
    {
      name: 'problemHeadlineItalic',
      title: 'Problem headline — italic portion',
      type: 'string',
      group: 'problem',
    },
    {
      name: 'problemBody1',
      title: 'Problem paragraph 1',
      type: 'text',
      rows: 3,
      group: 'problem',
    },
    {
      name: 'problemBody2',
      title: 'Problem paragraph 2',
      type: 'text',
      rows: 3,
      group: 'problem',
    },
    {
      name: 'problemBody3',
      title: 'Problem paragraph 3',
      type: 'text',
      rows: 2,
      group: 'problem',
    },

    // ─── FOUNDER QUOTE ────────────────────────────────
    {
      name: 'quoteText',
      title: 'Quote',
      type: 'text',
      rows: 3,
      group: 'quote',
      description: 'Do not include quotation marks — they are added automatically.'
    },
    {
      name: 'quoteAttribution',
      title: 'Attribution',
      type: 'string',
      group: 'quote',
      description: 'E.g. "Rachel Tanner Moreland, Founder"'
    },

    // ─── FOUNDER & BOARD ──────────────────────────────
    {
      name: 'peopleHeadlinePlain',
      title: 'Section headline — plain portion',
      type: 'string',
      group: 'people',
    },
    {
      name: 'peopleHeadlineItalic',
      title: 'Section headline — italic portion',
      type: 'string',
      group: 'people',
    },
    {
      name: 'founderImage',
      title: "Founder photo",
      type: 'image',
      group: 'people',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string', validation: Rule => Rule.required().error('Alt text required.') }]
    },
    {
      name: 'founderName',
      title: 'Founder name',
      type: 'string',
      group: 'people',
    },
    {
      name: 'founderTitle',
      title: 'Founder title',
      type: 'string',
      group: 'people',
    },
    {
      name: 'boardMembers',
      title: 'Board members',
      type: 'array',
      group: 'people',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'title', title: 'Title or affiliation', type: 'string' },
          ],
          preview: { select: { title: 'name', subtitle: 'title' } }
        }
      ]
    },

    // ─── PHILOSOPHY ───────────────────────────────────
    {
      name: 'philosophyHeadlinePlain',
      title: 'Philosophy headline — plain portion',
      type: 'string',
      group: 'philosophy',
    },
    {
      name: 'philosophyHeadlineItalic',
      title: 'Philosophy headline — italic portion',
      type: 'string',
      group: 'philosophy',
    },
    {
      name: 'philosophyBody1',
      title: 'Philosophy paragraph 1',
      type: 'text',
      rows: 4,
      group: 'philosophy',
    },
    {
      name: 'philosophyBody2',
      title: 'Philosophy paragraph 2',
      type: 'text',
      rows: 2,
      group: 'philosophy',
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
    prepare() { return { title: 'About Page' } }
  }
}

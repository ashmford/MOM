export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      description: 'Control which pages appear in the top navigation and in what order. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The text that appears in the navigation bar.',
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Where this link goes. Use /about.html format for site pages.',
              validation: Rule => Rule.required()
            },
            {
              name: 'visible',
              title: 'Visible in nav',
              type: 'boolean',
              description: 'Turn off to hide this item without deleting it.',
              initialValue: true
            }
          ],
            {
      name: 'footerOrgName',
      title: 'Organization name',
      type: 'string',
      description: 'Displayed in the footer. E.g. "Mending Our Mistakes, Inc."'
    },
    {
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'text',
      rows: 2,
      description: 'Short description under the org name in the footer.'
    },
    {
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
      description: 'Optional. Displays in the footer if provided.'
    },
    {
      name: 'footerCopyright',
      title: 'Copyright line',
      type: 'string',
      description: 'E.g. "© 2025 Mending Our Mistakes, Inc. · Malvern, Arkansas · 501(c)(3)"'
    },
    {
      name: 'footerCounties',
      title: 'Counties line',
      type: 'string',
      description: 'E.g. "Serving Garland · Hot Spring · Saline · Grant Counties"'
    },
  preview: {
            select: {
              title: 'label',
              subtitle: 'url',
              visible: 'visible'
            },
            prepare({ title, subtitle, visible }) {
              return {
                title: visible ? title : `${title} (hidden)`,
                subtitle
              };
            }
          }
        }
      ],
      initialValue: [
        { label: 'About', url: '/about.html', visible: true },
        { label: 'Services', url: '/services.html', visible: true },
        { label: 'How it works', url: '/how-it-works.html', visible: true },
        { label: 'Partners', url: '/partners.html', visible: true },
        { label: 'News', url: '/news.html', visible: false },
        { label: 'Get help', url: '/get-help.html', visible: true },
        { label: 'Donate', url: '/donate.html', visible: true }
      ]
    },
    {
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Used in the footer and contact links across the site.'
    },
    {
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
      description: 'Optional. Displays in the footer if provided.'
    },
    {
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'string',
      description: 'The short description line under the org name in the footer.'
    }
  ],
    {
      name: 'footerOrgName',
      title: 'Organization name',
      type: 'string',
      description: 'Displayed in the footer. E.g. "Mending Our Mistakes, Inc."'
    },
    {
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'text',
      rows: 2,
      description: 'Short description under the org name in the footer.'
    },
    {
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
      description: 'Optional. Displays in the footer if provided.'
    },
    {
      name: 'footerCopyright',
      title: 'Copyright line',
      type: 'string',
      description: 'E.g. "© 2025 Mending Our Mistakes, Inc. · Malvern, Arkansas · 501(c)(3)"'
    },
    {
      name: 'footerCounties',
      title: 'Counties line',
      type: 'string',
      description: 'E.g. "Serving Garland · Hot Spring · Saline · Grant Counties"'
    },
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    }
  }
};

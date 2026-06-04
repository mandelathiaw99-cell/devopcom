export default {
  name: 'post',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      rows: 3,
    },
    {
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Développement Web', value: 'dev' },
          { title: 'Communication', value: 'com' },
          { title: 'Stratégie Digitale', value: 'strategie' },
          { title: 'Conseils', value: 'conseils' },
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
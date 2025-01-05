import { defineType, defineField, defineArrayMember } from 'sanity';

export const author = defineType({
  name: 'author',
  type: 'document',
  title: 'Author',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Author Name',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Bio',
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        }),
      ],
    }),
  ],
});

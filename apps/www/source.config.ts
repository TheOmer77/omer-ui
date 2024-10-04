import { defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import z from 'zod';

export const { docs, meta } = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      links: z.optional(
        z.object({
          doc: z.optional(z.string()),
          api: z.optional(z.string()),
        })
      ),
    }),
  },
});

import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layout';

import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout tree={source.pageTree}>{children}</DocsLayout>;
}

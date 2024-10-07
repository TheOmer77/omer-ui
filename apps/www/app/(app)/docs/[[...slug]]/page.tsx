import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ScrollArea } from '@/registry/new-york/ui/scroll-area';
import { DocBreadcrumb } from '@/components/doc-breadcrumb';
import { DocHeader } from '@/components/doc-header';
import { DocLinks } from '@/components/doc-links';
import { mdxComponents } from '@/components/mdx-components';
import { DocsPager } from '@/components/pager';
import { DashboardTableOfContents } from '@/components/toc';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const page = source.getPage(params.slug);
  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      url: absoluteUrl(page.url),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [siteConfig.ogImage],
      creator: '@shadcn',
    },
  };
}

export async function generateStaticParams() {
  return source.generateParams();
}

export default async function DocPage({ params }: DocPageProps) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { title, description, links, toc, showToc, body: MDXBody } = page.data;

  return (
    <main className='relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]'>
      <div className='mx-auto w-full min-w-0'>
        <DocBreadcrumb title={title} />
        <DocHeader title={title} description={description} />
        <DocLinks links={links} />
        <div className='pb-12 pt-8'>
          <MDXBody components={mdxComponents} />
        </div>
        <DocsPager url={page.url} />
      </div>

      <div className='hidden text-sm xl:block'>
        <div className='sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4'>
          <ScrollArea className='h-full pb-10'>
            {toc && showToc && <DashboardTableOfContents toc={toc} />}
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}

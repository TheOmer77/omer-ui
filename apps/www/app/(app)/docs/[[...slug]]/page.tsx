import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ScrollArea } from '@/registry/new-york/ui/scroll-area';
import { DocBreadcrumb } from '@/components/doc-breadcrumb';
import { DocHeader } from '@/components/doc-header';
import { DocLinks } from '@/components/doc-links';
import { mdxComponents } from '@/components/mdx-components';
import { DashboardTableOfContents } from '@/components/toc';
import { source } from '@/lib/source';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { title, description, links, toc, body: MDXBody } = page.data;

  return (
    <div className='relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]'>
      <main>
        <div className='mx-auto w-full min-w-0'>
          <DocBreadcrumb title={title} />
          <DocHeader title={title} description={description} />
          <DocLinks links={links} />
        </div>
        <div className='pb-12 pt-8'>
          <MDXBody components={mdxComponents} />
        </div>
      </main>

      <div className='hidden text-sm xl:block'>
        <div className='sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4'>
          <ScrollArea className='h-full pb-10'>
            {toc && <DashboardTableOfContents toc={toc} />}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug);

  if (!page) notFound();

  return {
    title: page.data.title,
  } satisfies Metadata;
}

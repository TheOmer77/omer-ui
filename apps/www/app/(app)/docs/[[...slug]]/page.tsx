import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import Balancer from 'react-wrap-balancer';

import { badgeVariants } from '@/registry/new-york/ui/badge';
import { ScrollArea } from '@/registry/new-york/ui/scroll-area';
import { mdxComponents } from '@/components/mdx-components';
import { DashboardTableOfContents } from '@/components/toc';
import { source } from '@/lib/source';
import { cn } from '@/lib/utils';

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
          <div className='mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground'>
            <div className='truncate'>Docs</div>
            <ChevronRightIcon className='size-3.5' />
            <div className='text-foreground'>{title}</div>
          </div>
          <div className='space-y-2'>
            <h1 className={cn('scroll-m-20 text-3xl font-bold tracking-tight')}>
              {title}
            </h1>
            {description && (
              <p className='text-base text-muted-foreground'>
                <Balancer>{description}</Balancer>
              </p>
            )}
          </div>
          {links ? (
            <div className='flex items-center space-x-2 pt-4'>
              {links?.doc && (
                <Link
                  href={links.doc}
                  target='_blank'
                  rel='noreferrer'
                  className={cn(
                    badgeVariants({ variant: 'secondary' }),
                    'gap-1'
                  )}
                >
                  Docs
                  <ExternalLinkIcon className='size-3' />
                </Link>
              )}
              {links?.api && (
                <Link
                  href={links.api}
                  target='_blank'
                  rel='noreferrer'
                  className={cn(
                    badgeVariants({ variant: 'secondary' }),
                    'gap-1'
                  )}
                >
                  API Reference
                  <ExternalLinkIcon className='size-3' />
                </Link>
              )}
            </div>
          ) : null}
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

import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { findNeighbour } from 'fumadocs-core/server';

import { Button } from '@/registry/new-york/ui/button';
import { source } from '@/lib/source';

interface DocsPagerProps {
  url: string;
}

export function DocsPager({ url }: DocsPagerProps) {
  const { pageTree } = source;
  const neighbours = findNeighbour(pageTree, url);
  if (!neighbours.next && !neighbours.previous) return null;

  return (
    <div className='flex flex-row items-center justify-between'>
      {neighbours?.previous?.url && (
        <Button variant='outline' asChild>
          <Link href={neighbours.previous.url}>
            <ChevronLeftIcon className='me-2 size-4' />
            {neighbours.previous.name}
          </Link>
        </Button>
      )}
      {neighbours?.next?.url && (
        <Button variant='outline' className='ms-auto' asChild>
          <Link href={neighbours.next.url}>
            {neighbours.next.name}
            <ChevronRightIcon className='ms-2 size-4' />
          </Link>
        </Button>
      )}
    </div>
  );
}

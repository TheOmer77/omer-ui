import Link from 'next/link';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

import { badgeVariants } from '@/registry/new-york/ui/badge';
import { Doc } from '@/lib/source';
import { cn } from '@/lib/utils';

type DocLinksProps = Pick<Doc, 'links'>;

export const DocLinks = ({ links }: DocLinksProps) => {
  if (!links) return null;
  return (
    <div className='flex items-center space-x-2 pt-4'>
      {links.doc && (
        <Link
          href={links.doc}
          target='_blank'
          rel='noreferrer'
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          Docs
          <ExternalLinkIcon className='size-3' />
        </Link>
      )}
      {links.api && (
        <Link
          href={links.api}
          target='_blank'
          rel='noreferrer'
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          API Reference
          <ExternalLinkIcon className='size-3' />
        </Link>
      )}
    </div>
  );
};

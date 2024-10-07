import Balancer from 'react-wrap-balancer';

import { Doc } from '@/lib/source';
import { cn } from '@/lib/utils';

type DocHeaderProps = Pick<Doc, 'title' | 'description'>;

export const DocHeader = ({ title, description }: DocHeaderProps) => (
  <div className='space-y-2'>
    <h1 className='scroll-m-20 text-3xl font-bold tracking-tight'>{title}</h1>
    {description && (
      <p className='text-base text-muted-foreground'>
        <Balancer>{description}</Balancer>
      </p>
    )}
  </div>
);

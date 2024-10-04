import { ChevronRightIcon } from '@radix-ui/react-icons';

import { Doc } from '@/lib/source';

type DocBreadcrumbProps = Pick<Doc, 'title'>;

export const DocBreadcrumb = ({ title }: DocBreadcrumbProps) => (
  <div className='mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground'>
    <div className='truncate'>Docs</div>
    <ChevronRightIcon className='size-3.5' />
    <div className='text-foreground'>{title}</div>
  </div>
);

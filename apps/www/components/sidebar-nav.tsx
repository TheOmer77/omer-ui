'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ScrollArea } from '@/registry/new-york/ui/scroll-area';
import type { source } from '@/lib/source';
import { cn } from '@/lib/utils';

type Node = (typeof source.pageTree)['children'][number];
type DocsSidebarNavItemProps = { item: Node };
const DocsSidebarNavItem = ({ item }: DocsSidebarNavItemProps) => {
  const pathname = usePathname();

  if (item.type === 'separator')
    return (
      <li className='[&:not(:first-of-type)]:mt-4'>
        <h4 className='mb-1 rounded-md px-2 py-1 text-sm font-semibold'>
          {item.name}
        </h4>
      </li>
    );

  const href = item.type === 'folder' ? item.index?.url : item.url,
    external = item.type === 'page' && item.external;

  if (!href)
    return (
      <li className='flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline'>
        {item.name}
      </li>
    );

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
          pathname === href
            ? 'font-medium text-foreground'
            : 'text-muted-foreground'
        )}
        target={external ? '_blank' : ''}
        rel={external ? 'noreferrer' : ''}
      >
        {item.name}
      </Link>
    </li>
  );
};

type DocsSidebarNavProps = { pageTree: typeof source.pageTree };

export const DocsSidebarNav = ({ pageTree }: DocsSidebarNavProps) => {
  return (
    <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 text-sm md:sticky md:block'>
      <ScrollArea className='h-full py-6 pr-6 lg:py-8'>
        <ul>
          {pageTree.children.map((item, idx) => (
            <DocsSidebarNavItem key={idx} item={item} />
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
};

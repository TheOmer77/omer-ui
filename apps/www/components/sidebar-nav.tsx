'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from 'types/nav';

import { ScrollArea } from '@/registry/new-york/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { DocsConfig } from '@/config/docs';

type DocsSidebarNavItemsProps = {
  items: SidebarNavItem[];
  pathname: string | null;
};

export const DocsSidebarNavItems = ({
  items,
  pathname,
}: DocsSidebarNavItemsProps) =>
  items?.length ? (
    <div className='grid grid-flow-row auto-rows-max text-sm'>
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href
                ? 'font-medium text-foreground'
                : 'text-muted-foreground'
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
            {item.label && (
              <span className='ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              'flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline',
              item.disabled && 'cursor-not-allowed opacity-60'
            )}
          >
            {item.title}
            {item.label && (
              <span className='ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
          </span>
        )
      )}
    </div>
  ) : null;

type DocsSidebarNavProps = { config: DocsConfig };

export const DocsSidebarNav = ({ config }: DocsSidebarNavProps) => {
  const pathname = usePathname();

  const items = pathname?.startsWith('/charts')
    ? config.chartsNav
    : config.sidebarNav;

  return (
    <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
      <ScrollArea className='h-full py-6 pr-6 lg:py-8'>
        {items.length && (
          <div className='w-full'>
            {items.map((item, index) => (
              <div key={index} className={cn('pb-4')}>
                <h4 className='mb-1 rounded-md px-2 py-1 text-sm font-semibold'>
                  {item.title}
                </h4>
                {item?.items?.length && (
                  <DocsSidebarNavItems items={item.items} pathname={pathname} />
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
};

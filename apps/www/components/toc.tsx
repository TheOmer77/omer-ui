// @ts-nocheck
'use client';

import * as React from 'react';
import { TableOfContents } from 'fumadocs-core/server';

import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

interface TocProps {
  toc: TableOfContents;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc
        ? toc
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.length) return null;

  return (
    <div className='space-y-2'>
      <p className='font-medium'>On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  const topDepth = tree[0].depth;
  return tree?.length && level < 3 ? (
    <ul className={cn('m-0 list-none')}>
      {tree.map((item, index) => (
        <li
          key={index}
          className={cn('mt-0 pt-2', { 'pl-4': item.depth > topDepth })}
        >
          <a
            href={item.url}
            className={cn(
              'inline-block no-underline transition-colors hover:text-foreground',
              item.url === `#${activeItem}`
                ? 'font-medium text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  ) : null;
}

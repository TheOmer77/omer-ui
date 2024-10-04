import type { ReactNode } from 'react';

import { DocsSidebarNav } from '@/components/sidebar-nav';
import { docsConfig } from '@/config/docs';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className='border-b'>
    <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
      <DocsSidebarNav config={docsConfig} />
      {children}
    </div>
  </div>
);

export default Layout;

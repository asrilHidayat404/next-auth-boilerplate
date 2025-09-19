import DashboardLayout from '@/layouts/DashboardLayout';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({children}: {children: ReactNode}) => {

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default layout

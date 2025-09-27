import { UserProvider } from '@/context/UserContext';
import React, { ReactNode } from 'react'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}
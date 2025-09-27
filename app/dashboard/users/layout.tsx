import { UserProvider } from '@/context/UserContext';
import { ReactNode } from 'react';

export default function UserLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}
import NavBar from '@/components/nav-bar';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='font-sans'>
      <NavBar />

      {children}
    </main>
  );
}

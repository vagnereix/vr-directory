import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function NavBar() {
  const session = await auth();

  return (
    <div className='px-5 py-3 bg-white shadow-sm'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={30}
            height={30}
            className='rounded-full'
          />
        </Link>

        <div className='flex items-center gap-5 text-black font-medium'>
          {session?.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button type='submit'>
                  <span>Logout</span>
                </button>
              </form>

              <Link href={`/user/unique-id`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <button type='submit'>Login</button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
}

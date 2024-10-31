'use client';

import { X } from 'lucide-react';
import Link from 'next/link';

export default function SearchFormReset() {
  function handleResetForm() {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
  }

  return (
    <button type='reset' onClick={handleResetForm}>
      <Link href='/' className='search-btn text-white'>
        <X className='size-5' />
      </Link>
    </button>
  );
}

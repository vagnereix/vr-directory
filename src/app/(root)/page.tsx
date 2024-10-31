import SearchForm from '@/components/search-form';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const q = (await searchParams).query;

  return (
    <section className='pink_container'>
      <h1 className='heading'>
        Pitch your startup, <br /> connect with entrepreneurs!
      </h1>

      <p className='sub-heading !max-w-3xl'>
        Submit Ideas, vote on pitches, and get noticed in virtual competitions.
      </p>

      <SearchForm query={q} />
    </section>
  );
}

import SearchForm from '@/components/search-form';
import StartupCard, { type StartupCardType } from '@/components/startup-card';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const q = (await searchParams).query;
  const posts = await client.fetch(STARTUPS_QUERY);
  console.log('🚀 ~ posts:', posts);

  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>
          Pitch your startup, <br /> connect with entrepreneurs!
        </h1>

        <p className='sub-heading !max-w-3xl'>
          Submit Ideas, vote on pitches, and get noticed in virtual
          competitions.
        </p>

        <SearchForm query={q} />
      </section>

      <section className='section_container'>
        <p className='text-30-semibold'>
          {q ? `Search results for "${q}"` : `All startups`}
        </p>

        <ul className='mt-7 card_grid'>
          {!!posts?.length ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}

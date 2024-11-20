import { client } from "@/sanity/lib/client";
import Ping from "./ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after } from "next/server";

type ViewProps = {
  id: string;
};

export default async function View({ id }: ViewProps) {
  const { views } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, {
      id,
    });

  unstable_after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {views}</span>
      </p>
    </div>
  );
}

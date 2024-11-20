import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import {
  AUTHOR_BY_GITHUB_EMAIL_QUERY,
  AUTHOR_BY_GITHUB_ID_QUERY,
} from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name,
          username: profile?.login,
          email,
          image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },
    async jwt({ token }) {
      const user = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_EMAIL_QUERY, {
          email: token.email,
        });

      token.id = user._id;
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});

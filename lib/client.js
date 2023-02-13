import SanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = SanityClient({
  projectId: 'cqx5xc8k',
  dataset: 'production',
  apiVersion: '2023-02-13',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const irlFor = (source) => builder.image(source);
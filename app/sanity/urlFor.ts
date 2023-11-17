import { type SanityImageSource } from "@sanity/asset-utils";
import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export default function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
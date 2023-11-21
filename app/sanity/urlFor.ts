import { type SanityImageSource } from "@sanity/asset-utils";
import { client } from "~/lib/sanity.server";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export default function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
import {Resvg} from '@resvg/resvg-js'
import type {SanityDocument} from '@sanity/client'
// import urlBuilder from '@sanity/image-url'
import type {SatoriOptions} from 'satori'
import satori from 'satori'

import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/routes/resource.og'
// import {projectDetails} from '~/sanity/projectDetails'
import urlFor from '~/sanity/urlFor'

// Load the font from the "public" directory
const fontSans = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/Inter-ExtraBold.otf`)).then((res) =>
    res.arrayBuffer()
  )

export async function generatePngFromDocument(
  doc: SanityDocument,
  origin: string
) {
  const {image} = doc

  // Prepare font data and settings for Satori
  const fontSansData = await fontSans(origin)
  const options: SatoriOptions = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      {
        name: 'Inter',
        data: fontSansData,
        style: 'normal',
      },
    ],
  }

  // Create the SVG with satori
  const svg = await satori(
    <div
      style={{
        width: options.width,
        height: options.height,
        background: 'linear-gradient( 135deg, black 10%, #444 100%)',
        color: 'white',
        fontFamily: 'Inter',
        letterSpacing: '-0.05em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}
    >
      <div
        style={{
          width: image ? options.width - 500 : options.width,
          display: 'flex',
          flexDirection: 'column',
          padding: 50,
          gap: 25,
        }}
      >
      </div>
      {image ? (
        <div
          style={{
            width: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            alt=""
            src={urlFor(image)
              .height(800)
              .width(800)
              .fit('max')
              .auto('format')
              .url()}
            width="500"
            height="500"
          />
        </div>
      ) : null}
    </div>,
    options
  )

  // Convert to PNG with resvg
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  return pngData.asPng()
}

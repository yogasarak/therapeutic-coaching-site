import type { ComponentProps } from 'react'
import AudioPlayer from '@/components/AudioPlayer'
import SoundCloudEmbed from '@/components/embeds/SoundCloudEmbed'

type ModalBlockProps = { readonly children?: any }
type SoundCloudEmbedProps = ComponentProps<typeof SoundCloudEmbed>

export const mdxRscComponents = {
  ModalBlock: ({ children }: ModalBlockProps) => <div>{children}</div>,
  AudioPlayer,
  SoundCloudEmbed: (props: SoundCloudEmbedProps) => <SoundCloudEmbed {...props} />,
}

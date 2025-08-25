'use client'

import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

interface OptimizedImageProps {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  readonly priority?: boolean
  readonly className?: string
  readonly fill?: boolean
  readonly sizes?: string
  readonly placeholder?: 'blur' | 'empty'
  readonly blurDataURL?: string
}

const ImageWrapper = styled.div<{ readonly fill?: boolean }>`
  position: ${props => props.fill ? 'relative' : 'static'};
  width: ${props => props.fill ? '100%' : 'auto'};
  height: ${props => props.fill ? '100%' : 'auto'};
  
  img {
    border-radius: inherit;
    object-fit: cover;
  }
`

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  fill = false,
  sizes,
  placeholder = 'empty',
  blurDataURL,
}) => {
  return (
    <ImageWrapper fill={fill} className={className}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes || (fill ? '100vw' : undefined)}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={85}
        style={{
          objectFit: 'cover',
        }}
      />
    </ImageWrapper>
  )
}

export default OptimizedImage
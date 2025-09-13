"use client"

import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

type BaseProps = {
  readonly src: string
  readonly alt: string
  readonly priority?: boolean
  readonly className?: string
  readonly sizes?: string
  readonly placeholder?: 'blur' | 'empty'
  readonly blurDataURL?: string
}

type FillProps = BaseProps & {
  readonly fill: true
}

type FixedProps = BaseProps & {
  readonly fill?: false
  readonly width: number
  readonly height: number
}

type OptimizedImageProps = FillProps | FixedProps

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
  priority = false,
  className,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  ...rest
}) => {
  const isFill = 'fill' in rest && rest.fill === true
  return (
    <ImageWrapper fill={isFill} className={className}>
      <Image
        src={src}
        alt={alt}
        width={isFill ? undefined : (rest as FixedProps).width}
        height={isFill ? undefined : (rest as FixedProps).height}
        fill={isFill}
        priority={priority}
        sizes={sizes || (isFill ? '100vw' : undefined)}
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

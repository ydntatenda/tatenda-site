import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type AnchorProps = ComponentPropsWithoutRef<'a'>;

const components = {
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}

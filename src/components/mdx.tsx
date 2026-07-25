import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ResourceCards, ResourceCard } from './resource-cards';
import { DeprecatedNotice } from './DeprecatedNotice';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ResourceCards,
    ResourceCard,
    DeprecatedNotice,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

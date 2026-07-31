import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ResourceCards, ResourceCard } from './resource-cards';
import { DeprecatedNotice } from './DeprecatedNotice';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { ApiExample, ApiTab, ApiCodeBlock } from './ApiExample';
import { ManualSetup } from './ManualSetup';
import { ContributeHero } from './ContributeHero';
import { SocialLinks } from './SocialLinks';
import { VisualRef } from './VisualRef';
import { CustomLink } from './CustomLink';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    a: CustomLink,
    ResourceCards,
    ResourceCard,
    DeprecatedNotice,
    Tabs,
    Tab,
    Steps,
    Step,
    ApiExample,
    ApiTab,
    ApiCodeBlock,
    ManualSetup,
    ContributeHero,
    SocialLinks,
    VisualRef,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

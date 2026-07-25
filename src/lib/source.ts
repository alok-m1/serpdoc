import { createElement } from 'react';
import { icons } from 'lucide-react';
import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { brandIcons } from '@/icons/brand-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

const toolToBrand: Record<string, keyof typeof brandIcons> = {
  'claude-code': 'ClaudeCode',
  'opencode': 'OpenCode',
  'codex-cli': 'CodexCli',
  'vs-code': 'VSCode',
  'cursor': 'Cursor',
  'smithery': 'Smithery',
  'agent-skills': 'AgentSkills',
  'nodejs': 'Nodejs',
  'php': 'Php',
  'mcp-server': 'MCPServer',
};

function replaceIcon<T extends { icon?: unknown }>(node: T): T {
  if (typeof node.icon === 'string') {
    const brandKey = toolToBrand[node.icon];
    if (brandKey && brandKey in brandIcons) {
      node.icon = createElement(brandIcons[brandKey], {
        className: 'size-4',
      }) as T['icon'];
    } else if (node.icon in brandIcons) {
      node.icon = createElement(brandIcons[node.icon as keyof typeof brandIcons], {
        className: 'size-4',
      }) as T['icon'];
    } else {
      const Icon = icons[node.icon as keyof typeof icons];
      if (Icon) {
        node.icon = createElement(Icon) as T['icon'];
      } else {
        console.warn(`[serphouse-icons] Unknown icon: ${node.icon}`);
      }
    }
  }
  return node;
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [
    {
      name: 'fumadocs:icon',
      transformPageTree: {
        file: replaceIcon,
        folder: replaceIcon,
        separator: replaceIcon,
      },
    },
  ],
});

export function getPageImageUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: '/' + [page.locale, ...docsImageRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: '/' + [page.locale, ...docsContentRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

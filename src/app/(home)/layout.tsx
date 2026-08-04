import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions, sidebarOptions } from "@/lib/layout.shared";
import { CountdownBanner } from "@/components/countdown-banner";
import { AskFromAI } from "@/components/ai/AskAI";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/*<CountdownBanner />*/}
      <DocsLayout
        tree={source.getPageTree()}
        {...baseOptions()}
        sidebar={sidebarOptions()}
        containerProps={{
          style: {
            // Remove the large empty gutter to the left of the sidebar so the
            // sidebar hugs the left edge, and widen the centre/main column.
            gridTemplateColumns: `0px var(--fd-sidebar-col) minmax(0, calc(120rem - var(--fd-sidebar-width) - var(--fd-toc-width))) var(--fd-toc-width) minmax(min-content, 1fr)`,
          },
        }}
      >
        <AskFromAI />
        {children}
      </DocsLayout>
    </>
  );
}

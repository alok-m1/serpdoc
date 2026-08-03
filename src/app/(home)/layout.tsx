import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions, sidebarOptions } from "@/lib/layout.shared";
import { CountdownBanner } from "@/components/countdown-banner";
import { AskFromAI } from "@/components/ai/AskAI";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/*<CountdownBanner />*/}
      <DocsLayout tree={source.getPageTree()} {...baseOptions()} sidebar={sidebarOptions()}>
        <AskFromAI />
        {children}
      </DocsLayout>
    </>
  );
}

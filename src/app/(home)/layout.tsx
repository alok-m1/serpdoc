import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions, sidebarOptions } from "@/lib/layout.shared";
import { AppSwitcher } from "@/components/AppSwitcher";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()} sidebar={{
      ...sidebarOptions(),
      banner:<AppSwitcher/>
    }}>
      {children}
    </DocsLayout>
  );
}

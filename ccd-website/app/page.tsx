import { PageView } from "@/components/PageView";
import { pages } from "@/lib/pages.server";

export default function Home() {
  return <PageView page={pages.home} />;
}

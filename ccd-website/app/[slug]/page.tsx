import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageView } from "@/components/PageView";
import { aliases } from "@/lib/siteData";
import { pages } from "@/lib/pages.server";

type Props = {
  params: Promise<{ slug: string }>;
};

function getPage(slug: string) {
  const key = aliases[slug] ?? slug;
  return pages[key];
}

export async function generateStaticParams() {
  return Object.values(pages)
    .filter((page) => page.slug)
    .map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const alias = aliases[slug];
  if (alias) redirect(`/${alias}`);
  const page = getPage(slug);
  if (!page) notFound();
  return <PageView page={page} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { projectDetails } from "@/lib/siteData";

type Props = {
  params: Promise<{ project: string }>;
};

export async function generateStaticParams() {
  return Object.values(projectDetails).map((page) => ({ project: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params;
  const page = projectDetails[project];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { project } = await params;
  const page = projectDetails[project];
  if (!page) notFound();
  return <PageView page={page} />;
}

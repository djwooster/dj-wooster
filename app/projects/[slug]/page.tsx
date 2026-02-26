import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { projects } from "@/lib/projects"
import ProjectHero from "@/components/ProjectHero"
import ProjectContent from "@/components/ProjectContent"
import Footer from "@/components/Footer"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — DJ Wooster`,
    description: project.overview,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <main>
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <Footer />
    </main>
  )
}

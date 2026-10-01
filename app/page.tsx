import HeaderRetro from "@/components/retro/HeaderRetro";
import HeroRetro from "@/components/retro/HeroRetro";
import TechnologiesRetro from "@/components/retro/TechnologiesRetro";
import ProjectsRetro from "@/components/retro/ProjectsRetro";
import ServicesRetro from "@/components/retro/ServicesRetro";
import EducationRetro from "@/components/retro/EducationRetro";
import ExploreCtaRetro from "@/components/retro/ExploreCtaRetro";
import FooterRetro from "@/components/retro/FooterRetro";
import { getProjects, getServices, getSiteContentMap } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, services, content] = await Promise.all([
    getProjects(),
    getServices(true),
    getSiteContentMap(),
  ]);

  return (
    <div className="retro-page-container">
      <HeaderRetro content={content} />
      <main>
        <HeroRetro content={content} />
        <TechnologiesRetro content={content} />
        <ProjectsRetro projects={projects} content={content} />
        <ServicesRetro services={services} content={content} />
        <EducationRetro content={content} />
        <ExploreCtaRetro content={content} />
      </main>
      <FooterRetro content={content} />
    </div>
  );
}

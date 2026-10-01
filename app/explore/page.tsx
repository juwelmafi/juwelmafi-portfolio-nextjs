import { Metadata } from "next";
import Link from "next/link";
import HeaderRetro from "@/components/retro/HeaderRetro";
import FooterRetro from "@/components/retro/FooterRetro";
import ExploreHubClient from "@/components/retro/ExploreHubClient";
import { getBlogs, getCourses, getSiteContentMap, getPageSeo } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blog");
  return {
    title: seo?.metaTitle || "Explore More: Blogs & Masterclasses — Juwel Hossain",
    description:
      seo?.metaDescription ||
      "Technical deep dives, MERN stack tutorials, and full-stack software development courses by Juwel Hossain.",
  };
}

export default async function ExplorePage() {
  const [blogs, courses, content] = await Promise.all([
    getBlogs(true),
    getCourses(true),
    getSiteContentMap(),
  ]);

  return (
    <div className="retro-page-container">
      <HeaderRetro content={content} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="btn-retro-outline text-xs py-1.5 px-3.5 inline-flex items-center gap-2 font-typewriter"
          >
            <span>←</span>
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Header Banner */}
        <div className="border-b-2 border-[#191712] pb-8 mb-4">
          <div className="retro-section-label">
            Archive Hub • Vol. 2026
          </div>
          <h1 className="font-retro-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#191712] leading-tight">
            The Knowledge <span className="retro-marked">Repository</span>
          </h1>
          <p className="font-typewriter text-xs sm:text-sm text-[#57534E] mt-3 max-w-2xl leading-relaxed">
            A comprehensive, open archive of engineering articles, MERN stack lessons, and YouTube masterclasses created to help developers build real things.
          </p>
        </div>

        {/* Interactive Master Tabs & Content */}
        <ExploreHubClient blogs={blogs} courses={courses} />
      </main>

      <FooterRetro content={content} />
    </div>
  );
}

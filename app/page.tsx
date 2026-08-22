import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import ProjectsClient from "@/components/sections/ProjectsClient";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";
import { getProjects, getBlogs } from "@/lib/data";

// Revalidate page data every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  const [projects, allBlogs] = await Promise.all([
    getProjects(),
    getBlogs(true),
  ]);

  const blogs = allBlogs.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <ProjectsClient projects={projects} />
        <BlogPreview blogs={blogs} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

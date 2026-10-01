"use client";

interface EducationRetroProps {
  content?: Record<string, string>;
}

export default function EducationRetro({ content }: EducationRetroProps) {
  const eyebrow = content?.["education.eyebrow"] || "02 / CREDENTIALS & ACADEMIA";
  const title = content?.["education.title"] || "Academic Ledger & Formal Study";
  const desc =
    content?.["education.desc"] ||
    "Verified university degrees and foundational academic milestones powering real-world engineering problem solving.";

  const records = [
    {
      institution: content?.["education.rec1.institution"] || "Sonargaon University",
      qualification: content?.["education.rec1.qualification"] || "B.Sc in Computer Science and Engineering (CSE)",
      period: content?.["education.rec1.period"] || "2026 - Present · CURRENTLY ENROLLED",
      description:
        content?.["education.rec1.description"] ||
        "Deepening academic foundations in algorithmic complexity, distributed systems, software engineering patterns, database internal structures, and full-stack web platforms.",
      courses: (
        content?.["education.rec1.courses"] ||
        "Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, Software Engineering Architecture, Computer Networks"
      )
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    },
    {
      institution: content?.["education.rec2.institution"] || "Government Barhamgonj College, Shibchar",
      qualification: content?.["education.rec2.qualification"] || "Higher Secondary Certificate (HSC) — Science",
      period: content?.["education.rec2.period"] || "2020 - 2022 · COMPLETED",
      description:
        content?.["education.rec2.description"] ||
        "Graduated with a strong STEM background focusing on advanced mathematics, physics, and introductory computer science fundamentals.",
      courses: (
        content?.["education.rec2.courses"] ||
        "Higher Mathematics, Physics, Information & Communication Technology"
      )
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    },
  ];

  return (
    <section id="education" className="py-16 sm:py-20 border-b-2 border-[#191712] relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="retro-eyebrow">
              {eyebrow}
            </p>
            <h2 className="font-script font-bold text-4xl sm:text-5xl lg:text-6xl text-[#191712]">
              {title.includes("Ledger") ? (
                <>
                  {title.split("Ledger")[0]}
                  <span className="marked">Ledger</span>
                  {title.split("Ledger")[1]}
                </>
              ) : (
                title
              )}
            </h2>
            <p className="font-hand text-lg sm:text-xl text-[#57534E] mt-2 max-w-xl">
              {desc}
            </p>
          </div>

          <div className="stamp-gold-cert shrink-0">
            <span className="font-bold">OFFICIAL</span>
            <span>TRANSCRIPT</span>
          </div>
        </div>

        {/* Ledger Table / Docket Cards */}
        <div className="space-y-8">
          {records.map((record, idx) => (
            <div
              key={idx}
              className="hand-box p-6 sm:p-8 bg-[#FFFFFF] relative shadow-[4px_5px_0px_#191712]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-[#191712] pb-4 mb-4">
                <div>
                  <span className="font-typewriter text-xs uppercase tracking-wider text-[#C2410C] font-bold block mb-1">
                    {record.period}
                  </span>
                  <h3 className="font-script font-bold text-2xl sm:text-3xl text-[#191712] leading-tight">
                    {record.qualification}
                  </h3>
                  <p className="font-hand text-lg text-[#57534E]">
                    {record.institution}
                  </p>
                </div>

                <div className="font-typewriter text-xs bg-[#FAF7EE] border border-[#191712] px-3 py-1.5 self-start md:self-auto font-bold">
                  RECORD #00{idx + 1}
                </div>
              </div>

              <p className="font-hand text-base sm:text-lg text-[#292524] leading-relaxed mb-5">
                {record.description}
              </p>

              <div>
                <span className="font-typewriter text-xs uppercase tracking-wider text-[#78716C] block mb-2 font-bold">
                  Core Subject Areas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {record.courses.map((course, i) => (
                    <span
                      key={i}
                      className="font-typewriter text-xs bg-[#FAF7EE] border border-[#191712] px-2.5 py-1 text-[#191712] font-medium"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

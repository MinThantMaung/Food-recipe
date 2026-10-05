import { privacySections } from "@/utils/items";
import RichTextRenderer from "@/utils/RichTextRenderer";
import { AlertCircle } from "lucide-react";
import { useRef, useState } from "react";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("overview");

  const articleRef = useRef<HTMLElement>(null);

  const handleNavigation = (id: string) => {
    const article = articleRef.current;
    const target = document.getElementById(id);

    if (!article || !target) return;

    setActiveSection(id);

    // Calculate position inside the article
    const articleTop = article.getBoundingClientRect().top;

    const targetTop = target.getBoundingClientRect().top;

    const scrollPosition = article.scrollTop + targetTop - articleTop - 24;

    article.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
  const article = articleRef.current;
  if (!article) return;

  const articleTop = article.getBoundingClientRect().top;

  let currentSection = privacySections[0].id;

  for (const section of privacySections) {
    const element = document.getElementById(section.id);

    if (!element) continue;

    const sectionTop =
      element.getBoundingClientRect().top - articleTop;

    if (sectionTop <= 100) {
      currentSection = section.id;
    }
  }

  setActiveSection((prev) =>
    prev === currentSection ? prev : currentSection
  );
};

  return (
    <div className="mx-auto h-full min-h-0 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
        {/* Left Sidebar */}
        <aside className="hidden min-h-0 border-r border-gray-200 py-10 lg:block">
          <nav aria-label="Privacy policy sections">
            <p className="mb-5 font-medium text-gray-400">On this page</p>

            <ul className="flex flex-col gap-1">
              {privacySections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => handleNavigation(section.id)}
                    aria-current={
                      activeSection === section.id ? "location" : undefined
                    }
                    className={`w-full border-l-4 px-4 py-2
                      text-left text-sm transition-colors
                      ${
                        activeSection === section.id
                          ? "border-orange-500 font-semibold text-orange-600"
                          : "border-transparent text-gray-500 hover:text-orange-500"
                      }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Right Scrollable Content */}
        <article
          ref={articleRef}
          onScroll={handleScroll}
          className="min-h-0 min-w-0 overflow-y-auto
  overscroll-contain py-10 lg:pr-6
  scrollbar-none
  [&::-webkit-scrollbar]:hidden"
        >
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
              Privacy policy
            </h1>

            {/* Draft Warning */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
              <AlertCircle size={18} />
              Draft — review before publishing
            </div>

            <p className="mt-6 text-base leading-8 text-gray-500">
              This draft should be updated to reflect how Food Recipe actually
              handles personal information. It provides a general outline of
              common privacy topics and is not a final version.
            </p>
          </header>

          {/* Privacy Sections */}
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {privacySections.map((section, index) => (
              <section key={section.id} id={section.id} className="py-8">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                  {index + 1}. {section.title}
                </h2>

                <RichTextRenderer
                  content={section.content}
                  className="sm:pl-8"
                />
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

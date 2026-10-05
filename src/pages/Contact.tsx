import { ContactCard } from "@/utils/ContantCard";
import { ContantSections } from "@/utils/items";

function Contact() {
  return (
    <section className="mx-auto max-w-6xl items-center gap-8 py-4 md:gap-8 lg:py-8">
      <div className="flex flex-col items-start gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
          Contant
        </span>
        <h4 className="font-bold text-4xl">Let's talk food.</h4>
        <span className="text-sm tracking-wide text-gray-400">
          Have a question,found a recipe issue, or want to share an idea?We
          would like to hear from you.
        </span>
      </div>
      <div className="flex gird grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          {ContantSections.map((contant) => (
            <ContactCard
              icon={contant.icons}
              title={contant.title}
              description={contant.description}
            />
          ))}
        </div>
        <div>hello</div>
      </div>
    </section>
  );
}

export default Contact;

import { ContactCard } from "@/utils/ContantCard";
import { ContantSections } from "@/utils/items";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Link } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "@/components/form/EmailField";
import { cn } from "@/lib/utils";
import { LockKeyhole } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Name is required" })
    .min(2, { error: "Name must be at least 2 characters" })
    .max(100, { error: "Name must not exceed 100 characters" }),
  email: z
    .string()
    .min(1, {
      error: "Email is required",
    })
    .pipe(
      z.email({
        error: "Please enter a valid email address",
      }),
    ),
  message: z
    .string()
    .trim()
    .min(1, { error: "Message is required" })
    .min(10, { error: "Message must be at least 10 characters" })
    .max(2000, { error: "Message must not exceed 2000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function Contact() {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<ContactFormValues>({
  resolver: zodResolver(contactSchema),
  defaultValues: {
    name: "",
    email: "",
    message: "",
  },
});
  const onSubmit = (data: ContactFormValues) => {
    console.log("data : ", data);
    //submit(data, { method: "post" });
  };
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="flex max-w-xl flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
          Contact
        </span>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Let's talk food.
        </h1>

        <p className="text-sm leading-7 text-muted-foreground md:text-base">
          Have a question, found a recipe issue, or want to share an idea? We'd
          love to hear from you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 my-4 md:my-10">
        <div>
          <div className="flex flex-col gap-5 border-b pb-6 md:pb-8">
            {ContantSections.map((contant) => (
              <div key={contant.title}>
                <ContactCard
                  icon={contant.icons}
                  title={contant.title}
                  description={contant.description}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-2 px-1 text-xs leading-5 text-muted-foreground">
            <LockKeyhole className="mt-0.5 size-4 shrink-0" />

            <p>Please don't include passwords or sensitive information.</p>
          </div>
        </div>
        <div className="min-w-0 px-2 md:px-8">
          <Card className="w-full shadow-sm">
            <CardContent>
              <div className="mb-6 space-y-2">
                <h2 className="text-xl font-semibold">Send a message</h2>

                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                      className={cn(
                        errors.name &&
                          "border-red-500 focus-visible:ring-red-500",
                      )}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <EmailField
                      id="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here."
                      {...register("message")}
                      aria-invalid={!!errors.message}
                      className={cn(
                        "min-h-32 resize-y",
                        errors.message &&
                          "border-red-500 focus-visible:ring-red-500",
                      )}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600">
                        {errors.message?.message}
                      </p>
                    )}
                  </div>
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Send Message"
                    loadingLabel="Sending"
                  />
                  <div>
                    <p className="text-xs leading-6 text-muted-foreground">
                      By sending this message, you agree to our{" "}
                      <Link
                        to="/privacy"
                        className="font-medium text-orange-600 underline-offset-4 underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      regarding how we handle your information.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact;

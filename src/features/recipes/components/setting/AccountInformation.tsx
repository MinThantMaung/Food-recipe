import { Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

type AccountInformationProps = {
  userDetail: {
    email: string | null;
    phone: string | null;
    verifiedAt: string | null;
    createdAt: string;
    lastLogin: string | null;
  };
  onPhoneChange?: () => void;
};

export function AccountInformation({
  userDetail,
  onPhoneChange,
}: AccountInformationProps) {
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 md:p-8">
      <h2 className="text-xl font-bold tracking-tight">
        Account information
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Manage your account details.
      </p>

      <dl className="mt-5">
        {/* Email */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <dt className="flex shrink-0 items-center gap-3 text-sm font-medium text-gray-700 sm:w-56 sm:self-start sm:pt-1">
            <Mail
              className="size-5 shrink-0 text-gray-500"
              aria-hidden="true"
            />
            Email address
          </dt>

          <dd className="min-w-0 flex-1 pl-8 sm:pl-0">
            <div className="space-y-2 border-b border-gray-100 pb-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="break-all text-sm text-gray-600">
                  {userDetail.email || "Email not set"}
                </span>

                {userDetail.verifiedAt && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Verified
                  </span>
                )}
              </div>

              <p className="text-xs leading-relaxed text-gray-500">
                Your email is used for account login and important updates.
              </p>
            </div>
          </dd>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-6">
          <dt className="flex shrink-0 items-center gap-3 text-sm font-medium text-gray-700 sm:w-56 sm:self-start sm:pt-2">
            <Smartphone
              className="size-5 shrink-0 text-gray-500"
              aria-hidden="true"
            />
            Phone number
          </dt>

          <dd className="min-w-0 flex-1 pl-8 sm:pl-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 space-y-2 md:pt-2">
                <p className="wrap-break-word text-sm text-gray-600">
                  {userDetail.phone || "Phone number not set"}
                </p>

                <p className="text-xs leading-relaxed text-gray-500">
                  Used for account recovery and security purposes.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={onPhoneChange}
                className="h-10 w-fit shrink-0 rounded-lg border-gray-200 px-4 text-sm font-semibold text-gray-600"
              >
                Add / Change
              </Button>
            </div>
          </dd>
        </div>
      </dl>
    </section>
  );
}
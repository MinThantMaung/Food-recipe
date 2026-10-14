import { CalendarDays, Clock3, Mail } from "lucide-react";

type AccountInformationProps = {
  userDetail: {
    email: string;
    verifiedAt: string | null;
    createdAt: string;
    lastLogin: string | null;
  };
};

export function AccountInformation({ userDetail }: AccountInformationProps) {
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 md:p-8">
      <h2 className="text-xl font-bold tracking-tight">Account Information</h2>

      <p className="mt-1 text-sm text-gray-500">
        Some information cannot be changed here.
      </p>

      <dl className="mt-5 divide-y divide-gray-100">
        <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-6">
          <dt className="flex shrink-0 items-center gap-3 text-sm font-medium text-gray-700 sm:w-2/5">
            <Mail className="size-5 text-gray-500" aria-hidden="true" />
            Email address
          </dt>

          <dd className="flex min-w-0 flex-1 flex-wrap items-center gap-3 pl-8 text-sm text-gray-500 sm:pl-0">
            <span className="break-all">{userDetail.email}</span>

            {userDetail.verifiedAt && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Verified
              </span>
            )}
          </dd>
        </div>

        <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-6">
          <dt className="flex shrink-0 items-center gap-3 text-sm font-medium text-gray-700 sm:w-2/5">
            <CalendarDays className="size-5 text-gray-500" aria-hidden="true" />
            Member since
          </dt>

          <dd className="pl-8 text-sm text-gray-500 sm:pl-0">
            {formatAccountDate(userDetail.createdAt)}
          </dd>
        </div>

        <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:gap-6">
          <dt className="flex shrink-0 items-center gap-3 text-sm font-medium text-gray-700 sm:w-2/5">
            <Clock3 className="size-5 text-gray-500" aria-hidden="true" />
            Last login
          </dt>

          <dd className="pl-8 text-sm text-gray-500 sm:pl-0">
            {formatAccountDate(userDetail.lastLogin, true)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

const formatAccountDate = (
  value: string | null | undefined,
  includeTime = false,
) => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {}),
  });
};

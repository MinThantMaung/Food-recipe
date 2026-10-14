import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { getCountries, type Country } from "@/api/recipes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PersonalInformationProps = {
  userDetail: {
    firstName?: string | null;
    lastName?: string | null;
  };
  continentsData: { id: number; name: string }[];
};

const ProfileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});
type ProfileValues = z.infer<typeof ProfileSchema>;

export function PersonalInformation({
  userDetail,
  continentsData,
}: PersonalInformationProps) {
  const [continent, setContinent] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [countriesError, setCountriesError] = useState("");

  const continents = continentsData.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (!userDetail) return;
    reset({
      firstName: userDetail.firstName ?? "",
      lastName: userDetail.lastName ?? "",
    });
  }, [userDetail, reset]);

  useEffect(() => {
    if (!continent) return;
    let ignore = false;
    const loadCountries = async () => {
      setCountriesLoading(true);
      setCountriesError("");
      try {
        const data = await getCountries(Number(continent));
        if (!ignore) {
          setCountries(data);
        }
      } catch {
        if (!ignore) {
          setCountriesError("Unable to load countries. Please try again.");
        }
      } finally {
        if (!ignore) {
          setCountriesLoading(false);
        }
      }
    };
    void loadCountries();
    return () => {
      ignore = true;
    };
  }, [continent]);

  const countryItems = countries.map((country) => ({
    label: country.name,
    value: country.code,
  }));

  const handleSave = (data: ProfileValues) => {
    console.log("Validated profile:", data);
  };

  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 md:p-8">
      <h2 className="text-xl font-bold tracking-tight">Personal Information</h2>
      <p className="mt-1 text-sm text-gray-500">
        Update your first and last name.
      </p>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="mt-6 space-y-6"
        noValidate
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <Input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Enter your first name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
              {...register("firstName")}
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                role="alert"
                className="text-sm text-red-500"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <Input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Enter your last name"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                role="alert"
                className="text-sm text-red-500"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="continent"
              className="text-sm font-medium text-gray-700"
            >
              Continent
            </label>
            <Select
              items={continents}
              value={continent}
              onValueChange={(value) => {
                const nextContinent = value ?? "";
                if (nextContinent === continent) return;
                setContinent(nextContinent);
                setCountryCode(""); // Clear the previous country selection.
                setCountries([]); // Clear the previous country's options.
                setCountriesError("");
                setCountriesLoading(Boolean(nextContinent));
              }}
            >
              <SelectTrigger id="continent" className="w-full">
                <SelectValue placeholder="Select a continent" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <Select
              items={countryItems}
              value={countryCode}
              onValueChange={(value) => setCountryCode(value ?? "")}
              disabled={
                !continent || countriesLoading || countryItems.length === 0
              }
            >
              <SelectTrigger id="country" className="w-full">
                <SelectValue
                  placeholder={
                    !continent
                      ? "Select a continent first"
                      : countriesLoading
                        ? "Loading countries…"
                        : countriesError
                          ? "Unable to load countries"
                          : countryItems.length === 0
                            ? "No countries available"
                            : "Select a country"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {countryItems.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {countriesError && (
              <p role="alert" className="text-sm text-red-500">
                {countriesError}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            Save changes
          </Button>
        </div>
      </form>
    </section>
  );
}

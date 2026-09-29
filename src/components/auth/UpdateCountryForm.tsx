import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "../Icon";
import { Link, useNavigation, useSubmit } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { authApi } from "@/api";
import { SubmitButton } from "../form/SubmitButton";

type Continent = {
  id: number;
  name: string;
};

type Country = {
  id: number;
  name: string;
  continentId: number;
};

const countrySchema = z.object({
  continentId: z.string().min(1, "Please select a continent"),
  countryId: z.string().min(1, "Please select a country"),
});

type CountryFormValues = z.infer<typeof countrySchema>;

export function UpdateCountryForm() {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingContinents, setLoadingContinents] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadError, setLoadError] = useState("");
  const submit = useSubmit();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CountryFormValues>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      continentId: "",
      countryId: "",
    },
  });

  const continentId = useWatch({ control, name: "continentId" });

  useEffect(() => {
    const controller = new AbortController();

    const loadContinents = async () => {
      try {
        const response = await authApi.get<{ data: Continent[] }>(
          "user/continents",
          { signal: controller.signal },
        );
        setContinents(response.data.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError("Could not load continents. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingContinents(false);
        }
      }
    };

    void loadContinents();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setCountries([]);

    if (!continentId) return;

    const controller = new AbortController();

    const loadCountries = async () => {
      setLoadingCountries(true);
      setLoadError("");

      try {
        const response = await authApi.get<{ data: Country[] }>(
          `user/continents/${continentId}/countries`,
          { signal: controller.signal },
        );
        setCountries(response.data.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError("Could not load countries. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCountries(false);
        }
      }
    };

    void loadCountries();
    return () => controller.abort();
  }, [continentId]);

  const isSubmitting = navigation.state === "submitting";
  const onSubmit = (values: CountryFormValues) => {
    submit(values, { method: "post" });
  };
  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl shadow-orange-950/5">
      <CardHeader className="gap-5">
        <Link
          to="/register/confirm-password"
          className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-orange-600"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Password
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center">
              <Icons.logo aria-hidden="true" />
            </div>
            <span className="text-lg font-bold text-orange-500">
              Food Recipe
            </span>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl">Create your country</CardTitle>
            <CardDescription>Choose</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="continent">Continent</Label>

            <Controller
              name="continentId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue("countryId", "");
                    setCountries([]);
                  }}
                  disabled={loadingContinents}
                >
                  <SelectTrigger
                    id="continent"
                    className="w-full"
                    aria-invalid={!!errors.continentId}
                  >
                    <SelectValue
                      placeholder={
                        loadingContinents
                          ? "Loading continents..."
                          : "Select a continent"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {continents.map((continent) => (
                      <SelectItem
                        key={continent.id}
                        value={String(continent.id)}
                      >
                        {continent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.continentId && (
              <p className="text-xs text-red-600">
                {errors.continentId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>

            <Controller
              name="countryId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!continentId || loadingCountries}
                >
                  <SelectTrigger
                    id="country"
                    className="w-full"
                    aria-invalid={!!errors.countryId}
                  >
                    <SelectValue
                      placeholder={
                        loadingCountries
                          ? "Loading countries..."
                          : "Select a country"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={String(country.id)}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.countryId && (
              <p className="text-xs text-red-600">{errors.countryId.message}</p>
            )}
          </div>

          {loadError && (
            <p role="alert" className="text-sm text-red-600">
              {loadError}
            </p>
          )}
          <SubmitButton
            isSubmitting={isSubmitting}
            label="Save country"
            loadingLabel="Saving country"
          />
        </form>
      </CardContent>
    </Card>
  );
}

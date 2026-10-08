import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

type ServingButtonProps = {
  serving: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onServingChange: (value: number) => void;
};

export function ButtonGroupSplit({
  serving,
  onIncrease,
  onDecrease,
  onServingChange,
}: ServingButtonProps) {
  const [inputValue, setInputValue] = useState(String(serving));
  useEffect(() => {
    setInputValue(String(serving));
  }, [serving]);
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Decrease servings"
        onClick={onDecrease}
        disabled={serving <= 1}
        className="size-12 rounded-md border-gray-200 bg-gray-50 text-orange-500 shadow-none hover:bg-gray-100"
      >
        <MinusIcon className="size-5" />
      </Button>

      <Input
        type="text"
        inputMode="numeric"
        aria-label="Servings"
        value={inputValue}
        onChange={(e) => {
          const text = e.target.value;

          // Allow empty text or up to three digits while editing.
          if (!/^\d{0,3}$/.test(text)) return;
          setInputValue(text);
          const value = Number(text);
          if (value >= 1 && value <= 999) {
            onServingChange(value);
          }
        }}
        onBlur={() => {
          // Restore the valid parent value if left empty or entered as 0.
          setInputValue(String(serving));
        }}
        onFocus={(e) => e.target.select()}
        className="h-12 w-24 rounded-md border-gray-200 bg-white text-center text-lg font-semibold shadow-none sm:w-28"
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Increase servings"
        onClick={onIncrease}
        disabled={serving >= 999}
        className="size-12 rounded-md border-orange-200 bg-orange-50 text-orange-500 shadow-none hover:bg-orange-100"
      >
        <PlusIcon className="size-5" />
      </Button>
    </div>
  );
}

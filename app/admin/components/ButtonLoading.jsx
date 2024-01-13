import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button disabled size="icon">
      <ReloadIcon className="mx-auto h-4 w-4 animate-spin" />
    </Button>
  );
}
// NOT COMPLETED

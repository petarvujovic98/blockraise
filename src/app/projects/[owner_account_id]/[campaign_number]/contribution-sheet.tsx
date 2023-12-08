"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useSignTx } from "~/stores/global";

export function ContributeSheet({
  name,
  missing,
  owner_account_id,
  campaign_number,
}: {
  name: string;
  missing: number;
  campaign_number: number;
  owner_account_id: string;
}) {
  const [value, setValue] = useState(missing);
  const signTx = useSignTx();

  return (
    <Sheet>
      <SheetTrigger>
        <Button type="button" variant="secondary">
          Contribute
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Contribute to {name}</SheetTitle>
          <SheetDescription>
            This will contribute to the campaign
          </SheetDescription>
        </SheetHeader>
        <div>
          <Label htmlFor="amount">Amount to contribute</Label>
          <Input
            id="amount"
            type="number"
            min={1}
            value={value}
            onChange={({ target: { value } }) => setValue(Number(value))}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              onClick={() => {
                signTx(
                  "contribute",
                  {
                    owner_account_id,
                    campaign_number,
                    amount: value,
                  },
                  1n,
                ).catch(console.error);
              }}
            >
              Contribute
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

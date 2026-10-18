import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AccountActionsProps = {
  onDeleteAccount: () => void;
  isDeleting?: boolean;
};

export function AccountActions({
  onDeleteAccount,
  isDeleting = false,
}: AccountActionsProps) {
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 md:p-8">
      <h2 className="text-xl font-bold tracking-tight">Account actions</h2>

      <p className="mt-1 text-sm text-gray-500">Manage your account data.</p>

      <div className="mt-5 flex flex-col gap-5 rounded-lg bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
        <div className="flex items-start gap-4 sm:items-center">
          <Trash2
            className="mt-0.5 size-6 shrink-0 text-red-500 sm:mt-0"
            aria-hidden="true"
          />

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-red-600">
              Delete account
            </h3>

            <p className="text-sm leading-relaxed text-red-500">
              Permanently delete your account and all associated data.
              <br />
              This action cannot be undone.
            </p>
          </div>
        </div>

        <Dialog>
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="destructive"
                  className="shrink-0 bg-white text-red-600 px-5 font-semibold hover:bg-red-600 hover:text-white sm:w-auto"
                >
                  Delete account
                </Button>
              }
            />
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Delete your account?</DialogTitle>
                <DialogDescription>
                  This will permanently delete your account. This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                  }
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting…" : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

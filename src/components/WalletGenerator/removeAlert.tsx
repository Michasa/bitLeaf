import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Wallet } from "@/lib/types";

const RemoveAlert = ({
  openAlert,
  setOpenAlert,
  promiseResolve,
  selectedWallet,
}: {
  openAlert: boolean;
  setOpenAlert: (arg: boolean) => void;
  promiseResolve: ((value: boolean) => void) | null;
  selectedWallet: Wallet;
}) => {
  return (
    <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove wallet{" "}
            <b className="text-brand-olive-400">
              {selectedWallet.address.slice(0, 15)}
            </b>
            ...?{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p>
              This will permanently remove the application's record of this
              wallet but{" "}
              <b>
                it will{" "}
                <span className="uppercase text-red-500 underline">
                  not delete
                </span>{" "}
                the wallet itself or any funds
              </b>{" "}
              it has or will recieve in the future.
            </p>
            <br />
            <p>
              Make sure you save its address and xpriv if you still want access
              to this wallet
            </p>
            <br />
            <p>Delete this wallet?</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => promiseResolve && promiseResolve(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => promiseResolve && promiseResolve(true)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveAlert;

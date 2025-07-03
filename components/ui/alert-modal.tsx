import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./loading-spinner";
import { Dispatch, SetStateAction } from "react";

interface AlertModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  loading: boolean;
  onSubmit: () => void;
  submitBtnText?: string;
  submitBtnVariant?: "default" | "ghost" | "destructive" | "link" | "outline";
}

export function AlertModal({
  open,
  setOpen,
  title,
  description,
  loading,
  onSubmit,
  submitBtnVariant = "default",
  submitBtnText = "Continue",
}: AlertModal) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            variant={submitBtnVariant}
            onClick={onSubmit}
            disabled={loading}
          >
            {submitBtnText}
            {loading && <LoadingSpinner size="sm" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { DeleteCredential } from "@/actions/credentials/deleteCredential";
import { DeleteWorkflow } from "@/actions/workflows/deleteWrokflow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  name: string;
}

function DeleteCredentialDialog({ name }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const deleteMutation = useMutation({
    mutationFn: DeleteCredential,
    onSuccess: () => {
      toast.success("자격증명이 삭제되었습니다.", { id: name });
      setConfirmText("");
    },
    onError: () => {
      toast.error("처리 중 에러가 발생하였습니다.", { id: name });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size="icon">
          <XIcon size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>자격증명을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 자격증명은 복구할 수 없습니다.
            <div className="flex flex-col py-4 gap-2">
              <p>
                삭제를 원하시면 <b>{name}</b>을(를) 입력하세요:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          {/* 자격증명 이름이 입력되어야 활성화됨 */}
          <AlertDialogAction
            disabled={confirmText !== name || deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground
            hover:bg-destructive/90"
            onClick={() => {
              toast.loading("자격증명 삭제 중...", { id: name });
              deleteMutation.mutate(name);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCredentialDialog;

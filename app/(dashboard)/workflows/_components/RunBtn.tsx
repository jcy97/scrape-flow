"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function RunBtn({ workflowId }: { workflowId: string }) {
  const mutaion = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Workflow started", { id: workflowId });
    },
    onError: () => {
      toast.error("Somthing went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center gap-2"
      disabled={mutaion.isPending}
      onClick={() => {
        toast.loading("Scheduling run...", { id: workflowId });
        mutaion.mutate({
          workflowId,
        });
      }}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
}

export default RunBtn;

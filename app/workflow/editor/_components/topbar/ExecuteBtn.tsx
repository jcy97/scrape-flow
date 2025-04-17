"user client";

import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";

function ExcuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        console.log("---plan---");
        console.log(plan);
      }}
    >
      <PlayIcon size={16} className={"stroke-orange-400"}></PlayIcon>
    </Button>
  );
}

export default ExcuteBtn;

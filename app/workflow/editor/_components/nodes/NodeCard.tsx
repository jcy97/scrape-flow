"use Client";
import useFlowValidation from "@/components/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React, { ReactNode } from "react";

function NodeCard({
  children,
  nodeId,
  isSelected,
}: {
  nodeId: string;
  isSelected: boolean;
  children: ReactNode;
}) {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        //노드의 중심점을 계산한다 보통 top-left 기준점이기 때문에 너비의 /2, 높이에 /2로 중심점을 구한다
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        "rounded-md curosr-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
}

export default NodeCard;

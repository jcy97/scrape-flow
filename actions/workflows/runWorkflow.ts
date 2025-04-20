"use server";

import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExcutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unathenticated");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("workflowId is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  let executionPlan: WorkflowExcutionPlan;
  if (!flowDefinition) {
    throw new Error("flow error");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("flow definition novalid");
  }

  if (!result.executionPlan) {
    throw new Error("no executio plan generated");
  }
  executionPlan = result.executionPlan;
  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      definition: flowDefinition,
      phases: {
        // // 일반 map을 사용한 경우
        // const 배열 = [1, 2, 3];
        // const 결과1 = 배열.map(x => [x * 2]);
        // console.log(결과1); // [[2], [4], [6]] - 배열 안에 배열이 생성됨

        // // flatMap을 사용한 경우
        // const 결과2 = 배열.flatMap(x => [x * 2]);
        // console.log(결과2); // [2, 4, 6] - 결과가 1차원 배열로 평탄화됨
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("exeuction is not created!!!");
  }

  ExecuteWorkflow(execution.id); // run this on background

  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}

import { ExecutionPhase } from "@prisma/client";

//Pick: 기존 타입에서 필요한 타입만 선택
//ExecutionPhase에서 creditsCost만 빼서 별도 타입으로 생성
type Phase = Pick<ExecutionPhase, "creditsCost">;
export function GetPhasesTotalCost(phases: Phase[]) {}

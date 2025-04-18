import { FlowValidationContext } from "@/app/workflow/editor/_components/context/FlowValidationContent";
import { useContext } from "react";

export default function useFlowValidation() {
  const context = useContext(FlowValidationContext);
  if (!context) {
    throw new Error("컨텍스트 호출 에러");
  }
  return context;
}

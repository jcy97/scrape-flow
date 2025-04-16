import { TaskParamType, TaskType } from "@/types/task";
import { GlobeIcon, LucideIcon } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideIcon) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),

  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: false,
    },
  ],
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
    },
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};

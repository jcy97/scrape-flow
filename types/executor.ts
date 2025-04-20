import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "./workflow";

export type Environment = {
  browser?: Browser;
  page?: Page;
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

//T extends WorkflowTask를 통해 input name이 WorkflowTask에 속한 이름으로만 처리되도록 설정
export type ExecutionEnvironment<T extends WorkflowTask> = {
  //inputs이 배열이니까 inputs안에 N번째 name을 가져오도록 처리
  getInput(name: T["inputs"][number]["name"]): string;
  setOutput(name: T["outputs"][number]["name"], value: string): void;

  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;

  getPage(): Page | undefined;
  setPage(page: Page): void;
};

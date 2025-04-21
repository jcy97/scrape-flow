import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("selector not defined");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("HTML not found");
      return false;
    }
    //취리오는 HTML 파서입니다.
    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error("Element not found");
      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Eelement has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

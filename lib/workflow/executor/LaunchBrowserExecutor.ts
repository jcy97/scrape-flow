import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrawser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteurl = environment.getInput("Website Url");
    const browser = await puppeteer.launch({
      headless: true, //for testing
    });
    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteurl);
    environment.setPage(page);
    environment.log.info(`Opened page at:${websiteurl}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

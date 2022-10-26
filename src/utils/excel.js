import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export const download = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://dhlottery.co.kr/gameResult.do?method=byWin", {
      waitUntil: "networkidle2",
    });

    const optionSelect = "#drwNoStart";
    await page.click(optionSelect, { delay: 10 });
    await page.keyboard.press("End");
    await page.keyboard.press("Enter");

    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: path.resolve("/", "lotto"),
    });

    const downBtn = "#exelBtn";
    await page.click(downBtn, { delay: 10 });

    let timeout = 1000;
    try {
      const interval = setInterval(() => {
        fs.readdir("C://lotto", async (err, files) => {
          console.log(files.includes("excel.xls"));
          if (files.includes("excel.xls")) {
            clearInterval(interval);
          } else {
            timeout = 1000;
          }
        });
      }, 500);
      await page.waitForTimeout(timeout);
      await browser.close();
    } catch (err) {
      console.log(err);
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const remove = () => {
  try {
    fs.unlinkSync("C://lotto/excel.xls");
    return true;
  } catch (err) {
    return false;
  }
};

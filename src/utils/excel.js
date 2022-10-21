const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

exports.download = async () => {
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
      downloadPath: path.resolve("/", "Users", "Public", "Documents"),
    });

    const downBtn = "#exelBtn";
    await page.click(downBtn, { delay: 10 });

    let timeout = 1000;

    const interval = setInterval(() => {
      fs.readdir(
        path.resolve("/", "Users", "Public", "Documents"),
        (err, files) => {
          if (files.includes("excel.xls") !== -1) {
            clearInterval(interval);
          } else {
            timeout = 1000;
          }
        }
      );
    }, 500);

    await page.waitForTimeout(timeout);

    await browser.close();

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

exports.remove = () => {
  try {
    fs.unlinkSync(
      path.resolve("/", "Users", "Public", "Documents", "excel.xls")
    );
    return true;
  } catch (err) {
    return false;
  }
};

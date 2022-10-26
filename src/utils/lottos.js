import * as XLSX from "xlsx";
import fs from "fs";
import store from "@/store";

export const getThisWeekLotto = async () => {
  const data = fs.readFileSync("C:/lotto/excel.xls");
  const workbook = XLSX.read(data);
  const sheet = workbook.SheetNames;
  const list = workbook.Sheets[sheet[1]];
  const last = list["!ref"].slice(list["!ref"].indexOf("T") + 1);

  const beforeLottos = [];
  for (let i = 3; i <= last; i++) {
    const numArr = [
      list[`N${i}`].v,
      list[`O${i}`].v,
      list[`P${i}`].v,
      list[`Q${i}`].v,
      list[`R${i}`].v,
      list[`S${i}`].v,
    ];
    beforeLottos.push(numArr);
  }

  const thisWeekLotto = [
    list.N3.v,
    list.O3.v,
    list.P3.v,
    list.Q3.v,
    list.R3.v,
    list.S3.v,
  ];

  store.commit("setLottos", beforeLottos);
  store.commit("setLastLottos", thisWeekLotto);
  return thisWeekLotto;
};
export const makeLotto = async (playCount, include, exclude) => {
  // const data = fs.readFileSync("C:/lotto/excel.xls");
  // const workbook = XLSX.read(data);
  // const sheet = workbook.SheetNames;
  // const list = workbook.Sheets[sheet[1]];
  // const last = list["!ref"].slice(list["!ref"].indexOf("T") + 1);
  //엑셀에서 당첨번호 컬럼별 데이터 분리
  const lastLotto = store.getters.getLastLottos;

  const beforeLottos = store.getters.getLottos;

  if (include && include.length > 5) throw new Error("Over 5 number");

  const result = [];
  for (let i = 0; i < playCount; i++) {
    let flag = true;
    let game = [];
    let anyNum = Math.floor(Math.random() * 6);
    while (game.length < 1) {
      if (exclude && exclude.indexOf(lastLotto[anyNum]) === -1) {
        game.push(lastLotto[anyNum]);
      } else {
        anyNum = Math.floor(Math.random() * 6);
      }
    }
    if (include && include.length > 0) {
      game = [game[0], ...include];
    }
    while (game.length < 6) {
      const num = Math.floor(Math.random() * 44) + 1;
      if (
        game.indexOf(num) === -1 &&
        (!exclude || exclude.indexOf(num) === -1) &&
        lastLotto.indexOf(num) === -1
      ) {
        game.push(num);
      }
    }
    game.sort((a, b) => b - a);
    let min = 0;
    let max = 0;
    for (let i = 0; i < game.length - 1; i++) {
      min += game[i] - game[i + 1];
    }
    for (let g of game) {
      max += g;
    }
    if (max < 106 || max > 170 || min < 11) {
      i--;
      continue;
    }
    game.sort((a, b) => a - b);
    for (let b of beforeLottos) {
      if (b.toString() === game.toString()) {
        flag = false;
        break;
      }
    }
    if (flag) {
      result.push(game);
    }
  }
  return result;
};

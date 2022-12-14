import * as XLSX from "xlsx";
import fs from "fs";
import store from "@/store";

const paserProxy = (proxy) => {
  return JSON.parse(JSON.stringify(proxy));
};

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
export const makeLotto = async (playCount, include, exclude, deviation) => {
  // const data = fs.readFileSync("C:/lotto/excel.xls");
  // const workbook = XLSX.read(data);
  // const sheet = workbook.SheetNames;
  // const list = workbook.Sheets[sheet[1]];
  // const last = list["!ref"].slice(list["!ref"].indexOf("T") + 1);
  //엑셀에서 당첨번호 컬럼별 데이터 분리
  const lastLotto = paserProxy(store.getters.getLastLottos);

  const beforeLottos = paserProxy(store.getters.getLottos);

  if (include && include.length > 6) throw new Error("Over 6 number");
  const result = [];
  if (include.length === 6) {
    result.push(include);
    return result;
  }
  // if (include && include.length > 1) {
  //   let check = 0;
  //   include.sort((a, b) => b - a);
  //   for (let i = 0; i < include.length - 1; i++) {
  //     check += include[i] - include[i + 1];
  //   }
  //   console.log(check, deviation);
  //   if (check <= deviation) {
  //     throw new Error("Check the deviations or number of inclusions");
  //   }
  // }
  for (let i = 0; i < playCount; i++) {
    let flag = true;
    let game = [];
    let anyNum = Math.floor(Math.random() * 6);
    if (include && include.length > 0) {
      game = [...include];
    }
    const gameLength = game.length;

    //전 회차 번호 1개 무조건 포함
    while (game.length < gameLength + 1) {
      if (exclude && !exclude.includes(lastLotto[anyNum])) {
        //포함 수에 전 회차 번호가 있으면 추가하지 않음
        if (game.includes(lastLotto[anyNum])) break;
        else game.push(lastLotto[anyNum]);
      } else {
        anyNum = Math.floor(Math.random() * 6);
      }
    }

    //random 번호
    while (game.length < 6) {
      const num = Math.floor(Math.random() * 44) + 1;
      if (
        !game.includes(num) &&
        (!exclude || !exclude.includes(num)) &&
        !lastLotto.includes(num)
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
    //범위 조정
    if (max < 106 || max > 170 || min <= deviation) {
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

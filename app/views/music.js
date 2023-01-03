import fs from "fs";
import { askQuestion } from "../lib/util.js";
import { primaryColor, dangerColor } from "../../color.js";
import { table } from "table";
import chalk from "chalk";

const readData = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, datas) => {
      const result = JSON.parse(datas);
      resolve(result);
    });
  });
};

const findData = async (title, artist) => {
  const datas = await readData("datas/data.json");
  return datas.filter((data) => data.title === title && data.artist === artist);
};

const dataTable = (datas) => {
  const tbl = [[chalk.bold("Title"), chalk.bold("Artist"), chalk.bold("Genre")]];
  datas.forEach((data) => tbl.push(Object.values(data)));
  console.log(table(tbl));
};

// To show all data from file
const showAll = async () => {
  const datas = await readData("datas/data.json");
  dataTable(datas);
};

// To add data from file
const add = async () => {
  console.log("\n==================================\n");
  console.log("Add music");
  const title = await askQuestion("\nTitle music = ");
  const artist = await askQuestion("Artist = ");
  const genre = await askQuestion("Genre = ");

  const userInput = { title, artist, genre };
  const datas = await readData("datas/data.json");
  datas.push(userInput);
  fs.writeFileSync("datas/data.json", JSON.stringify(datas, null, 2));
  console.log("Song has been added");
};

const edit = async () => {
  console.log("\n==================================\n");
  console.log("Edit Music\n");
  const title = await askQuestion("Title music = ");
  const artist = await askQuestion("Title music = ");

  const data = await findData(title, artist);
  dataTable(data);
  console.log("\n==================================\n");
  const newTitle = await askQuestion("Title music = ");
  const newArtist = await askQuestion("Artist = ");
  const newGenre = await askQuestion("Genre = ");

  const datas = await readData("datas/data.json");
  for (const item of datas) {
    if (item.title === title && item.artist === artist) {
      item.title = newTitle;
      item.artist = newArtist;
      item.genre = newGenre;
    }
  }
  fs.writeFileSync("datas/data.json", JSON.stringify(datas, null, 2));
  console.log("Data has been edited");
};

// To delete data from file
const destroy = async () => {
  console.log("\n==================================\n");
  console.log("Delete a music\n");
  const title = await askQuestion("Title music = ");
  const artist = await askQuestion("Artist = ");

  // Display data table
  const data = await findData(title, artist);
  dataTable(data);
  const datas = await readData("datas/data.json");

  const isDelete = await askQuestion("Are you sure want to delete this song? y/n ");
  if (isDelete == "y" || isDelete == "Y") {
    const index = datas.findIndex((song) => song.title === data[0].title && song.artist === data[0].artist);
    datas.splice(index, 1);
    fs.writeFileSync("datas/data.json", JSON.stringify(datas, null, 2));
    console.log(primaryColor("Song has been remove"));
  } else if (isDelete == "n" || isDelete == "N") {
    console.log("OK!");
  } else {
    console.log(dangerColor("Error"));
  }
};

const home = async () => {
  console.log(
    table([
      ["no", "menu"],
      ["1", "Show all playlist"],
      ["2", "Add a playlist"],
      ["3", "Edit a playlist"],
      ["4", "Delete a playlist"],
    ])
  );

  let userOpt = await askQuestion("Choose the menu = ");
  switch (userOpt) {
    case "1":
      showAll();
      break;
    case "2":
      add();
      break;
    case "3":
      edit();
      break;
    case "4":
      destroy();
      break;
    default:
      console.log(dangerColor("Pick a valid menu!"));
      break;
  }
};

export default home;

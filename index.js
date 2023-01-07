import home from "./app/action/music.js";
import { primaryColor } from "./color.js";
import { table } from "table";

const start = () => {
  console.log(primaryColor(table([["Welcome to my playlist music!"]])));

  home();
};

start();

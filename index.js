import home from "./app/views/music.js";
import { primaryColor } from "./color.js";
import { table } from "table";

const start = () => {
  console.log(primaryColor(table([["Welcome to my playlist music!"]])));

  home();
};

start();

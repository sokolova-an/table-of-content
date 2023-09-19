"use server";
//template for server component
import axios from "axios";

export async function getPages() {

  const url = "https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json";
  const response = await axios.get(url);
  return await response.data;
}

import { faker } from "@faker-js/faker";

export const createTheme = () => {
  return `${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.adjective()}`;
};

const intervalFunc = (
  intervalTime: any,
  clearTime: any,
  addPros: any,
  addCons: any,
) => {
  const interval = setInterval(() => {
    const rand = Math.random() - 0.5;
    const theme = createTheme();
    if (rand > 0) {
      addPros(theme);
    } else {
      addCons(theme);
    }
  }, intervalTime);
  setTimeout(() => {
    clearTimeout(interval);
  }, clearTime);
};

export const addThemes = (addPros: any, addCons: any) => {
  intervalFunc(4000, 20000, addPros, addCons);
  setTimeout(() => {
    intervalFunc(4000, 40000, addPros, addCons);
  }, 20000);
  setTimeout(() => {
    intervalFunc(6000, 80000, addPros, addCons);
  }, 40000);
  setTimeout(() => {
    intervalFunc(17000, 140000, addPros, addCons);
  }, 80000);
};

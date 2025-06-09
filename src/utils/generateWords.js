import { faker, fakerFR } from "@faker-js/faker";

export function generateWords(Lang) {
  let randomWordsList;
  switch (Lang) {
    case "French":
      randomWordsList = fakerFR.word.words(40).split("");
      break;
    default:
      randomWordsList = faker.word.words(40).split("");
  }
  return randomWordsList;
}

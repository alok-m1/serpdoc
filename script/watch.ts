// script/watch.ts
import { watch } from "fs";
watch("script/responce.txt", () => {
  // @ts-ignore
  Bun.spawn(["bun", "run", "script/responce.ts"]);
});

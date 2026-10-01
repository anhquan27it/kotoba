const fs = require("node:fs");
const path = require("node:path");
const base =
  "https://cdn.jsdelivr.net/npm/@fontsource-variable/noto-sans-jp@5.2.6/";
async function get(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response;
}
async function main() {
  const css = await (await get(base + "wght.css")).text();
  const paths = [
    ...new Set(
      [...css.matchAll(/\.\/files\/([^'"\)\s]+)/g)].map((match) => match[1]),
    ),
  ];
  if (!paths.length) throw new Error("No font assets found in stylesheet.");
  const directory = path.resolve("public/fonts/jp");
  fs.mkdirSync(directory, { recursive: true });
  let index = 0;
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      while (index < paths.length) {
        const name = paths[index++];
        const data = await (await get(base + "files/" + name)).arrayBuffer();
        fs.writeFileSync(path.join(directory, name), Buffer.from(data));
      }
    }),
  );
  fs.writeFileSync(
    "app/fonts.css",
    css
      .replaceAll("Noto Sans JP Variable", "Study JP")
      .replaceAll("./files/", "../public/fonts/jp/"),
  );
  fs.writeFileSync(
    "public/fonts/LICENSE-Noto-Sans-JP.txt",
    await (await get(base + "LICENSE")).text(),
  );
  console.log(
    `Saved ${paths.length} Japanese font subsets and license. Browser downloads only required Unicode ranges.`,
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

const text = await Deno.readTextFile("completo.md");
const matches = [...text.matchAll(/<div class="middle">([\s\S]*?)<\/div>/g)];
for (const m of matches) {
  const content = m[1].trim().replace(/\n+/g, " ");
  const index = m.index!;
  const before = text.slice(0, index);
  const lineNum = before.split("\n").length;
  console.log(`L${lineNum}: ${content}`);
}

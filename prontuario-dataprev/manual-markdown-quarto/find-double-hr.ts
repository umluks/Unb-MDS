const text = await Deno.readTextFile("completo.md");
const lines = text.split("\n");
let prevHrLine = -10;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === "---") {
    if (i === prevHrLine + 1 || i === prevHrLine + 2) {
      console.log(`Linhas com '---' consecutivos: L${prevHrLine + 1} e L${i + 1}`);
    }
    prevHrLine = i;
  }
}

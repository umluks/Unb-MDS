// Script que extrai exatamente o sumário do commit 977c3f4 e compara com o atual
const proc = new Deno.Command("git", {
  args: ["show", "977c3f4250c2644f7f4f7b75ab5da5e50e8041dd:manual-markdown-quarto/manual-markdown-quarto/completo.md"]
});
const output = await proc.output();
const oldMd = new TextDecoder().decode(output.stdout);
const oldSummary = oldMd.match(/# Sumário([\s\S]*?)<\/div>/)?.[1] || "";

console.log("=== SUMÁRIO EM 977c3f4 (anterior) ===");
console.log(oldSummary);

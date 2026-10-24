const html = await Deno.readTextFile("completo.html");

// Dividir pelo separador de página <hr>
// Observe que cada <hr> no HTML separa páginas consecutivas.
const pages = html.split(/<hr\s*\/?>/i);

console.log(`Total de páginas detectadas: ${pages.length}`);

// Coletar todos os IDs e tags com id em cada página (1-indexed)
const idToPage = new Map<string, number>();

for (let i = 0; i < pages.length; i++) {
  const pageNum = i + 1;
  const pageContent = pages[i];
  // Regex para encontrar id="..."
  const idRegex = /id=["']([^"']+)["']/g;
  let match;
  while ((match = idRegex.exec(pageContent)) !== null) {
    const id = match[1];
    if (!idToPage.has(id)) {
      idToPage.set(id, pageNum);
    }
  }
}

// Ler itens do sumário em completo.md
const md = await Deno.readTextFile("completo.md");
const summaryMatch = md.match(/# Sumário([\s\S]*?)<\/div>/);
if (!summaryMatch) {
  console.error("Sumário não encontrado!");
  Deno.exit(1);
}

const summaryText = summaryMatch[1];
// Linhas do sumário têm: [Texto](#id) [num]{.n}
const linkRegex = /\[([^\]]+)\]\(#([^\)]+)\)\s*\[(\d+)\]\{\.n\}/g;
let item;
console.log("\n--- Checagem de itens do sumário ---");
let totalItems = 0;
let errors = 0;

while ((item = linkRegex.exec(summaryText)) !== null) {
  totalItems++;
  const [_, title, id, pageInSummaryStr] = item;
  const pageInSummary = parseInt(pageInSummaryStr, 10);
  const actualPage = idToPage.get(id);

  if (actualPage === undefined) {
    console.error(`[ERRO: ID NÃO ENCONTRADO] "${title}" -> #${id} (sumário aponta pág ${pageInSummary})`);
    errors++;
  } else if (actualPage !== pageInSummary) {
    console.warn(`[DESALINHADO] "${title}" (#${id}): sumário diz ${pageInSummary}, mas está na página ${actualPage} (dif: ${actualPage - pageInSummary})`);
    errors++;
  } else {
    console.log(`[OK] "${title}" -> #${id} na página ${actualPage}`);
  }
}

console.log(`\nTotal de itens no sumário: ${totalItems}`);
console.log(`Total de discrepâncias / erros: ${errors}`);

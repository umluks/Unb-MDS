const html = await Deno.readTextFile("completo.html");
const pages = html.split(/<hr\s*\/?>/i);

const idOccurrences = new Map<string, { page: number; tag: string; text: string }[]>();

for (let i = 0; i < pages.length; i++) {
  const pageNum = i + 1;
  const pageContent = pages[i];
  const tagRegex = /<([a-z0-9]+)[^>]*\bid=["']([^"']+)["'][^>]*>(.*?)<\/\1>/gis;
  let match;
  while ((match = tagRegex.exec(pageContent)) !== null) {
    const [_, tag, id, innerText] = match;
    const cleanText = innerText.replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " ").slice(0, 80);
    if (!idOccurrences.has(id)) {
      idOccurrences.set(id, []);
    }
    idOccurrences.get(id)!.push({ page: pageNum, tag, text: cleanText });
  }

  const openTagRegex = /<(div|section|span)[^>]*\bid=["']([^"']+)["']/gi;
  let match2;
  while ((match2 = openTagRegex.exec(pageContent)) !== null) {
    const [_, tag, id] = match2;
    if (!idOccurrences.has(id)) {
      idOccurrences.set(id, [{ page: pageNum, tag, text: "" }]);
    }
  }
}

const md = await Deno.readTextFile("completo.md");
const summaryMatch = md.match(/# Sumário([\s\S]*?)<\/div>/);
const summaryText = summaryMatch![1];

const lines = summaryText.split("\n");

console.log("=== ANÁLISE COMPLETA LINHA A LINHA DO SUMÁRIO ===");

for (let idx = 0; idx < lines.length; idx++) {
  const line = lines[idx].trim();
  if (!line) continue;

  const isComment = line.startsWith("<!--");
  const match = line.match(/\[([^\]]+)\]\(#([^\)]+)\)\s*\[(\d+)\]\{\.n\}/);
  if (!match) {
    console.log(`[FORMATO NÃO IDENTIFICADO] L${idx + 1}: ${line}`);
    continue;
  }

  const [_, title, id, pageStr] = match;
  const declaredPage = parseInt(pageStr, 10);
  const occs = idOccurrences.get(id);

  console.log(`\nItem: "${title}" | ID: #${id} | Pág Sumário: ${declaredPage}${isComment ? " (COMENTADO)" : ""}`);
  if (!occs || occs.length === 0) {
    console.log(`  ❌ ID NÃO ENCONTRADO NO HTML.`);
    // Buscar onde o título ou palavra chave aparece nos cabeçalhos h1, h2, h3
    const hits: { page: number; id: string; text: string }[] = [];
    for (const [otherId, list] of idOccurrences.entries()) {
      for (const item of list) {
        if (item.tag.startsWith("h") && (item.text.toLowerCase().includes(title.toLowerCase().slice(0, 15)) || otherId.includes(id.slice(0, 15)))) {
          hits.push({ page: item.page, id: otherId, text: item.text });
        }
      }
    }
    if (hits.length > 0) {
      console.log(`  🔍 Possíveis correspondências no documento:`);
      for (const h of hits) {
        console.log(`     - Pág ${h.page}: #${h.id} -> "${h.text}"`);
      }
    }
  } else {
    for (const occ of occs) {
      const matchStatus = occ.page === declaredPage ? "CORRETO" : `DIVERGENTE (diff: ${occ.page - declaredPage})`;
      console.log(`  -> Encontrado na Pág ${occ.page} [${occ.tag}]: "${occ.text}" (${matchStatus})`);
    }
  }
}

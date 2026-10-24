const html = await Deno.readTextFile("completo.html");
const pages = html.split(/<hr\s*\/?>/i);

const targets = [
  "Histórico de acolhimento institucional",
  "Formulário de controle de encaminhamentos",
  "Relatório de participação em atendimentos coletivos",
  "Relatório simplificado dos atendimentos",
  "Extra Cadastro",
  "Atendimento coletivo",
  "Migrar Prontuário",
  "Painel Estatístico"
];

for (const t of targets) {
  let hits = [];
  // Procurar a partir da página 3 (após sumário)
  for (let i = 2; i < pages.length; i++) {
    const p = pages[i];
    // Checar se contém como heading h1, h2, h3
    const hRegex = new RegExp(`<h[1-3][^>]*>(.*?</h[1-3]>)`, "gi");
    let m;
    while ((m = hRegex.exec(p)) !== null) {
      if (m[1].toLowerCase().includes(t.toLowerCase())) {
        hits.push({ page: i + 1, tag: m[0] });
      }
    }
  }
  console.log(`\n--- ${t} ---`);
  for (const h of hits) {
    console.log(`  Pág ${h.page}: ${h.tag}`);
  }
}

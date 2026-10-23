import { existsSync } from "https://deno.land/std@0.224.0/fs/mod.ts";

// Se estiver em modo preview ou render incremental, não geramos PDF para manter o recarregamento rápido
if (!Deno.env.get("QUARTO_PROJECT_RENDER_ALL")) {
  Deno.exit(0);
}

function findChrome(): string | null {
  const os = Deno.build.os;

  if (os === "windows") {
    const candidates = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      `${Deno.env.get("LOCALAPPDATA")}\\Google\\Chrome\\Application\\chrome.exe`,
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    ];
    for (const p of candidates) {
      if (p && existsSync(p)) return p;
    }
  } else if (os === "darwin") {
    const candidates = [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ];
    for (const p of candidates) {
      if (existsSync(p)) return p;
    }
  } else {
    // Linux
    const candidates = [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
    ];
    for (const p of candidates) {
      if (existsSync(p)) return p;
    }
  }

  return null;
}

const chromePath = findChrome();

if (!chromePath) {
  console.warn("Navegador baseado em Chromium não encontrado para gerar PDF.");
  Deno.exit(0);
}

const args = [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--log-level=3",
  "--print-to-pdf=completo.pdf",
  "completo.html",
];

try {
  const command = new Deno.Command(chromePath, {
    args,
    stdout: "null",
    stderr: "null",
  });
  const output = await command.output();
  if (output.success) {
    console.log("PDF gerado com sucesso: completo.pdf");
  } else {
    console.warn("Falha ao gerar PDF via Chrome (código " + output.code + ").");
  }
} catch (err) {
  console.warn("Aviso ao tentar gerar PDF:", err);
}

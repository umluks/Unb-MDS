#!/usr/bin/env bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --log-level=3 \
  --print-to-pdf=completo.pdf \
  completo.html 2>/dev/null


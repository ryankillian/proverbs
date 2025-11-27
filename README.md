## 🚀 Live Site

Deployed at:[Tilley Proverbs](https://tilleyproverbs.com).

## 1. Overview

This repo contains:

- `website/` – SvelteKit static website.
- `pipeline/` – Data extraction, OCR, LLM analysis, embeddings.
- `tools/` – Small utility scripts.
- `data/` – Sample data only (full data stored elsewhere).

---

## 2. Project layout

```text
tilley-proverbs/
  README.md


  website/          # SvelteKit static site
    README.md

  pipeline/         # Data extraction and processing
    README.md
    docling/        # PDF → text, bounding boxes
    ocr_gemini/     # OCR and cleanup via Gemini
    analysis_llm/   # Proverb description / analysis
    embeddings/     # Build and index proverb embeddings

  tools/            # One-off scripts (JSON, file ops, exports)
    README.md

```

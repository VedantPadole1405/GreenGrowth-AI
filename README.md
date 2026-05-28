# Policy-GreenGrowth: AI-Powered Expense Review System

## Overview

Policy-GreenGrowth is an AI-powered expense review platform designed to automate the pre-review process for employee expense submissions against company travel and reimbursement policies.

The system uses:

- LangGraph for workflow orchestration
- FastAPI for backend APIs
- Next.js for frontend UI
- ChromaDB for RAG-based policy retrieval
- Groq LLM for AI reasoning and reviewer recommendations
- Sentence Transformers for embeddings

The application allows finance reviewers to:

- Upload receipts
- Retrieve relevant policy clauses
- Generate grounded AI verdicts
- Receive reviewer recommendations
- Review AI-generated citations and evidence

---

# System Architecture

```text
                        ┌─────────────────────────┐
                        │     Next.js Frontend    │
                        │  (Expense Review UI)    │
                        └────────────┬────────────┘
                                     │
                                     │ Upload Receipts
                                     ▼
                        ┌─────────────────────────┐
                        │      FastAPI Backend    │
                        │       main.py API       │
                        └────────────┬────────────┘
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │     LangGraph Workflow  │
                        │   State + Nodes + Flow  │
                        └────────────┬────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│ Receipt Extract│        │ Policy Retrieval │        │ AI Reviewer Node │
│ extractor.py   │        │ retriever.py     │        │ reviewer.py      │
└────────────────┘        └──────────────────┘        └──────────────────┘
         │                           │                           │
         ▼                           ▼                           ▼
┌────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│ Groq LLM       │        │ ChromaDB         │        │ Groq LLM         │
│ Receipt Parsing│        │ Policy Embeddings│        │ Final Verdict    │
└────────────────┘        └──────────────────┘        └──────────────────┘
```

---

# Workflow Pipeline

```text
User uploads receipt
        │
        ▼
Receipt Extraction
(Groq + PDF parsing)
        │
        ▼
Structured Receipt JSON
        │
        ▼
Generate Retrieval Query
        │
        ▼
ChromaDB Semantic Search
        │
        ▼
Retrieve Relevant Policy Clauses
        │
        ▼
Groq AI Policy Reviewer
        │
        ▼
Generate:
- Verdict
- Confidence
- Reasoning
- Reviewer Action
- Citations
        │
        ▼
Frontend Review Dashboard
```

---

# Features

## AI Expense Review

- Upload receipt PDFs and images
- AI-generated compliance verdicts
- Confidence scoring
- Human reviewer recommendations
- Policy-grounded reasoning
- Citation-based evidence display

---

## Retrieval-Augmented Generation (RAG)

- Policies are chunked and embedded
- ChromaDB stores semantic embeddings
- Top policy matches are retrieved dynamically
- Groq only reasons using retrieved policy evidence

---

# Folder Structure

```text
Policy-GreenGrowth/
│
├── backend/
│   │
│   ├── graph/
│   │   ├── schemas.py
│   │   ├── state.py
│   │   ├── nodes.py
│   │   └── workflow.py
│   │
│   ├── services/
│   │   ├── extractor.py
│   │   ├── retriever.py
│   │   └── reviewer.py
│   │
│   ├── rag/
│   │   └── ingest_policies.py
│   │
│   ├── policies/
│   │
│   ├── chroma_db/
│   │
│   ├── uploads/
│   │
│   ├── main.py
│   └── requirements.txt
│
├── northwind-ui/
│   │
│   ├── app/
│   │   ├── page.tsx
│   │   └── review/page.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
└── .gitignore
```

---

# Technologies Used

| Component | Technology |
|---|---|
| Frontend | Next.js + React + Tailwind |
| Backend | FastAPI |
| Workflow | LangGraph |
| Vector DB | ChromaDB |
| Embeddings | Sentence Transformers |
| LLM | Groq |
| PDF Parsing | PyPDF |
| Validation | Pydantic |

---

# Receipt Processing Flow

```text
Receipt Upload
      │
      ▼
PDF/Image Parsing
      │
      ▼
Groq Structured Extraction
      │
      ▼
{
  merchant,
  amount,
  date,
  category
}
      │
      ▼
Policy Retrieval Query
      │
      ▼
ChromaDB Similarity Search
      │
      ▼
Top-K Policy Chunks
      │
      ▼
Groq Policy Reasoning
      │
      ▼
Final AI Review Result
```

---

# Example AI Output

```json
{
  "verdict": "needs_review",
  "reasoning": "The receipt exceeds the hotel reimbursement cap for the applicable city tier.",
  "reviewer_action": "Ask the employee for manager approval documentation.",
  "confidence": 0.82
}
```

---

# Running the Backend

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Add Groq API Key

Create `.env`

```env
GROQ_API_KEY=your_groq_api_key
```

---

## Ingest Policies into ChromaDB

```bash
python rag/ingest_policies.py
```

This:

- Reads all policy PDFs
- Chunks documents
- Generates embeddings
- Stores embeddings inside ChromaDB

---

## Start Backend

```bash
uvicorn main:app --reload --port 8000
```

Swagger UI:

```text
http://localhost:8000/docs
```

---

# Running the Frontend

```bash
cd northwind-ui
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# AI Review Dashboard

The frontend dashboard displays:

- Receipt filename
- AI verdict
- Confidence score
- Groq-generated reasoning
- Reviewer action recommendation
- Retrieved policy citations
- Approval / Reject actions

---

# Key Design Decisions

## Why LangGraph?

LangGraph provides:

- Structured multi-step workflows
- Stateful execution
- Modular nodes
- Better orchestration than single-agent loops

---

## Why ChromaDB?

ChromaDB was selected because:

- Lightweight local vector database
- Easy embedding storage
- Persistent retrieval
- Simple integration with Python

---

## Why Groq?

Groq provides:

- Fast inference
- Structured JSON outputs
- Streaming support
- Low latency for real-time review systems

---


---

# End-to-End System Summary

```text
Receipts
   ↓
Groq Extraction
   ↓
LangGraph Workflow
   ↓
ChromaDB Retrieval
   ↓
Groq Policy Reasoning
   ↓
AI Verdict + Reviewer Action
   ↓
Next.js Dashboard
```

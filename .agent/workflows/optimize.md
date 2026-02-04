---
description: Run UCOF comprehensive codebase optimization analysis
---

# UCOF Optimization Workflow

This workflow triggers a comprehensive codebase optimization analysis using the Universal Codebase Optimization Framework (UCOF).

## Step 1: Identify Project Path

Ask the user which project they want to analyze, or use the current workspace.

**Default**: Current workspace root directory

---

## Step 2: Load UCOF Skill

Read and follow the methodology from the UCOF SKILL.md file located at:

```
/Users/user/Code Project/UCOF (Universal Codebase Optimization Framework)/SKILL.md
```

This skill contains the complete orchestration instructions for:
- Phase 1: Discovery (tech stack detection, project mapping)
- Phase 2: Domain Analysis (8 specialized agents)
- Phase 3: Finding Aggregation (deduplication, severity classification)
- Phase 4: Cross-Domain Synthesis (pattern detection, dependency graphing)
- Phase 5: Execution Planning (phased remediation plan)

---

## Step 3: Execute Analysis

Follow the UCOF methodology exactly as documented in SKILL.md:

1. **Discovery Phase** - Map the project structure and detect technologies
2. **Domain Analysis** - Run specialized agents for each domain:
   - 🔒 Security (Opus model)
   - 🔌 External Services (Opus model)
   - 🗄️ Data Layer (Sonnet model)
   - 🔧 Backend API (Sonnet model)
   - 🖥️ Frontend (Sonnet model)
   - 🏗️ Infrastructure (Sonnet model)
   - ⚡ Performance (Sonnet model)
   - ✅ Quality Assurance (Sonnet model)
3. **Synthesis** - Merge findings, detect systemic patterns
4. **Execution Planning** - Create phased remediation plan
5. **Reporting** - Generate executive summary and technical report

---

## Step 4: Save Results

Create a `.optimization/` directory in the analyzed project with:
- `report.md` - Executive summary and technical findings
- `synthesis.json` - Machine-readable findings
- `all-findings.json` - Raw domain findings
- `execution-plan.md` - Phased remediation steps

---

## Step 5: Present Summary

Show the user:
- Health Score (/100)
- Findings by severity (Critical, High, Medium, Low)
- Top 3-5 most critical issues
- Recommended next steps

Ask if they want to:
1. View the full report
2. Deep-dive into a specific domain
3. Start fixing critical issues

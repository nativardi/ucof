# UCOF Installation & Usage Guide

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/user/optimization-framework
npm install
```

### 2. Set Up API Key

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 3. Make CLI Globally Available

```bash
npm link
# OR
chmod +x cli/ucof.js
alias ucof="node /Users/user/optimization-framework/cli/ucof.js"
```

### 4. Run Analysis

```bash
# Analyze any project
ucof analyze /path/to/your/project

# Analyze current directory
ucof analyze .
```

---

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLI Orchestrator                         │
│                          (ucof.js)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    Fresh API Call    ┌──────────────────┐   │
│   │  Discovery   │ ──────────────────── │  Haiku (cheap)   │   │
│   │   Phase      │    Small context     │  ~$0.001/run     │   │
│   └──────────────┘                      └──────────────────┘   │
│          │                                                       │
│          ▼ discovery.json                                        │
│   ┌──────────────┐    Fresh API Call    ┌──────────────────┐   │
│   │  Security    │ ──────────────────── │  Opus (smart)    │   │
│   │   Domain     │    Relevant files    │  ~$0.10/run      │   │
│   └──────────────┘    only              └──────────────────┘   │
│          │                                                       │
│          ▼ security-findings.json                                │
│   ┌──────────────┐    Fresh API Call    ┌──────────────────┐   │
│   │  Backend     │ ──────────────────── │  Sonnet (good)   │   │
│   │   Domain     │    Relevant files    │  ~$0.02/run      │   │
│   └──────────────┘    only              └──────────────────┘   │
│          │                                                       │
│          ▼ ... (other domains)                                   │
│   ┌──────────────┐    Fresh API Call    ┌──────────────────┐   │
│   │  Synthesis   │ ──────────────────── │  Opus (smart)    │   │
│   │   Phase      │    Findings only     │  ~$0.10/run      │   │
│   └──────────────┘                      └──────────────────┘   │
│          │                                                       │
│          ▼                                                       │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                    .optimization/                         │  │
│   │  - discovery.json     (tech stack, structure)            │  │
│   │  - security-findings.json                                │  │
│   │  - backend-findings.json                                 │  │
│   │  - ... (other domain findings)                           │  │
│   │  - synthesis.json     (merged, deduplicated)             │  │
│   │  - report.md          (human-readable)                   │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Saves Context & Tokens

| Traditional Approach | UCOF Approach |
|---------------------|---------------|
| One massive prompt with entire codebase | Small, focused prompts per domain |
| Carries all context throughout | Fresh context for each phase |
| Uses expensive model for everything | Routes to cheapest appropriate model |
| ~100K tokens per analysis | ~5-15K tokens per phase |

### Cost Estimate (per analysis)

| Phase | Model | Est. Tokens | Est. Cost |
|-------|-------|-------------|-----------|
| Discovery | Haiku | ~2,000 | $0.001 |
| Security | Opus | ~10,000 | $0.15 |
| External | Opus | ~8,000 | $0.12 |
| Data | Sonnet | ~6,000 | $0.02 |
| Backend | Sonnet | ~6,000 | $0.02 |
| Frontend | Sonnet | ~6,000 | $0.02 |
| Infrastructure | Sonnet | ~4,000 | $0.01 |
| Performance | Sonnet | ~5,000 | $0.02 |
| Quality | Sonnet | ~4,000 | $0.01 |
| Synthesis | Opus | ~8,000 | $0.12 |
| **Total** | | **~59,000** | **~$0.50** |

*Actual costs vary based on project size and complexity*

---

## Commands

### `ucof analyze <path>`

Run full optimization analysis.

```bash
ucof analyze /path/to/project
ucof analyze .                    # Current directory
ucof analyze . --skip-discovery   # Use cached discovery
```

**Output**: Creates `.optimization/` directory with:
- `discovery.json` - Tech stack and structure
- `*-findings.json` - Per-domain findings
- `synthesis.json` - Merged and prioritized findings
- `report.md` - Human-readable report

### `ucof fix <path>`

Start a fix session with **clean context**.

```bash
ucof fix /path/to/project
```

**What it does**:
1. Loads existing analysis (must run `analyze` first)
2. Shows priority findings
3. Offers options:
   - Fix all critical issues
   - Fix specific finding
   - Generate PR descriptions
4. Launches new Claude session with ONLY the relevant findings

**Why clean context matters**: Fixing doesn't need all the analysis context. It only needs:
- The specific finding
- The file to fix
- The recommended action

### `ucof report <path>`

View existing analysis report.

```bash
ucof report /path/to/project
```

---

## Configuration

### Environment Variables

```bash
# Required
export ANTHROPIC_API_KEY="sk-ant-..."

# Optional: Custom framework path
export UCOF_PATH="/custom/path/to/optimization-framework"
```

### Model Routing

Edit `config/model-routing.yaml` to customize which models are used:

```yaml
domain_routing:
  security:
    default: opus      # Always use best for security
  frontend:
    default: sonnet    # Standard analysis
    override_to_haiku:
      - condition: "file_count < 20"
```

---

## Workflow Example

### First Time Analysis

```bash
# 1. Analyze your project
ucof analyze /path/to/my-saas-app

# 2. Review the report
cat /path/to/my-saas-app/.optimization/report.md

# 3. Start fixing critical issues (new session)
ucof fix /path/to/my-saas-app
# Select option 1: "Fix all critical issues"

# 4. After fixing, re-analyze to verify
ucof analyze /path/to/my-saas-app --skip-discovery
```

### CI/CD Integration

```yaml
# .github/workflows/optimization.yml
name: Codebase Optimization Check

on:
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run UCOF Analysis
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npx ucof analyze .
          
      - name: Check for Critical Issues
        run: |
          CRITICAL=$(jq '.summary.by_severity.critical' .optimization/synthesis.json)
          if [ "$CRITICAL" -gt 0 ]; then
            echo "❌ Found $CRITICAL critical issues!"
            cat .optimization/report.md
            exit 1
          fi
```

---

## Extending the Framework

### Add a New Domain

1. Create skill file: `skills/domains/new-domain/SKILL.md`
2. Add to config: `config/model-routing.yaml`
3. Update CLI: Add to `domainOrder` in `ucof.js`

### Customize Severity Rules

Edit `config/severity-rubric.yaml`:

```yaml
severity_levels:
  critical:
    criteria:
      - "Your custom criteria"
```

### Add Tech Detection

Edit `config/tech-patterns.yaml`:

```yaml
frontend:
  your_framework:
    files: ["your-config.json"]
    patterns: ['"your-package":']
```

---

## Troubleshooting

### "API key not found"
```bash
export ANTHROPIC_API_KEY="your-key"
```

### "No analysis found"
Run `ucof analyze` before `ucof fix`

### "Permission denied"
```bash
chmod +x cli/ucof.js
```

### Analysis is slow
- Skip unchanged discovery: `--skip-discovery`
- Analysis of large projects naturally takes longer

---

## Support

For issues or feature requests, the framework is in:
`/Users/user/optimization-framework`

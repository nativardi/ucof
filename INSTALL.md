# UCOF Installation Guide

## Quick Install

```bash
# 1. Clone
git clone https://github.com/nativardi/ucof.git
cd ucof

# 2. Install & Link
npm install && npm link

# 3. Set API Key
export ANTHROPIC_API_KEY="your-key-here"

# 4. Run
ucof analyze /path/to/your/project
```

---

## Detailed Setup

### Prerequisites

| Requirement | Version | Get It |
|-------------|---------|--------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| npm | 8+ | Comes with Node.js |
| Anthropic API Key | — | [console.anthropic.com](https://console.anthropic.com/) |

### Step 1: Clone Repository

```bash
git clone https://github.com/nativardi/ucof.git
cd ucof
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Link CLI Globally

```bash
npm link
```

This makes `ucof` available as a command anywhere on your system.

### Step 4: Configure API Key

```bash
# Temporary (current session only)
export ANTHROPIC_API_KEY="sk-ant-..."

# Permanent (add to your shell config)
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
source ~/.zshrc
```

### Step 5: Verify Installation

```bash
ucof --help
```

You should see:
```
UCOF - Universal Codebase Optimization Framework

Commands:
  ucof analyze <path>    Run optimization analysis
  ucof report <path>     View existing report
  ucof fix <path>        Start fix session
```

---

## Commands

| Command | What It Does |
|---------|--------------|
| `ucof analyze <path>` | Run full analysis, saves to `.optimization/` |
| `ucof report <path>` | Display existing report |
| `ucof fix <path>` | Start fixing issues (clean session) |
| `ucof analyze <path> --skip-discovery` | Re-run with cached tech detection |

---

## Output Files

After running `ucof analyze`, check the `.optimization/` folder:

```
your-project/.optimization/
├── report.md          # Human-readable summary
├── synthesis.json     # Full analysis data
└── all-findings.json  # Raw findings
```

---

## Estimated Costs

| Phase | Model | ~Cost |
|-------|-------|-------|
| Discovery | Haiku | $0.001 |
| Security | Opus | $0.15 |
| External | Opus | $0.12 |
| Data/Backend/Frontend | Sonnet | $0.02 each |
| Synthesis | Opus | $0.12 |
| **Total** | | **~$0.50** |

---

## Troubleshooting

### "Command not found: ucof"
```bash
npm link  # Re-link the CLI
```

### "API key not found"
```bash
export ANTHROPIC_API_KEY="your-key"
```

### "No analysis found" (when running fix)
Run `ucof analyze` first.

---

## Uninstall

```bash
npm unlink -g ucof
rm -rf /path/to/ucof
```

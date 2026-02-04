# UCOF - Universal Codebase Optimization Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Claude API](https://img.shields.io/badge/Powered%20by-Claude%20API-blueviolet.svg)](https://anthropic.com)

> 🔍 AI-powered codebase analysis that finds security issues, performance problems, and technical debt in minutes - not days.

**UCOF** is an open-source framework that analyzes any software project using specialized AI agents. Each agent focuses on one domain (security, performance, data, etc.) and uses the most cost-effective AI model for its task.

---

## ⚡ 30-Second Setup

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Anthropic API Key** - [Get one here](https://console.anthropic.com/)

### Install

```bash
# Clone the repo
git clone https://github.com/nativardi/ucof.git
cd ucof

# Install and link globally
npm install && npm link

# Set your API key (add to ~/.zshrc or ~/.bashrc to persist)
export ANTHROPIC_API_KEY="your-api-key-here"
```

### Run Your First Analysis

```bash
# Analyze any project
ucof analyze /path/to/your/project

# That's it! Check the report:
cat /path/to/your/project/.optimization/report.md
```

---

## 🎯 The Problem UCOF Solves

You want to use AI to review your codebase, but:

- ❌ Dumping your entire codebase into ChatGPT hits context limits
- ❌ Using GPT-4/Opus for everything is expensive (~$3-5 per analysis)
- ❌ No structure means inconsistent, unreliable results
- ❌ Manual review takes days

### ✅ The Solution

UCOF breaks the analysis into **isolated, specialized tasks**:

| Step | Model Used | Cost | What It Does |
|------|------------|------|--------------|
| Discovery | Haiku (cheap) | ~$0.001 | Detect tech stack, map structure |
| Security | Opus (smart) | ~$0.15 | Find vulnerabilities, auth issues |
| Performance | Sonnet (balanced) | ~$0.02 | Identify N+1 queries, bottlenecks |
| ... | ... | ... | ... |
| **Total** | | **~$0.50** | Full analysis |

Each task runs with **fresh context** - no token waste.

---

## 📖 Usage

### CLI Commands

```bash
# Full analysis
ucof analyze /path/to/project

# View existing report
ucof report /path/to/project

# Start fixing issues (new clean session)
ucof fix /path/to/project

# Re-analyze with cached discovery (faster)
ucof analyze /path/to/project --skip-discovery
```

### Claude Code Integration (Optional)

Want to trigger UCOF from inside Claude Code with `/optimize`?

1. Copy the workflow file to your target project:
```bash
mkdir -p /path/to/your/project/.agent/workflows
cp .agent/workflows/optimize.md /path/to/your/project/.agent/workflows/
```

2. Open Claude Code in that project and type `/optimize`

---

## 📊 What Gets Analyzed

UCOF runs **8 specialized domain agents**:

| Domain | What It Checks | Model |
|--------|----------------|-------|
| 🔒 **Security** | Auth bypass, IDOR, secrets, XSS, SSRF | Opus |
| 🔌 **External** | AI integrations, workers, queues, retries | Opus |
| 🗄️ **Data** | N+1 queries, RLS policies, migrations | Sonnet |
| 🔧 **Backend** | API design, error handling, validation | Sonnet |
| 🖥️ **Frontend** | Component architecture, rendering, bundle | Sonnet |
| 🏗️ **Infrastructure** | CI/CD, Docker, deployment, monitoring | Sonnet |
| ⚡ **Performance** | Bottlenecks, scaling limits, caching | Sonnet |
| ✅ **Quality** | Tests, linting, type safety, observability | Sonnet |

---

## 📤 Output

After running `ucof analyze`, you'll find:

```
your-project/
└── .optimization/
    ├── report.md          # Executive summary (human-readable)
    ├── synthesis.json     # Full analysis with cross-domain patterns
    └── all-findings.json  # Raw findings from all domains
```

### Sample Output

```
╔════════════════════════════════════════════════════════════╗
║                    Analysis Complete                        ║
╚════════════════════════════════════════════════════════════╝

Health Score: 45/100

Findings by Severity:
  🔴 Critical: 3
  🟠 High:     8
  🟡 Medium:   12
  🔵 Low:      5
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLI Orchestrator                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Discovery ──► Security ──► Data ──► Backend ──► ...           │
│      │              │          │         │                       │
│      ▼              ▼          ▼         ▼                       │
│    Haiku         Opus      Sonnet    Sonnet    (Model Routing)  │
│      │              │          │         │                       │
│      ▼              ▼          ▼         ▼                       │
│   Fresh          Fresh      Fresh     Fresh    (Context Reset)   │
│   Context        Context    Context   Context                    │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                         Synthesis (Opus)                         │
│   • Merge findings    • Detect patterns    • Prioritize fixes   │
└─────────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**

1. **Isolated Contexts**: Each domain gets only the files it needs
2. **Model Routing**: Expensive models only for complex/critical tasks
3. **Fresh Sessions**: No context carryover = no wasted tokens
4. **Structured Output**: JSON findings with consistent schema

---

## 💡 Use Cases

### Pre-Production Audit
```bash
ucof analyze ./my-startup-app
# Get a full security/performance/quality report before launch
```

### CI/CD Integration
```yaml
# .github/workflows/audit.yml
- name: Run UCOF
  run: |
    npx ucof analyze .
    CRITICAL=$(jq '.summary.by_severity.critical' .optimization/synthesis.json)
    if [ "$CRITICAL" -gt 0 ]; then exit 1; fi
```

### Regular Health Checks
```bash
# Add to your maintenance routine
ucof analyze . --skip-discovery  # Use cached tech detection
```

---

## 🔧 Configuration

### Model Routing

Edit `config/model-routing.yaml`:

```yaml
domain_routing:
  security:
    default: opus      # Always use best for security
  frontend:
    default: sonnet    # Standard analysis
```

### Severity Rules

Edit `config/severity-rubric.yaml`:

```yaml
severity_levels:
  critical:
    criteria:
      - "Data breach possible"
      - "Authentication bypass"
```

---

## 📁 Project Structure

```
ucof/
├── ucof.js                 # CLI orchestrator
├── SKILL.md                # Analysis methodology (for Claude Code)
├── .agent/workflows/       # Claude Code workflow integration
│   └── optimize.md
├── claude-code-prompt.md   # Manual prompts for Claude Code
└── package.json
```

---

## 🤝 Contributing

Contributions welcome! Areas that need help:

- [ ] More tech stack detection patterns
- [ ] Additional domain agents
- [ ] Better report formatting
- [ ] VS Code extension
- [ ] GitHub Action

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Built with [Claude API](https://anthropic.com) by Anthropic
- Inspired by the need for affordable, structured AI code review

---

**Star ⭐ this repo if you find it useful!**

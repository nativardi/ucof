# UCOF - Universal Codebase Optimization Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Works%20with-Claude%20Code-blueviolet.svg)](https://claude.ai)
[![Node.js](https://img.shields.io/badge/Node.js%20CLI-18+-green.svg)](https://nodejs.org/)

> 🔍 **Analyze your codebase in minutes** - Find security issues, performance problems, and technical debt before they hit production.

**Choose your approach:** Use UCOF as a Claude Code Skill (free, no API key) or as a standalone CLI (powerful, cost-optimized).

---

## 🚀 Quick Decision Guide

### **What's your situation?**

| Situation | Recommended | Time | Cost |
|-----------|------------|------|------|
| "I just want to audit my code now" | **Skill** | 2 min setup | Free |
| "I need to run this in CI/CD" | **CLI** | 3 min setup | ~$0.50/run |
| "I want the most powerful analysis" | **CLI** | 3 min setup | ~$0.50/run |
| "I don't have an API key" | **Skill** | 2 min setup | Free |
| "I have lots of projects" | **CLI** | 3 min setup | ~$0.50/run |

---

## ⚡ Get Started (30 Seconds)

### 🎯 **Option 1: Claude Code Skill (Easiest)**

**Setup: 2 minutes. Cost: Free. API Key: Not needed.**

**Features:** Parallel analysis across 8 domains, intelligent model routing (Haiku/Sonnet/Opus), 3-5 minute analysis time.

In Claude Code, paste this:

```
Read https://raw.githubusercontent.com/nativardi/ucof/main/SKILL.md
Then analyze my project at /path/to/my/project
```

Done! Claude will automatically:
- Map your tech stack (Haiku)
- Analyze security & external services (Opus)
- Check data, backend, frontend (Sonnet)
- Synthesize findings & create execution plan (Opus)

**Other ways:**
- Local: `Read ~/ucof/SKILL.md and analyze /path/to/my/project`
- Copy-paste: [Full instructions](./SKILL.md)

📖 [Skill Version Setup (Full Guide)](./skill-claude-code/README.md)

---

### 🔧 **Option 2: Standalone CLI (Most Powerful)**

**Setup: 3 minutes. Cost: ~$0.50/analysis. API Key: Required.**

```bash
# 1. Clone (one time)
git clone https://github.com/nativardi/ucof.git
cd ucof/cli-standalone && npm install

# 2. Get free API key: https://console.anthropic.com/
export ANTHROPIC_API_KEY="your-key-here"

# 3. Analyze!
npm start analyze /path/to/your/project
```

Results saved to `.optimization/report.md`

📖 [CLI Version Setup (Full Guide)](./cli-standalone/README.md)

---

## 📊 Version Comparison

| Feature | Skill | CLI |
|---------|-------|-----|
| **Setup Time** | 2 min | 3 min |
| **Cost** | Free 💚 | ~$0.50 |
| **API Key** | ❌ Not needed | ✅ Required |
| **Model Selection** | ✅ Optimized (Haiku/Sonnet/Opus) | ✅ Optimized (Haiku/Sonnet/Opus) |
| **Parallel Analysis** | ✅ Yes | ✅ Yes |
| **Large Projects** | Context limits | No limits |
| **CI/CD Integration** | Scriptable | Full automation |
| **Best For** | Quick audits, individual use | Teams, automation, large projects |

---

## 🎯 What Both Versions Analyze

Both analyze the same **8 domains**:

| Domain | What It Checks |
|--------|----------------|
| 🔒 **Security** | Auth bypass, IDOR, secrets, XSS, SQL injection, RLS policies |
| 🗄️ **Data** | N+1 queries, unbounded queries, missing indexes, schema issues |
| 🔧 **Backend** | Input validation, error handling, API design, pagination |
| 🔌 **External** | AI integrations, workers, retry logic, rate limits |
| 🖥️ **Frontend** | Server vs client components, bundle size, loading states |
| 🏗️ **Infrastructure** | CI/CD, monitoring, health checks, secrets management |
| ⚡ **Performance** | Polling, caching, query counts, scaling limits |
| ✅ **Quality** | Tests, linting, type safety, observability |

---

## 📋 Sample Output (Both Versions)

```
# Analysis Summary

Project: my-saas-app
Health Score: 45/100

## Findings by Severity
- 🔴 Critical: 2
- 🟠 High: 5
- 🟡 Medium: 8
- 🔵 Low: 3

## Top Issues to Fix First
1. SEC-001 - API endpoint lacks authentication [Low effort]
2. DB-001 - N+1 queries in user listing [Medium effort]
3. SEC-002 - Hardcoded API key in config [Low effort]
4. EXT-001 - No retry logic on AI calls [Medium effort]

## Systemic Patterns Detected
- "No Safety Net": Zero tests, no CI, no monitoring
- "Happy Path Only": No error handling anywhere
```

---

## 💡 Use Cases

### "I want a quick security audit"
```
→ Skill Version (copy-paste, 5 minutes total)
```

### "We need automated analysis on every PR"
```
→ CLI Version (GitHub Actions integration)
```

### "Which is faster?"
```
→ CLI Version (parallel analysis)
But Skill Version is fast enough for most projects
```

### "Can I try both?"
```
→ Yes! Start with Skill, upgrade to CLI if needed
No lock-in, both use same methodology
```

---

## ❓ FAQ

### Which should I use?
**Start with Skill Version** - it's faster to set up, free, and requires no API key. Switch to CLI if you need automation or cost optimization for multiple analyses.

### Do I need anything special?
**Skill Version:** Claude Code (free) + nothing else
**CLI Version:** Node.js 18+ (free) + Anthropic API key (~$5 free credits)

### Will this modify my code?
**No.** Both versions are read-only. They only report findings - you decide what to fix.

### How long does analysis take?
**Skill Version:** 2-5 minutes (depends on project size)
**CLI Version:** 1-3 minutes (faster due to parallel processing)

### Does the Skill version cost extra?
**No.** It uses your existing Claude subscription - no separate charges.

### Can Skill version handle large projects?
**Yes**, but very large projects may hit Claude's context limits. That's when CLI version shines (no limits).

### What's the cheapest way to analyze 10 projects?
**Skill Version:** Free (use your Claude subscription)
**CLI Version:** ~$5 (10 × $0.50)

### Can I use CLI in CI/CD pipelines?
**Yes**, but consider these factors:

**Cost:**
- ~$0.50 per analysis
- 100 PRs/week = $50/week = $200/month

**Speed:**
- Adds 1-3 minutes to CI pipeline

**Best Practices:**
- ✅ Run on main branch only (not every PR)
- ✅ Scheduled weekly/monthly audits
- ✅ Pre-release health checks
- ✅ Manual workflow triggers
- ❌ Not ideal for every PR on high-traffic repos

**Example:** Configure GitHub Actions to run only on pushes to `main` or as manual workflow dispatch.

---

## 📚 Full Documentation

- **[Skill Version Docs](./skill-claude-code/README.md)** - Setup, examples, copy-paste commands
- **[CLI Version Docs](./cli-standalone/README.md)** - Installation, commands, GitHub Actions integration
- **[Methodology](./METHODOLOGY.md)** - How analysis works (both versions use this)
- **[Detailed Comparison](./VERSIONS.md)** - Technical differences explained

---

## 🛠️ Next Steps

1. **Pick your version** (see Quick Decision Guide above)
2. **Follow the setup** (2-3 minutes)
3. **Run your first analysis**
4. **Review findings** in the report
5. **Fix issues** in priority order (critical → high → medium → low)

---

## 🤝 Contributing

Ideas for improvements:
- [ ] More framework-specific checks
- [ ] Additional domain detections
- [ ] Industry-specific rules (HIPAA, SOC 2, PCI-DSS)
- [ ] Better report visualizations
- [ ] GitHub Action integration

---

## 📄 License

MIT - Use freely, modify, distribute

---

## 🆘 Need Help?

**Skill Version Issues:**
[See troubleshooting guide](./skill-claude-code/README.md#troubleshooting)

**CLI Version Issues:**
[See troubleshooting guide](./cli-standalone/README.md#troubleshooting)

**Something else:**
[Open an issue](https://github.com/nativardi/ucof/issues)

---

**Made with ❤️ for better code reviews | [Star ⭐ if helpful](https://github.com/nativardi/ucof)**

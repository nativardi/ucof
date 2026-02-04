# UCOF Repository Structure

## 📁 Directory Layout

```
ucof/
│
├── 📖 README.md                    ⭐ START HERE - Choose your version
├── 🚀 QUICKSTART.md                Quick start guide (2-3 minutes)
├── 📋 VERSIONS.md                  Compare Skill vs CLI versions
├── 🔍 METHODOLOGY.md               How UCOF analysis works
│
├── 📚 skill-claude-code/           🆕 Claude Code Skill (No API key)
│   ├── README.md                   Setup instructions
│   └── SKILL.md                    ⭐ The skill (copy-paste this)
│
├── 🔧 cli-standalone/             Original Node.js CLI (With API key)
│   ├── README.md                   Installation & usage
│   ├── ucof.js                     ⭐ CLI orchestrator
│   ├── package.json                Dependencies
│   ├── INSTALL.md                  Legacy install guide
│   ├── SKILL-ORIGINAL.md          Original methodology
│   └── node_modules/               Dependencies (npm install)
│
└── 📄 LICENSE                      MIT License
```

---

## 🎯 What to Read When

### I want to start NOW (2 min)
→ [QUICKSTART.md](./QUICKSTART.md)

### I'm choosing between versions
→ [README.md](./README.md) then [VERSIONS.md](./VERSIONS.md)

### I want the Skill version
→ [skill-claude-code/README.md](./skill-claude-code/README.md)

### I want the CLI version
→ [cli-standalone/README.md](./cli-standalone/README.md)

### I want to understand how it works
→ [METHODOLOGY.md](./METHODOLOGY.md)

---

## 📊 File Purposes

| File | Purpose | Read Time |
|------|---------|-----------|
| README.md | Choose your path | 3 min |
| QUICKSTART.md | Get started immediately | 2 min |
| VERSIONS.md | Detailed comparison | 5 min |
| METHODOLOGY.md | How analysis works | 10 min |
| skill-claude-code/SKILL.md | The skill itself | Use in Claude Code |
| cli-standalone/ucof.js | The CLI tool | Run from terminal |

---

## 🚀 Quick Navigation

**Choose one:**

### Easy Path (No API Key)
1. Read [README.md](./README.md) (2 min)
2. Go to [skill-claude-code/](./skill-claude-code/) (see instructions)
3. Copy the URL and paste in Claude Code
4. Analyze!

### Powerful Path (With API Key)
1. Read [README.md](./README.md) (2 min)
2. Go to [cli-standalone/](./cli-standalone/) (see instructions)
3. `npm install` and set API key
4. Run `ucof analyze /path/to/project`

---

## 📦 What's Included

### Both Versions
- ✅ 8 domain analyzers (Security, Data, Backend, External, Frontend, Infrastructure, Performance, Quality)
- ✅ Evidence-based findings with file paths
- ✅ Severity classification
- ✅ Fix recommendations
- ✅ Health score
- ✅ Systemic pattern detection
- ✅ Execution planning

### Skill Version Only
- ✅ Works inside Claude Code
- ✅ No API key needed
- ✅ One-liner setup
- ✅ Offline capable

### CLI Version Only
- ✅ Parallel analysis (faster)
- ✅ Model optimization (cheaper)
- ✅ CI/CD integration
- ✅ Automation ready
- ✅ Handles large projects

---

**Ready to start? Go to [QUICKSTART.md](./QUICKSTART.md)! 🚀**

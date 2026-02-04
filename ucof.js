#!/usr/bin/env node

/**
 * Universal Codebase Optimization Framework (UCOF) - CLI Orchestrator
 * 
 * This script orchestrates the optimization analysis by:
 * 1. Running discovery phase (Haiku - cheap)
 * 2. Spawning isolated analysis for each domain (appropriate model)
 * 3. Aggregating findings (Opus - needs intelligence)
 * 4. Generating execution plan
 * 
 * Each phase runs in a FRESH context to save tokens.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Model routing based on domain complexity
  models: {
    haiku: 'claude-haiku-4-5-20251001',
    sonnet: 'claude-sonnet-4-5-20250929',
    opus: 'claude-opus-4-5-20251101'
  },
  
  // Domain configuration
  domains: {
    discovery: { model: 'haiku', priority: 0 },
    security: { model: 'opus', priority: 1 },
    external: { model: 'opus', priority: 1 },
    data: { model: 'sonnet', priority: 1 },
    backend: { model: 'sonnet', priority: 1 },
    frontend: { model: 'sonnet', priority: 2 },
    infrastructure: { model: 'sonnet', priority: 2 },
    performance: { model: 'sonnet', priority: 2 },
    quality: { model: 'sonnet', priority: 2 },
    synthesis: { model: 'opus', priority: 3 }
  },
  
  // Output directory
  outputDir: '.optimization',
  
  // Framework path (update this to your installation path)
  frameworkPath: process.env.UCOF_PATH || path.join(__dirname, '..')
};

// ============================================================================
// UTILITIES
// ============================================================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  console.log(`\n${colors.cyan}[${step}]${colors.reset} ${colors.bright}${message}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function ensureOutputDir(projectPath) {
  const outputPath = path.join(projectPath, CONFIG.outputDir);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  return outputPath;
}

function readSkill(skillName) {
  const skillPath = path.join(CONFIG.frameworkPath, 'skills', skillName, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    return fs.readFileSync(skillPath, 'utf8');
  }
  
  // Try domains subdirectory
  const domainSkillPath = path.join(CONFIG.frameworkPath, 'skills', 'domains', skillName, 'SKILL.md');
  if (fs.existsSync(domainSkillPath)) {
    return fs.readFileSync(domainSkillPath, 'utf8');
  }
  
  throw new Error(`Skill not found: ${skillName}`);
}

// ============================================================================
// PROMPT GENERATORS
// ============================================================================

function generateDiscoveryPrompt(projectPath) {
  return `
# Task: Project Discovery

Analyze the project at: ${projectPath}

## Instructions
Follow the discovery methodology to:
1. Detect the technology stack
2. Map the directory structure  
3. Identify critical files
4. Assess quality indicators (tests, CI/CD, linting)

## Output Format
Output ONLY a JSON object with this structure (no markdown, no explanation):

{
  "project_name": "string",
  "tech_stack": {
    "frontend": ["tech1", "tech2"],
    "backend": ["tech1"],
    "database": ["tech1"],
    "queue": "tech or null",
    "ai_services": ["service1"],
    "deployment": ["platform1"]
  },
  "structure": {
    "frontend_paths": ["path1", "path2"],
    "backend_paths": ["path1"],
    "data_paths": ["path1"],
    "config_files": ["file1", "file2"]
  },
  "quality_indicators": {
    "has_tests": boolean,
    "has_ci_cd": boolean,
    "has_linting": boolean,
    "has_typescript": boolean,
    "has_error_monitoring": boolean
  },
  "file_counts": {
    "total": number,
    "by_extension": {"ts": number, "tsx": number, "py": number}
  },
  "critical_files": [
    {"path": "string", "reason": "string"}
  ],
  "immediate_concerns": [
    {"issue": "string", "severity": "critical|high|medium|low"}
  ]
}
`;
}

function generateDomainPrompt(domain, projectPath, discoveryData) {
  const skill = readSkill(domain);
  
  // Extract only relevant paths for this domain
  const relevantPaths = getRelevantPaths(domain, discoveryData);
  
  return `
# Task: ${domain.charAt(0).toUpperCase() + domain.slice(1)} Domain Analysis

## Project Context (from discovery)
- Project: ${discoveryData.project_name}
- Tech Stack: ${JSON.stringify(discoveryData.tech_stack, null, 2)}
- Relevant Paths: ${JSON.stringify(relevantPaths, null, 2)}

## Project Path
${projectPath}

## Instructions
Analyze ONLY the ${domain} domain. Focus on files in the relevant paths.

${skill}

## Output Format
Output ONLY a JSON array of findings (no markdown, no explanation):

[
  {
    "id": "${domain.toUpperCase().slice(0, 3)}-001",
    "title": "string",
    "severity": "critical|high|medium|low",
    "category": "string",
    "evidence": {
      "file": "path/to/file",
      "lines": "10-20",
      "code_snippet": "relevant code"
    },
    "impact": "string",
    "recommendation": {
      "action": "string",
      "effort": "low|medium|high",
      "code_example": "optional fix code"
    },
    "tags": ["tag1", "tag2"]
  }
]
`;
}

function generateSynthesisPrompt(projectPath, allFindings, discoveryData) {
  return `
# Task: Cross-Domain Synthesis

## Project Context
- Project: ${discoveryData.project_name}
- Tech Stack: ${JSON.stringify(discoveryData.tech_stack, null, 2)}

## All Findings from Domain Analysis
${JSON.stringify(allFindings, null, 2)}

## Instructions
1. Identify SYSTEMIC PATTERNS that span multiple domains
2. Deduplicate overlapping findings
3. Build dependency graph between findings
4. Create phased execution plan

## Output Format
Output ONLY a JSON object (no markdown, no explanation):

{
  "summary": {
    "total_findings": number,
    "by_severity": {"critical": n, "high": n, "medium": n, "low": n},
    "health_score": number (0-100)
  },
  "systemic_patterns": [
    {
      "id": "SYS-001",
      "name": "Pattern Name",
      "description": "What this pattern means",
      "contributing_findings": ["ID-001", "ID-002"],
      "severity": "critical|high|medium|low",
      "recommendation": "How to address"
    }
  ],
  "deduplicated_findings": [/* merged findings array */],
  "execution_plan": {
    "phase_0_immediate": {
      "name": "Critical Blockers",
      "timing": "Before production",
      "findings": ["ID-001"],
      "effort_estimate": "X days"
    },
    "phase_1_foundation": {
      "name": "Foundation",
      "timing": "Sprint 1", 
      "findings": ["ID-002", "ID-003"],
      "effort_estimate": "X days"
    },
    "phase_2_stability": {
      "name": "Stability",
      "timing": "Sprint 2",
      "findings": ["ID-004"],
      "effort_estimate": "X days"
    },
    "phase_3_hardening": {
      "name": "Hardening",
      "timing": "Sprint 3+",
      "findings": ["ID-005"],
      "effort_estimate": "X days"
    }
  }
}
`;
}

function getRelevantPaths(domain, discoveryData) {
  const pathMapping = {
    frontend: discoveryData.structure?.frontend_paths || [],
    backend: discoveryData.structure?.backend_paths || [],
    data: discoveryData.structure?.data_paths || [],
    external: [...(discoveryData.structure?.backend_paths || [])],
    security: ['**/*'], // Security needs broad access
    infrastructure: discoveryData.structure?.config_files || [],
    performance: ['**/*'], // Performance needs broad access
    quality: ['**/*'] // Quality needs broad access
  };
  
  return pathMapping[domain] || [];
}

// ============================================================================
// CLAUDE CODE EXECUTOR
// ============================================================================

/**
 * Execute a prompt using Claude Code CLI
 * Each execution is a FRESH session (no context carryover)
 */
async function executeClaudeCode(prompt, model, outputFile) {
  return new Promise((resolve, reject) => {
    // Write prompt to temp file
    const tempPromptFile = `/tmp/ucof-prompt-${Date.now()}.txt`;
    fs.writeFileSync(tempPromptFile, prompt);
    
    // Build command
    // Note: Adjust this based on actual Claude Code CLI syntax
    const command = `claude --model ${model} --print --prompt-file ${tempPromptFile}`;
    
    log(`  Using model: ${model}`, 'yellow');
    
    try {
      const output = execSync(command, {
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
        timeout: 300000 // 5 minute timeout
      });
      
      // Clean up temp file
      fs.unlinkSync(tempPromptFile);
      
      // Try to parse JSON from output
      const jsonMatch = output.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (outputFile) {
          fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
        }
        resolve(parsed);
      } else {
        // Save raw output
        if (outputFile) {
          fs.writeFileSync(outputFile, output);
        }
        resolve(output);
      }
    } catch (error) {
      fs.unlinkSync(tempPromptFile);
      reject(error);
    }
  });
}

/**
 * Alternative: Execute using Anthropic API directly
 * This gives more control over model selection
 */
async function executeAnthropicAPI(prompt, model) {
  // This would use the Anthropic SDK
  // Keeping as placeholder - implement if Claude Code CLI doesn't work
  
  const Anthropic = require('@anthropic-ai/sdk');
  const client = new Anthropic();
  
  const response = await client.messages.create({
    model: CONFIG.models[model],
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const text = response.content[0].text;
  
  // Try to parse JSON
  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return text;
}

// ============================================================================
// MAIN ORCHESTRATION
// ============================================================================

async function runAnalysis(projectPath, options = {}) {
  const startTime = Date.now();
  const outputPath = ensureOutputDir(projectPath);
  
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Universal Codebase Optimization Framework (UCOF)       ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝', 'cyan');
  
  log(`\nProject: ${projectPath}`, 'bright');
  log(`Output:  ${outputPath}`, 'bright');
  
  // -------------------------------------------------------------------------
  // Phase 1: Discovery (Haiku - cheap)
  // -------------------------------------------------------------------------
  logStep('1/4', 'Discovery Phase (using Haiku)');
  
  let discoveryData;
  const discoveryFile = path.join(outputPath, 'discovery.json');
  
  if (options.skipDiscovery && fs.existsSync(discoveryFile)) {
    log('  Using cached discovery data', 'yellow');
    discoveryData = JSON.parse(fs.readFileSync(discoveryFile, 'utf8'));
  } else {
    const discoveryPrompt = generateDiscoveryPrompt(projectPath);
    
    try {
      discoveryData = await executeAnthropicAPI(discoveryPrompt, 'haiku');
      fs.writeFileSync(discoveryFile, JSON.stringify(discoveryData, null, 2));
      logSuccess('Discovery complete');
    } catch (error) {
      logError(`Discovery failed: ${error.message}`);
      process.exit(1);
    }
  }
  
  // Show discovery summary
  log(`\n  Tech Stack: ${Object.values(discoveryData.tech_stack).flat().filter(Boolean).join(', ')}`, 'cyan');
  log(`  Files: ${discoveryData.file_counts?.total || 'unknown'}`, 'cyan');
  log(`  Tests: ${discoveryData.quality_indicators?.has_tests ? '✓' : '✗'}`, 
      discoveryData.quality_indicators?.has_tests ? 'green' : 'red');
  log(`  CI/CD: ${discoveryData.quality_indicators?.has_ci_cd ? '✓' : '✗'}`,
      discoveryData.quality_indicators?.has_ci_cd ? 'green' : 'red');
  
  // -------------------------------------------------------------------------
  // Phase 2: Domain Analysis (Each in fresh context)
  // -------------------------------------------------------------------------
  logStep('2/4', 'Domain Analysis (isolated contexts)');
  
  const domainOrder = [
    // Priority 1: Critical domains (use Opus)
    'security', 'external', 'data', 'backend',
    // Priority 2: Standard domains (use Sonnet)
    'frontend', 'infrastructure', 'performance', 'quality'
  ];
  
  // Filter domains based on relevance
  const relevantDomains = domainOrder.filter(domain => {
    if (domain === 'frontend' && !discoveryData.tech_stack?.frontend?.length) return false;
    if (domain === 'external' && !discoveryData.tech_stack?.ai_services?.length && 
        !discoveryData.tech_stack?.queue) return false;
    return true;
  });
  
  const allFindings = [];
  
  for (const domain of relevantDomains) {
    const domainConfig = CONFIG.domains[domain];
    log(`\n  Analyzing: ${domain} (${domainConfig.model})`, 'magenta');
    
    const domainPrompt = generateDomainPrompt(domain, projectPath, discoveryData);
    const domainFile = path.join(outputPath, `${domain}-findings.json`);
    
    try {
      const findings = await executeAnthropicAPI(domainPrompt, domainConfig.model);
      
      if (Array.isArray(findings)) {
        allFindings.push(...findings);
        fs.writeFileSync(domainFile, JSON.stringify(findings, null, 2));
        logSuccess(`${domain}: ${findings.length} findings`);
      } else {
        log(`  Warning: ${domain} returned non-array output`, 'yellow');
      }
    } catch (error) {
      logError(`${domain} failed: ${error.message}`);
    }
  }
  
  // Save all findings
  fs.writeFileSync(
    path.join(outputPath, 'all-findings.json'),
    JSON.stringify(allFindings, null, 2)
  );
  
  log(`\n  Total findings: ${allFindings.length}`, 'bright');
  
  // -------------------------------------------------------------------------
  // Phase 3: Synthesis (Opus - needs intelligence)
  // -------------------------------------------------------------------------
  logStep('3/4', 'Synthesis Phase (using Opus)');
  
  const synthesisPrompt = generateSynthesisPrompt(projectPath, allFindings, discoveryData);
  let synthesisResult;
  
  try {
    synthesisResult = await executeAnthropicAPI(synthesisPrompt, 'opus');
    fs.writeFileSync(
      path.join(outputPath, 'synthesis.json'),
      JSON.stringify(synthesisResult, null, 2)
    );
    logSuccess('Synthesis complete');
  } catch (error) {
    logError(`Synthesis failed: ${error.message}`);
    // Create basic synthesis from raw findings
    synthesisResult = {
      summary: {
        total_findings: allFindings.length,
        by_severity: countBySeverity(allFindings),
        health_score: calculateHealthScore(allFindings)
      },
      deduplicated_findings: allFindings,
      execution_plan: generateBasicPlan(allFindings)
    };
  }
  
  // -------------------------------------------------------------------------
  // Phase 4: Report Generation
  // -------------------------------------------------------------------------
  logStep('4/4', 'Generating Reports');
  
  generateMarkdownReport(outputPath, discoveryData, synthesisResult);
  logSuccess('Reports generated');
  
  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  log('\n╔════════════════════════════════════════════════════════════╗', 'green');
  log('║                    Analysis Complete                        ║', 'green');
  log('╚════════════════════════════════════════════════════════════╝', 'green');
  
  log(`\nHealth Score: ${synthesisResult.summary?.health_score || 'N/A'}/100`, 'bright');
  log(`Duration: ${duration}s`, 'bright');
  log(`\nFindings by Severity:`, 'bright');
  
  const severities = synthesisResult.summary?.by_severity || countBySeverity(allFindings);
  log(`  🔴 Critical: ${severities.critical || 0}`, severities.critical ? 'red' : 'reset');
  log(`  🟠 High:     ${severities.high || 0}`, severities.high ? 'yellow' : 'reset');
  log(`  🟡 Medium:   ${severities.medium || 0}`, 'reset');
  log(`  🔵 Low:      ${severities.low || 0}`, 'reset');
  
  log(`\nReports saved to: ${outputPath}`, 'cyan');
  log(`  - report.md          (Executive summary)`, 'reset');
  log(`  - synthesis.json     (Full analysis)`, 'reset');
  log(`  - all-findings.json  (Raw findings)`, 'reset');
  
  // -------------------------------------------------------------------------
  // Next Steps
  // -------------------------------------------------------------------------
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('Next Steps:', 'bright');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  log('\n1. Review the report:', 'reset');
  log(`   cat ${path.join(outputPath, 'report.md')}`, 'yellow');
  
  log('\n2. Start fixing (new session with clean context):', 'reset');
  log(`   ucof fix ${projectPath}`, 'yellow');
  
  log('\n3. Re-analyze after fixes:', 'reset');
  log(`   ucof analyze ${projectPath}`, 'yellow');
  
  return synthesisResult;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function countBySeverity(findings) {
  return findings.reduce((acc, f) => {
    acc[f.severity] = (acc[f.severity] || 0) + 1;
    return acc;
  }, {});
}

function calculateHealthScore(findings) {
  const weights = { critical: 20, high: 10, medium: 3, low: 1 };
  const totalPenalty = findings.reduce((sum, f) => sum + (weights[f.severity] || 0), 0);
  return Math.max(0, 100 - totalPenalty);
}

function generateBasicPlan(findings) {
  return {
    phase_0_immediate: {
      findings: findings.filter(f => f.severity === 'critical').map(f => f.id)
    },
    phase_1_foundation: {
      findings: findings.filter(f => f.severity === 'high').map(f => f.id)
    },
    phase_2_stability: {
      findings: findings.filter(f => f.severity === 'medium').map(f => f.id)
    },
    phase_3_hardening: {
      findings: findings.filter(f => f.severity === 'low').map(f => f.id)
    }
  };
}

function generateMarkdownReport(outputPath, discoveryData, synthesisResult) {
  const report = `# Codebase Optimization Report

## Project: ${discoveryData.project_name}
Generated: ${new Date().toISOString()}

## Health Score: ${synthesisResult.summary?.health_score || 'N/A'}/100

## Executive Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | ${synthesisResult.summary?.by_severity?.critical || 0} |
| 🟠 High | ${synthesisResult.summary?.by_severity?.high || 0} |
| 🟡 Medium | ${synthesisResult.summary?.by_severity?.medium || 0} |
| 🔵 Low | ${synthesisResult.summary?.by_severity?.low || 0} |

## Tech Stack
${Object.entries(discoveryData.tech_stack || {})
  .filter(([_, v]) => v && (Array.isArray(v) ? v.length : true))
  .map(([k, v]) => `- **${k}**: ${Array.isArray(v) ? v.join(', ') : v}`)
  .join('\n')}

## Systemic Patterns
${(synthesisResult.systemic_patterns || [])
  .map(p => `### ${p.name}\n${p.description}\n\n**Recommendation**: ${p.recommendation}`)
  .join('\n\n') || 'No systemic patterns identified.'}

## Execution Plan

### Phase 0: Immediate (Before Production)
${formatPhaseFindings(synthesisResult.execution_plan?.phase_0_immediate, synthesisResult.deduplicated_findings)}

### Phase 1: Foundation (Sprint 1)
${formatPhaseFindings(synthesisResult.execution_plan?.phase_1_foundation, synthesisResult.deduplicated_findings)}

### Phase 2: Stability (Sprint 2)
${formatPhaseFindings(synthesisResult.execution_plan?.phase_2_stability, synthesisResult.deduplicated_findings)}

### Phase 3: Hardening (Sprint 3+)
${formatPhaseFindings(synthesisResult.execution_plan?.phase_3_hardening, synthesisResult.deduplicated_findings)}

---

## All Findings

${(synthesisResult.deduplicated_findings || [])
  .map(f => `### ${f.id}: ${f.title}
- **Severity**: ${f.severity}
- **File**: ${f.evidence?.file || 'N/A'}
- **Impact**: ${f.impact || 'N/A'}
- **Fix**: ${f.recommendation?.action || 'N/A'}
- **Effort**: ${f.recommendation?.effort || 'N/A'}
`)
  .join('\n')}
`;

  fs.writeFileSync(path.join(outputPath, 'report.md'), report);
}

function formatPhaseFindings(phase, findings) {
  if (!phase?.findings?.length) return 'No items in this phase.';
  
  return phase.findings
    .map(id => {
      const f = findings?.find(f => f.id === id);
      return f ? `- **${id}**: ${f.title}` : `- ${id}`;
    })
    .join('\n');
}

// ============================================================================
// FIX MODE - Start new session with findings context
// ============================================================================

async function runFixMode(projectPath) {
  const outputPath = path.join(projectPath, CONFIG.outputDir);
  const synthesisFile = path.join(outputPath, 'synthesis.json');
  
  if (!fs.existsSync(synthesisFile)) {
    logError('No analysis found. Run "ucof analyze" first.');
    process.exit(1);
  }
  
  const synthesis = JSON.parse(fs.readFileSync(synthesisFile, 'utf8'));
  
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║                    Fix Mode (New Session)                   ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝', 'cyan');
  
  // Show critical and high findings
  const criticalFindings = (synthesis.deduplicated_findings || [])
    .filter(f => f.severity === 'critical' || f.severity === 'high');
  
  log('\nPriority Findings:', 'bright');
  criticalFindings.forEach((f, i) => {
    const color = f.severity === 'critical' ? 'red' : 'yellow';
    log(`  ${i + 1}. [${f.severity.toUpperCase()}] ${f.id}: ${f.title}`, color);
  });
  
  log('\nOptions:', 'bright');
  log('  1. Fix all critical issues (recommended)', 'reset');
  log('  2. Fix specific finding by ID', 'reset');
  log('  3. Generate fix PR descriptions', 'reset');
  log('  4. Exit', 'reset');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('\nSelect option (1-4): ', async (answer) => {
    rl.close();
    
    switch (answer) {
      case '1':
        await fixCriticalIssues(projectPath, criticalFindings);
        break;
      case '2':
        // Would prompt for specific ID
        log('Feature coming soon', 'yellow');
        break;
      case '3':
        generatePRDescriptions(outputPath, synthesis);
        break;
      default:
        log('Exiting.', 'reset');
    }
  });
}

async function fixCriticalIssues(projectPath, findings) {
  log('\nStarting fix session with Claude...', 'cyan');
  log('(This starts a NEW session with only the relevant findings context)\n', 'yellow');
  
  const fixPrompt = `
# Task: Fix Critical Codebase Issues

## Project Path
${projectPath}

## Findings to Fix (in priority order)
${findings.map(f => `
### ${f.id}: ${f.title}
- **Severity**: ${f.severity}
- **File**: ${f.evidence?.file}
- **Lines**: ${f.evidence?.lines || 'N/A'}
- **Current Code**: 
\`\`\`
${f.evidence?.code_snippet || 'See file'}
\`\`\`
- **Required Fix**: ${f.recommendation?.action}
- **Example Fix**:
\`\`\`
${f.recommendation?.code_example || 'Implement based on action'}
\`\`\`
`).join('\n')}

## Instructions
1. Fix each issue in order of severity (critical first)
2. Make minimal, focused changes
3. Preserve existing functionality
4. After each fix, briefly confirm what was changed

Start with the first critical issue.
`;

  // This would launch Claude Code with the fix prompt
  log('Launching Claude Code with fix context...', 'cyan');
  log('\nPrompt saved to: /tmp/ucof-fix-prompt.txt', 'yellow');
  fs.writeFileSync('/tmp/ucof-fix-prompt.txt', fixPrompt);
  
  log('\nTo start fixing, run:', 'bright');
  log('  claude --prompt-file /tmp/ucof-fix-prompt.txt', 'yellow');
}

function generatePRDescriptions(outputPath, synthesis) {
  const phases = synthesis.execution_plan || {};
  const findings = synthesis.deduplicated_findings || [];
  
  let prDoc = '# Pull Request Descriptions\n\n';
  
  Object.entries(phases).forEach(([phase, data]) => {
    if (!data?.findings?.length) return;
    
    prDoc += `## ${phase.replace(/_/g, ' ').toUpperCase()}\n\n`;
    
    data.findings.forEach(id => {
      const f = findings.find(f => f.id === id);
      if (!f) return;
      
      prDoc += `### PR: Fix ${f.id} - ${f.title}\n\n`;
      prDoc += `**Type**: ${f.severity === 'critical' ? '🔴 Critical Fix' : f.severity === 'high' ? '🟠 High Priority' : '🟡 Improvement'}\n\n`;
      prDoc += `**Description**:\n${f.impact || f.title}\n\n`;
      prDoc += `**Changes**:\n- ${f.recommendation?.action}\n\n`;
      prDoc += `**Files**: \`${f.evidence?.file || 'TBD'}\`\n\n`;
      prDoc += `---\n\n`;
    });
  });
  
  const prFile = path.join(outputPath, 'pr-descriptions.md');
  fs.writeFileSync(prFile, prDoc);
  logSuccess(`PR descriptions saved to: ${prFile}`);
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

const args = process.argv.slice(2);
const command = args[0];
const projectPath = args[1] || process.cwd();

// Resolve to absolute path
const absolutePath = path.resolve(projectPath);

if (!fs.existsSync(absolutePath)) {
  logError(`Project path does not exist: ${absolutePath}`);
  process.exit(1);
}

switch (command) {
  case 'analyze':
    runAnalysis(absolutePath, {
      skipDiscovery: args.includes('--skip-discovery')
    });
    break;
    
  case 'fix':
    runFixMode(absolutePath);
    break;
    
  case 'report':
    const reportPath = path.join(absolutePath, CONFIG.outputDir, 'report.md');
    if (fs.existsSync(reportPath)) {
      console.log(fs.readFileSync(reportPath, 'utf8'));
    } else {
      logError('No report found. Run "ucof analyze" first.');
    }
    break;
    
  case 'help':
  default:
    log(`
Universal Codebase Optimization Framework (UCOF)

Usage:
  ucof analyze <project-path>    Run full analysis
  ucof fix <project-path>        Start fix session (new context)
  ucof report <project-path>     View existing report

Options:
  --skip-discovery    Use cached discovery data

Examples:
  ucof analyze /path/to/my/project
  ucof fix /path/to/my/project
  ucof analyze . --skip-discovery
`, 'reset');
}

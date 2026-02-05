# Infrastructure Domain Analysis

Analyze the deployment configuration, CI/CD pipelines, and environment management.

## Checks
- **CI/CD Pipeline**: Is there automated testing, linting, and type-checking before deployment (e.g., GitHub Actions)?
- **Error Monitoring**: Is a service like Sentry or LogRocket configuration to catch production errors?
- **Health Checks**: Does the app provide an endpoint to verify its health?
- **Secrets Management**: Are secrets stored in environment variables and excluded from source control?
- **Environment Separation**: Are there clear boundaries between development, staging, and production environments?
- **Logging Architecture**: Is there a centralized logging strategy for debugging production issues?

## Finding Examples
- INFRA-001: No CI/CD pipeline configured for automated testing.
- INFRA-002: Production error monitoring is missing.
- INFRA-003: Secrets detected in public configuration files.

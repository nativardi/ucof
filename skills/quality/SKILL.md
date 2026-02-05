# Quality Domain Analysis

Analyze the code quality, testing debt, and maintainability.

## Checks
- **Test Coverage**: Are there automated tests (Unit, Integration, E2E) for critical logic?
- **Type Safety**: Is TypeScript used strictly without excessive use of `any` types?
- **Linting & Formatting**: Is there a consistent code style enforced by tools like ESLint and Prettier?
- **Documentation**: Is complex logic explained through comments or README files?
- **Code Smells**: Look for long functions, deep nesting, or high cyclomatic complexity.
- **Tech Debt**: Are there numerous TBDs or outdated dependency warnings?

## Finding Examples
- QA-001: Zero automated test coverage for core business logic.
- QA-002: Excessive use of 'any' in TypeScript definitions.
- QA-003: Lack of internal documentation for complex algorithms.

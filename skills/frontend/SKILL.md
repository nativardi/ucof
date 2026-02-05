# Frontend Domain Analysis

Analyze the client-side architecture, performance, and user experience.

## Checks
- **Server vs Client Components**: (Next.js context) Are components that don't need interactivity unnecessarily marked as client components?
- **Bundle Size**: Are large libraries imported where smaller alternatives exist or code-splitting is missing?
- **Loading & Error States**: Does the UI provide meaningful feedback for slow fetches or network errors?
- **Data Fetching Patterns**: Are there race conditions or unnecessary refetches on every render?
- **Accessibility (a11y)**: Are basic aria-labels, alt-tags, and semantic HTML elements used correctly?
- **Pagination/Virtualization**: Are large lists rendered efficiently without causing browser lag?

## Finding Examples
- FE-001: Unnecessary 'use client' on static SEO components.
- FE-002: Large data payload fetched on every page navigation.
- FE-003: Missing accessibility labels on interactive elements.

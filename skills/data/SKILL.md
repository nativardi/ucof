# Data Layer Domain Analysis

Analyze the data access patterns, database interactions, and schema design.

## Checks
- **N+1 Queries**: Are multiple individual queries executed in a loop where a single join or batch query would suffice?
- **Unbounded Queries**: Are there `SELECT *` queries without a `LIMIT`, especially on large tables?
- **Missing Indexes**: Are common filter or join columns (especially foreign keys) missing indexes?
- **Schema Issues**: Check for missing constraints (NOT NULL, UNIQUE), wrong data types, or lack of referential integrity.
- **Migrations**: Are database migrations versioned and reproducible?
- **Client-Side DB Access**: Is the database accessed directly from the frontend (unless using a secure backend-as-a-service like Supabase with proper RLS)?
- **Pagination**: Are large datasets returned to the client without pagination?

## Finding Examples
- DB-001: N+1 query in resource listing.
- DB-002: Unbounded query on events table.
- DB-003: Missing index on user_id foreign key.

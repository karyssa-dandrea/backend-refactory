# Refactory

## Getting Started

Use [this template](https://github.com/alchemycodelab/backend-refactory) to get started.

### Learning Objectives

- Utilize Router to implement a horizontally scalable Express App architecture
- Use the pg library with $1, $2, $3 syntax to sanitize our SQL queries to prevent SQL injection.
- Use pg to make queries against a Postgres DB
- Connect to a Postgres DB using the pg node module

### Description

ACME Widgets Factory, Inc. has hired you to help clean up the implementation of their order tracking API. They have some big plans for the future of this API, but need to address some lingering tech debt issues before new features can be added.

Your task is to refactor the `orders` controller by extracting any database-related functionality into the corresponding `Order` model. You can then refactor the existing tests to use your `Order` model.

### Acceptance Criteria

- `orders` controller doesn't include any SQL queries
- `Order` model has all existing methods implemented
- `app.test.js` uses the `Order` model instead of SQL

### Rubric

| Task                                  | Points |
| ------------------------------------- | ------ |
| `orders` controller refactored        | 4      |
| `Order` model implementation complete | 4      |
| Tests refactored to use `Order` model | 2      |

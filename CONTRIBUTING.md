# Contributing to Beiju
 
First of all, thank you for your interest in contributing! Beiju is an open-source analytical query builder for Node.js, and every contribution — no matter how small — helps move the project forward.
 
---
 
## Table of Contents
 
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Opening a Pull Request](#opening-a-pull-request)
- [Good First Issues](#good-first-issues)
---
 
## Getting Started
 
### Prerequisites
 
- Node.js >= 20
- npm >= 10
- Docker (required for integration tests via Testcontainers)
### Setup
 
```bash
# Clone the repository
git clone https://github.com/junior-zip/beiju.git
cd beiju
 
# Install dependencies
npm install
 
# Run tests
npm test
```
 
---
 
## Project Structure
 
```
beiju/
├── src/
│   ├── domain/         # Core domain classes (ColumnRef, WindowSpec, SelectQuery...)
│   ├── application/    # Ports and use cases
│   └── infrastructure/ # Adapters (PgAdapter, SqlGenerator...)
├── tests/
│   ├── unit/           # Unit tests (Vitest)
│   └── integration/    # Integration tests (Testcontainers + PostgreSQL)
└── docs/               # Additional documentation
```
 
The project follows a **hexagonal architecture** with Domain-Driven Design principles. If you're not familiar with these concepts, feel free to open a discussion — we're happy to help.
 
---
 
## How to Contribute
 
There are many ways to contribute:
 
- 🐛 **Report bugs** — open an issue describing the problem, steps to reproduce, and expected behavior
- 💡 **Suggest features** — open an issue with the `enhancement` label and describe your use case
- 📖 **Improve documentation** — fix typos, add examples, translate content
- 🔧 **Submit code** — pick an issue and open a pull request
If you're unsure where to start, look for issues labeled [`good first issue`](../../issues?q=label%3A%22good+first+issue%22).
 
---
 
## Development Workflow
 
```bash
# Run unit tests
npm test
 
# Run tests in watch mode
npm run test:watch
 
# Run tests with coverage
npm run test:coverage
 
# Build the project
npm run build
```
 
Make sure all tests pass before opening a pull request.
 
---
 
## Commit Convention
 
This project uses [Conventional Commits](https://www.conventionalcommits.org/):
 
```
<type>: <short description>
 
Types:
  feat      → new feature
  fix       → bug fix
  docs      → documentation changes
  test      → adding or updating tests
  refactor  → code change that neither fixes a bug nor adds a feature
  chore     → build process, dependencies, config
```
 
Examples:
```
feat: add ROWS frame support to WindowSpec
fix: correct frame bounds calculation for RANGE mode
docs: add usage example for partition by clause
test: add integration test for cumulative sum query
```
 
---
 
## Opening a Pull Request
 
1. Fork the repository and create a branch from `main`
2. Name your branch descriptively: `feat/window-frame-rows` or `fix/frame-bounds`
3. Make your changes and write or update tests
4. Run `npm test` and confirm everything passes
5. Open a pull request with a clear description of what you changed and why
For larger changes, consider opening an issue first to discuss the approach before investing time in implementation.
 
---
 
## Good First Issues
 
Not sure where to start? Here are some areas that are always welcome contributions:
 
- Adding more usage examples to the README
- Writing missing unit tests
- Improving TypeScript types and JSDoc comments
- Translating documentation
Look for the [`good first issue`](../../issues?q=label%3A%22good+first+issue%22) label on the issues page.
 
---
 
## Questions?
 
Open a [discussion](../../discussions) or reach out via the issues page. We're a friendly bunch. 👋
 
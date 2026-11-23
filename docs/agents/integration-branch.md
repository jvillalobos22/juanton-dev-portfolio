# Integration-branch workflow

Local checks replace per-PR CI: fewer PRs to merge and fewer CI runs. Work lands in an integration branch, and one reviewed batch PR goes to the default branch.

- Default branch: `main`
- Integration branch: `agent-dev` (cut from `main`)
- Integrator: `walle-bot`

## Rules for workers

1. Branch from `agent-dev`, never from `main`. Name the branch `<issue-number>-<short-slug>`.
2. Before pushing, run every local check below and make sure each passes. If the environment is broken, stop and report; never skip a check.
3. Push your branch and report. Do not open a PR to `main`, do not merge anything.
4. Report: the branch pushed, each command run, and its result (pass/fail, with the failing output if any).
5. Never push to or merge into `main`.

## Local checks

This repo has **no CI workflows** (no `.github/workflows`), so these local checks are the only gate. Run from the repo root (`npm ci` first on a fresh checkout). Timings measured once on a developer machine.

| Command | What it checks | Time |
| --- | --- | --- |
| `npm run lint` | ESLint via `next lint` | ~4 s |
| `npx tsc --noEmit` | TypeScript typecheck | ~7 s |
| `npm run test:run` | Vitest unit tests (44 tests) | ~10 s |
| `npm run build` | Next.js static export to `dist/` | ~50 s |

If you change anything under `devops/` (CDK infrastructure; this is exempt work, see below), also run, from `devops/` after `npm ci`: `npx jest` (~17 s).

## The integrator

After a worker reports green checks, `walle-bot`:

- squash-merges the worker branch into `agent-dev`, one commit per issue with the issue reference in the message;
- re-runs the local checks above on the combined `agent-dev` tip (at least lint, typecheck and tests; the full list before a batch PR);
- reverts a merge that breaks the combined checks and sends the worker the failure; a worker whose branch conflicts is sent back to rebase onto `agent-dev`;
- syncs `agent-dev` to `main` after a batch PR merges.

## Batch PR to `main`

`walle-bot` opens a PR from `agent-dev` to `main` when the owner asks, or once 10 workers' commits have landed, whichever comes first. The body has a summary per issue (what changed, local check evidence, open decisions) with `Closes #n` lines, plus cumulative check results. It must never contain a failing tip. It lands as a **merge commit**, not a squash or rebase, so per-issue commits stay in `main`'s history: revert one issue with `git revert <sha>` and a whole batch with `git revert -m 1 <merge>`.

## Exemptions: separate PR to `main`, individual owner review

These are never batched. Branch from `main`, open a PR to `main`, and the owner reviews it.

| Class | Paths in this repo |
| --- | --- |
| Workflow and CI files | `.github/**` (none today; agent tokens cannot push workflow files, the owner pushes them) |
| Deploy and infra | `devops/**` (AWS CDK stack), `next.config.ts` (static export settings), any deploy or pipeline config |
| Data migrations and storage shape | None today: the site is static and has no database. Treat any change to content storage shape (front matter fields in `posts/**`, `projects/**`, `pages/**` that code depends on) as hard to reverse only if it breaks existing content. |
| Security and auth | Secrets, credentials, environment files, `.env*`, IAM or certificate settings in `devops/**` |
| Hard to reverse | `package.json` / `package-lock.json` major dependency or framework upgrades, `UPGRADE_PLAN.md` items, repo settings, anything that publishes to production |

Production deploys count as exempt. This repo has no auto-deploy: the README describes a manual build (`npm run build`) plus CDK deploy from `devops/`, and a planned pipeline that is not set up.

## Never

Change repository settings, rulesets or secrets; those are the owner's.

# Playwright MCP Testing System

## Purpose

This document defines the minimum testing standard for the Playwright MCP system. It covers system integration testing (IST), user acceptance testing (UAT), end-to-end testing (E2E), and automated regression testing.

## Quality Principles

- Test behavior that matters to users and integrated systems, not implementation details.
- Keep tests independent, deterministic, and safe to run repeatedly.
- Use stable, accessible Playwright locators in this order: role, label, text, test ID.
- Keep production data isolated from automated tests; use dedicated accounts and disposable test data.
- Record failures with enough evidence to reproduce and diagnose them: trace, screenshot, video when configured, console output, and relevant request details.
- Treat a failing critical-path test as a release blocker unless the release owner documents an approved exception.

## Test Levels

### System Integration Testing (IST)

IST verifies that the application works correctly with its real or representative dependencies, including APIs, authentication providers, databases, message queues, and third-party services.

**Minimum standard**

- Verify every supported integration's happy path and its expected failure behavior.
- Validate contracts at the boundary: request shape, response shape, authentication, authorization, error mapping, timeouts, and retry behavior.
- Use controlled test environments and test doubles only where a real dependency is unavailable, costly, or unsafe.
- Confirm data created by a test is cleaned up or isolated by a unique test run identifier.

**Entry criteria**

- Deployed test environment is available with documented endpoints and credentials.
- Required dependency versions and test data are known.

**Exit criteria**

- All critical integrations pass their defined scenarios.
- No unresolved critical or high-severity integration defect remains.
- Test evidence is attached to the delivery record.

### User Acceptance Testing (UAT)

UAT confirms that a release supports agreed business workflows and is acceptable to the accountable business users.

**Minimum standard**

- Define UAT scenarios in business language with a clear expected result and acceptance owner.
- Cover primary workflows, relevant permissions, validation messages, and the most likely error recovery paths.
- Run UAT in an environment representative of production configuration and roles.
- Capture approval, rejection, or conditional approval with known limitations and owners.

**Entry criteria**

- Functional, E2E, and required IST checks have passed.
- Release notes, scope, known issues, and test accounts are available to UAT participants.

**Exit criteria**

- Designated business owner accepts the release, or approved exceptions are documented.
- Blocking acceptance defects are resolved and retested.

### End-to-End Testing (E2E)

E2E tests validate complete user journeys through the browser and the services required to finish those journeys.

**Minimum standard**

- Automate critical paths first: sign-in, authorization, primary create/read/update/delete actions, payments or submissions where applicable, and sign-out.
- Assert user-visible outcomes and significant service-side effects; avoid brittle assertions about layout or internal implementation.
- Use Playwright fixtures for setup and cleanup, with isolated data per test.
- Run the critical suite on every pull request; run the broader cross-browser suite before release and on a scheduled basis.
- Test Chromium, Firefox, and WebKit unless the product's browser support policy explicitly limits the scope.

**Exit criteria**

- All critical-path journeys pass in supported browsers.
- Failures have trace artifacts and a recorded defect or approved exception.

### Automation Testing

Automation testing provides repeatable, fast feedback across unit, API, integration, and browser tests. Playwright is the browser automation standard for this repository.

**Playwright conventions**

- Store browser specs in `tests/` and name them `*.spec.ts`.
- Give each test a behavior-focused name, such as `user can submit a valid request`.
- Prefer `getByRole`, `getByLabel`, and `getByTestId`; do not rely on CSS classes, XPath, or positional selectors unless no stable semantic locator exists.
- Use `expect` assertions with Playwright auto-waiting instead of fixed delays such as `waitForTimeout`.
- Keep each test self-contained; do not depend on test order or a previous test's data.
- Do not commit focused tests (`test.only`) or disabled tests without a tracked reason.
- Enable trace collection on retry and retain artifacts for failed CI runs.

**CI execution standard**

- Pull requests run lint/type checks where configured and the critical automated suite.
- CI fails when focused tests are committed.
- Failed tests are retried only to identify intermittent behavior; retries do not replace defect investigation.
- A test that flakes repeatedly is quarantined only with an owner, tracking item, and restoration target date.

## Defect Severity and Release Decision

| Severity | Definition                                                          | Release decision                               |
| -------- | ------------------------------------------------------------------- | ---------------------------------------------- |
| Critical | Prevents a core workflow, compromises security, or risks data loss. | Block release.                                 |
| High     | Major workflow failure without a reasonable workaround.             | Block release unless formally accepted.        |
| Medium   | Important defect with a reasonable workaround.                      | Resolve or document acceptance before release. |
| Low      | Minor usability, cosmetic, or non-critical issue.                   | Track for planned remediation.                 |

## Required Test Evidence

For every release, retain the test run identifier, environment, browser coverage, executed scenarios, results, known issues, and approval record. For failed Playwright runs, retain the HTML report and relevant trace artifacts.

## Definition of Done

A change is ready to release when its applicable IST, UAT, E2E, and automation requirements meet the entry and exit criteria in this document, critical defects are resolved or formally accepted by the release owner, and test evidence is available for review.

## Mandatory MCP Interaction Rules

You must:

1. Interact with the application using Playwright MCP tools.
2. Inspect real DOM elements and observed behavior.
3. Generate test code based only on verified interactions.

**Rules**

1. Never hallucinate selectors.
2. Never assume the DOM structure.
3. Always validate through MCP execution.

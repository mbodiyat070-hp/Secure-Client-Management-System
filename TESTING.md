# Test Plan — Secure Client Management System

Manual test plan for the client form and client list. Each scenario was
run in a browser against the current version of the code.

## How to run these tests

Open `index.html` in a browser (or serve the folder with
`python -m http.server` and visit `localhost:8000`). Use DevTools →
Application → Local Storage to inspect what is saved.

## Validation scenarios

| # | Scenario | Steps | Expected result | Status |
|---|----------|-------|-----------------|--------|
| 1 | Empty submission | Submit with both fields empty | "Name is required" and "Email is required" shown inline; nothing saved | ✅ Pass |
| 2 | Name too short | Enter a 1-character name, valid email, submit | "Name must be at least 2 characters"; nothing saved | ✅ Pass |
| 3 | Missing @ in email | Name valid, email `not-an-email`, submit | "Enter a valid email..." shown; nothing saved | ✅ Pass |
| 4 | Missing domain | Email `user@`, submit | Email error shown; nothing saved | ✅ Pass |
| 5 | Email with spaces | Email `a b@c.com`, submit | Email error shown; nothing saved | ✅ Pass |
| 6 | Valid submission | Valid name and email, submit | "Client saved." shown; client appears in the table; form clears | ✅ Pass |
| 7 | Whitespace-only input | Name `   ` (spaces), submit | Treated as empty — "Name is required" | ✅ Pass |

## Security scenarios

| # | Scenario | Steps | Expected result | Status |
|---|----------|-------|-----------------|--------|
| 8 | Script injection in name | Submit name `<script>alert(1)</script>` with a valid email | Saved and displayed as plain text; no script executes (rows are built with `textContent`, never `innerHTML`) | ✅ Pass |
| 9 | Corrupted storage | Manually set the `clients` localStorage key to invalid JSON, reload | Page loads normally with an empty list instead of crashing | ✅ Pass |

## Persistence scenarios

| # | Scenario | Steps | Expected result | Status |
|---|----------|-------|-----------------|--------|
| 10 | Survives refresh | Save a client, reload the page | Client still listed | ✅ Pass |
| 11 | Remove a client | Click Remove on a row | Row disappears; storage updated; "No clients saved yet." reappears when the list is empty | ✅ Pass |

## Known limitations / failure modes

- **Client-side only.** All validation can be bypassed with DevTools; a real
  deployment must re-validate on the server before storing anything.
- **localStorage is per-browser.** Data is not shared between devices or
  users, and clearing browser data deletes all clients.
- **Email check is a shape check.** `fake@fake.tld` passes validation; only
  a server-side confirmation email can prove an address is real.

Each of these is a deliberate scope decision for a front-end prototype,
and each is listed in the README as the next improvement step.

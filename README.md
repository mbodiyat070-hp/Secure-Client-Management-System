# Secure Client Management System (Prototype)

A small front-end prototype for collecting, validating and managing client
details — built to practise web fundamentals with a security-aware mindset.
Clients are validated on entry, stored in the browser's localStorage, and
listed in a table where they can be removed.

## Features

- **Client form** collecting name and email (data minimisation — only what's needed)
- **Inline validation** — errors appear next to the field, not in an alert:
  - name required, minimum 2 characters
  - email checked against a `user@domain.tld` shape pattern
- **Client list** — valid clients are saved to localStorage and shown in a
  table that survives page refresh, with a Remove action per client
- **XSS-safe rendering** — stored values are inserted with `textContent`,
  never `innerHTML`, so a client named `<script>...` displays as text
  instead of executing
- **Defensive storage handling** — corrupted localStorage data falls back to
  an empty list instead of breaking the page

## How to run it

Open `index.html` in any browser. No build step or dependencies.

## How validation works

Submission is intercepted with `preventDefault()`. Each field is trimmed and
run through its own validation function; failures set an inline error message
and mark the field. Only when every check passes is the client saved and the
list re-rendered.

## Testing

The project has a written test plan — see [TESTING.md](TESTING.md) — covering
validation scenarios, security scenarios (script injection, corrupted
storage) and persistence, with expected results and current status.

## Security considerations

| Principle | How it's applied |
|-----------|------------------|
| Input validation | Malformed or empty data is rejected before it is stored |
| Output encoding | `textContent` rendering prevents stored XSS |
| Data minimisation | Only name and email are collected |
| Defence in depth | Client-side checks are treated as a first layer only — see limitations |

## Limitations and next steps

This is deliberately a client-side prototype. Browser-based checks can be
bypassed, so a production version would need:

1. **Server-side validation** — re-run every check on the server before accepting data
2. **Real persistence** — a database instead of localStorage, behind authentication
3. **Access control** — user accounts and role-based permissions
4. **Audit logging** — who viewed or changed client records, and when

## What I learned

- Structuring HTML, CSS and JavaScript across separate files
- Form handling, event interception and DOM manipulation
- Writing validation as small testable functions rather than one big `if`
- Why `textContent` vs `innerHTML` matters for security
- Writing a test plan and actually executing it against the app

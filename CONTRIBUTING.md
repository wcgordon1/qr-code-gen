# Contributing to QR Code Llama

Thanks for helping improve the project.

## Before you begin

- Search existing issues before opening a new one.
- Open an issue before starting a large feature or architectural change.
- Keep pull requests focused on one problem.
- Do not include secrets, analytics IDs, or unrelated generated files.

## Local development

```bash
npm ci
npm run dev
```

The project requires Node.js 22.22.0 or newer and npm 10 or newer. Run
`nvm use` first when nvm is installed; otherwise use any compatible Node.js
installation.

## Code standards

- Prefer named `function` declarations for components and top-level functions.
- Give components, handlers, and values names that state their purpose.
- Keep generator-specific fields and payload logic separate from shared QR
  rendering behavior.
- Follow the QR payload conventions for the target scanner action; URL encoding
  is not interchangeable with format-specific escaping.
- Add concise JSDoc comments to exported or non-obvious functions.
- Avoid comments that only repeat what a clear line of code already says.
- Preserve accessibility labels and keyboard behavior.
- Keep QR payload generation client-side unless a proposal explicitly changes
  the product's privacy model.

## Validate a change

Run the automated checks:

```bash
npm run check
npm audit
```

For QR-related changes, also:

1. Generate every affected QR type.
2. Check all appearance controls.
3. Download the affected file formats.
4. Scan the result with at least two devices or scanner apps.
5. Check the changed route at mobile and desktop widths.

## Pull requests

Include:

- A short description of the problem and solution
- Screenshots for visible interface changes
- Manual test notes for generator behavior
- Any follow-up work that is intentionally out of scope

By contributing, you agree that your contribution will be licensed under the
MIT License.

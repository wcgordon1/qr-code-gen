# QR Code Llama

An open-source React starter for building customizable QR code tools. It ships
with generators for links or plain text, email, text messages, phone calls, and
Wi-Fi networks. Everything runs in the browser; generated QR data is not sent
to an application server.

[Project website](https://qrcodellama.com) ·
[Report a bug](https://github.com/wcgordon1/qr-code-gen/issues) ·
[View the source](https://github.com/wcgordon1/qr-code-gen)

## Features

- Five client-side QR generator types
- Six module styles with independent outer and inner finder-eye controls
- Solid, linear-gradient, radial-gradient, and transparent color options
- Curated design presets and optional PNG, JPEG, or WebP center logos
- Local QR decoding at three representative sizes with no server upload
- A static scanability panel with contrast and decode guidance
- Adjustable quiet zone, error correction, canvas shape, and SVG-native frames
- PNG, JPEG, WebP, and SVG downloads at custom resolutions
- PNG and SVG clipboard actions
- Responsive components with accessible labels and keyboard controls
- Lazy-loaded routes and Cloudflare Pages SPA support
- Optional Microsoft Clarity analytics through an environment variable
- Zero known dependency vulnerabilities as checked on July 30, 2026

## Quick start

### Requirements

- Node.js 22.22.0 or newer
- npm 10 or newer

The included `.nvmrc` selects the tested Node.js version when you use
[nvm](https://github.com/nvm-sh/nvm). nvm is optional if a compatible Node.js
version is already installed.

### Install and run

```bash
git clone https://github.com/wcgordon1/qr-code-gen.git
cd qr-code-gen
npm ci
npm run dev
```

Run `nvm use` before `npm ci` when nvm is installed. The environment file is
also optional; copy `.env.example` to `.env.local` only when configuring
analytics. Open the local URL printed by Vite.

To start your own project today, fork the repository. The repository owner can
also enable template-repository mode in GitHub settings to expose a **Use this
template** button. Then replace the branding, content, links, and images listed
under [Customize the template](#customize-the-template).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates the production site in `dist/`. |
| `npm run preview` | Serves an existing production build locally. |
| `npm start` | Alias for `npm run preview`; run the build first. |
| `npm run lint` | Checks all JavaScript and JSX with ESLint. |
| `npm run test` | Runs payload, design, contrast, and scan-state tests. |
| `npm run check` | Runs lint, tests, and the production build together. |

## Project structure

```text
.
├── src/
│   ├── components/
│   │   ├── home/          Home page sections and editable marketing content
│   │   ├── layout/        Shared header, footer, and terms notice
│   │   ├── navigation/    Cross-route navigation behavior
│   │   └── qr-code/       Content, pattern, color, logo, preview, and export UI
│   ├── config/
│   │   ├── generatorConfig.js   Routes, labels, validation, and defaults
│   │   └── qrCodeOptions.js     Design choices, presets, and export formats
│   ├── hooks/
│   │   ├── useDocumentTitle.js  Browser title synchronization
│   │   ├── useQrCode.js         Rendering and scan-check lifecycle
│   │   └── useQrCodeExport.js   Browser downloads and clipboard output
│   ├── pages/             Route-level page composition
│   ├── utils/
│   │   ├── analytics.js         Optional Microsoft Clarity loader
│   │   ├── colorContrast.js     Contrast calculations
│   │   ├── qrCodeDesign.js      Renderer options and SVG frame extensions
│   │   ├── qrCodePayloads.js    Generator payload builders
│   │   ├── qrCodeRenderer.js    Shared preview and file renderer
│   │   └── qrCodeScan.js        Private, in-browser decode checks
│   ├── App.jsx            Router and lazy page configuration
│   ├── index.css          Tailwind CSS and global styles
│   └── main.jsx           React application entry point
└── test/                  Payload and contrast unit tests
```

The design deliberately separates generator and rendering concerns:

1. `generatorConfig.js` describes what each generator is called and how it is
   validated.
2. `GeneratorFields.jsx` renders only the fields unique to a generator.
3. `qrCodePayloads.js` converts those values into data that a QR scanner can
   interpret.
4. `qrCodeOptions.js` describes available appearance and export choices.
5. `useQrCode.js` coordinates preview and scan state while
   `useQrCodeExport.js` isolates browser file operations.

## Customize the template

### Branding and metadata

Update these files before deploying a fork:

| What to change | File |
| --- | --- |
| Package name, repository, author, and homepage | `package.json` |
| Page title, description, canonical URL, and social cards | `index.html` |
| App name, icons, theme color, and install metadata | `public/site.webmanifest` |
| Logo and illustration assets | `public/images/` |
| Header identity | `src/components/layout/SiteHeader.jsx` |
| Footer links and social profiles | `src/components/layout/SiteFooter.jsx` |
| Home page copy and sample content | `src/components/home/` |
| Terms for your deployment | `src/pages/TermsOfServicePage.jsx` |

The included testimonials and team entries are demonstration content. Replace
them before using this repository for another brand.

### Generator behavior

- Edit routes, headings, validation messages, initial form values, and file
  names in `src/config/generatorConfig.js`.
- Edit form controls in `src/components/qr-code/GeneratorFields.jsx`.
- Edit encoded output in `src/utils/qrCodePayloads.js`.
- Edit presets, available shapes, correction levels, frames, and export formats
  in `src/config/qrCodeOptions.js`.
- Edit renderer mapping and SVG frame output in
  `src/utils/qrCodeDesign.js`.
- Edit pattern, color, logo, and advanced UI in the focused
  `src/components/qr-code/QrCode*Controls.jsx` files.
- Edit the recommended contrast threshold in
  `src/utils/colorContrast.js`.
- Edit local scan-test sizes in `src/utils/qrCodeScan.js`.

The link generator encodes its input exactly as entered and can therefore also
create plain-text QR codes. Include a URL scheme such as `https://` when a
scanner should reliably recognize the payload as a clickable link.

### Optional analytics

Analytics are disabled by default. To load Microsoft Clarity, create
`.env.local` and add your own project ID:

```dotenv
VITE_CLARITY_PROJECT_ID=your-project-id
```

Do not commit `.env.local`. Vite exposes variables beginning with `VITE_` to
browser code, so never put a secret in one.

## Add another generator

1. Add a type and configuration entry in `src/config/generatorConfig.js`, and
   import its payload builder there.
2. Add the new form fields and switch case in
   `src/components/qr-code/GeneratorFields.jsx`.
3. Add and export a focused payload builder from
   `src/utils/qrCodePayloads.js`.
4. Add the generator card to
   `src/components/home/QrCodeTypesSection.jsx`. Extend `QrCodeTypeIcon` in the
   same file when the generator needs a distinct icon.
5. Run `npm run check` and manually scan the result on more than one device.

The router reads generator routes directly from the configuration, so a
separate page component is not required.

## Deployment

The project builds to a static `dist/` directory and can be hosted by any
static-site provider.

### Cloudflare Pages

- Framework preset: **React (Vite)**
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22.22.0` or newer

`public/_redirects` provides the single-page application fallback required for
direct visits to generator routes. `public/_headers` includes a small set of
security headers and long-lived caching for generated assets.

If analytics are enabled, add `VITE_CLARITY_PROJECT_ID` to the production
environment variables in the Cloudflare Pages project settings. Whether
analytics requires notice or consent depends on your users and jurisdiction;
configure it only after reviewing those requirements.

For other hosts, configure all unknown routes to serve `index.html`.

## Privacy and QR safety

QR payloads, logo files, scan checks, clipboard output, and downloads are
processed in the browser. This repository does not include an API or
persistence layer. The scanability check rasterizes the current QR in memory
and uses `jsQR` to compare locally decoded output with the requested payload.
Optional third-party analytics can still collect usage information when
configured, so describe that accurately in your own privacy policy.

The local check is a useful warning system, not a guarantee for every camera,
screen, printer, material, or lighting condition. Test important QR codes with
multiple physical scanners before printing or publishing. Keep strong
foreground/background contrast, leave adequate quiet space around the code,
and verify the final exported file—not only the on-screen preview.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md), open an
issue for substantial changes, and run `npm run check` before submitting a pull
request.

## License

Source code is available under the [MIT License](LICENSE). Brand names,
personal photographs, and third-party image rights are not automatically
granted by the software license. Review [ASSET-LICENSES.md](ASSET-LICENSES.md)
and replace those assets when using this as a new brand.

## Acknowledgments

- QR rendering: [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- Local QR decoding: [jsQR](https://github.com/cozmo/jsQR)
- UI utilities: [Tailwind CSS](https://tailwindcss.com)
- Original UI inspiration: [Flowrift](https://flowrift.com)

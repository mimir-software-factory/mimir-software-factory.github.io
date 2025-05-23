# Mímir Software Factory Website

This is a [website](https://mimir-software-factory.github.io/) of the Mímir Software Factory company.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Developer's Guide

### Install the Fast Node Manager (FNM)

#### Linux-Base System

```bash
sudo apt-get -y update && apt-get -y install curl unzip && apt-get -y clean && apt-get -y auto-remove

curl -fsSL https://fnm.vercel.app/install | bash

fnm list-remote

fnm install <version>

fnm list

fnm use <version> # used only to update the runtime in the file .node-version
```

#### Windows System

Before select or use the Node.js runtime, we have install the local environment first:

```powershell
winget install Schniz.fnm

fnm list-remote

fnm install <version>

fnm list

fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression

fnm use <version> # used only to update the runtime in the file .node-version
```

### Install NPM global dependencies

```bash
npm install -g update
npm install -g upgrade
npm install -g typescript tsx @types/node
```

### Install NPM local dependencies

```bash
npm install
```

## Additional Docs

- [Fast Node Manager (FNM) Docs](https://github.com/Schniz/fnm)
- [Node.jS Docs](https://nodejs.org/docs/latest/api/)
- [Node.js Package Manager (NPM) Docs](https://docs.npmjs.com/)
- [Typescript Docs](https://docs.npmjs.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/).
- [Hero UI](https://www.heroui.com/docs/).
- [Shadcn/ui](https://ui.shadcn.com/docs/).
- [DaisyUI](https://daisyui.com/).

## COPYRIGHTS

© 2025 Copyrights Mimir Software Factory, leveraging your productivity through easy-to-use technology. ®All Rights Reserved.

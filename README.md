# Portfolio

My personal website, live at [https://www.manuelenolli.ch](https://www.manuelenolli.ch) 🚀

It replaces the former [PersonalWebsite](https://github.com/ManueleNolli/PersonalWebsite) (Next.js rendered on Lambda, now deprecated) with a static single-page app: same content, rebuilt with a feature-based structure and no server-side rendering.

## Features

- **Home** (`/`): hero, about me, journey timeline, certifications, GitHub repositories, contact form
- **Hobbies** (`/hobbies`): hobbies overview
- **Mixology** (`/hobbies/mixology`): liqueurs calculator

## Tech Stack

[Vite](https://vitejs.dev/) + [React](https://react.dev/) written in TypeScript, with:

- [React Router](https://reactrouter.com/): client-side routing
- [PrimeReact](https://primereact.org/): UI components
- [Tailwind CSS](https://tailwindcss.com/): styling
- [tsparticles](https://particles.js.org/): particles animation
- [gsap](https://gsap.com/) and [Framer Motion](https://motion.dev/): animations
- [AOS](https://michalsnik.github.io/aos/): animate on scroll
- [KaTeX](https://katex.org/): math formulas in the mixology calculator
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary): client-side error boundary
- [Vitest](https://vitest.dev/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/): tests, linting and formatting

## Requirements

- node: 24.x (npm is included)

## Installation and Usage

```bash
npm install
npm run dev
```

| Script                                    | Purpose                      |
| ----------------------------------------- | ---------------------------- |
| `npm run dev`                             | Vite dev server              |
| `npm run build`                           | Type check and build `dist/` |
| `npm run preview`                         | Serve the built `dist/`      |
| `npm run typecheck`                       | TypeScript only              |
| `npm run lint`                            | ESLint                       |
| `npm run format` / `npm run format:check` | Prettier                     |
| `npm test` / `npm run test:watch`         | Vitest unit tests            |

The contact form (`/mail`) and the GitHub repositories (`/github`) call backend APIs that only exist behind CloudFront, so these two sections show an error when running locally.

App settings (API paths, mail addresses, page sizes) are in `src/config.ts`; the personal content (profile, journey, certifications, links) is in `src/data/profile.ts`.

## Folder Structure

```bash
src/
    main.tsx # Provider stack (PrimeReact, Particles, AOS) and router
    config.ts # App settings (API paths, mail addresses, page sizes, breakpoint)
    app/ # Routes, Layout route (header, error boundary, scroll handling), AOS provider
    components/ # Generic building blocks, unaware of the site content
        ui/ # Section, Divider, Dialog, Slider, InputNumber, RadioGroup, ...
        animation/ # AnimatedText, RotatingText, AnimatedOnScroll
        layout/ # Header
    features/ # One folder per domain, owning its components, hooks, data and logic
        home/ # Hero, About Me
        journey/ # Vertical and horizontal timelines
        projects/ # Certifications, GitHub repositories
        contact/ # Contact form, links, attributions
        hobbies/ # Hobbies intro and teaser
        mixology/ # Liqueurs calculator: components/, hooks/, data/, lib/ (pure math, unit tested)
        particles/ # tsParticles provider, components and presets
    data/ # Personal content (profile.ts) and its types
    lib/ # Framework-free helpers shared across features
    pages/ # Route components, composing feature sections
    styles/ # Global CSS
public/ # Static files copied as-is into dist/
    assets/ # Images, icons, etc.
    robots.txt
    sitemap.xml
```

Imports use the `@/` alias for `src/`. Tests live next to the code they cover (`*.test.ts`).

## Deployment

The site is a static bundle hosted on AWS:

- [Amazon S3](https://aws.amazon.com/s3/): stores the built `dist/`
- [Amazon CloudFront](https://aws.amazon.com/cloudfront/): CDN serving the bucket, with an SPA fallback (403/404 → `/index.html`) so client-side routes work on direct navigation or refresh
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) + [AWS Lambda](https://aws.amazon.com/lambda/): CloudFront forwards `/mail` and `/github` to two backend Lambdas
- [Amazon SES](https://aws.amazon.com/ses/): sends the contact form emails
- [Amazon Route 53](https://aws.amazon.com/route53/) and [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/): domain and HTTPS certificate

The infrastructure is defined as CDK code in [PortfolioInfrastructure](https://github.com/ManueleNolli/PortfolioInfrastructure). The backends live in their own repositories:

- [AwsLambdaSimpleEmailService](https://github.com/ManueleNolli/AwsLambdaSimpleEmailService): `POST /mail`, used by the contact form
- [AwsLambdaGithubRepositoriesService](https://github.com/ManueleNolli/AwsLambdaGithubRepositoriesService): `GET /github`, used by the GitHub repositories section

The three repositories are included as git submodules in `aws/` (`infrastructure`, `mail-service`, `github-service`). Clone with `git clone --recurse-submodules`, or run `git submodule update --init` in an existing clone. To move them to the latest `main` of each repository, run `git submodule update --remote` and commit the result.

## CI/CD

The GitHub Actions workflow is defined in [actions.yml](./.github/workflows/actions.yml):

1. **Build** (every push and pull request to `main`): ESLint with no warnings allowed, Prettier check, unit tests, `npm run build`.
2. **Deploy** (pushes to `main` only): sync `dist/` to the S3 bucket, then invalidate the CloudFront cache.

The deploy job authenticates to AWS with [GitHub OIDC](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services): it assumes an IAM role with a short-lived token, so no AWS access keys are stored in GitHub. The role trusts only the `main` branch of this repository.

Repository variables (Settings → Secrets and variables → Actions → Variables):

| Variable                     | Description                              |
| ---------------------------- | ---------------------------------------- |
| `AWS_ROLE_ARN`               | ARN of the IAM role assumed through OIDC |
| `AWS_REGION`                 | AWS region of the stack (`eu-south-1`)   |
| `AWS_S3_BUCKET_ASSETS_NAME`  | S3 bucket the site is uploaded to        |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution to invalidate    |

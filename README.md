# Portfolio

My personal website, visitable at [https://www.manuelenolli.ch](https://www.manuelenolli.ch) 🚀

This is a full rewrite of the former [PersonalWebsite](https://github.com/ManueleNolli/PersonalWebsite) (now deprecated): same content and structure, but rebuilt as a plain static single-page app instead of a server-rendered Next.js app on Lambda. The base framework is [Vite](https://vitejs.dev/) + React written in TypeScript, additional libraries are:

- [React Router](https://reactrouter.com/): client-side routing
- [PrimeReact](https://primereact.org/): UI components
- [Tailwind CSS](https://tailwindcss.com/): CSS framework for styling
- [tsparticles](https://particles.js.org/): Particles animation
- [gsap](https://gsap.com/): Animation library
- [AOS](https://michalsnik.github.io/aos/): Animate on scroll library
- [Octokit](https://github.com/octokit): GitHub API client via GraphQL
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary): client-side error boundary

## Requirements

- node: 20.16.0
- yarn: 1.22.22

## Installation and Usage

```bash
yarn install
```

```bash
yarn dev
```

## Folder Structure

```bash
src/ # All source code
    main.tsx # Provider stack (PrimeReact, Particles, AOS), router, error boundary
    App.tsx # Routes
    pages/ # One folder per route
    components/ # Shared components
    constants/ # Static content/config
    providers/ # Context providers
    context/ # React contexts
    styles/ # Global CSS
public/ # static assets
    assets/ # images, icons, etc.
```

## Deployment

The website is built as a static bundle (`vite build`) and hosted on AWS using the following services:

- [Amazon S3](https://aws.amazon.com/s3/): static website hosting — this is the **only** content origin, no server/Lambda renders pages anymore
- [Amazon CloudFront](https://aws.amazon.com/cloudfront/): content delivery network, with an SPA fallback (403/404 → `/index.html`) so client-side routes work on direct navigation
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) + [AWS Lambda](https://aws.amazon.com/lambda/): the `/mail` and `/github` paths are routed (via dedicated CloudFront behaviors) to two independent backend Lambdas, not to this app
- [Amazon Route 53](https://aws.amazon.com/route53/): domain name management
- [Amazon Certificate Manager](https://aws.amazon.com/certificate-manager/): SSL certificates
- [Amazon WAF](https://aws.amazon.com/waf/): web application firewall
- [Amazon Simple Email Service](https://aws.amazon.com/ses/): powers the "contact me" form via the mail Lambda

The full infrastructure (S3 bucket, CloudFront, API Gateway, and the two backend Lambda wirings) is defined as CDK code in [PortfolioInfrastructure](../PortfolioInfrastructure).

The "contact me" form posts to `/mail`, handled by [AwsLambdaSimpleEmailService](https://github.com/ManueleNolli/AwsLambdaSimpleEmailService) (unchanged, reused as-is).

The GitHub repositories section fetches from `/github`, handled by [AwsLambdaGithubRepositoriesService](https://github.com/ManueleNolli/AwsLambdaGithubRepositoriesService) (unchanged, reused as-is).

## CI/CD

The CI/CD pipeline is implemented using GitHub Actions, the workflow is defined in [actions.yml](./.github/workflows/actions.yml).

Steps:

1. **Tests**: placeholder for now.
2. **Build**: `vite build` → static `dist/`.
3. **Deploy**: sync `dist/` to the S3 assets bucket, then invalidate the CloudFront cache.

No Lambda zipping/layer steps — there's no server to deploy for this app anymore.

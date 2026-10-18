// app behaviour settings; personal content lives in data/profile.ts
export const config = {
  // 'horizontal' = pinned horizontal scroll on desktop (mobile always uses the vertical timeline), 'vertical' = vertical everywhere
  journeyDesktopLayout: 'horizontal' as 'horizontal' | 'vertical',
  githubPageSize: 4,
  mail: {
    from: 'info@manuelenolli.ch',
    to: 'manuele.nolli.01@gmail.com',
  },
  api: {
    mail: '/mail',
    github: '/github',
  },
}

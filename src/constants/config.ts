export type JourneyLink = {
  name: string
  url: string
}

export type Journey = {
  kind: 'work' | 'education'
  title: string
  organizations: JourneyLink[]
  period?: string
  active?: boolean
  share?: string
  highlights?: JourneyLink[]
}

// an array groups activities done at the same time (e.g. work + study), rendered side by side on one timeline step
export type JourneyStep = Journey | Journey[]

export type Certification = {
  name: string
  url: string
  image: string
}

export const config = {
  home_name: 'Manuele Nolli',
  home_jobs: ['Software Engineer', 'Cloud Engineer', 'DevOps Engineer'],
  aboutme_description:
    "Driven by a deep curiosity for the digital world, I've nurtured my passion for technology from an early age.\n After a Master’s degree in Computer Science at SUPSI, I now work as a Scientific Collaborator at ISIN, always eager to learn and apply new technologies in meaningful ways.",
  // 'horizontal' = pinned horizontal scroll on desktop (mobile always uses the vertical timeline), 'vertical' = vertical everywhere
  journey_desktop_layout: 'horizontal' as 'horizontal' | 'vertical',
  // newest first. journey_early holds the first steps, rendered as a compact tail of the timeline
  journey_journeys: [
    [
      {
        kind: 'work',
        title: 'Scientific Collaborator',
        active: true,
        organizations: [{ name: 'SUPSI', url: 'https://www.supsi.ch/' }, { name: 'ISIN', url: 'https://www.supsi.ch/en/isin' }],
      },
      {
        kind: 'work',
        title: 'IT Apprenticeship Examiner',
        active: true,
        period: '2024 - now',
        organizations: [{ name: 'Canton Ticino - DFP', url: 'https://www.ti.ch/dfp' }],
      },
    ],
    [
      {
        kind: 'work',
        title: 'Research Assistant',
        share: '62.5%',
        organizations: [{ name: 'SUPSI', url: 'https://www.supsi.ch/' }, { name: 'ISIN', url: 'https://www.supsi.ch/en/isin' }],
        highlights: [

          {
            name: 'Salesforce workshop',
            url: 'https://www.linkedin.com/posts/andreacannata_supsi-salesforce-technology-activity-7165702577341296641-WZjC?utm_source=share&utm_medium=member_desktop',
          },
        ],
      },
      {
        kind: 'education',
        title: 'Master of Science in Engineering - Computer Science',
        share: '37.5%',
        organizations: [
          { name: 'SUPSI', url: 'https://www.supsi.ch/' },
          { name: 'USI', url: 'https://www.usi.ch/' },
          { name: 'ZHAW', url: 'https://www.zhaw.ch/' },
        ],
        highlights: [{
          name: 'Hackathon Victory with Var Group - Italo Treno!',
          url: 'https://www.supsi.ch/it/destinazione-primo-posto-team-supsi-trionfa-all-hackathon-var-group-con-la-sfida-di-italo-treno',
        }, { name: 'Interview about my journey', url: 'https://www.supsi.ch/it/il-mio-percorso-verso-la-tecnologia-del-futuro' }],
      },
    ],
    {
      kind: 'education',
      title: 'Bachelor of Science in Computer Science',
      organizations: [{ name: 'SUPSI', url: 'https://www.supsi.ch/en/bachelor-computer-science-engineering' }],
      highlights: [
        {
          name: 'SUPSI Interview',
          url: 'https://www.linkedin.com/posts/supsi_la-tua-formazione-lesperienza-di-manuele-activity-7010639377055850497-6sAh?utm_source=share&utm_medium=member_desktop',
        },
      ],
    },
  ] as JourneyStep[],
  journey_early: [
    { name: 'Technical professional maturity · CPT Locarno', url: 'https://www.cptlocarno.ch/' },
    { name: 'Apprenticeship Informatico AFC · Clinica Hildebrand', url: 'https://www.clinica-hildebrand.ch/' },
  ] as JourneyLink[],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect - Associate',
      url: 'https://www.credly.com/badges/fd3cc80a-d869-4ce4-a740-1988e6b4e9e0/public_url',
      image: '/assets/certifications/aws-solutions-architect-associate.png',
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      url: 'https://www.credly.com/badges/300ae886-e936-457d-a4be-66ef6ff3371a/public_url',
      image: '/assets/certifications/aws-cloud-practitioner.png',
    },
  ] as Certification[],
  projects_repositories_length: 4,
  contact_phrase: 'Would you like to ask me something or just say hello? Feel free to send me a message, I will be happy to answer you.',
  contact_mail: 'manuele.nolli.01@gmail.com',
  contact_mail2: 'me@manuelenolli.ch',
  sender_mail: 'info@manuelenolli.ch',
  contact_linkedin: 'https://www.linkedin.com/in/manuele-nolli',
  contact_github: 'https://github.com/ManueleNolli',
  contact_instagram: 'https://www.instagram.com/manunolli',
  attributions: [
    {
      title: 'South-arrow icons created by Mohamed Mbarki - Flaticon',
      url: 'https://www.flaticon.com/free-icons/south-arrow',
    },
    {
      title: 'Food and restaurant icons created by agus raharjo - Flaticon',
      url: 'https://www.flaticon.com/free-icons/food-and-restaurant',
    },
    {
      title: 'Collaboration icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/collaboration',
    },
    {
      title: 'Error icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/error',
    },
    {
      title: 'Lemon icons created by designbydai - Flaticon',
      url: 'https://www.flaticon.com/free-icons/lemon',
    },
    {
      title: 'Leaves icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/leaves',
    },
    {
      title: 'Peppermint icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/peppermint',
    },
  ],
}

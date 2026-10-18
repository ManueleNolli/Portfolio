import { Certification, JourneyStep, NamedLink, Social } from '@/data/types'

export const profile = {
  name: 'Manuele Nolli',
  jobs: ['Software Engineer', 'Cloud Engineer', 'DevOps Engineer'],
  aboutMe:
    "Driven by a deep curiosity for the digital world, I've nurtured my passion for technology from an early age.\n After a Master’s degree in Computer Science at SUPSI, I now work as a Scientific Collaborator at ISIN, always eager to learn and apply new technologies in meaningful ways.",
  // newest first. journeyEarly holds the first steps, rendered as a compact tail of the timeline
  journey: [
    [
      {
        kind: 'work',
        title: 'Scientific Collaborator',
        active: true,
        organizations: [
          { name: 'SUPSI', url: 'https://www.supsi.ch/' },
          { name: 'ISIN', url: 'https://www.supsi.ch/en/isin' },
        ],
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
        organizations: [
          { name: 'SUPSI', url: 'https://www.supsi.ch/' },
          { name: 'ISIN', url: 'https://www.supsi.ch/en/isin' },
        ],
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
        highlights: [
          {
            name: 'Hackathon Victory with Var Group - Italo Treno!',
            url: 'https://www.supsi.ch/it/destinazione-primo-posto-team-supsi-trionfa-all-hackathon-var-group-con-la-sfida-di-italo-treno',
          },
          { name: 'Interview about my journey', url: 'https://www.supsi.ch/it/il-mio-percorso-verso-la-tecnologia-del-futuro' },
        ],
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
  journeyEarly: [
    { name: 'Technical professional maturity · CPT Locarno', url: 'https://www.cptlocarno.ch/' },
    { name: 'Apprenticeship Informatico AFC · Clinica Hildebrand', url: 'https://www.clinica-hildebrand.ch/' },
  ] as NamedLink[],
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
  contactPhrase: 'Would you like to ask me something or just say hello? Feel free to send me a message, I will be happy to answer you.',
  email: 'me@manuelenolli.ch',
  socials: [
    { name: 'GitHub', url: 'https://github.com/ManueleNolli' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/manuele-nolli' },
    { name: 'Instagram', url: 'https://www.instagram.com/manunolli' },
  ] as Social[],
  hobbies: {
    description: 'A space where I share some of my favorite passions. From the creativity of mixology to the art and detail of photography.',
    highlights: [{ name: 'Liqueurs Calculator', url: '/hobbies/mixology' }] as NamedLink[],
  },
  attributions: [
    {
      name: 'South-arrow icons created by Mohamed Mbarki - Flaticon',
      url: 'https://www.flaticon.com/free-icons/south-arrow',
    },
    {
      name: 'Food and restaurant icons created by agus raharjo - Flaticon',
      url: 'https://www.flaticon.com/free-icons/food-and-restaurant',
    },
    {
      name: 'Collaboration icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/collaboration',
    },
    {
      name: 'Error icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/error',
    },
    {
      name: 'Lemon icons created by designbydai - Flaticon',
      url: 'https://www.flaticon.com/free-icons/lemon',
    },
    {
      name: 'Leaves icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/leaves',
    },
    {
      name: 'Peppermint icons created by Freepik - Flaticon',
      url: 'https://www.flaticon.com/free-icons/peppermint',
    },
  ] as NamedLink[],
}

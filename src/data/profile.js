/**
 * ============================================================
 *  EDIT ME — your personal details live here.
 * ============================================================
 *  - Leave a URL as '' (empty) and that link is simply hidden.
 *    Nothing on the site points to a made-up address.
 *  - Text marked "placeholder" is sample copy: replace it with your own.
 */
export const profile = {
  name: 'Thrishna',
  initials: 'T', // shown in the navbar logo
  title: 'Computer Science Engineering Student | Developer',

  // Hero
  intro:
    'I’m passionate about software development, web development and AI/ML — turning ideas into clean, fast and accessible products.',
  availability: {
    enabled: true,
    label: 'Open to internships & collaborations', // placeholder — edit to match your situation
  },

  // About
  about: {
    // placeholder copy
    paragraphs: [
      'I’m a Computer Science Engineering student who enjoys turning ideas into clean, reliable software — from understanding the problem to shipping an interface people actually enjoy using.',
      'My main interests are software development, web development and AI/ML. I learn by building, and I care about code that is readable, accessible and fast.',
    ],
    education: [
      {
        degree: 'B.E. / B.Tech in Computer Science Engineering', // placeholder
        institution: 'Your College / University', // placeholder
        period: '20XX – 20XX', // placeholder
      },
    ],
    interests: ['Software Development', 'Web Development', 'AI / Machine Learning'],
  },

  // Put your resume in /public (e.g. public/resume.pdf) and set '/resume.pdf'.
  // Leave '' to hide the Download Resume button.
  resumeUrl: '',

  // Social + contact. Leave '' to hide.
  social: {
    github: '', // e.g. 'https://github.com/your-username'
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-profile'
    email: '', // e.g. 'you@example.com'
  },

  // Contact form delivery (see README → "Contact form").
  contact: {
    // Paste a Formspree / Getform / Web3Forms style endpoint to POST the form as JSON.
    // If empty, the form falls back to opening the visitor's email app (needs social.email).
    formEndpoint: '',
  },
};

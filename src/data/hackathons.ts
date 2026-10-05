export type Hackathon = {
  name: string;
  type: string;
  organizer: string;
  date: string;
  certificate: string;
};

export const hackathons: Hackathon[] = [
  {
    name: "HackIndia · Pixels to Products",
    type: "Cloudinary AI Hackathon",
    organizer: "HackIndia · Team Ctrl Alt Elite",
    date: "Issued 15 September 2026",
    certificate: "/hackathons/hackindia-pixels-to-products.jpg",
  },
  {
    name: "TEXPERIA 2026",
    type: "Webathon",
    organizer: "SNS College of Technology",
    date: "12 & 13 March 2026",
    certificate: "/achievements/texperia-certificate.jpg",
  },
  {
    name: "Hack Devengers 2.0",
    type: "Hackathon",
    organizer: "Devengers",
    date: "19 September 2026",
    certificate: "/hackathons/hack-devengers.jpg",
  },
  {
    name: "IEEE SmartAIthon 2026",
    type: "AI Hackathon",
    organizer: "IEEE KCE SB CIS Chapter, Karpagam College of Engineering",
    date: "25 June – 25 August 2026",
    certificate: "/hackathons/ieee-smartaithon.jpg",
  },
  {
    name: "YUKTA 2K26",
    type: "Web Drift · Technical Event",
    organizer: "PSG Institute of Technology and Applied Research",
    date: "21 February 2026",
    certificate: "/hackathons/yukta-web-drift.jpg",
  },
];
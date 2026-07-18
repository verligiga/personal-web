import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.profile.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.education.deleteMany();
  await prisma.organizationRole.deleteMany();

  await prisma.profile.create({
    data: {
      name: "Gregorius Verli Giga Winarno",
      role: "Fullstack JavaScript Developer",
      location: "Jakarta, Indonesia",
      email: "gregoriusverly@gmail.com",
      phone: "+62 821-8108-0180",
      github: "https://github.com/gregoriusverli",
      linkedin: "https://www.linkedin.com/in/grverli/",
      summary:
        "Detail-oriented frontend developer with nearly 4 years of professional experience building responsive, user-friendly web interfaces with modern JavaScript frameworks. Quick to adapt to new technologies and comfortable working across the stack - from React and Next.js on the frontend to Node.js and GraphQL on the backend. A background in organizational leadership shaped a communicative, goal-driven approach to shipping practical solutions.",
    },
  });

  await prisma.experience.create({
    data: {
      role: "Fullstack Developer",
      company: "PT. Appfuxion Consulting Indonesia",
      companyUrl: null,
      startDate: new Date("2023-09-25"),
      endDate: null,
      order: 0,
      bullets: [
        "Collaborated with Product, UI/UX and QA in Agile delivery - fixing defects and shipping new frontend algorithms.",
        "Paired with backend engineers to improve performance and web accessibility across projects.",
        "Integrated frontend with REST APIs and Redux state management.",
      ],
      techStack: [
        "React",
        "TypeScript",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "Prisma",
        "React Native",
        "Flutter",
        "Shadcn UI",
      ],
    },
  });

  const bitsof = await prisma.experience.create({
    data: {
      role: "Frontend Developer",
      company: "PT Aktif Bangun Citra - Outsource Bitsof",
      companyUrl: "https://nextsteps.idaho.gov/",
      startDate: new Date("2023-05-08"),
      endDate: new Date("2024-11-09"),
      order: 1,
      bullets: [
        "Built new features and maintained the Next Steps Idaho website in an Agile team.",
        "Integrated frontend with REST APIs and Redux state management.",
        "Managed a WordPress CMS integrated with the React frontend, keeping content in sync across backend and client.",
      ],
      techStack: ["React", "Redux", "JavaScript", "Material UI", "Firebase", "WordPress"],
    },
  });

  const superkulExp = await prisma.experience.create({
    data: {
      role: "Frontend Developer",
      company: "PT Solusi Inovasi Bangsa - Outsource Superkul",
      companyUrl: "https://superkul.my.id/",
      startDate: new Date("2022-10-07"),
      endDate: new Date("2023-02-03"),
      order: 2,
      bullets: [
        "Developed and maintained three platforms - Customer, Admin and Vendor.",
        "Integrated frontend with REST APIs and Redux state management.",
      ],
      techStack: ["React", "Redux", "JavaScript", "Tailwind CSS", "SCSS", "Firebase", "Ant Design", "Bootstrap"],
    },
  });

  const deloitte = await prisma.experience.create({
    data: {
      role: "Frontend Developer",
      company: "PT Solusi Inovasi Bangsa - Outsource Deloitte IT Consulting",
      companyUrl: "https://infinity.uob.co.id",
      startDate: new Date("2022-04-25"),
      endDate: new Date("2022-10-01"),
      order: 3,
      bullets: [
        "Assigned to a Deloitte project implementing BI-FAST on the UOB Infinity Bank platform.",
        "Worked Singapore time zone (GMT+8) alongside a multi-country team (ID, SG, MY, VN, CN, MM).",
        "Handled form validation with Formik and wrote unit and integration tests.",
      ],
      techStack: ["React", "Redux", "JavaScript", "Jest", "Tailwind CSS", "Jenkins", "Material UI"],
    },
  });

  const eximku = await prisma.experience.create({
    data: {
      role: "Frontend Developer",
      company: "PT. Eximku Teknologi Indonesia - Andalin",
      companyUrl: "https://andalin.com",
      startDate: new Date("2022-01-06"),
      endDate: new Date("2023-07-25"),
      order: 4,
      bullets: [
        "Maintained two internal platforms - Internal and Customer Andalin.",
        "Developed and maintained two SaaS platforms - Cardig and Syncargo.",
        "Integrated frontend with REST APIs and Vuex state management.",
      ],
      techStack: ["Vue.js", "Nuxt.js", "Vuex", "JavaScript", "Bootstrap", "Tailwind CSS"],
    },
  });

  const sprout = await prisma.experience.create({
    data: {
      role: "Software Engineer (Fullstack)",
      company: "PT. Tunas Digital Indonesia - Sprout Digital Labs",
      companyUrl: "https://www.indolab.com",
      startDate: new Date("2021-10-11"),
      endDate: new Date("2022-02-04"),
      order: 5,
      bullets: [
        "Built and maintained the Indolab project across two platforms - Landing Page and Admin Page.",
        "Handled form and validation logic with Formik and Yup.",
        "Integrated frontend with REST APIs and Redux state management.",
      ],
      techStack: ["React", "TypeScript", "Next.js", "Formik", "Node.js", "Bootstrap"],
    },
  });

  await prisma.project.createMany({
    data: [
      {
        slug: "andalin",
        title: "Andalin",
        summary: "Internal & customer-facing logistics platform, plus two SaaS products built on top of it.",
        description:
          "Maintained the internal and customer-facing Andalin platforms, and developed/maintained two SaaS products spun out of the same codebase - Cardig and Syncargo. Built with Vue.js and Nuxt.js, integrating REST APIs through Vuex for state management.",
        coverImageUrl: null,
        techStack: ["Vue.js", "Nuxt.js", "Vuex", "Bootstrap", "Tailwind CSS"],
        liveUrl: "https://andalin.com",
        repoUrl: null,
        year: "2022",
        featured: true,
        order: 0,
        experienceId: eximku.id,
      },
      {
        slug: "superkul",
        title: "Superkul",
        summary: "Three-sided marketplace platform - customer, admin and vendor web apps.",
        description:
          "Developed and maintained three separate platforms for a single marketplace product: the customer-facing site, an admin dashboard, and a vendor portal. Integrated REST APIs with Redux across all three apps.",
        coverImageUrl: null,
        techStack: ["React", "Redux", "Tailwind CSS", "SCSS", "Firebase", "Ant Design"],
        liveUrl: "https://superkul.my.id/",
        repoUrl: null,
        year: "2022 - 2023",
        featured: true,
        order: 1,
        experienceId: superkulExp.id,
      },
      {
        slug: "next-steps-idaho",
        title: "Next Steps Idaho",
        summary: "Public-sector career resource website for the state of Idaho, USA.",
        description:
          "Built new features and maintained the Next Steps Idaho website - a government platform. Managed a WordPress CMS integrated with the React frontend, keeping content in sync between backend and client.",
        coverImageUrl: null,
        techStack: ["React", "Redux", "Material UI", "Firebase", "WordPress"],
        liveUrl: "https://nextsteps.idaho.gov/",
        repoUrl: null,
        year: "2023 - 2024",
        featured: true,
        order: 2,
        experienceId: bitsof.id,
      },
      {
        slug: "uob-infinity-bank",
        title: "UOB Infinity Bank",
        summary: "Banking platform features (BI-FAST transfer, Etax bulk/single payment) via Deloitte engagements.",
        description:
          "Contributed to two separate engagements on the UOB Infinity Bank platform through Deloitte IT Consulting: implementing BI-FAST transfers, and later the Etax single/bulk tax payment feature. Worked across timezones with a multi-country team.",
        coverImageUrl: null,
        techStack: ["React", "Redux", "Jest", "Tailwind CSS", "Jenkins", "Material UI"],
        liveUrl: "https://infinity.uob.co.id",
        repoUrl: null,
        year: "2022 - 2023",
        featured: false,
        order: 3,
        experienceId: deloitte.id,
      },
      {
        slug: "indolab",
        title: "Indolab",
        summary: "Landing page and admin dashboard for a digital lab platform.",
        description:
          "Built and maintained the Indolab project across two platforms - a public landing page and an internal admin page - handling form validation with Formik and Yup.",
        coverImageUrl: null,
        techStack: ["React", "TypeScript", "Next.js", "Formik", "Node.js"],
        liveUrl: "https://www.indolab.com",
        repoUrl: null,
        year: "2021 - 2022",
        featured: false,
        order: 4,
        experienceId: sprout.id,
      },
    ],
  });

  await prisma.skillCategory.create({
    data: {
      label: "Frontend",
      order: 0,
      skills: {
        create: [
          "Next.js",
          "Nuxt.js",
          "React",
          "React Native",
          "Redux",
          "Vue.js",
          "Vuex",
          "HTML",
          "CSS",
          "Tailwind CSS",
          "Material UI",
          "Shadcn UI",
        ].map((name, order) => ({ name, order })),
      },
    },
  });

  await prisma.skillCategory.create({
    data: {
      label: "Backend",
      order: 1,
      skills: {
        create: ["Apollo Server", "Node.js", "Express.js", "MongoDB", "GraphQL", "PostgreSQL", "Prisma"].map(
          (name, order) => ({ name, order }),
        ),
      },
    },
  });

  await prisma.skillCategory.create({
    data: {
      label: "Utilities",
      order: 2,
      skills: {
        create: [
          "TypeScript",
          "JavaScript",
          "AWS",
          "Vercel",
          "Netlify",
          "REST API",
          "Firebase",
          "Expo",
          "Jest",
          "Jenkins",
        ].map((name, order) => ({ name, order })),
      },
    },
  });

  await prisma.education.createMany({
    data: [
      {
        school: "Hacktiv8 Indonesia",
        program: "Fullstack JavaScript Developer",
        period: "Jun 2021 - Sep 2021",
        note: "Graduated with honors - 96.70 score",
        order: 0,
      },
      {
        school: "Universitas Lampung",
        program: "Bachelor's Degree, Physics Education",
        period: "Sep 2014 - Aug 2020",
        note: "GPA 3.14 · Funded for the Student Creativity Program (PKM) by DIKTI",
        order: 1,
      },
    ],
  });

  await prisma.organizationRole.createMany({
    data: [
      {
        role: "Head of Organization",
        org: "UKM KSR PMI Unit, Universitas Lampung",
        period: "2018",
        bullets: [
          "Held responsibility for the whole organization.",
          "Negotiated with relations to secure sponsorships for activities.",
          "Maintained integrity and solidarity across management and members.",
        ],
        order: 0,
      },
      {
        role: "Head of the Entrepreneurship Division",
        org: "UKM KSR PMI Unit, Universitas Lampung",
        period: "2017",
        bullets: [
          "Authored the work plan and led one period of division management.",
          "Set direction and guided members according to their roles.",
          "Managed the division's finances.",
        ],
        order: 1,
      },
    ],
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding.");
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.deleteMany();
  await prisma.adminUser.create({
    data: { email: adminEmail, passwordHash },
  });

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

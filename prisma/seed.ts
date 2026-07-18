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
      story:
        "My journey began with a degree in Physics Education. As technology continued to evolve at a rapid pace, I realized that the digital world would offer endless opportunities for those willing to learn and adapt.\n\nDetermined to change my career path, I enrolled in Hacktiv8's Fullstack JavaScript program through its Income Share Agreement (ISA), where tuition was paid only after securing a job. I started from scratch with no programming background, learning everything from the ground up through an intensive and challenging program.\n\nThat decision led me to a career as a Frontend Developer. Since then, I've continued to grow my skills, enjoy solving complex problems, and build applications that are intuitive, reliable, and enjoyable to use.\n\nI believe meaningful change comes from having the courage to take the first step and the persistence to keep moving forward. While my primary focus is frontend development, I'm also strengthening the backend foundation I built during my early training to become a more well-rounded software developer.",
      storyId:
        "Saya memulai perjalanan dari dunia Pendidikan Fisika. Namun, di tengah pesatnya perkembangan teknologi, saya menyadari bahwa dunia digital akan terus berkembang dan membuka banyak peluang di masa depan.\n\nDengan keyakinan dan keinginan yang kuat untuk berubah, saya memutuskan beralih ke dunia teknologi. Setelah lulus kuliah, saya mengambil kesempatan untuk mengikuti program Fullstack JavaScript di Hacktiv8 melalui skema Income Share Agreement (ISA), di mana biaya pendidikan baru dibayarkan setelah saya berhasil mendapatkan pekerjaan. Saat itu, saya benar-benar memulai dari nol tanpa latar belakang pemrograman, dengan materi yang padat dan proses belajar yang penuh tantangan.\n\nPerjalanan tersebut membawa saya berkarier sebagai Frontend Developer. Sejak saat itu, saya terus mengembangkan kemampuan, menikmati proses memecahkan masalah, dan membangun aplikasi yang memberikan pengalaman terbaik bagi pengguna.\n\nSaya percaya bahwa perubahan besar tidak dimulai dari sekadar keinginan, tetapi dari keberanian untuk mengambil langkah dan kegigihan untuk menjalaninya. Meskipun saat ini fokus karier saya berada di bidang frontend, saya juga terus mengasah kembali kemampuan backend yang telah saya pelajari sebelumnya agar dapat menjadi developer dengan pemahaman yang lebih menyeluruh.",
    },
  });

  const appfuxion = await prisma.experience.create({
    data: {
      role: "Fullstack Developer",
      company: "PT. Appfuxion Consulting Indonesia",
      companyUrl: null,
      location: "Tangerang, Indonesia",
      workType: "Hybrid",
      startDate: new Date("2023-09-25"),
      endDate: null,
      order: 0,
      bullets: [
        "Fullstack developer at PT. Appfuxion Consulting Indonesia, at times handling multiple concurrent client engagements across banking, fintech, and enterprise web and mobile projects.",
        "Collaborated with Product, UI/UX, and QA in an Agile workflow, tracking tickets in Jira, communicating through Microsoft Teams, and version-controlling code in GitLab.",
        "Paired with backend engineers to improve performance and web accessibility across projects.",
        "Integrated frontend with REST APIs and Redux state management.",
      ],
    },
  });

  const bitsof = await prisma.experience.create({
    data: {
      role: "Frontend Developer",
      company: "PT Aktif Bangun Citra - Outsource Bitsof",
      companyUrl: "https://www.bitsof.id/",
      location: "Jakarta Selatan, Indonesia",
      workType: "Remote",
      startDate: new Date("2023-05-08"),
      endDate: new Date("2024-11-09"),
      order: 1,
      bullets: [
        "Frontend developer on the Next Steps Idaho project, a public-sector website for the state of Idaho, USA - worked in an Agile team based in Indonesia time zone despite the client being based in the US.",
        "Tracked tasks and collaborated with the team through Airtable.",
        "Integrated frontend with REST APIs and Redux state management.",
      ],
    },
  });

  const superkulExp = await prisma.experience.create({
    data: {
      role: "Frontend Developer",
      company: "PT Solusi Inovasi Bangsa (IDEA - Integrated Digital Ecosystem Asia)",
      companyUrl: "https://ide.asia/",
      location: "Bandung, Indonesia",
      workType: "Remote",
      startDate: new Date("2022-04-25"),
      endDate: new Date("2023-03-31"),
      order: 2,
      bullets: [
        "Worked across two client engagements while outsourced through PT Solusi Inovasi Bangsa - a large-scale Deloitte IT Consulting project and the smaller Superkul cold-chain delivery platform.",
        "On the Deloitte engagement, worked within a large team with a dedicated frontend lead, tracking story-pointed tickets in Jira through twice-daily standup and standdown meetings, alongside a multi-country team across Singapore time zone (GMT+8).",
        "On the Superkul engagement, worked in a smaller team with no lead layer, coordinating directly with the project manager.",
        "Collaborated with UI/UX, backend, and QA while integrating frontend with REST APIs and Redux state management across both engagements.",
      ],
    },
  });

  const eximku = await prisma.experience.create({
    data: {
      role: "Frontend Developer",
      company: "PT. Eximku Teknologi Indonesia (Andalin)",
      companyUrl: "https://andalin.com",
      location: "Jakarta Selatan, Indonesia",
      workType: "Hybrid",
      startDate: new Date("2022-01-06"),
      endDate: new Date("2023-07-25"),
      order: 4,
      bullets: [
        "Frontend developer for close to two years - starting on Andalin's core logistics platform and taking on more scope as the team grew.",
        "Worked in an in-office Agile team alongside backend, UI/UX, and a lead engineer, tracking tasks through Notion.",
        "Built and maintained Andalin's internal, customer-facing, and landing page platforms with Vue.js and Vuex.",
        "Extended into two additional SaaS builds, Cardig and Syncargo, as the team adopted Nuxt.js.",
        "Provided ongoing maintenance support for Freightsight, a logistics media portal, alongside the core Andalin work.",
      ],
    },
  });

  const sprout = await prisma.experience.create({
    data: {
      role: "Software Engineer (Fullstack)",
      company: "PT. Tunas Digital Indonesia (Sprout Digital Labs)",
      companyUrl: "https://sprout.co.id/",
      location: "Tangerang Selatan, Indonesia",
      workType: "On-site",
      startDate: new Date("2021-10-11"),
      endDate: new Date("2022-02-04"),
      order: 5,
      bullets: [
        "Joined as a Software Engineer (Fullstack) and was assigned frontend development responsibilities on the Indolab project.",
        "Collaborated with UI/UX and backend engineers in an Agile workflow, building responsive UI components and fixing bugs as features evolved.",
        "Built and maintained frontend features for the Indolab platform as part of the company's client engagement.",
      ],
    },
  });

  await prisma.project.createMany({
    data: [
      {
        slug: "andalin",
        title: "Andalin",
        summary: "Digital freight forwarding platform connecting Indonesian SMEs to international shipping and customs services.",
        description:
          "Andalin is a digital freight forwarder giving Indonesian SMEs a one-stop platform for international trade - covering shipment booking, customs clearance, and freight management across more than 150 cities and 200 ports worldwide. Built and maintained three platforms for the product - the internal operations dashboard, the customer-facing web app, and the public landing page - using Vue.js, Vuex, and Bootstrap/Tailwind CSS for styling.",
        coverImageUrl: null,
        techStack: ["Vue.js", "Vuex", "Bootstrap", "Tailwind CSS", "SCSS", "HTML."],
        liveUrl: "https://www.instagram.com/andalinid/",
        repoUrl: null,
        year: "2022",
        featured: true,
        order: 0,
        experienceId: eximku.id,
      },
      {
        slug: "superkul",
        title: "Superkul",
        summary: "Cold chain last-mile delivery platform for temperature-controlled goods in Indonesia.",
        description:
          "Superkul is a cold chain and chiller-based last-mile delivery startup in Indonesia, offering same-day, instant, and dedicated delivery services for temperature-sensitive goods like food, medical, and pharmaceutical products, maintaining temperatures from -22°C to 10°C. Developed and maintained three platforms for the product - the customer-facing app, an admin dashboard, and a vendor portal - integrating REST APIs with Redux for state management.",
        coverImageUrl: null,
        techStack: ["React", "Redux", "Tailwind CSS", "SCSS", "Firebase", "Ant Design", "Bootstrap"],
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
        summary:
          "Educational and career guidance platform for Idaho residents, with interactive quizzes and personalized recommendations.",
        description:
          "Next Steps Idaho is an educational platform helping students and residents navigate education and career pathways, offering interactive quizzes, personalized recommendations, and informational resources to support confident decision-making about their future. Built new features and maintained the site, managing a WordPress CMS integrated with the React frontend - including PHP-based header templating - to keep content in sync between backend and client.",
        coverImageUrl: null,
        techStack: ["React", "Next.js", "JavaScript", "Redux", "Material UI", "Firebase", "WordPress", "PHP"],
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
        summary: "BI-FAST interbank transfer feature for a banking platform, delivered through a Deloitte IT Consulting engagement.",
        description:
          "Contributed to a Deloitte IT Consulting engagement implementing BI-FAST interbank transfers on the UOB Infinity Bank platform. Worked across timezones with a multi-country team, using Jira with story-pointed tickets and twice-daily standup and standdown reporting under a dedicated frontend lead. Handled form validation with Formik and wrote unit and integration tests with Jest.",
        coverImageUrl: null,
        techStack: ["React", "Redux", "Formik", "Jest", "Tailwind CSS", "Jenkins", "Material UI"],
        liveUrl: "https://infinity.uob.co.id",
        repoUrl: null,
        year: "2022 - 2023",
        featured: false,
        order: 3,
        experienceId: superkulExp.id,
      },
      {
        slug: "indolab",
        title: "Indolab",
        summary: "A digital lab platform with a public landing page and an internal admin dashboard.",
        description:
          "Indolab is a digital lab platform with two web surfaces - a public-facing landing page for prospective users, and an internal admin dashboard for managing lab operations. The frontend was built with React and Next.js, integrated with REST APIs and Redux for state management. Form validation and logic for the admin's data-entry-heavy workflows was handled with Formik and Yup.",
        coverImageUrl: null,
        techStack: ["React", "TypeScript", "Next.js", "Formik", "Bootstrap"],
        liveUrl: "https://www.instagram.com/official.indolab/",
        repoUrl: null,
        year: "2021 - 2022",
        featured: false,
        order: 4,
        experienceId: sprout.id,
      },
      {
        slug: "alliance-bank-malaysia",
        title: "Alliance Bank - Malaysia",
        summary: "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia.",
        description:
          "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia. Details to be filled in.",
        coverImageUrl: null,
        techStack: ["TypeScript", "React Native", "Tailwind CSS", "Storybook"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 5,
        experienceId: appfuxion.id,
      },
      {
        slug: "agis",
        title: "Advanced Generative Intelligence System (AGIS)",
        summary: "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia.",
        description:
          "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia. Details to be filled in.",
        coverImageUrl: null,
        techStack: ["Next.js", "TypeScript", "Redux", "Tailwind CSS"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 6,
        experienceId: appfuxion.id,
      },
      {
        slug: "alms",
        title: "Appfuxion License Management System (ALMS)",
        summary: "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia.",
        description:
          "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia. Details to be filled in.",
        coverImageUrl: null,
        techStack: ["Next.js", "TypeScript", "Redux", "Tailwind CSS"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 7,
        experienceId: appfuxion.id,
      },
      {
        slug: "uob-etax-payment",
        title: "UOB Infinity Bank - Etax Payment (via Deloitte)",
        summary: "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia.",
        description:
          "Enterprise engagement delivered while at PT. Appfuxion Consulting Indonesia. Details to be filled in.",
        coverImageUrl: null,
        techStack: ["React", "Redux", "Jest", "Tailwind CSS", "Jenkins", "Material UI"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 8,
        experienceId: appfuxion.id,
      },
      {
        slug: "bia-bimb-investment-account",
        title: "BIA (BIMB Investment Account) Web Portal",
        summary: "Investment account web portal for Bank Islam Malaysia Berhad, built and designed end-to-end.",
        description:
          "Built the BIA (BIMB Investment Account) web portal for Bank Islam Malaysia Berhad as a fullstack effort, handling both frontend and backend without a dedicated UI/UX designer - including the interface design itself. Built with Next.js and Prisma, using Shadcn UI for the component library.",
        coverImageUrl: null,
        techStack: ["Next.js", "Prisma", "Shadcn UI"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 9,
        experienceId: appfuxion.id,
      },
      {
        slug: "bimb-mobile",
        title: "BIMB Mobile",
        summary: "Cross-platform banking app for Bank Islam Malaysia Berhad, built with Flutter for both web and mobile.",
        description:
          "Contributed to BIMB Mobile, a Bank Islam Malaysia Berhad application built with Flutter to run across both web and mobile platforms, during a one-month engagement before moving to another project.",
        coverImageUrl: null,
        techStack: ["Flutter"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 10,
        experienceId: appfuxion.id,
      },
      {
        slug: "cardig",
        title: "Cardig",
        summary: "SaaS logistics platform built for Cardig, one of Andalin's investors in the aviation and logistics space.",
        description:
          "Cardig is a dedicated SaaS logistics platform built for Cardig International, an aviation support and logistics investment group that also backed Andalin's funding round. Developed with Nuxt.js and Vue.js.",
        coverImageUrl: null,
        techStack: ["Nuxt.js", "Vue.js", "Vuex"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 11,
        experienceId: eximku.id,
      },
      {
        slug: "syncargo",
        title: "Syncargo",
        summary: "SaaS CRM platform for Indonesian freight forwarders, with customer and super admin portals.",
        description:
          "Syncargo is a SaaS CRM platform for Indonesian freight forwarders, with a core platform for managing shipments and client relationships, a customer portal for tracking shipments and requesting quotations, and a super admin tool for internal team management - alongside a public landing page. Built with Nuxt.js and Vue.js.",
        coverImageUrl: null,
        techStack: ["Nuxt.js", "Vue.js", "Vuex"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 12,
        experienceId: eximku.id,
      },
      {
        slug: "freightsight",
        title: "Freightsight",
        summary: "Indonesian logistics media and news portal.",
        description:
          "Freightsight is an Indonesian logistics media and news portal, covering shipping, ports, and industry updates. Helped maintain the site using Vue.js.",
        coverImageUrl: null,
        techStack: ["Vue.js"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 13,
        experienceId: eximku.id,
      },
      {
        slug: "tvigy",
        title: "Tvigy",
        summary: "Subscription platform connecting users with wellness, health, beauty, and clinic service providers.",
        description:
          "Tvigy is a subscription platform in the wellness, health, beauty, and clinic industry, functioning as a marketplace that connects consumers with aesthetic and medical treatment providers. Focused on improving the platform's user experience, simplifying the subscription process, and optimizing partner integration for clinic onboarding.",
        coverImageUrl: null,
        techStack: ["React", "Redux", "Material UI", "Firebase", "WordPress"],
        liveUrl: "https://tvigy.com",
        repoUrl: null,
        year: null,
        featured: false,
        order: 14,
        experienceId: bitsof.id,
      },
      {
        slug: "msi-suite",
        title: "MSI Suite",
        summary: "Company profile and landing page for a software development subscription service.",
        description:
          "MSI Suite is a software development subscription service, established in 2014, offering \"All You Can Develop\" access to mobile, web, and management system development through tiered monthly plans - Small Corporate, Medium Corporate, and Enterprise - each bundling a set number of developer hours per month. Built the company profile and landing page solo with no backend engineer on the project, using a client-side contact form powered by SMTP.js and ElasticEmail.",
        coverImageUrl: null,
        techStack: ["React", "SMTP.js", "ElasticEmail"],
        liveUrl: "https://www.msi-digital.com/",
        repoUrl: null,
        year: null,
        featured: false,
        order: 15,
        experienceId: superkulExp.id,
      },
      {
        slug: "andalin-wms",
        title: "Andalin WMS",
        summary: "Warehouse Management System for tracking inbound/outbound SKUs and warehouse operations.",
        description:
          "Andalin WMS is a Warehouse Management System built for Andalin's logistics operations, with separate internal and customer-facing portals for tracking inbound/outbound SKUs, storage capacity, and warehouse workload across multiple warehouse locations.",
        coverImageUrl: null,
        techStack: ["Vue.js", "Vuex", "Bootstrap", "Tailwind CSS"],
        liveUrl: null,
        repoUrl: null,
        year: null,
        featured: false,
        order: 16,
        experienceId: eximku.id,
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
        note: "Graduated with honors, scoring 96.70 out of 100.",
        noteId: "Lulus dengan predikat honors dengan skor 96.70 dari 100",
        order: 0,
      },
      {
        school: "Universitas Lampung",
        program: "Bachelor's Degree, Physics Education",
        programId: "Sarjana Pendidikan Fisika",
        period: "Sep 2014 - Aug 2020",
        note: "Graduated with a GPA of 3.14 out of 4.00\nFunded for the Student Creativity Program (PKM) by DIKTI",
        noteId:
          "Lulus dengan IPK 3.14 dari 4.00\nMendapatkan pendanaan Program Kreativitas Mahasiswa (PKM) dari DIKTI",
        order: 1,
      },
    ],
  });

  await prisma.organizationRole.createMany({
    data: [
      {
        role: "Head of Organization",
        roleId: "Ketua",
        org: "UKM KSR PMI Unit, Universitas Lampung",
        period: "2018",
        bullets: [
          "Held responsibility for the whole organization.",
          "Negotiated with relations to secure sponsorships for activities.",
          "Maintained integrity and solidarity across management and members.",
        ],
        bulletsId: [
          "Bertanggung jawab atas seluruh organisasi.",
          "Bernegosiasi dengan pihak terkait untuk mendapatkan pendanaan terkait program kerja.",
          "Menjaga integritas dan solidaritas seluruh pengurus dan anggota.",
        ],
        order: 0,
      },
      {
        role: "Head of the Entrepreneurship Division",
        roleId: "Kepala Divisi Kewirausahaan",
        org: "UKM KSR PMI Unit, Universitas Lampung",
        period: "2017",
        bullets: [
          "Authored the work plan and led one period of division management.",
          "Set direction and guided members according to their roles.",
          "Managed the division's finances.",
        ],
        bulletsId: [
          "Menyusun rencana kerja dan memimpin satu periode divisi kewirausahaan.",
          "Mengarahkan dan membimbing anggota sesuai dengan peran mereka.",
          "Mengelola keuangan divisi.",
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

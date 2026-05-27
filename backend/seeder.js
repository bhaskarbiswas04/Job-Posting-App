const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("./models/jobModel");

dotenv.config();

// The cut frontend data pasted here to seed the backend database
const initialJobsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "120000",
    type: "Full-time (On-site)",
    description:
      "Develop and maintain scalable web applications. Collaborate with cross-functional teams.",
    qualifications: [
      "Bachelor's degree in Computer Science or related field.",
      "3+ years of experience in full-stack development.",
    ],
  },
  {
    id: 2,
    title: "Content Writer",
    company: "Creative Ink",
    location: "Austin, TX",
    salary: "65000",
    type: "Part-time (Remote)",
    description:
      "Produce high-quality articles, blogs, and marketing copy for our online channels.",
    qualifications: [
      "Excellent written communication and storytelling skills.",
      "Portfolio of published work or personal blog examples.",
    ],
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Data Insights Inc.",
    location: "Chicago, IL",
    salary: "85000",
    type: "Full-time (On-site)",
    description:
      "Interpret data, analyze results using statistical techniques and provide ongoing reports.",
    qualifications: [
      "Strong knowledge of SQL, Python, or R.",
      "Proven analytical background with attention to details.",
    ],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Seattle, WA",
    salary: "95000",
    type: "Part-time (On-site)",
    description:
      "Create user-centered designs by understanding business requirements, and user feedback. Design intuitive wireframes, mockups, and user workflows.",
    qualifications: [
      "2+ years of professional UI/UX design experience.",
      "Proficiency in Figma, Adobe XD, or other visual design and wireframing tools.",
      "Strong portfolio demonstrating user-centric design solutions.",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    salary: "140000",
    type: "Full-time (Remote)",
    description:
      "Manage, optimize, and automate cloud infrastructure and continuous deployment (CI/CD) pipelines. Ensure system reliability and security compliance.",
    qualifications: [
      "Bachelor's degree in IT, Engineering, or a related technical discipline.",
      "Hands-on experience with AWS, Docker, Kubernetes, and GitHub Actions.",
      "Strong scripting skills in Bash or Python.",
    ],
  },
  {
    id: 6,
    title: "Customer Support Representative",
    company: "Supportly",
    location: "Remote",
    salary: "50000",
    type: "Full-time (Remote)",
    description:
      "Provide exceptional support to our global user base. Troubleshoot product issues, answer incoming inquiries, and collaborate with product teams to escalate bugs.",
    qualifications: [
      "1+ years of experience in a customer-facing or technical support role.",
      "Excellent empathetic verbal and written communication skills.",
      "Ability to multi-task, prioritize, and manage time effectively.",
    ],
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing collection records
    await Job.deleteMany();
    console.log("Old jobs cleared...");

    // Seed the database
    await Job.insertMany(initialJobsData);
    console.log("Initial data seeded successfully into MongoDB!");

    process.exit();
  } catch (error) {
    console.error(`Error with data seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();

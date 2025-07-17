export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    image: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
  aboutMe: string[];
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
  };
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  easterEgg: {
    command: string;
    response: string[];
  };
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Madhav Bhalodiya",
    title: "Full Stack Developer",
    image: "./madhav.jpg",
    email: "madhav.bhalodiya714@gmail.com",
    github: "https://github.com/madhav020",
    linkedin: "www.linkedin.com/in/madhav-bhalodiya-434b85353",
    
  },
  aboutMe: [
    "I am a Computer Engineering student at MBIT, Anand, with a strong passion for coding and web development.",
    "I have practical experience working with React, HTML, CSS, JavaScript , node.js , express.js , mongoDB, Java and Data Structures & Algorithms.",
    "Driven by curiosity and a desire to grow, I’m eager to take on meaningful projects that allow me to sharpen my technical expertise and problem-solving abilities while making a positive impact."
  ],
  skills: {
    Frontend: ["HTML", "CSS", "JavaScript", "React"],
    Backend: ["Java", "Node.js", "Express"],
    Database: ["MySQL", "MongoDB"],
    SoftSkills: [" Problem-Solving", "Teamwork"," Time Management"]
  },
  projects: [
    {
      id: "1",
      title: " AI-Based Interview System",
      description: "A web-based interview analysis tool using facial landmark detection and sentiment analysis",
      technologies: ["React", "Node.js", "python", "opencv", "mediapipe","Tailwind CSS","FFmpeg","Whisper API"],
      githubUrl: ["https://github.com/madhav020/AI-based-interview-Taker"],
      year: "2025"
    },
    {
      id: "2",
      title: "Campus Pulse: College Event Management System",
      description: "A comprehensive college event management system built with the MERN stack.",
      technologies: ["Express.js", "React.js", "MongoDB", "Tailwind CSS","Node.js"],
      githubUrl: ["https://github.com/madhav020/CAMPUSPULSE"],
      year: "2025"
      
    }
    
  ],
  experience: [
    {
      id: "1",
      company: "Brainybeam Info-Tech Pvt. Ltd.",
      position: "Web Development Intern",
      duration: "Jun 2025",
      description: [
        "Developing full-stack web applications using the MERN stack with a focus on frontend and backend integration",
        "Built secure authentication and role-based access control modules",
        "Designed dynamic patient dashboards with admin functionalities",
        "Developed a feature-rich eCommerce website with product management, shopping cart, and category handling",
        "Created RESTful APIs for data operations and integrated MongoDB for backend storage",
        "Enhanced UI/UX using React, Vite, and Tailwind CSS for responsive and user-friendly interfaces"
      ],
      technologies: ["React", "javascript", "Node.js", "MongoDB","express.js"],
    },
   
  ],
  certifications: [
    {
      id: "1",
      name: " Web Development Intern — Brainybeam Info-Tech Pvt. Ltd.",
      date: "June 2025",
      credentialUrl: "https://www.linkedin.com/posts/madhav-bhalodiya-434b85353_webdevelopment-mernstack-internshipexperience-activity-7351279706295451649-Ik-l?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFhF4CgB_eiQQADc2m2kBYhtIRCotiSDSy0",
      issuer: "Brainybeam Info-Tech Pvt. Ltd."
    },
    {
       id: "2",
      name: "Code Unnati Innovation Marathon",
      date: "March 2025",
      credentialUrl: "https://www.linkedin.com/posts/madhav-bhalodiya-434b85353_codeunnati-edunetfoundation-innovationmarathon-activity-7312508579280822273-233P?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFhF4CgB_eiQQADc2m2kBYhtIRCotiSDSy0",
      issuer: "SAP"
    }
    
  ],
 
};
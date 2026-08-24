
export const COMPETITIONS = [
  {
    id: 'animatronics',
    title: 'Animatronics',
    category: 'stem',
    description: 'Participants demonstrate knowledge of mechanical and control systems by designing, fabricating, and controlling an animatronics device.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Turning classic tales into a mechanical marvel. Bring a story to life following the Animatronics rules.',
      fullDescription: 'The Animatronics competition challenges students to design and build a robotic device that simulates a living creature. The device must perform a specific function or tell a story through movement and sound. Teams must document their engineering process and present their creation to judges.',
      eligibility: 'One (1) team of up to three (3) members per chapter.',
      procedure: 'Teams will have a set time to set up their display. The demonstration must include a specific sequence of movements and sounds. Judges will interview the team about their design process, mechanical systems, and control logic.',
      careers: ['Robotics Engineer', 'Mechanical Engineer', 'Special Effects Artist', 'Mechatronics Specialist'],
      maxTeamSize: 3,
      timeLimit: '5 min setup',
      requirements: ['Portfolio', 'Animatronic Device', 'Presentation']
    }
  },
  {
    id: 'arch-design',
    title: 'Architectural Design',
    category: 'arch',
    description: 'Participants develop a set of architectural plans and a model for a specific design problem.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'See the official Architectural Design problem PDF on the TSA Themes and Problems page.',
      fullDescription: 'Students design a building or structure based on a specific annual theme (e.g., "Tiny Home" or "Community Center"). The entry includes a physical model, architectural drawings (floor plans, elevations, site plans), and a documentation portfolio explaining the design choices, LEED certification potential, and adherence to codes.',
      eligibility: 'One (1) team or individual per chapter.',
      procedure: 'Participants submit a portfolio and a physical model. Semifinalists participate in an onsite design challenge/interview.',
      careers: ['Architect', 'Civil Engineer', 'Urban Planner', 'Interior Designer'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Model', 'Drawings', 'Portfolio']
    }
  },
  {
    id: 'audio-podcasting',
    title: 'Audio Podcasting',
    category: 'ict',
    description: 'Participants produce an audio production piece based on an annual theme.',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'The Debate Desk. Present multiple viewpoints on a controversial STEM, societal, educational, health, or environmental topic.',
      fullDescription: 'Teams create a high-quality audio podcast that addresses the annual theme. The podcast must include voice recording, sound effects, and music integration. A portfolio documenting the production process, script, and copyright compliance is required.',
      eligibility: 'One (1) team of 1-6 members per chapter.',
      procedure: 'Submit audio file and portfolio. Semifinalists participate in an interview.',
      careers: ['Sound Engineer', 'Broadcast Journalist', 'Producer', 'Foley Artist'],
      maxTeamSize: 6,
      timeLimit: '5 Minutes',
      requirements: ['Audio File', 'Portfolio', 'Script']
    }
  },
  {
    id: 'biotech-design',
    title: 'Biotechnology Design',
    category: 'stem',
    description: 'Participants select a contemporary biotechnology problem and demonstrate understanding of it through research and a display.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Biosensors for Disease Detection. Present the science behind biosensors and demonstrate one use in detecting or monitoring disease.',
      fullDescription: 'Teams identify a biotechnology issue, conduct research, and present a solution or explanation using a physical display. The project must cover the scientific principles involved and the impact on society.',
      eligibility: 'One (1) team of 2-6 members.',
      procedure: 'Submit portfolio and display. Semifinalists give a presentation.',
      careers: ['Biomedical Engineer', 'Geneticist', 'Lab Technician', 'Researcher'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Portfolio', 'Display', 'Presentation']
    }
  },
  {
    id: 'board-game-design',
    title: 'Board Game Design',
    category: 'design',
    description: 'Participants develop, build, and package a board game that focuses on a subject of their choice.',
    imageUrl: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Teams design and construct an original board game. The game must be playable, have clear rules, and include packaging. Documentation must cover the design process, testing, and artwork creation.',
      eligibility: 'One (1) team of 1-6 members.',
      procedure: 'Submit game and portfolio. Semifinalists set up the game for judges to play/evaluate.',
      careers: ['Game Designer', 'Graphic Designer', 'Technical Writer'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Game Prototype', 'Packaging', 'Rulebook', 'Portfolio']
    }
  },
  {
    id: 'chapter-team',
    title: 'Chapter Team',
    category: 'leadership',
    description: 'Participants demonstrate their understanding of parliamentary procedure and TSA structure.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'A team of six officers performs an opening ceremony, a business meeting using Robert\'s Rules of Order, and a closing ceremony. They must also take a written test on parliamentary procedure.',
      eligibility: 'One (1) team of 6 members.',
      procedure: 'Written test (individual). Top teams perform a model chapter meeting.',
      careers: ['Parliamentarian', 'Lawyer', 'Public Administrator', 'Executive Assistant'],
      maxTeamSize: 6,
      timeLimit: '15 Minutes',
      requirements: ['Written Test', 'Oral Presentation', 'Official Dress']
    }
  },
  {
    id: 'childrens-stories',
    title: 'Children\'s Stories',
    category: 'design',
    description: 'Participants write and illustrate a children\'s story of high artistic and literary value.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Create a graphic novel or comic book. The binding cannot be stapled.',
      fullDescription: 'Teams or individuals create a physical storybook with text and original illustrations based on a specific theme. The book must be durable and suitable for young children. A portfolio documenting the creation process is required.',
      eligibility: 'One (1) team of 1-6 members.',
      procedure: 'Submit book and portfolio. Semifinalists read the story to judges.',
      careers: ['Illustrator', 'Author', 'Publisher', 'Early Childhood Educator'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Physical Book', 'Portfolio']
    }
  },
  {
    id: 'coding',
    title: 'Coding',
    category: 'ict',
    description: 'Participants demonstrate their ability to write code for a specific problem set under time constraints.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    details: {
      verifyForSeason: '2026-2027',
      fullDescription: 'Teams of students take a written test covering computer science fundamentals. The top 12 teams advance to the semifinal round, which is an on-site coding challenge. They must solve a series of computational problems using languages like Java, Python, or C++ within a limited time frame (usually 2 hours).',
      eligibility: 'One (1) team of two (2) members per chapter.',
      procedure: 'Preliminary Round: Written test. Semifinal Round: On-site programming challenge where teams solve problems of increasing difficulty.',
      careers: ['Software Developer', 'Computer Systems Analyst', 'Data Scientist', 'Web Developer'],
      maxTeamSize: 2,
      timeLimit: '2 Hours',
      requirements: ['Written Test', 'On-site Coding', 'Laptop']
    }
  },
  {
    id: 'cad-arch',
    title: 'CAD, Architecture',
    category: 'arch',
    description: 'Participants use complex computer graphic skills and CAD software to create a 3D representation of an architectural object.',
    imageUrl: 'https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Participants solve an on-site architectural design problem using CAD software. They must create floor plans, elevations, and 3D views within a set time limit.',
      eligibility: 'Two (2) individuals per chapter.',
      procedure: 'On-site design challenge (usually 4 hours).',
      careers: ['Architect', 'Drafter', 'Civil Engineer'],
      maxTeamSize: 1,
      timeLimit: '4 Hours',
      requirements: ['Laptop', 'CAD Software']
    }
  },
  {
    id: 'cad-eng',
    title: 'CAD, Engineering',
    category: 'stem',
    description: 'Participants use complex computer graphic skills and CAD software to create a 3D representation of an engineering object.',
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Participants solve an on-site engineering design problem using CAD software (e.g., SolidWorks, Inventor). They must create part files, assemblies, and working drawings.',
      eligibility: 'Two (2) individuals per chapter.',
      procedure: 'On-site design challenge (usually 4 hours).',
      careers: ['Mechanical Engineer', 'Industrial Designer', 'Drafter'],
      maxTeamSize: 1,
      timeLimit: '4 Hours',
      requirements: ['Laptop', 'CAD Software']
    }
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'ict',
    description: 'Participants identify cybersecurity threats and act to fix vulnerabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Teams demonstrate knowledge of cybersecurity through a written test and an on-site Capture The Flag (CTF) style challenge. They must identify security flaws, decrypt messages, and secure systems.',
      eligibility: 'One (1) team of 2-6 members.',
      procedure: 'Written test and on-site challenge.',
      careers: ['Information Security Analyst', 'Penetration Tester', 'Network Administrator'],
      maxTeamSize: 6,
      timeLimit: '2 Hours',
      requirements: ['Laptop', 'Written Test']
    }
  },
  {
    id: 'debating-tech',
    title: 'Debating Technological Issues',
    category: 'leadership',
    description: 'Participants debate against another team on a specific topic related to technology.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Artificial Intelligence in Medicine. Topics cover AI decision-making autonomy, healthcare access versus bias, and patient transparency about AI involvement.',
      fullDescription: 'Teams debate current issues related to technology and its impact on society (e.g., "AI in Schools" or "Space Exploration Funding"). Students must research topics in advance and be prepared to argue both pro and con positions in a structured debate format similar to Lincoln-Douglas or Public Forum.',
      eligibility: 'Three (3) teams of two (2) members per chapter.',
      procedure: 'Teams draw a sub-topic and position (Pro/Con) on site. They have a short preparation time followed by the debate.',
      careers: ['Lawyer', 'Policy Analyst', 'Public Relations Specialist', 'Ethicist'],
      maxTeamSize: 2,
      timeLimit: '15 Minutes',
      requirements: ['Research Summary', 'Debate']
    }
  },
  {
    id: 'digital-video',
    title: 'Digital Video Production',
    category: 'ict',
    description: 'Participants create a digital video that focuses on a specific theme.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Create an infomercial with a product, in the style of the 1990s.',
      fullDescription: 'Teams write, shoot, and edit a short film (1-3 minutes) based on an annual theme. The video must demonstrate high production value, including lighting, sound, and editing. A portfolio is required.',
      eligibility: 'One (1) team of 1-6 members.',
      procedure: 'Submit video and portfolio. Semifinalists participate in an interview.',
      careers: ['Film Director', 'Video Editor', 'Cinematographer'],
      maxTeamSize: 6,
      timeLimit: '3 Minutes',
      requirements: ['Video File', 'Portfolio']
    }
  },
  {
    id: 'dragster',
    title: 'Dragster Design',
    category: 'trans',
    description: 'Participants design, produce, and race a CO2-powered dragster.',
    imageUrl: 'https://images.unsplash.com/photo-1532588213355-52317771cce6?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'INSIDE / OUT. One axle must use internal wheels and the opposite axle must use external wheels.',
      fullDescription: 'Students design and construct a CO2-powered dragster according to strict specifications regarding length, weight, and wheel placement. The car is raced on a track for speed, and the entry is also judged on the quality of construction and the design drawings.',
      eligibility: 'Two (2) individuals per chapter.',
      procedure: 'Dragsters are impounded and measured for compliance. Compliant cars are raced. The final score is a combination of race speed and design points.',
      careers: ['Automotive Engineer', 'Aerospace Engineer', 'Industrial Designer'],
      maxTeamSize: 1,
      timeLimit: 'N/A',
      requirements: ['Dragster', 'Drawings']
    }
  },
  {
    id: 'engineering-design',
    title: 'Engineering Design',
    category: 'stem',
    description: 'Participants develop a solution to a specific problem provided on-site.',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Engineering the Future of Energy. Engineering solutions that improve the generation, storage, conservation, distribution, or use of energy.',
      fullDescription: 'Teams apply the engineering design process to solve a specific problem (e.g., "Design a device to sort recyclables"). They produce a portfolio outlining their research, ideation, and solution, as well as a prototype or model. Semifinalists present their solution.',
      eligibility: 'One (1) team of three (3) to six (6) members.',
      procedure: 'Submit portfolio and display. Semifinalists complete an on-site problem-solving challenge.',
      careers: ['Product Designer', 'Mechanical Engineer', 'Project Manager'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Portfolio', 'Display', 'Model/Prototype']
    }
  },
  {
    id: 'essays',
    title: 'Essays on Technology',
    category: 'leadership',
    description: 'Participants conduct research on specific subtopics of a broader technological area and write an essay.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    details: {
      verifyForSeason: '2026-2027',
      fullDescription: 'Participants write a research-based essay on a prompt provided on-site. The essay must follow MLA format and cite sources. The topic is usually related to a current technology trend.',
      eligibility: 'Three (3) individuals per chapter.',
      procedure: 'On-site writing session.',
      careers: ['Technical Writer', 'Journalist', 'Researcher'],
      maxTeamSize: 1,
      timeLimit: '2 Hours',
      requirements: ['Essay', 'Bibliography']
    }
  },
  {
    id: 'extemporaneous',
    title: 'Extemporaneous Speech',
    category: 'leadership',
    description: 'Participants give a speech on a topic provided on-site.',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Participants draw three topics related to technology or TSA, choose one, and have 15 minutes to prepare a speech. They then deliver the speech to judges without visual aids.',
      eligibility: 'Three (3) individuals per chapter.',
      procedure: 'Preparation and speech delivery.',
      careers: ['Politician', 'Sales Representative', 'Public Relations Manager'],
      maxTeamSize: 1,
      timeLimit: '5 Minutes',
      requirements: ['Speech']
    }
  },
  {
    id: 'fashion-design',
    title: 'Fashion Design and Technology',
    category: 'design',
    description: 'Participants research, design, and create a portfolio and wearable prototype that reflects the annual theme.',
    imageUrl: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Items created from recycled or repurposed materials. A maximum of two garments in one complete outfit.',
      fullDescription: 'Students research, design, and create a portfolio and wearable prototype (garment) that reflects the annual theme (e.g., "Avant Garde" or "Upcycled 80s"). They must demonstrate knowledge of fashion design principles, textile technology, and garment construction (sewing).',
      eligibility: 'One (1) team of two (2) to four (4) members.',
      procedure: 'Submit portfolio and garment. Semifinalists model the garment in a runway presentation.',
      careers: ['Fashion Designer', 'Textile Engineer', 'Costume Designer'],
      maxTeamSize: 4,
      timeLimit: 'N/A',
      requirements: ['Portfolio', 'Garment/Prototype', 'Presentation']
    }
  },
  {
    id: 'flight-endurance',
    title: 'Flight Endurance',
    category: 'trans',
    description: 'Participants design, build, and fly a rubber-band-powered model aircraft.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Students design, build, and fly a rubber-band-powered model aircraft within specific dimensional constraints. The goal is to achieve the longest flight time inside a hangar or gym. Documentation of the design, trim adjustments, and build process is required.',
      eligibility: 'Two (2) individuals per chapter.',
      procedure: 'Aircraft are measured. Participants get two flight attempts. The sum of the flight times determines placement.',
      careers: ['Aerospace Engineer', 'Pilot', 'Aviation Technician'],
      maxTeamSize: 1,
      timeLimit: 'N/A',
      requirements: ['Aircraft', 'Flight Log', 'Portfolio']
    }
  },
  {
    id: 'forensic-science',
    title: 'Forensic Science',
    category: 'stem',
    description: 'Participants take a written test and then participate in an on-site crime scene investigation.',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Teams take a test on forensic science concepts. Semifinalists investigate a mock crime scene, collect evidence, analyze data (fingerprints, DNA, hair), and write a police report.',
      eligibility: 'One (1) team of 2 members.',
      procedure: 'Written test and on-site analysis.',
      careers: ['Forensic Scientist', 'Crime Scene Investigator', 'Detective'],
      maxTeamSize: 2,
      timeLimit: '2 Hours',
      requirements: ['Test', 'Analysis Report']
    }
  },
  {
    id: 'future-teacher',
    title: 'Future Technology and Engineering Teacher',
    category: 'leadership',
    description: 'Participants investigate technology education and prepare a lesson plan.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Participants research the field of technology education, prepare a lesson plan, and deliver a short lesson to judges. They must also submit a portfolio explaining their teaching philosophy.',
      eligibility: 'Two (2) individuals per chapter.',
      procedure: 'Submit portfolio. Semifinalists deliver lesson.',
      careers: ['Teacher', 'Corporate Trainer', 'Instructional Designer'],
      maxTeamSize: 1,
      timeLimit: '10 Minutes',
      requirements: ['Lesson Plan', 'Portfolio', 'Presentation']
    }
  },
  {
    id: 'geospatial',
    title: 'Geospatial Technology',
    category: 'stem',
    description: 'Participants interpret geospatial data to solve a problem.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    details: {
      verifyForSeason: '2026-2027',
      fullDescription: 'Teams use GIS (Geographic Information Systems) data to solve a specific problem outlined in the annual theme. They create a visual display and portfolio.',
      eligibility: 'One (1) team of 2-5 members.',
      procedure: 'Submit portfolio and display. Semifinalists present.',
      careers: ['Cartographer', 'Urban Planner', 'GIS Specialist'],
      maxTeamSize: 5,
      timeLimit: 'N/A',
      requirements: ['Portfolio', 'Map/Display']
    }
  },
  {
    id: 'music-production',
    title: 'Music Production',
    category: 'design',
    description: 'Participants produce an original musical piece designed to be played during the national TSA conference.',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Compose an original, dynamic soundtrack for a climactic boss battle in a futuristic or fantasy video game, with escalating tension and dramatic contrasts.',
      fullDescription: 'Teams produce an original musical piece designed to be played during the national TSA conference opening or closing general sessions. The entry must demonstrate creativity and technical skill in audio production, mixing, and mastering. No copyrighted material is allowed.',
      eligibility: 'One (1) team of one (1) to six (6) members.',
      procedure: 'Submit audio file and documentation. Semifinalists participate in an interview.',
      careers: ['Audio Engineer', 'Music Producer', 'Sound Designer'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Audio File', 'Documentation']
    }
  },
  {
    id: 'on-demand-video',
    title: 'On Demand Video',
    category: 'ict',
    description: 'Participants produce a video within a specific time frame based on a prompt.',
    imageUrl: 'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Teams create a 60-second video during the conference based on a prompt revealed on-site (e.g., use a specific prop or line of dialogue). They must film and edit the video within 24-36 hours.',
      eligibility: 'One (1) team of 2-6 members.',
      procedure: 'Receive prompt, film, edit, submit.',
      careers: ['Video Editor', 'News Producer', 'Content Creator'],
      maxTeamSize: 6,
      timeLimit: '24-36 Hours',
      requirements: ['Video', 'Camera Equipment']
    }
  },
  {
    id: 'photographic-tech',
    title: 'Photographic Technology',
    category: 'design',
    description: 'Participants demonstrate understanding of and proficiency in photographic technology.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Behind the scenes.',
      fullDescription: 'Students create a portfolio of photos based on a specific theme (e.g., "Shadows" or "Macro"). They must demonstrate knowledge of photographic technology, composition, lighting, and editing techniques. A written description of the technical process is required.',
      eligibility: 'One (1) individual per chapter.',
      procedure: 'Submit portfolio. Semifinalists participate in an on-site photography challenge.',
      careers: ['Photographer', 'Photojournalist', 'Digital Artist'],
      maxTeamSize: 1,
      timeLimit: 'N/A',
      requirements: ['Portfolio', 'Photos']
    }
  },
  {
    id: 'prepared-presentation',
    title: 'Prepared Presentation',
    category: 'leadership',
    description: 'Participants deliver an oral presentation based on the current year’s theme.',
    imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Many technologies begin as science fiction before becoming reality. Choose one technology that was once considered futuristic and is now used today.',
      fullDescription: 'Students deliver an oral presentation based on the current year’s theme. They must use visual aids (PowerPoint, Props) and demonstrate effective public speaking skills, voice projection, and stage presence.',
      eligibility: 'Three (3) individuals per chapter.',
      procedure: 'Deliver presentation to judges. Time limits are strictly enforced.',
      careers: ['Public Speaker', 'Sales Manager', 'Teacher', 'Politician'],
      maxTeamSize: 1,
      timeLimit: '5 Minutes',
      requirements: ['Presentation', 'Visual Aids']
    }
  },
  {
    id: 'promotional-design',
    title: 'Promotional Design',
    category: 'design',
    description: 'Participants create marketing materials for TSA.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Design branding and materials for Milestone Diner, a retro 1978-inspired American diner: logo, menu, business card, and Instagram advertisement.',
      fullDescription: 'Students design a set of promotional materials for the National TSA Conference (e.g., logo, poster, social media graphic). They must demonstrate knowledge of layout, typography, and branding.',
      eligibility: 'Two (2) individuals per chapter.',
      procedure: 'Submit portfolio and designs. Semifinalists participate in an on-site design challenge.',
      careers: ['Graphic Designer', 'Marketing Director', 'Art Director'],
      maxTeamSize: 1,
      timeLimit: 'N/A',
      requirements: ['Portfolio', 'Designs']
    }
  },
  {
    id: 'scivis',
    title: 'Scientific Visualization',
    category: 'ict',
    description: 'Participants use computer graphics to visualize a scientific concept.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    details: {
      verifyForSeason: '2026-2027',
      fullDescription: 'Teams create a 2-4 minute animation or visualization that explains a complex scientific concept (STEM). The project must be accurate and visually engaging.',
      eligibility: 'One (1) team of 1-6 members.',
      procedure: 'Submit video and portfolio. Semifinalists interview.',
      careers: ['Medical Illustrator', '3D Animator', 'Data Visualization Specialist'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Video', 'Portfolio']
    }
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    category: 'ict',
    description: 'Participants use knowledge of cutting-edge technologies to design and implement a software development project.',
    imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Develop a software application that improves how people learn, teach, practice, or develop new skills.',
      fullDescription: 'Teams design and implement a software development project (desktop app, mobile app, or web app). They must document their process, including requirements, design, implementation, and testing. A working prototype is required.',
      eligibility: 'One (1) team per chapter.',
      procedure: 'Submit portfolio and software. Semifinalists demonstrate the software and answer technical questions.',
      careers: ['Software Engineer', 'App Developer', 'Product Manager'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Portfolio', 'Software Application', 'Presentation']
    }
  },
  {
    id: 'structural-design',
    title: 'Structural Design & Engineering',
    category: 'stem',
    description: 'Participants design and build a structure to support a specific load.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'See the official Structural Design and Engineering problem PDF on the TSA Themes and Problems page.',
      fullDescription: 'Teams design and build a structure (e.g., bridge, crane) using only balsa wood and glue that meets specific dimensional requirements. The structure is destructively tested to see how much weight it can hold before failure. Efficiency (weight held / structure weight) determines the winner.',
      eligibility: 'One (1) team of 2 members.',
      procedure: 'Structures are measured and then tested. Teams also submit CAD drawings.',
      careers: ['Civil Engineer', 'Structural Engineer', 'Architect'],
      maxTeamSize: 2,
      timeLimit: 'N/A',
      requirements: ['Structure', 'Drawings']
    }
  },
  {
    id: 'system-control',
    title: 'System Control Technology',
    category: 'stem',
    description: 'Participants analyze a problem and build a computer-controlled mechanical system to solve it.',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800',
    details: {
      verifyForSeason: '2026-2027',
      fullDescription: 'Teams analyze a problem statement released on-site and build a solution using a construction system (like LEGO Mindstorms or VEX) and custom programming. The device must operate autonomously.',
      eligibility: 'One (1) team of 3 members.',
      procedure: 'On-site build and programming challenge.',
      careers: ['Robotics Engineer', 'Automation Specialist', 'Programmer'],
      maxTeamSize: 3,
      timeLimit: '4 Hours',
      requirements: ['Construction Kit', 'Laptop']
    }
  },
  {
    id: 'tech-bowl',
    title: 'Technology Bowl',
    category: 'stem',
    description: 'Participants demonstrate their knowledge of TSA and technology in a quiz bowl format.',
    imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Teams take a written test on technology history, current events, and TSA facts. The top teams advance to a head-to-head buzzer competition.',
      eligibility: 'One (1) team of 3 members.',
      procedure: 'Written test. Head-to-head oral quiz.',
      careers: ['Any STEM Field'],
      maxTeamSize: 3,
      timeLimit: 'N/A',
      requirements: ['Test', 'Buzzer System (provided)']
    }
  },
  {
    id: 'tech-problem',
    title: 'Technology Problem Solving',
    category: 'stem',
    description: 'Participants use problem-solving skills to construct a finite solution to a problem.',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Teams are given a problem statement, a set of tools/materials (often random items), and a time limit to build a solution on-site. Past challenges include building a tower or a catapult.',
      eligibility: 'One (1) team of 2 members.',
      procedure: 'On-site build and test.',
      careers: ['Engineer', 'Consultant', 'Fixer'],
      maxTeamSize: 2,
      timeLimit: '2 Hours',
      requirements: ['Toolbox']
    }
  },
  {
    id: 'trans-modeling',
    title: 'Transportation Modeling',
    category: 'trans',
    description: 'Participants design and produce a scale model of a vehicle.',
    imageUrl: 'https://images.unsplash.com/photo-1532588213355-52317771cce6?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Cartoon and comic vehicles.',
      fullDescription: 'Students design and scratch-build a scale model of a vehicle based on an annual theme. The model is judged on craftsmanship, detail, and adherence to scale. A portfolio and drawings are required.',
      eligibility: 'One (1) individual per chapter.',
      procedure: 'Submit model and portfolio. Semifinalists interview.',
      careers: ['Industrial Designer', 'Model Maker', 'Transportation Planner'],
      maxTeamSize: 1,
      timeLimit: 'N/A',
      requirements: ['Model', 'Portfolio']
    }
  },
  {
    id: 'video-game-design',
    title: 'Video Game Design',
    category: 'ict',
    description: 'Participants develop an E-rated game that focuses on the subject of their choice.',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Create a deep space-themed RPG where the primary method of progression is puzzle-solving rather than combat.',
      fullDescription: 'Teams develop an E-rated game that focuses on the subject of their choice. The game must be playable and include documentation of the design and development process, art assets, and game mechanics.',
      eligibility: 'One (1) team per chapter.',
      procedure: 'Submit game and portfolio. Semifinalists demonstrate the game to judges.',
      careers: ['Game Designer', 'Level Designer', 'Game Programmer'],
      maxTeamSize: 6,
      timeLimit: 'N/A',
      requirements: ['Game Executable', 'Portfolio', 'Interview']
    }
  },
  {
    id: 'webmaster',
    title: 'Webmaster',
    category: 'ict',
    description: 'Participants design, build, and launch a website that features the school’s TSA chapter.',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Build an Artificial Intelligence (AI) learning portal that teaches high school students about AI concepts, tools, and ethical usage.',
      fullDescription: 'Teams design, build, and launch a website that features the school’s TSA chapter. The website must include specific content sections (About, Leadership, Contact), be fully responsive, and demonstrate modern web design principles. A design brief and interview are part of the evaluation. Templates are typically restricted.',
      eligibility: 'One (1) team of three (3) to five (5) members.',
      procedure: 'Submit URL and design brief prior to conference. Semifinalists participate in an interview regarding their development process.',
      careers: ['Front-End Developer', 'UX/UI Designer', 'Full Stack Engineer', 'Digital Marketer'],
      maxTeamSize: 5,
      timeLimit: 'N/A',
      requirements: ['Website URL', 'Design Brief', 'Interview']
    }
  },
  /* --- TEXAS UNIQUE TO TEXAS EVENTS (UTE) --- */
  {
    id: 'ute-hot-rod',
    title: 'Hot Rod CO2 Car (UTE)',
    category: 'trans',
    description: 'Design and build realistic 1/4-mile hot rod scale models (dragsters, funny cars, pro-stock, trucks).',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Hot Rod Competition (HRC) encourages students to design and build realistic 1/4-mile hot rod scale models. Vehicles should be built of several parts or sub-assemblies (not carved or 3D-printed as a single unit). Separate categories exist for Wood and ABS Plastic.',
      eligibility: 'Individual entry.',
      procedure: 'Submit model for judging based on realism and craftsmanship.',
      careers: ['Automotive Designer', 'Model Maker', 'Industrial Engineer'],
      maxTeamSize: 1,
      timeLimit: 'N/A',
      requirements: ['Scale Model', 'Portfolio']
    }
  },
  {
    id: 'ute-research-racer',
    title: 'CO2 Research Racer (UTE)',
    category: 'trans',
    description: 'Miniature cars propelled by a pierced CO2 cartridge racing on a 60 ft track.',
    imageUrl: 'https://images.unsplash.com/photo-1532906619279-a7551079d571?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'CO2 Research Racer cars are miniature cars propelled by a pierced CO2 cartridge racing on a ~60 ft (18 m) track — used to demonstrate mass, force, acceleration, aerodynamics. Cars are formed by shaping a single piece of wood or plastic into the body.',
      eligibility: 'Individual entry.',
      procedure: 'Cars are raced on a track. Speed and design are evaluated.',
      careers: ['Aerodynamics Engineer', 'Automotive Technician', 'Physics Researcher'],
      maxTeamSize: 1,
      timeLimit: 'N/A',
      requirements: ['CO2 Car', 'Design Drawing']
    }
  },
  {
    id: 'ute-rc-vehicle',
    title: 'RC Vehicle (UTE)',
    category: 'trans',
    description: 'Competitors build an electric RC car from their own design or from a kit.',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Competitors build an electric RC car from their own design or from a kit. No store-bought, already-assembled RC cars allowed. Course is a road race. All RC vehicles must be electric/battery powered.',
      eligibility: 'Team of 2 to 4 students.',
      procedure: 'Race the vehicle on a designated road course.',
      careers: ['Electrical Engineer', 'Robotics Technician', 'Hobbyist'],
      maxTeamSize: 4,
      timeLimit: 'N/A',
      requirements: ['RC Vehicle', 'Batteries', 'Controller']
    }
  },
  {
    id: 'ute-drone',
    title: 'Drone Competition (UTE)',
    category: 'trans',
    description: 'Teams collect meter data using a drone and transmit it back to headquarters.',
    imageUrl: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Texas TSA Power & Electric has new smart electrical meters that can be read wirelessly by a drone — teams collect meter data and transmit it back to headquarters as quickly as possible.',
      eligibility: 'Team of 2 to 3 students.',
      procedure: 'Fly drone to read meters and transmit data.',
      careers: ['Drone Pilot', 'Data Analyst', 'GIS Specialist'],
      maxTeamSize: 3,
      timeLimit: 'N/A',
      requirements: ['Drone', 'Transmitter', 'Laptop']
    }
  },
  {
    id: 'ute-trebuchet',
    title: 'Catapult / Trebuchet (UTE)',
    category: 'stem',
    description: 'Design and build a trebuchet to launch a projectile at a target.',
    imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Students design and build a trebuchet (swinging arm, counterweight type) to launch a projectile. The goal is accuracy and distance.',
      eligibility: 'Team of 2 to 4 students.',
      procedure: 'Launch projectiles at targets during the competition.',
      careers: ['Mechanical Engineer', 'Historian', 'Physics Teacher'],
      maxTeamSize: 4,
      timeLimit: 'N/A',
      requirements: ['Trebuchet', 'Projectiles', 'Safety Gear']
    }
  },
  {
    id: 'ute-computer-skills',
    title: 'On-Site Computer Skills (UTE)',
    category: 'ict',
    description: 'Demonstrate proficiency in various computer applications on-site.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Participating schools must supply all necessary software/hardware. All judging is done on screen. Events include Animation, Graphic Design, and Multi-Media Presentation. No internet allowed.',
      eligibility: 'Individual entry.',
      procedure: '1-hour time limit to complete the task on a laptop.',
      careers: ['Graphic Designer', 'Animator', 'IT Specialist'],
      maxTeamSize: 1,
      timeLimit: '1 Hour',
      requirements: ['Laptop', 'Mouse', 'Software']
    }
  },
  {
    id: 'ute-graphic-solutions',
    title: 'Graphic Solutions (UTE)',
    category: 'design',
    description: 'Solve a given graphic design problem with minimum supplies.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Tests the student’s ability to solve a given problem with minimum supplies. Only allowed items: flat drawing surface, pencils, erasers. No drafting aids. Grid paper provided.',
      eligibility: 'Individual entry.',
      procedure: '1-hour time limit to sketch/draw the solution.',
      careers: ['Architect', 'Drafter', 'Industrial Designer'],
      maxTeamSize: 1,
      timeLimit: '1 Hour',
      requirements: ['Pencils', 'Erasers', 'Clipboard']
    }
  },
  {
    id: 'ute-promo-video',
    title: 'On-Demand Promo Video (UTE)',
    category: 'ict',
    description: 'On-site film production challenge completed within 24 hours.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Participants showcase video skills to communicate/promote a topic. Required criteria (props, a line of dialogue) will be revealed at orientation. Teams are given 24 hours to complete the challenge.',
      eligibility: 'Team of 2 to 4 students.',
      procedure: 'Receive prompt, film and edit within 24 hours.',
      careers: ['Videographer', 'Director', 'Editor'],
      maxTeamSize: 4,
      timeLimit: '24 Hours',
      requirements: ['Camera', 'Editing Laptop']
    }
  },
  {
    id: 'ute-social-media',
    title: 'Social Media Marketing (UTE)',
    category: 'design',
    description: 'On-site challenge to promote an event via social media concepts.',
    imageUrl: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'On-site social media marketing challenge to communicate/promote an event on social media. Required criteria (hashtags, content, theme) revealed at orientation. Teams are given 24 hours to complete the challenge.',
      eligibility: 'Team of 2 to 4 students.',
      procedure: 'Create a social media campaign strategy and assets within 24 hours.',
      careers: ['Social Media Manager', 'Marketing Specialist', 'Content Creator'],
      maxTeamSize: 4,
      timeLimit: '24 Hours',
      requirements: ['Laptop', 'Design Software']
    }
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    category: 'ict',
    description: 'Participants demonstrate knowledge of artificial intelligence concepts, models, and best practices by completing a test to qualify for semifinals.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Applying leadership and 21st century skills, participants demonstrate knowledge of artificial intelligence (AI) concepts, models, and best practices by completing a test to qualify for semifinals. Semifinalist teams solve an onsite problem using a generative artificial intelligence (GenAI) tool.',
      eligibility: 'One (1) team of two (2) individuals per chapter.',
      procedure: 'Teams sit a written test on AI concepts, models, and best practices. Semifinalists solve an onsite problem using a GenAI tool; solutions are measured objectively against the stated problem.',
      careers: ['Machine Learning Engineer', 'AI Researcher', 'Data Scientist', 'Prompt Engineer'],
      maxTeamSize: 2,
      timeLimit: 'Test plus onsite semifinal',
      requirements: ['Written test', 'Onsite GenAI problem']
    }
  },
  {
    id: 'automated-manufacturing',
    title: 'Automated Manufacturing Systems',
    category: 'trans',
    description: 'Participants collaborate to engineer and prototype an automated manufacturing system that solves a production problem.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      fullDescription: 'Applying leadership and 21st century skills, participants collaborate to engineer and prototype an automated manufacturing system to solve a production problem. Teams analyse the prompt, build a sensor-based mechatronic solution, program the automation logic, and create instructions for judges.',
      eligibility: 'Two (2) teams of two to three (2-3) members per state.',
      procedure: 'Teams analyse the production prompt, build a sensor-based mechatronic solution, program its automation logic, and document operating instructions for the judges.',
      careers: ['Automation Engineer', 'Mechatronics Technician', 'Industrial Engineer', 'Controls Engineer'],
      maxTeamSize: 3,
      timeLimit: 'Onsite build and demonstration',
      requirements: ['Prototype system', 'Automation logic', 'Judge instructions']
    }
  },
  {
    id: 'data-science',
    title: 'Data Science and Analytics',
    category: 'ict',
    description: 'Participants identify a societal issue, compile data about it, and produce documentation and a digital scientific poster on their findings.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Identify and use one AI-generated dataset related to Climate and Environmental Sustainability, citing the AI tool and the prompts used.',
      fullDescription: 'Participants identify a societal issue, collect or compile data from various sources about the issue, and then produce documentation and a digital scientific poster about their findings.',
      eligibility: 'Three (3) teams of two (2) individuals per state; individual entries are permitted.',
      procedure: 'Teams gather and analyse data on their chosen issue, then submit documentation and a digital scientific poster presenting the analysis and conclusions.',
      careers: ['Data Scientist', 'Data Analyst', 'Statistician', 'Business Intelligence Analyst'],
      maxTeamSize: 2,
      timeLimit: 'Submission plus semifinal',
      requirements: ['Documentation', 'Digital scientific poster']
    }
  },
  {
    id: 'drone-challenge',
    title: 'Drone Challenge (UAV)',
    category: 'trans',
    description: 'Participants design, build, assemble, document, and test fly an open-source unmanned aerial vehicle to the annual theme specifications.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Humanitarian Aid and Rescue.',
      fullDescription: 'Participants design, build, assemble, document, and test fly an open-source Unmanned Aerial Vehicle (UAV) according to the stated annual theme and problem specifications.',
      eligibility: 'Three (3) teams of two to six (2-6) members per state.',
      procedure: 'Teams document their build and fly the UAV through the challenge course defined by the annual problem.',
      careers: ['UAV Pilot', 'Aerospace Engineer', 'Robotics Engineer', 'Surveying Technician'],
      maxTeamSize: 6,
      timeLimit: 'Flight trials',
      requirements: ['UAV', 'Documentation portfolio', 'Test flight']
    }
  },
  {
    id: 'hybrid-racer-xl',
    title: 'Hybrid Racer XL',
    category: 'trans',
    description: 'Participants design, construct, and race a dual-powered solar and battery car, applying STEM concepts throughout.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'The vehicle must hold or pull one 5-ounce fishing weight using a rear hitch attachment.',
      fullDescription: 'Hybrid Racer XL provides a hands-on opportunity for participants to apply science, technology, engineering, and mathematics concepts as they design, construct, and race a dual-powered (solar and battery) car.',
      eligibility: 'One (1) team of two to four (2-4) individuals per chapter; one (1) entry per team.',
      procedure: 'Teams build the dual-powered vehicle to specification, document the design, and race it at the conference.',
      careers: ['Automotive Engineer', 'Electrical Engineer', 'Renewable Energy Technician', 'Design Engineer'],
      maxTeamSize: 4,
      timeLimit: 'Race heats',
      requirements: ['Hybrid vehicle', 'Documentation', 'Race performance']
    }
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    category: 'arch',
    description: 'Participants develop colour sample and material design boards to plan a cohesive interior based on the annual challenge.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Tiny Living, Big Impact. Design an interior for a model home in a tiny home community for young adults, with the specified spaces and design considerations.',
      fullDescription: 'Applying leadership and 21st century skills, participants develop a colour sample and material design board or boards, of the kind used by interior designers to plan an overall cohesive design, based on an annual challenge.',
      eligibility: 'Three (3) teams of two (2) individuals per state; individual entries are permitted.',
      procedure: 'Participants prepare and submit design boards showing colour samples, materials, and the reasoning behind a cohesive interior scheme.',
      careers: ['Interior Designer', 'Space Planner', 'Set Designer', 'Architectural Designer'],
      maxTeamSize: 2,
      timeLimit: 'Submission plus interview',
      requirements: ['Design board(s)', 'Colour and material samples']
    }
  },
  {
    id: 'manufacturing-prototype',
    title: 'Manufacturing Prototype',
    category: 'trans',
    description: 'Participants design, fabricate, and use computer integrated manufacturing to create a product that addresses the annual theme.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'A display or container for small collectible items.',
      fullDescription: 'Participants design, fabricate, and use Computer Integrated Manufacturing (CIM) to create a product that addresses the annual theme.',
      eligibility: 'One (1) team per chapter.',
      procedure: 'Teams design the product, fabricate it using CIM processes, and present the prototype with its supporting documentation.',
      careers: ['Manufacturing Engineer', 'CNC Machinist', 'Product Designer', 'Industrial Designer'],
      maxTeamSize: 6,
      timeLimit: 'Submission plus presentation',
      requirements: ['Prototype', 'Documentation portfolio', 'Presentation']
    }
  },
  {
    id: 'robotics',
    title: 'Robotics',
    category: 'stem',
    description: 'Participants design, build, document, and test a robot assembled from open-source parts to meet the annual challenge.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'See the official Robotics problem PDF on the TSA Themes and Problems page.',
      fullDescription: 'Participants design, build, document, and test a robot assembled using open-sourced parts, according to stated specifications and to meet the challenge of the yearly theme and problem.',
      eligibility: 'Two (2) teams of two to six (2-6) members per state.',
      procedure: 'Teams build the robot to specification, document the engineering process, and run it against the annual challenge.',
      careers: ['Robotics Engineer', 'Controls Engineer', 'Software Engineer', 'Mechatronics Specialist'],
      maxTeamSize: 6,
      timeLimit: 'Challenge runs',
      requirements: ['Robot', 'Documentation', 'Challenge performance']
    }
  },
  {
    id: 'stem-mass-media',
    title: 'STEM Mass Media',
    category: 'design',
    description: 'Participants convey a news story in both a video broadcast and a digital written format, in response to the annual theme.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'Headline: Scientists link human right-handedness to walking upright and brain evolution. Develop a news broadcast analysing the story and its implications.',
      fullDescription: 'In response to an annual theme, participants use written and verbal communication skills to convey a news story in both a video broadcast for the preliminary round and a digital written format for the semifinal round.',
      eligibility: 'One (1) team of two to three (2-3) members per chapter.',
      procedure: 'Teams produce a video news broadcast for the preliminary round; semifinalists then produce the story in a digital written format.',
      careers: ['Broadcast Journalist', 'Science Communicator', 'Video Producer', 'Technical Writer'],
      maxTeamSize: 3,
      timeLimit: 'Broadcast plus semifinal',
      requirements: ['Video broadcast', 'Digital written story']
    }
  },
  {
    id: 'vr-simulation',
    title: 'Virtual Reality Simulation (VR)',
    category: 'ict',
    description: 'Participants build a virtual reality experience that tests a user’s ability to perform life-saving interventions under pressure.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'High-speed first aid immersive simulation, covering interventions such as anaphylaxis, obstructed airways, or traumatic haemorrhaging.',
      fullDescription: 'Participants develop a virtual reality experience that evaluates a user’s ability to perform life-saving interventions under pressure. The simulation must include a Training Mode giving instructional support and immediate guidance, and a Certification Mode simulating a realistic, time-sensitive emergency with no assistance, plus a performance analytics dashboard.',
      eligibility: 'One (1) team per chapter; individual entries are permitted.',
      procedure: 'Teams build both Training and Certification modes, then submit the simulation with its performance analytics dashboard summarising technical proficiency and response efficiency.',
      careers: ['XR Developer', 'Simulation Engineer', 'Game Developer', 'Medical Training Designer'],
      maxTeamSize: 6,
      timeLimit: 'Submission plus demonstration',
      requirements: ['VR simulation', 'Training and Certification modes', 'Analytics dashboard']
    }
  },
  {
    id: 'vlogging',
    title: 'Vlogging',
    category: 'design',
    description: 'Participants use digital video to create original vlog content reflecting the annual theme, with an onsite challenge for semifinalists.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    details: {
      theme: 'The Butterfly Effect. Explore how small actions create meaningful change, across a three-episode series.',
      fullDescription: 'Vlogging encourages good storytelling, videography, and editing techniques to create a coherent series of creative work. Applying leadership and 21st century skills, participants use digital video technology to create original content that reflects an annual technology theme. Semifinalists complete an onsite challenge to produce additional video.',
      eligibility: 'Two (2) teams of two to six (2-6) members per chapter.',
      procedure: 'Teams submit their vlog series. Semifinalists complete an onsite challenge; required criteria such as props, lines of dialogue, and topics are revealed at the semifinalist orientation meeting.',
      careers: ['Content Creator', 'Video Editor', 'Digital Marketer', 'Videographer'],
      maxTeamSize: 6,
      timeLimit: 'Submission plus onsite challenge',
      requirements: ['Vlog series', 'Onsite challenge video']
    }
  },
];

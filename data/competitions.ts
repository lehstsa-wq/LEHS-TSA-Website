
export const COMPETITIONS = [
  {
    id: 'animatronics',
    title: 'Animatronics',
    category: 'stem',
    description: 'Participants demonstrate knowledge of mechanical and control systems by designing, fabricating, and controlling an animatronics device.',
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    title: 'Future Technology Teacher',
    category: 'leadership',
    description: 'Participants investigate technology education and prepare a lesson plan.',
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
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
    details: {
      fullDescription: 'Teams design, build, and launch a website that features the school’s TSA chapter. The website must include specific content sections (About, Leadership, Contact), be fully responsive, and demonstrate modern web design principles. A design brief and interview are part of the evaluation. Templates are typically restricted.',
      eligibility: 'One (1) team of three (3) to five (5) members.',
      procedure: 'Submit URL and design brief prior to conference. Semifinalists participate in an interview regarding their development process.',
      careers: ['Front-End Developer', 'UX/UI Designer', 'Full Stack Engineer', 'Digital Marketer'],
      maxTeamSize: 5,
      timeLimit: 'N/A',
      requirements: ['Website URL', 'Design Brief', 'Interview']
    }
  }
];

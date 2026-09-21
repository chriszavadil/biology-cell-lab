/* Original study content; see Sources in the app. */
export const DATA = {
  "version": "1.0.1",
  "topics": [
    {
      "id": "life",
      "name": "Characteristics of life",
      "short": "Life",
      "subtitle": "Six traits, with everyday examples",
      "icon": "spark",
      "tone": "mint",
      "sources": [
        "class",
        "life"
      ]
    },
    {
      "id": "organization",
      "name": "Levels of organization",
      "short": "Organization",
      "subtitle": "From a single atom to an organism",
      "icon": "layers",
      "tone": "lavender",
      "sources": [
        "life"
      ]
    },
    {
      "id": "cells",
      "name": "Cell basics & types",
      "short": "Cell types",
      "subtitle": "Prokaryotes, eukaryotes, and cell theory",
      "icon": "cell",
      "tone": "blue",
      "sources": [
        "cells",
        "organelles"
      ]
    },
    {
      "id": "organelles",
      "name": "Meet the organelles",
      "short": "Organelles",
      "subtitle": "What each cell structure actually does",
      "icon": "orbit",
      "tone": "rose",
      "sources": [
        "organelles",
        "genome"
      ]
    },
    {
      "id": "protein",
      "name": "The protein pathway",
      "short": "Proteins",
      "subtitle": "Make it, package it, send it",
      "icon": "route",
      "tone": "lavender",
      "sources": [
        "protein"
      ]
    },
    {
      "id": "energy",
      "name": "Energy in cells",
      "short": "Energy",
      "subtitle": "Mitochondria, chloroplasts, and ATP",
      "icon": "bolt",
      "tone": "peach",
      "sources": [
        "organelles"
      ]
    },
    {
      "id": "transport",
      "name": "Membranes & water",
      "short": "Transport",
      "subtitle": "Osmosis, transport, and turgor pressure",
      "icon": "drop",
      "tone": "blue",
      "sources": [
        "transport",
        "active",
        "organelles"
      ]
    },
    {
      "id": "chemistry",
      "name": "Biology building blocks",
      "short": "Chemistry",
      "subtitle": "A little extra: molecules, bonds, and enzymes",
      "icon": "flask",
      "tone": "mint",
      "sources": [
        "chemistry"
      ]
    }
  ],
  "sources": {
    "class": {
      "title": "Your Honors Biology Unit 2 study guide",
      "note": "The seven prompts were transcribed from the supplied worksheet. The six-trait grouping follows the classroom reading previously supplied. The photo and student information are not published."
    },
    "life": {
      "title": "OpenStax Biology 2e · Themes and concepts of biology",
      "url": "https://openstax.org/books/biology-2e/pages/1-2-themes-and-concepts-of-biology"
    },
    "cells": {
      "title": "OpenStax Biology 2e · Prokaryotic cells",
      "url": "https://openstax.org/books/biology-2e/pages/4-2-prokaryotic-cells"
    },
    "organelles": {
      "title": "OpenStax Biology 2e · Eukaryotic cells",
      "url": "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells"
    },
    "protein": {
      "title": "OpenStax Biology 2e · The endomembrane system and proteins",
      "url": "https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins"
    },
    "transport": {
      "title": "OpenStax Biology 2e · Passive transport",
      "url": "https://openstax.org/books/biology-2e/pages/5-2-passive-transport"
    },
    "active": {
      "title": "OpenStax Biology 2e · Active transport",
      "url": "https://openstax.org/books/biology-2e/pages/5-3-active-transport"
    },
    "chemistry": {
      "title": "OpenStax Biology 2e · Biological macromolecules",
      "url": "https://openstax.org/books/biology-2e/pages/3-introduction"
    },
    "genome": {
      "title": "National Human Genome Research Institute · Talking glossary",
      "url": "https://www.genome.gov/genetics-glossary"
    }
  },
  "traits": [
    {
      "name": "Respond to their environment",
      "meaning": "React to a stimulus, or a change around them.",
      "example": "A plant shoot bends toward a light source."
    },
    {
      "name": "Grow and develop",
      "meaning": "Increase in size and go through changes during life.",
      "example": "A tadpole develops into a frog."
    },
    {
      "name": "Produce offspring",
      "meaning": "Reproduce, creating a new generation.",
      "example": "A bacterium divides into two cells."
    },
    {
      "name": "Maintain homeostasis",
      "meaning": "Keep internal conditions within a stable range.",
      "example": "Sweating helps cool your body when you are hot."
    },
    {
      "name": "Have complex chemistry",
      "meaning": "Use many chemical reactions to build materials and process energy; these reactions are metabolism.",
      "example": "Enzymes help cells break down glucose and make ATP."
    },
    {
      "name": "Consist of cells",
      "meaning": "Have one or more cells, the basic units of life.",
      "example": "Onion skin is made of many individual cells."
    }
  ],
  "guides": [
    {
      "id": 1,
      "title": "The six signs of life",
      "topic": "life",
      "prompt": "Identify the 6 characteristics of life and provide an example of each.",
      "answer": "Respond to the environment; grow and develop; produce offspring; maintain homeostasis; have complex chemistry; consist of cells. Give an example for each.",
      "simple": "Living things react, grow, reproduce, stay balanced, run chemical reactions, and are made of cells.",
      "detail": "These are the six headings from your class reading. Other textbooks group life’s characteristics differently. Reproduction describes the continuation of life; an individual does not have to produce offspring to be alive.",
      "checklist": [
        "Name all six class traits.",
        "Give a matching example for every trait.",
        "Explain homeostasis as a stable internal range.",
        "Connect complex chemistry to metabolism."
      ],
      "memory": "React · Grow · Reproduce · Balance · Chemistry · Cells",
      "pitfall": "Walking or breathing air is not required of every living organism. Plants are alive, too.",
      "sources": [
        "class",
        "life"
      ],
      "kind": "traits"
    },
    {
      "id": 2,
      "title": "From atom to organism",
      "topic": "organization",
      "prompt": "List the biological levels of organization in order from smallest to largest, starting at the atomic level and ending at the organismal level.",
      "answer": "Atom → molecule → organelle → cell → tissue → organ → organ system → organism.",
      "simple": "Small parts build bigger parts, until you have one complete living thing.",
      "detail": "Example: carbon atom → protein molecule → mitochondrion → muscle cell → muscle tissue → heart → circulatory system → person. This is the usual nested hierarchy for a complex multicellular organism; a single-celled organism does not have tissues or organs.",
      "checklist": [
        "Start with atom and then molecule.",
        "Put organelle before cell.",
        "Put tissue before organ.",
        "Finish with organ system and then organism."
      ],
      "memory": "Atoms Make Organelles; Cells Team, Organs Organize Organisms.",
      "pitfall": "An organelle is a structure inside a cell. An organ is a body structure made of multiple tissues.",
      "sources": [
        "class",
        "life"
      ],
      "kind": "levels"
    },
    {
      "id": 3,
      "title": "What all cells share",
      "topic": "cells",
      "prompt": "Identify two structural features shared by ALL cells (both prokaryotic and eukaryotic) and two structural features unique to eukaryotic cells.",
      "answer": "All cells have a cell membrane and cytoplasm. Eukaryotic cells are characterized by a membrane-bound nucleus and other membrane-bound organelles, such as mitochondria or the endoplasmic reticulum.",
      "simple": "Every cell has a boundary and an inside. Eukaryotes also have separate, membrane-wrapped work areas.",
      "detail": "DNA and ribosomes are also core features in standard comparisons of cell types. Cell membrane and cytoplasm are the safest two answers to the worksheet’s word ALL; some highly specialized mature cells lose DNA and ribosomes. Bacteria still have DNA even though they do not have a nucleus.",
      "checklist": [
        "Name cell membrane and cytoplasm as shared features.",
        "Name a membrane-bound nucleus as a eukaryotic feature.",
        "Name another membrane-bound organelle or the category.",
        "Do not claim that bacteria lack DNA."
      ],
      "memory": "Pro = no nucleus. Eu = nucleus and compartments.",
      "pitfall": "Ribosomes are NOT unique to eukaryotes, and a cell wall is NOT found in all cells.",
      "sources": [
        "class",
        "cells",
        "organelles"
      ],
      "kind": "compare"
    },
    {
      "id": 4,
      "title": "A protein’s journey",
      "topic": "protein",
      "prompt": "Trace the pathway of a secreted protein from its synthesis to its export out of the cell, naming three organelles involved in order.",
      "answer": "Ribosomes on the rough ER make the protein → transport vesicles carry it to the Golgi apparatus → the Golgi modifies and sorts it → a secretory vesicle fuses with the cell membrane and releases it by exocytosis.",
      "simple": "Build at the rough ER, prepare at the Golgi, deliver in a vesicle.",
      "detail": "For three key organelles in order, use rough ER → Golgi apparatus → secretory vesicle, and mention transport vesicles between the ER and Golgi plus the final cell-membrane fusion. The ribosome does the actual protein synthesis. DNA instructions are copied into mRNA in the nucleus, but the protein itself is not made in the nucleus.",
      "checklist": [
        "Start synthesis at a ribosome on the rough ER.",
        "Include transport from ER to Golgi in a vesicle.",
        "Say the Golgi modifies, sorts, and packages.",
        "End with a secretory vesicle and exocytosis at the membrane."
      ],
      "memory": "ER → Golgi → Go!",
      "pitfall": "The nucleus supplies instructions; it does not make the secreted protein or ship the protein to the ER.",
      "sources": [
        "class",
        "protein"
      ],
      "kind": "pathway"
    },
    {
      "id": 5,
      "title": "Two energy specialists",
      "topic": "energy",
      "prompt": "Compare the primary functions of the mitochondrion and the chloroplast. Which of these organelles would you expect to find in a plant root cell, and why?",
      "answer": "Mitochondria use energy from nutrients to make ATP during cellular respiration. Chloroplasts use light energy to help make sugars during photosynthesis. A typical underground root cell has mitochondria but normally lacks chloroplasts: it needs ATP, but receives little or no light.",
      "simple": "Chloroplasts help make the food. Mitochondria help turn food’s energy into usable ATP. Roots need ATP even in the dark.",
      "detail": "Sugars made in photosynthetic tissues can travel to roots. Plants carry out cellular respiration as well as photosynthesis. Some exposed or specially adapted roots can be green, so the answer refers to a typical underground root.",
      "checklist": [
        "Connect mitochondria with cellular respiration and ATP.",
        "Connect chloroplasts with photosynthesis and sugars.",
        "Choose mitochondria for a typical underground root.",
        "Explain the root’s need for ATP and lack of light."
      ],
      "memory": "Chloro captures light; mito makes usable ATP.",
      "pitfall": "Plants need mitochondria. Photosynthesis does not replace cellular respiration.",
      "sources": [
        "class",
        "organelles"
      ],
      "kind": "energy"
    },
    {
      "id": 6,
      "title": "What gives plants support?",
      "topic": "organelles",
      "prompt": "Describe two structural organelles present in plant cells that are absent in animal cells, and explain how each structure supports the plant’s survival.",
      "answer": "The cellulose cell wall gives shape, protection, and support. The large central vacuole stores water and maintains turgor pressure, helping keep the plant firm and upright. Animal cells do not have a cellulose cell wall or a large plant-style central vacuole.",
      "simple": "The wall is the firm outer support. The water-filled central vacuole pushes outward to help the cell stay firm.",
      "detail": "The worksheet uses “organelles” broadly. A cell wall is technically an external cell structure, not a membrane-bound organelle. Chloroplasts are another valid plant-versus-animal difference: they carry out photosynthesis in photosynthetic plant cells. Small storage compartments can occur in animal cells; the plant feature here is the LARGE CENTRAL vacuole.",
      "checklist": [
        "Identify the cell wall and explain support/protection.",
        "Identify the large central vacuole.",
        "Connect stored water with turgor pressure.",
        "Distinguish a central vacuole from small animal-cell compartments."
      ],
      "memory": "Wall + water = support.",
      "pitfall": "Plant cells have a cell membrane as well as a cell wall; one does not replace the other.",
      "sources": [
        "class",
        "organelles"
      ],
      "kind": "plant"
    },
    {
      "id": 7,
      "title": "Why plant cells do not pop",
      "topic": "transport",
      "prompt": "If an animal cell is placed in a high-water environment, it may burst (lyse) because water will rush into the cell and cause it to pop, whereas a plant cell will not. What structural component prevents the plant cell from bursting, and what state does the plant cell reach instead?",
      "answer": "The rigid cell wall resists expansion. As water enters by osmosis, the plant cell develops turgor pressure and becomes turgid (firm), rather than lysing.",
      "simple": "Water pushes outward, but the wall pushes back. The plant cell gets firm instead of popping.",
      "detail": "Here, “high-water environment” means a hypotonic solution: lower concentration of nonpenetrating solutes outside than inside. The central vacuole fills and the cell contents press against the wall. The wall’s resistance balances the inward tendency of water.",
      "checklist": [
        "Name the cell wall as the protective structure.",
        "Identify osmosis as the movement of water.",
        "Use turgid for the final state.",
        "Explain pressure against the wall."
      ],
      "memory": "Turgid = full and firm.",
      "pitfall": "The wall does not make the cell waterproof. Water still enters; the wall limits expansion.",
      "sources": [
        "class",
        "transport",
        "organelles"
      ],
      "kind": "osmosis"
    }
  ],
  "organelles": [
    {
      "id": "membrane",
      "name": "Cell membrane",
      "tag": "Selective boundary",
      "function": "Controls movement into and out of the cell. A phospholipid bilayer surrounds the cell.",
      "analogy": "Think of a selective entrance, not a solid wall.",
      "cells": [
        "animal",
        "plant",
        "bacteria"
      ],
      "pitfall": "Do not confuse it with the cell wall; plants have both."
    },
    {
      "id": "cytoplasm",
      "name": "Cytoplasm",
      "tag": "The cell’s interior",
      "function": "The cell contents inside the plasma membrane, excluding the nucleus in a eukaryote. Many reactions occur here.",
      "analogy": "A busy workspace containing fluid and cell structures.",
      "cells": [
        "animal",
        "plant",
        "bacteria"
      ],
      "pitfall": "Cytosol is the fluid part; cytoplasm includes more than just fluid."
    },
    {
      "id": "nucleus",
      "name": "Nucleus",
      "tag": "Information center",
      "function": "Contains most of a eukaryotic cell’s DNA. DNA instructions are copied into RNA here.",
      "analogy": "A protected library of instructions.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "The nucleus is not the site where ribosomes assemble proteins."
    },
    {
      "id": "nucleolus",
      "name": "Nucleolus",
      "tag": "Ribosome assembly",
      "function": "A region inside the nucleus where ribosomal RNA is made and ribosomal subunits are assembled.",
      "analogy": "Builds the parts of the protein-building machines.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "It is inside the nucleus and has no surrounding membrane of its own."
    },
    {
      "id": "ribosomes",
      "name": "Ribosomes",
      "tag": "Protein builders",
      "function": "Join amino acids to make proteins by reading mRNA. They can be free or attached to rough ER.",
      "analogy": "Tiny assembly machines.",
      "cells": [
        "animal",
        "plant",
        "bacteria"
      ],
      "pitfall": "They are not membrane-bound, and bacteria have them too."
    },
    {
      "id": "rough-er",
      "name": "Rough ER",
      "tag": "Protein processing",
      "function": "Its attached ribosomes make proteins destined for secretion, membranes, or certain organelles; the ER helps fold and process them.",
      "analogy": "A protein production and folding area.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "The “rough” dots are ribosomes."
    },
    {
      "id": "smooth-er",
      "name": "Smooth ER",
      "tag": "Lipid production",
      "function": "Makes lipids, participates in detoxification, and stores calcium in some cells.",
      "analogy": "A lipid workshop.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "It has no attached ribosomes; it is not the protein-building ER."
    },
    {
      "id": "golgi",
      "name": "Golgi apparatus",
      "tag": "Sort & send",
      "function": "Modifies, sorts, and packages proteins and lipids for delivery.",
      "analogy": "A labeling and shipping center.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "It processes proteins; ribosomes are what synthesize them."
    },
    {
      "id": "mitochondrion",
      "name": "Mitochondrion",
      "tag": "ATP production",
      "function": "Uses energy released from nutrients to make much of a eukaryotic cell’s ATP through aerobic cellular respiration.",
      "analogy": "A converter that makes energy easier for the cell to use.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "Plants, including their roots, need mitochondria too."
    },
    {
      "id": "vesicle",
      "name": "Vesicle",
      "tag": "Transport package",
      "function": "A small membrane-bound compartment that carries material between cell locations; secretory vesicles release cargo by exocytosis.",
      "analogy": "A membrane-wrapped delivery parcel.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "Vesicles carry cargo; they do not manufacture the protein."
    },
    {
      "id": "lysosome",
      "name": "Lysosome",
      "tag": "Digest & recycle",
      "function": "Contains digestive enzymes that break down large molecules and worn-out cell parts.",
      "analogy": "A recycling and digestion center.",
      "cells": [
        "animal"
      ],
      "pitfall": "Plant lytic vacuoles can carry out similar digestive roles."
    },
    {
      "id": "peroxisome",
      "name": "Peroxisome",
      "tag": "Chemical cleanup",
      "function": "Carries out oxidation reactions, including fatty-acid breakdown, and breaks down hydrogen peroxide using enzymes such as catalase.",
      "analogy": "A contained chemical-cleanup workspace.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "It is different from a lysosome, which uses digestive enzymes."
    },
    {
      "id": "cytoskeleton",
      "name": "Cytoskeleton",
      "tag": "Shape & movement",
      "function": "A network of protein fibers that helps maintain shape, organize internal structures, and move materials.",
      "analogy": "Internal scaffolding and tracks.",
      "cells": [
        "animal",
        "plant"
      ],
      "pitfall": "It is a fiber network, not a membrane-bound sac."
    },
    {
      "id": "wall",
      "name": "Cell wall",
      "tag": "Rigid support",
      "function": "A supporting layer outside the cell membrane. Plant walls contain cellulose; most bacterial walls contain peptidoglycan.",
      "analogy": "An outer support that resists swelling.",
      "cells": [
        "plant",
        "bacteria"
      ],
      "pitfall": "Not all bacteria have walls. This diagram represents a typical walled bacterium."
    },
    {
      "id": "chloroplast",
      "name": "Chloroplast",
      "tag": "Photosynthesis",
      "function": "Captures light energy to help build sugars from carbon dioxide and water. Contains chlorophyll.",
      "analogy": "A light-powered food-making workspace.",
      "cells": [
        "plant"
      ],
      "pitfall": "The plant diagram represents a photosynthetic cell, not an ordinary underground root."
    },
    {
      "id": "vacuole",
      "name": "Large central vacuole",
      "tag": "Water & pressure",
      "function": "Stores water and other materials; pressure from the filled cell helps support the plant against its wall.",
      "analogy": "A large internal water reservoir.",
      "cells": [
        "plant"
      ],
      "pitfall": "Turgor is pressure, not a separate type of organelle."
    },
    {
      "id": "nucleoid",
      "name": "Nucleoid",
      "tag": "Bacterial DNA region",
      "function": "The region containing the main bacterial chromosome; it is not enclosed in a nuclear membrane.",
      "analogy": "DNA storage without a separate room.",
      "cells": [
        "bacteria"
      ],
      "pitfall": "No nucleus does not mean no DNA."
    },
    {
      "id": "flagellum",
      "name": "Flagellum",
      "tag": "Movement",
      "function": "A long external structure that can propel some bacterial cells.",
      "analogy": "A propeller-like movement structure.",
      "cells": [
        "bacteria"
      ],
      "pitfall": "Not every bacterium has a flagellum. Eukaryotic flagella have a different structure."
    }
  ],
  "questions": [
    {
      "id": "q001",
      "topic": "life",
      "type": "choice",
      "prompt": "A plant shoot bends toward a sunny window. Which characteristic is most directly shown?",
      "answer": "Responding to the environment",
      "options": [
        "Responding to the environment",
        "Producing offspring",
        "Having a cell wall",
        "Making a tissue"
      ],
      "why": "Light is a stimulus; the growth response is a reaction to the environment.",
      "guide": 1
    },
    {
      "id": "q002",
      "topic": "life",
      "type": "choice",
      "prompt": "Sweating helps keep body temperature within a safe range. What is this an example of?",
      "answer": "Homeostasis",
      "options": [
        "Homeostasis",
        "Photosynthesis",
        "Reproduction",
        "Exocytosis"
      ],
      "why": "Homeostasis regulates internal conditions within a stable range.",
      "guide": 1
    },
    {
      "id": "q003",
      "topic": "life",
      "type": "choice",
      "prompt": "A tadpole becomes a frog. Which class characteristic best describes this change?",
      "answer": "Growth and development",
      "options": [
        "Growth and development",
        "Cellular organization only",
        "Diffusion",
        "Producing offspring"
      ],
      "why": "Development includes changes in form and function over an organism’s life.",
      "guide": 1
    },
    {
      "id": "q004",
      "topic": "life",
      "type": "choice",
      "prompt": "One bacterium divides into two new bacteria. Which characteristic is directly shown?",
      "answer": "Producing offspring",
      "options": [
        "Producing offspring",
        "Maintaining body temperature",
        "Photosynthesis",
        "Responding to light"
      ],
      "why": "Division produces new organisms: a form of asexual reproduction.",
      "guide": 1
    },
    {
      "id": "q005",
      "topic": "life",
      "type": "choice",
      "prompt": "Which example best illustrates the class trait “have complex chemistry”?",
      "answer": "Enzymes help break down nutrients in a cell",
      "options": [
        "Enzymes help break down nutrients in a cell",
        "A rock breaks into pieces",
        "A balloon gets larger",
        "A crystal forms a flat surface"
      ],
      "why": "Life depends on coordinated chemical reactions, together called metabolism.",
      "guide": 1
    },
    {
      "id": "q006",
      "topic": "life",
      "type": "choice",
      "prompt": "Which statement best describes homeostasis?",
      "answer": "Keeping internal conditions within a stable range",
      "options": [
        "Keeping internal conditions within a stable range",
        "Never changing at all",
        "Keeping the outside environment unchanged",
        "Always making the body colder"
      ],
      "why": "A stable range allows small changes and active adjustments; it is not absolute sameness.",
      "guide": 1
    },
    {
      "id": "q007",
      "topic": "life",
      "type": "choice",
      "prompt": "A mule cannot usually produce offspring. Is it therefore nonliving?",
      "answer": "No; an individual can be alive without reproducing",
      "options": [
        "No; an individual can be alive without reproducing",
        "Yes; every individual must reproduce",
        "Yes; it has no metabolism",
        "No; animals do not need cells"
      ],
      "why": "Reproduction characterizes living lineages; not every living individual reproduces.",
      "guide": 1
    },
    {
      "id": "q008",
      "topic": "life",
      "type": "choice",
      "prompt": "Why is a growing salt crystal not considered alive?",
      "answer": "Growth alone does not establish life; it is not made of cells",
      "options": [
        "Growth alone does not establish life; it is not made of cells",
        "Anything that grows is alive",
        "Only things that move are alive",
        "It has too many cells"
      ],
      "why": "You consider the set of life’s characteristics, not just an increase in size.",
      "guide": 1
    },
    {
      "id": "q009",
      "topic": "life",
      "type": "choice",
      "prompt": "Which of these is NOT required of every living organism?",
      "answer": "Walking from place to place",
      "options": [
        "Walking from place to place",
        "Being made of cells",
        "Carrying out chemical reactions",
        "Responding to conditions"
      ],
      "why": "Plants and many microbes are alive without walking.",
      "guide": 1
    },
    {
      "id": "q010",
      "topic": "life",
      "type": "choice",
      "prompt": "A bacterium is a complete organism made of one cell. It is described as…",
      "answer": "Unicellular",
      "options": [
        "Unicellular",
        "Multicellular",
        "Noncellular",
        "An organ system"
      ],
      "why": "Uni- means one. A single cell can perform the functions of an organism."
    },
    {
      "id": "q011",
      "topic": "life",
      "type": "choice",
      "prompt": "Why are viruses usually excluded from the category of cellular life?",
      "answer": "They are not cells and depend on host cells to reproduce",
      "options": [
        "They are not cells and depend on host cells to reproduce",
        "They have a nucleus",
        "They are all larger than cells",
        "They lack any genetic material"
      ],
      "why": "Viruses have genetic material but are not cells and cannot reproduce independently."
    },
    {
      "id": "q012",
      "topic": "life",
      "type": "typed",
      "prompt": "What is the term for all the chemical reactions in a living organism?",
      "answer": "Metabolism",
      "aliases": [
        "Metabolism"
      ],
      "why": "Metabolism includes reactions that build molecules and reactions that release energy.",
      "guide": 1
    },
    {
      "id": "q013",
      "topic": "life",
      "type": "typed",
      "prompt": "What is the term for maintaining stable internal conditions?",
      "answer": "Homeostasis",
      "aliases": [
        "Homeostasis"
      ],
      "why": "For example, sweating helps regulate body temperature.",
      "guide": 1
    },
    {
      "id": "q014",
      "topic": "life",
      "type": "multi",
      "prompt": "Select the SIX headings used in your class reading.",
      "answer": [
        "Respond to their environment",
        "Grow and develop",
        "Produce offspring",
        "Maintain homeostasis",
        "Have complex chemistry",
        "Consist of cells"
      ],
      "options": [
        "Respond to their environment",
        "Grow and develop",
        "Produce offspring",
        "Maintain homeostasis",
        "Have complex chemistry",
        "Consist of cells",
        "Walk on legs",
        "Breathe air with lungs"
      ],
      "why": "The class groups the traits as response, growth, reproduction, homeostasis, complex chemistry, and cells.",
      "guide": 1
    },
    {
      "id": "q015",
      "topic": "organization",
      "type": "order",
      "prompt": "Put the levels in order, smallest to largest.",
      "answer": [
        "Atom",
        "Molecule",
        "Organelle",
        "Cell",
        "Tissue",
        "Organ",
        "Organ system",
        "Organism"
      ],
      "why": "Molecules form structures inside cells; cells form tissues, then organs, systems, and organisms.",
      "guide": 2
    },
    {
      "id": "q016",
      "topic": "organization",
      "type": "choice",
      "prompt": "Which level comes immediately after a cell in the usual multicellular hierarchy?",
      "answer": "Tissue",
      "options": [
        "Tissue",
        "Atom",
        "Organelle",
        "Organ system"
      ],
      "why": "A tissue is a group of cells working together on a related function.",
      "guide": 2
    },
    {
      "id": "q017",
      "topic": "organization",
      "type": "choice",
      "prompt": "A heart contains muscle, connective, and other tissues. The heart is a(n)…",
      "answer": "Organ",
      "options": [
        "Organ",
        "Organelle",
        "Molecule",
        "Organism"
      ],
      "why": "Multiple tissue types combine into an organ with a specific function.",
      "guide": 2
    },
    {
      "id": "q018",
      "topic": "organization",
      "type": "choice",
      "prompt": "Which example is an organelle rather than an organ?",
      "answer": "Mitochondrion",
      "options": [
        "Mitochondrion",
        "Heart",
        "Lung",
        "Stomach"
      ],
      "why": "An organelle is a cell structure; an organ is made of tissues.",
      "guide": 2
    },
    {
      "id": "q019",
      "topic": "organization",
      "type": "choice",
      "prompt": "Which correctly goes from smaller organizational level to larger?",
      "answer": "Molecule → cell → organ",
      "options": [
        "Molecule → cell → organ",
        "Organ → tissue → cell",
        "Cell → organelle → molecule",
        "Organism → organ → tissue"
      ],
      "why": "This sequence skips some levels but preserves the correct relative order.",
      "guide": 2
    },
    {
      "id": "q020",
      "topic": "organization",
      "type": "choice",
      "prompt": "Which level is the smallest unit that can carry out life’s basic functions?",
      "answer": "Cell",
      "options": [
        "Cell",
        "Atom",
        "Molecule",
        "Organelle"
      ],
      "why": "A cell is the basic living unit; its smaller components are not independent living units."
    },
    {
      "id": "q021",
      "topic": "organization",
      "type": "choice",
      "prompt": "The stomach and intestines work together as part of a(n)…",
      "answer": "Organ system",
      "options": [
        "Organ system",
        "Organelle",
        "Tissue",
        "Molecule"
      ],
      "why": "Organs cooperate in organ systems, such as the digestive system.",
      "guide": 2
    },
    {
      "id": "q022",
      "topic": "organization",
      "type": "choice",
      "prompt": "Does a unicellular organism need tissues and organs?",
      "answer": "No; one cell carries out its life functions",
      "options": [
        "No; one cell carries out its life functions",
        "Yes; every cell contains a heart",
        "Yes; tissues are smaller than molecules",
        "No; unicellular organisms are not alive"
      ],
      "why": "The full tissue-to-organ hierarchy applies to complex multicellular organisms.",
      "guide": 2
    },
    {
      "id": "q023",
      "topic": "organization",
      "type": "typed",
      "prompt": "What level is a group of similar cells working together?",
      "answer": "Tissue",
      "aliases": [
        "Tissue",
        "tissues"
      ],
      "why": "A tissue consists of cells cooperating in related functions.",
      "guide": 2
    },
    {
      "id": "q024",
      "topic": "organization",
      "type": "typed",
      "prompt": "What do we call one complete individual living thing?",
      "answer": "Organism",
      "aliases": [
        "Organism",
        "an organism",
        "organisms"
      ],
      "why": "An organism may be unicellular or multicellular.",
      "guide": 2
    },
    {
      "id": "q025",
      "topic": "organization",
      "type": "order",
      "prompt": "Order these selected levels, smallest to largest.",
      "answer": [
        "Cell",
        "Tissue",
        "Organ",
        "Organ system"
      ],
      "why": "Cells cooperate in tissues; tissues form organs; organs work in systems.",
      "guide": 2
    },
    {
      "id": "q026",
      "topic": "cells",
      "type": "choice",
      "prompt": "Which TWO features are shared by all cells?",
      "answer": "Cell membrane and cytoplasm",
      "options": [
        "Cell membrane and cytoplasm",
        "Nucleus and cell wall",
        "Chloroplasts and mitochondria",
        "Cell wall and large central vacuole"
      ],
      "why": "All cells have a membrane enclosing a cytoplasmic interior.",
      "guide": 3
    },
    {
      "id": "q027",
      "topic": "cells",
      "type": "choice",
      "prompt": "What is the key difference between prokaryotic and eukaryotic cells?",
      "answer": "Eukaryotes have a membrane-bound nucleus; prokaryotes do not",
      "options": [
        "Eukaryotes have a membrane-bound nucleus; prokaryotes do not",
        "Prokaryotes have no DNA",
        "Eukaryotes never have membranes",
        "Only prokaryotes make proteins"
      ],
      "why": "The DNA-containing nucleus is a defining feature of eukaryotic cell organization.",
      "guide": 3
    },
    {
      "id": "q028",
      "topic": "cells",
      "type": "choice",
      "prompt": "Where is the main chromosome of a typical bacterium located?",
      "answer": "In the nucleoid region",
      "options": [
        "In the nucleoid region",
        "Inside a nucleus",
        "Inside the Golgi apparatus",
        "Inside a chloroplast"
      ],
      "why": "A nucleoid is a DNA-containing region without a surrounding nuclear membrane.",
      "guide": 3
    },
    {
      "id": "q029",
      "topic": "cells",
      "type": "choice",
      "prompt": "Which organism is prokaryotic?",
      "answer": "A bacterium",
      "options": [
        "A bacterium",
        "A mushroom",
        "A sunflower",
        "A frog"
      ],
      "why": "Bacteria and archaea are prokaryotes. Animals, plants, and fungi are eukaryotes."
    },
    {
      "id": "q030",
      "topic": "cells",
      "type": "choice",
      "prompt": "Which organism is eukaryotic?",
      "answer": "Yeast",
      "options": [
        "Yeast",
        "A typical bacterium",
        "An archaeon",
        "A virus"
      ],
      "why": "Yeast is a single-celled fungus with eukaryotic cell organization."
    },
    {
      "id": "q031",
      "topic": "cells",
      "type": "choice",
      "prompt": "A cell has ribosomes but no nucleus. What is the best conclusion?",
      "answer": "It could be a prokaryotic cell",
      "options": [
        "It could be a prokaryotic cell",
        "It cannot make proteins",
        "It must be a plant cell",
        "It has no genetic information"
      ],
      "why": "Prokaryotes have ribosomes and DNA despite lacking a nucleus.",
      "guide": 3
    },
    {
      "id": "q032",
      "topic": "cells",
      "type": "choice",
      "prompt": "Which feature is NOT shared by all cells?",
      "answer": "Cell wall",
      "options": [
        "Cell wall",
        "Cell membrane",
        "Cytoplasm",
        "An internal region enclosed by a membrane"
      ],
      "why": "Animal cells lack cell walls; some other cells lack them too.",
      "guide": 3
    },
    {
      "id": "q033",
      "topic": "cells",
      "type": "choice",
      "prompt": "Which statement is part of cell theory?",
      "answer": "Cells come from preexisting cells",
      "options": [
        "Cells come from preexisting cells",
        "All cells have chloroplasts",
        "All organisms contain many cells",
        "Cells form spontaneously from rocks"
      ],
      "why": "Cell theory states that cells arise from existing cells, among its central principles."
    },
    {
      "id": "q034",
      "topic": "cells",
      "type": "choice",
      "prompt": "Which statement agrees with cell theory?",
      "answer": "All living organisms are made of one or more cells",
      "options": [
        "All living organisms are made of one or more cells",
        "Only animals are made of cells",
        "All living things have organs",
        "Every cell has a nucleus"
      ],
      "why": "Both unicellular and multicellular organisms are cellular."
    },
    {
      "id": "q035",
      "topic": "cells",
      "type": "choice",
      "prompt": "Which pair is found in a typical plant leaf cell AND an animal cell?",
      "answer": "Mitochondria and ribosomes",
      "options": [
        "Mitochondria and ribosomes",
        "Cellulose wall and chloroplasts",
        "Chloroplasts and a nucleoid",
        "Large central vacuole and cellulose wall"
      ],
      "why": "Both plant and animal cells need protein production and usable energy."
    },
    {
      "id": "q036",
      "topic": "cells",
      "type": "choice",
      "prompt": "A cell has a nucleus, a cellulose wall, and chloroplasts. It is most likely a…",
      "answer": "Photosynthetic plant cell",
      "options": [
        "Photosynthetic plant cell",
        "Typical animal cell",
        "Bacterial cell",
        "Virus"
      ],
      "why": "This combination fits a photosynthetic plant cell, such as a leaf mesophyll cell."
    },
    {
      "id": "q037",
      "topic": "cells",
      "type": "choice",
      "prompt": "Are all eukaryotic organisms multicellular?",
      "answer": "No; some, such as yeast, are unicellular",
      "options": [
        "No; some, such as yeast, are unicellular",
        "Yes; a nucleus requires many cells",
        "No; all are unicellular",
        "Yes; bacteria are eukaryotes"
      ],
      "why": "A nucleus describes cell organization, not the number of cells in an organism."
    },
    {
      "id": "q038",
      "topic": "cells",
      "type": "multi",
      "prompt": "Select the structures that are membrane-bound organelles in eukaryotes.",
      "answer": [
        "Nucleus",
        "Mitochondrion",
        "Golgi apparatus"
      ],
      "options": [
        "Nucleus",
        "Mitochondrion",
        "Golgi apparatus",
        "Ribosome"
      ],
      "why": "Ribosomes have no surrounding membrane and occur in both major cell types.",
      "guide": 3
    },
    {
      "id": "q039",
      "topic": "cells",
      "type": "typed",
      "prompt": "What is the term for a cell type without a membrane-bound nucleus?",
      "answer": "Prokaryotic",
      "aliases": [
        "Prokaryotic",
        "prokaryote",
        "prokaryotes",
        "prokaryotic cell",
        "prokaryotic cells"
      ],
      "why": "Bacteria and archaea have prokaryotic cells.",
      "guide": 3
    },
    {
      "id": "q040",
      "topic": "cells",
      "type": "typed",
      "prompt": "What is the term for a cell type with a membrane-bound nucleus?",
      "answer": "Eukaryotic",
      "aliases": [
        "Eukaryotic",
        "eukaryote",
        "eukaryotes",
        "eukaryotic cell",
        "eukaryotic cells"
      ],
      "why": "Plants, animals, fungi, and protists are eukaryotic.",
      "guide": 3
    },
    {
      "id": "q041",
      "topic": "cells",
      "type": "typed",
      "prompt": "Name the region containing a bacterium’s main chromosome.",
      "answer": "Nucleoid",
      "aliases": [
        "Nucleoid",
        "nucleoid region"
      ],
      "why": "The nucleoid is not enclosed by a nuclear membrane.",
      "guide": 3
    },
    {
      "id": "q042",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which structure joins amino acids to build a protein?",
      "answer": "Ribosome",
      "options": [
        "Ribosome",
        "Golgi apparatus",
        "Cell wall",
        "Central vacuole"
      ],
      "why": "A ribosome reads mRNA and assembles a chain of amino acids."
    },
    {
      "id": "q043",
      "topic": "organelles",
      "type": "choice",
      "prompt": "What makes rough ER look “rough”?",
      "answer": "Attached ribosomes",
      "options": [
        "Attached ribosomes",
        "Attached chloroplasts",
        "A thick cell wall",
        "Stored starch crystals"
      ],
      "why": "Ribosomes on its cytoplasmic surface give rough ER its dotted appearance."
    },
    {
      "id": "q044",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which organelle is especially important for making lipids?",
      "answer": "Smooth ER",
      "options": [
        "Smooth ER",
        "Ribosome",
        "Nucleolus",
        "Cell wall"
      ],
      "why": "Smooth ER participates in lipid synthesis and other functions such as detoxification."
    },
    {
      "id": "q045",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which organelle modifies, sorts, and packages proteins?",
      "answer": "Golgi apparatus",
      "options": [
        "Golgi apparatus",
        "Nucleolus",
        "Cell wall",
        "Chloroplast"
      ],
      "why": "The Golgi processes cargo and directs it to destinations."
    },
    {
      "id": "q046",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which organelle digests worn-out components in a typical animal cell?",
      "answer": "Lysosome",
      "options": [
        "Lysosome",
        "Chloroplast",
        "Ribosome",
        "Nucleolus"
      ],
      "why": "Lysosomes contain digestive enzymes for breakdown and recycling."
    },
    {
      "id": "q047",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which structure assembles ribosomal subunits?",
      "answer": "Nucleolus",
      "options": [
        "Nucleolus",
        "Smooth ER",
        "Golgi apparatus",
        "Cell wall"
      ],
      "why": "The nucleolus is a region inside the nucleus involved in ribosome production."
    },
    {
      "id": "q048",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which organelle contains most of a typical animal cell’s DNA?",
      "answer": "Nucleus",
      "options": [
        "Nucleus",
        "Lysosome",
        "Golgi apparatus",
        "Vesicle"
      ],
      "why": "Most eukaryotic DNA is in the nucleus; mitochondria also contain some DNA."
    },
    {
      "id": "q049",
      "topic": "organelles",
      "type": "choice",
      "prompt": "What is the main role of a transport vesicle?",
      "answer": "Carry materials between cell locations",
      "options": [
        "Carry materials between cell locations",
        "Read mRNA to make a protein",
        "Capture sunlight",
        "Build a cellulose wall"
      ],
      "why": "A vesicle is a small membrane-bound package for transport."
    },
    {
      "id": "q050",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which structure helps organize a cell’s interior and provides tracks for transport?",
      "answer": "Cytoskeleton",
      "options": [
        "Cytoskeleton",
        "Nucleolus",
        "Cell wall only",
        "Chlorophyll"
      ],
      "why": "Protein fibers in the cytoskeleton support shape and intracellular movement."
    },
    {
      "id": "q051",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which plant structure stores water and helps maintain turgor pressure?",
      "answer": "Large central vacuole",
      "options": [
        "Large central vacuole",
        "Ribosome",
        "Nucleolus",
        "Golgi apparatus"
      ],
      "why": "Water in the vacuole helps the cell contents press against the cell wall.",
      "guide": 6
    },
    {
      "id": "q052",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which structure lies OUTSIDE a plant cell’s membrane?",
      "answer": "Cell wall",
      "options": [
        "Cell wall",
        "Nucleus",
        "Central vacuole",
        "Rough ER"
      ],
      "why": "The supporting cellulose wall surrounds the plasma membrane.",
      "guide": 6
    },
    {
      "id": "q053",
      "topic": "organelles",
      "type": "choice",
      "prompt": "What is the major structural carbohydrate in plant cell walls?",
      "answer": "Cellulose",
      "options": [
        "Cellulose",
        "Glycogen",
        "DNA",
        "Cholesterol"
      ],
      "why": "Cellulose is a polysaccharide that gives plant cell walls strength.",
      "guide": 6
    },
    {
      "id": "q054",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which is the more precise name for just the fluid part of the cytoplasm?",
      "answer": "Cytosol",
      "options": [
        "Cytosol",
        "Cytoskeleton",
        "Nucleolus",
        "Cell wall"
      ],
      "why": "Cytoplasm includes the cytosol and structures in it, outside the eukaryotic nucleus."
    },
    {
      "id": "q055",
      "topic": "organelles",
      "type": "choice",
      "prompt": "A cell must secrete large amounts of protein. Which pair would be especially active?",
      "answer": "Rough ER and Golgi apparatus",
      "options": [
        "Rough ER and Golgi apparatus",
        "Cell wall and chloroplasts",
        "Smooth ER and cellulose",
        "Nucleoid and flagellum"
      ],
      "why": "The rough ER helps produce secreted proteins, and the Golgi processes and sorts them.",
      "guide": 4
    },
    {
      "id": "q056",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which statement about plant and animal cells is correct?",
      "answer": "Both have a cell membrane; only plants have a cellulose cell wall",
      "options": [
        "Both have a cell membrane; only plants have a cellulose cell wall",
        "Only animals have a cell membrane",
        "Only plants have mitochondria",
        "Animal cells all have chloroplasts"
      ],
      "why": "Plant cells retain a selective membrane beneath their supporting cell wall.",
      "guide": 6
    },
    {
      "id": "q057",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which compartment breaks down hydrogen peroxide using catalase?",
      "answer": "Peroxisome",
      "options": [
        "Peroxisome",
        "Ribosome",
        "Nucleolus",
        "Golgi apparatus"
      ],
      "why": "Peroxisomes contain enzymes that process hydrogen peroxide produced in oxidation reactions."
    },
    {
      "id": "q058",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Why are membrane-bound compartments useful in a cell?",
      "answer": "They separate different chemical processes",
      "options": [
        "They separate different chemical processes",
        "They prevent all chemical reactions",
        "They replace the need for DNA",
        "They make every molecule identical"
      ],
      "why": "Compartments allow particular conditions and reactions in different parts of a cell."
    },
    {
      "id": "q059",
      "topic": "organelles",
      "type": "choice",
      "prompt": "Which statement about vacuoles is most accurate for a plant-versus-animal comparison?",
      "answer": "Plants typically have a large central vacuole; animals do not have that large central structure",
      "options": [
        "Plants typically have a large central vacuole; animals do not have that large central structure",
        "Animal cells can never have any storage compartment",
        "All vacuoles contain only air",
        "Vacuoles make all the cell’s proteins"
      ],
      "why": "Distinguish the large plant central vacuole from smaller storage compartments.",
      "guide": 6
    },
    {
      "id": "q060",
      "topic": "organelles",
      "type": "typed",
      "prompt": "Name the organelle that sorts and packages proteins.",
      "answer": "Golgi apparatus",
      "aliases": [
        "Golgi apparatus",
        "Golgi",
        "Golgi body",
        "Golgi bodies",
        "Golgi complex"
      ],
      "why": "The Golgi modifies cargo and packages it for delivery."
    },
    {
      "id": "q061",
      "topic": "organelles",
      "type": "typed",
      "prompt": "Name the structure that makes proteins by reading mRNA.",
      "answer": "Ribosome",
      "aliases": [
        "Ribosome",
        "ribosomes",
        "a ribosome"
      ],
      "why": "Ribosomes, not the Golgi, synthesize proteins."
    },
    {
      "id": "q062",
      "topic": "organelles",
      "type": "typed",
      "prompt": "Name the rigid outer supporting structure of a plant cell.",
      "answer": "Cell wall",
      "aliases": [
        "Cell wall",
        "the cell wall",
        "cell walls",
        "cellulose cell wall"
      ],
      "why": "The cell wall provides protection and helps resist swelling.",
      "guide": 6
    },
    {
      "id": "q063",
      "topic": "organelles",
      "type": "typed",
      "prompt": "Name the large water-storing compartment in a typical mature plant cell.",
      "answer": "Central vacuole",
      "aliases": [
        "Central vacuole",
        "large central vacuole",
        "vacuole",
        "the vacuole"
      ],
      "why": "Its water helps maintain turgor pressure.",
      "guide": 6
    },
    {
      "id": "q064",
      "topic": "organelles",
      "type": "typed",
      "prompt": "Which type of ER has attached ribosomes?",
      "answer": "Rough ER",
      "aliases": [
        "Rough ER",
        "rough endoplasmic reticulum",
        "RER",
        "the rough ER"
      ],
      "why": "Rough ER has ribosomes; smooth ER does not."
    },
    {
      "id": "q065",
      "topic": "organelles",
      "type": "multi",
      "prompt": "Select TWO features that support a typical plant cell and are absent in animal cells.",
      "answer": [
        "Cellulose cell wall",
        "Large central vacuole"
      ],
      "options": [
        "Cellulose cell wall",
        "Large central vacuole",
        "Cell membrane",
        "Mitochondria"
      ],
      "why": "The wall resists expansion; the water-filled central vacuole supports turgor pressure.",
      "guide": 6
    },
    {
      "id": "q066",
      "topic": "protein",
      "type": "order",
      "prompt": "Put the secreted protein’s route in order.",
      "answer": [
        "Ribosome on rough ER",
        "Transport vesicle",
        "Golgi apparatus",
        "Secretory vesicle",
        "Cell membrane / exocytosis"
      ],
      "why": "The protein is made at rough ER, transported to Golgi, then secreted by vesicle fusion.",
      "guide": 4
    },
    {
      "id": "q067",
      "topic": "protein",
      "type": "choice",
      "prompt": "What actually synthesizes a secreted protein?",
      "answer": "A ribosome associated with the rough ER",
      "options": [
        "A ribosome associated with the rough ER",
        "The Golgi apparatus",
        "The nuclear DNA itself",
        "The cell membrane"
      ],
      "why": "The ribosome assembles the amino-acid chain while it enters the ER pathway.",
      "guide": 4
    },
    {
      "id": "q068",
      "topic": "protein",
      "type": "choice",
      "prompt": "What carries proteins from the rough ER to the Golgi?",
      "answer": "Transport vesicles",
      "options": [
        "Transport vesicles",
        "Cell walls",
        "Chloroplasts",
        "Chromosomes"
      ],
      "why": "A transport vesicle buds from the ER and delivers cargo toward the Golgi.",
      "guide": 4
    },
    {
      "id": "q069",
      "topic": "protein",
      "type": "choice",
      "prompt": "After Golgi processing, a protein meant for release is typically packaged in a…",
      "answer": "Secretory vesicle",
      "options": [
        "Secretory vesicle",
        "Chloroplast",
        "New nucleus",
        "Cell wall"
      ],
      "why": "A secretory vesicle carries cargo to the plasma membrane.",
      "guide": 4
    },
    {
      "id": "q070",
      "topic": "protein",
      "type": "choice",
      "prompt": "What happens during exocytosis?",
      "answer": "A vesicle fuses with the cell membrane and releases cargo outside",
      "options": [
        "A vesicle fuses with the cell membrane and releases cargo outside",
        "A cell makes a new nucleus",
        "Water crosses a membrane only",
        "A ribosome makes a phospholipid"
      ],
      "why": "The vesicle’s membrane joins the plasma membrane, releasing its contents.",
      "guide": 4
    },
    {
      "id": "q071",
      "topic": "protein",
      "type": "choice",
      "prompt": "What leaves the nucleus to carry protein-building instructions to ribosomes?",
      "answer": "mRNA",
      "options": [
        "mRNA",
        "A finished secreted protein",
        "The entire nucleus",
        "A cell wall"
      ],
      "why": "DNA is transcribed into messenger RNA, which can exit through nuclear pores.",
      "guide": 4
    },
    {
      "id": "q072",
      "topic": "protein",
      "type": "choice",
      "prompt": "Which statement is WRONG about a typical secreted protein?",
      "answer": "It is assembled in the nucleus and then moves to the ER",
      "options": [
        "It is assembled in the nucleus and then moves to the ER",
        "It is assembled by a ribosome",
        "It travels through the Golgi",
        "It can leave by exocytosis"
      ],
      "why": "The nucleus supplies RNA instructions, not the assembled protein.",
      "guide": 4
    },
    {
      "id": "q073",
      "topic": "protein",
      "type": "choice",
      "prompt": "A Golgi defect would most directly disrupt which task?",
      "answer": "Sorting and packaging proteins for delivery",
      "options": [
        "Sorting and packaging proteins for delivery",
        "Reading DNA bases during replication",
        "Absorbing sunlight",
        "Keeping the cellulose wall rigid"
      ],
      "why": "The Golgi’s job is cargo modification, sorting, and packaging.",
      "guide": 4
    },
    {
      "id": "q074",
      "topic": "protein",
      "type": "choice",
      "prompt": "Which is the best three-organelles summary of the secretory pathway?",
      "answer": "Rough ER → Golgi apparatus → secretory vesicle",
      "options": [
        "Rough ER → Golgi apparatus → secretory vesicle",
        "Nucleus → chloroplast → lysosome",
        "Golgi → rough ER → nucleus",
        "Mitochondrion → smooth ER → cell wall"
      ],
      "why": "Mention ribosome synthesis, ER-to-Golgi transport, and final membrane fusion for a complete answer.",
      "guide": 4
    },
    {
      "id": "q075",
      "topic": "protein",
      "type": "typed",
      "prompt": "What is the process that releases vesicle contents outside a cell?",
      "answer": "Exocytosis",
      "aliases": [
        "Exocytosis"
      ],
      "why": "Exo- means out: a secretory vesicle fuses with the cell membrane.",
      "guide": 4
    },
    {
      "id": "q076",
      "topic": "protein",
      "type": "typed",
      "prompt": "What RNA carries protein-building instructions from DNA to a ribosome?",
      "answer": "mRNA",
      "aliases": [
        "mRNA",
        "messenger RNA",
        "messenger ribonucleic acid"
      ],
      "why": "Messenger RNA carries the information used in protein synthesis.",
      "guide": 4
    },
    {
      "id": "q077",
      "topic": "protein",
      "type": "order",
      "prompt": "Order these information-flow steps.",
      "answer": [
        "DNA instructions",
        "mRNA copy",
        "Ribosome reads mRNA",
        "Protein assembled"
      ],
      "why": "This is the flow of information, not the physical route of a protein out of the cell.",
      "guide": 4
    },
    {
      "id": "q078",
      "topic": "energy",
      "type": "choice",
      "prompt": "What is a primary job of mitochondria?",
      "answer": "Make ATP using energy from nutrients",
      "options": [
        "Make ATP using energy from nutrients",
        "Make sugars directly from sunlight",
        "Store all the cell’s DNA",
        "Build the plant cell wall"
      ],
      "why": "Mitochondria carry out major steps of aerobic cellular respiration.",
      "guide": 5
    },
    {
      "id": "q079",
      "topic": "energy",
      "type": "choice",
      "prompt": "What is a primary job of chloroplasts?",
      "answer": "Use light energy to help make sugars",
      "options": [
        "Use light energy to help make sugars",
        "Digest worn-out organelles",
        "Build ribosomal subunits",
        "Pump all water out of the cell"
      ],
      "why": "Photosynthesis uses light energy, carbon dioxide, and water to build sugars.",
      "guide": 5
    },
    {
      "id": "q080",
      "topic": "energy",
      "type": "choice",
      "prompt": "Which would you normally expect in an underground plant root cell?",
      "answer": "Mitochondria but not chloroplasts",
      "options": [
        "Mitochondria but not chloroplasts",
        "Chloroplasts but not mitochondria",
        "Neither, because roots are not alive",
        "Only chloroplasts and no nucleus"
      ],
      "why": "Roots need ATP but normally do not get light for photosynthesis.",
      "guide": 5
    },
    {
      "id": "q081",
      "topic": "energy",
      "type": "choice",
      "prompt": "Why do root cells need mitochondria?",
      "answer": "They need ATP for cellular work, including active transport",
      "options": [
        "They need ATP for cellular work, including active transport",
        "They receive the most sunlight",
        "Mitochondria are the source of cellulose walls",
        "Roots do not use chemical energy"
      ],
      "why": "Root cells can use sugars supplied by photosynthetic tissues to fuel respiration.",
      "guide": 5
    },
    {
      "id": "q082",
      "topic": "energy",
      "type": "choice",
      "prompt": "A muscle cell needs a lot of ATP. Which organelle is often abundant in it?",
      "answer": "Mitochondrion",
      "options": [
        "Mitochondrion",
        "Chloroplast",
        "Cell wall",
        "Large central vacuole"
      ],
      "why": "Energy-demanding cells often contain many mitochondria."
    },
    {
      "id": "q083",
      "topic": "energy",
      "type": "choice",
      "prompt": "Do green plant cells perform cellular respiration?",
      "answer": "Yes; they need usable ATP as well as sugars",
      "options": [
        "Yes; they need usable ATP as well as sugars",
        "No; only animals respire",
        "No; photosynthesis means ATP is never needed",
        "Only if they lose their cell walls"
      ],
      "why": "Photosynthesis and cellular respiration have different roles; plants perform both.",
      "guide": 5
    },
    {
      "id": "q084",
      "topic": "energy",
      "type": "choice",
      "prompt": "What is ATP’s main role in cells?",
      "answer": "Transfer usable energy for cellular work",
      "options": [
        "Transfer usable energy for cellular work",
        "Store the organism’s complete DNA sequence",
        "Form the rigid outer cell wall",
        "Act as a whole organelle"
      ],
      "why": "ATP is a molecule used to couple energy release to energy-requiring processes."
    },
    {
      "id": "q085",
      "topic": "energy",
      "type": "choice",
      "prompt": "Which pair of organelles contains its own DNA?",
      "answer": "Mitochondria and chloroplasts",
      "options": [
        "Mitochondria and chloroplasts",
        "Golgi and lysosomes",
        "Smooth ER and vesicles",
        "Vacuoles and cell wall"
      ],
      "why": "Mitochondria and chloroplasts have small genomes in addition to nuclear DNA."
    },
    {
      "id": "q086",
      "topic": "energy",
      "type": "typed",
      "prompt": "Name the organelle most associated with cellular respiration and ATP production.",
      "answer": "Mitochondrion",
      "aliases": [
        "Mitochondrion",
        "mitochondria",
        "mitochondrions"
      ],
      "why": "Mitochondria use nutrient energy to make much of the cell’s ATP.",
      "guide": 5
    },
    {
      "id": "q087",
      "topic": "energy",
      "type": "typed",
      "prompt": "Name the organelle that carries out photosynthesis in a plant leaf cell.",
      "answer": "Chloroplast",
      "aliases": [
        "Chloroplast",
        "chloroplasts"
      ],
      "why": "Chloroplasts contain chlorophyll that captures light.",
      "guide": 5
    },
    {
      "id": "q088",
      "topic": "energy",
      "type": "typed",
      "prompt": "What three-letter molecule is a major energy carrier for cellular work?",
      "answer": "ATP",
      "aliases": [
        "ATP",
        "adenosine triphosphate"
      ],
      "why": "ATP is an energy-carrying molecule, not an organelle."
    },
    {
      "id": "q089",
      "topic": "transport",
      "type": "choice",
      "prompt": "What is osmosis?",
      "answer": "Net movement of water across a selectively permeable membrane",
      "options": [
        "Net movement of water across a selectively permeable membrane",
        "Movement of proteins through the nucleus",
        "Any movement requiring ATP",
        "Creation of water by a cell wall"
      ],
      "why": "Osmosis concerns water, not the movement of every kind of solute.",
      "guide": 7
    },
    {
      "id": "q090",
      "topic": "transport",
      "type": "choice",
      "prompt": "A hypotonic solution surrounds a cell. Assuming the solutes cannot cross, which way does water tend to move?",
      "answer": "Into the cell",
      "options": [
        "Into the cell",
        "Out of the cell only",
        "Nowhere; water stops moving",
        "Into the nucleus only"
      ],
      "why": "The outside has a lower concentration of nonpenetrating solutes, so water tends to enter.",
      "guide": 7
    },
    {
      "id": "q091",
      "topic": "transport",
      "type": "choice",
      "prompt": "A typical animal cell in a strongly hypotonic solution may…",
      "answer": "Swell and lyse",
      "options": [
        "Swell and lyse",
        "Become protected by a new cellulose wall",
        "Photosynthesize",
        "Always shrink"
      ],
      "why": "Without a rigid wall, excess inward water movement can cause lysis.",
      "guide": 7
    },
    {
      "id": "q092",
      "topic": "transport",
      "type": "choice",
      "prompt": "A healthy plant cell in a hypotonic environment normally becomes…",
      "answer": "Turgid",
      "options": [
        "Turgid",
        "Plasmolyzed",
        "Crenated",
        "A prokaryote"
      ],
      "why": "Water entry develops pressure against the wall, making the cell firm.",
      "guide": 7
    },
    {
      "id": "q093",
      "topic": "transport",
      "type": "choice",
      "prompt": "What structure protects the plant cell from osmotic bursting?",
      "answer": "Cell wall",
      "options": [
        "Cell wall",
        "Nucleolus",
        "Ribosome",
        "Chloroplast"
      ],
      "why": "The wall resists expansion as water enters and turgor pressure builds.",
      "guide": 7
    },
    {
      "id": "q094",
      "topic": "transport",
      "type": "choice",
      "prompt": "What is turgor pressure?",
      "answer": "Pressure of cell contents against the cell wall",
      "options": [
        "Pressure of cell contents against the cell wall",
        "The number of chloroplasts in a cell",
        "The speed of protein synthesis",
        "A kind of DNA"
      ],
      "why": "Water entry increases pressure against the wall and supports plant tissues.",
      "guide": 7
    },
    {
      "id": "q095",
      "topic": "transport",
      "type": "choice",
      "prompt": "A plant cell loses water in a hypertonic solution. What can happen?",
      "answer": "The membrane pulls away from the wall: plasmolysis",
      "options": [
        "The membrane pulls away from the wall: plasmolysis",
        "The wall becomes a nucleus",
        "The cell always bursts",
        "The cell gains more water"
      ],
      "why": "The protoplast shrinks as water leaves; severe loss can pull the membrane from the wall."
    },
    {
      "id": "q096",
      "topic": "transport",
      "type": "choice",
      "prompt": "At dynamic equilibrium, water molecules across a membrane…",
      "answer": "Keep moving both ways, with no net movement",
      "options": [
        "Keep moving both ways, with no net movement",
        "Stop moving completely",
        "Move only inward",
        "Turn into solute"
      ],
      "why": "Equal average flow in opposite directions means no net change, not no molecular motion."
    },
    {
      "id": "q097",
      "topic": "transport",
      "type": "choice",
      "prompt": "What does “selectively permeable” mean?",
      "answer": "Some substances cross more readily than others",
      "options": [
        "Some substances cross more readily than others",
        "Nothing can enter the cell",
        "All substances cross equally",
        "Only solid objects can enter"
      ],
      "why": "The membrane’s structure and transport proteins control what crosses."
    },
    {
      "id": "q098",
      "topic": "transport",
      "type": "choice",
      "prompt": "How does simple diffusion move a substance?",
      "answer": "Down its concentration gradient",
      "options": [
        "Down its concentration gradient",
        "Only against its gradient",
        "Only when directly powered by ATP",
        "Only through a cell wall"
      ],
      "why": "Random molecular motion produces net movement from higher to lower concentration."
    },
    {
      "id": "q099",
      "topic": "transport",
      "type": "choice",
      "prompt": "Which transport can move a substance against its concentration gradient?",
      "answer": "Active transport",
      "options": [
        "Active transport",
        "Simple diffusion",
        "Osmosis only",
        "Passive transport only"
      ],
      "why": "Active transport requires an energy source to move substances against their gradient."
    },
    {
      "id": "q100",
      "topic": "transport",
      "type": "choice",
      "prompt": "Which process is passive even though it uses a membrane protein?",
      "answer": "Facilitated diffusion",
      "options": [
        "Facilitated diffusion",
        "ATP-powered ion pumping",
        "Exocytosis",
        "Endocytosis"
      ],
      "why": "Facilitated diffusion uses channels or carriers but moves down a gradient without direct energy input."
    },
    {
      "id": "q101",
      "topic": "transport",
      "type": "choice",
      "prompt": "Which part of a phospholipid faces water at the membrane surfaces?",
      "answer": "Hydrophilic head",
      "options": [
        "Hydrophilic head",
        "Hydrophobic tails",
        "DNA strand",
        "Cellulose fiber"
      ],
      "why": "Water-attracting heads face watery surroundings; tails face inward toward one another."
    },
    {
      "id": "q102",
      "topic": "transport",
      "type": "choice",
      "prompt": "What arrangement forms the basic structure of a cell membrane?",
      "answer": "Phospholipid bilayer",
      "options": [
        "Phospholipid bilayer",
        "A solid layer of DNA",
        "One giant ribosome",
        "A wall made only of ATP"
      ],
      "why": "Two phospholipid layers form the membrane’s basic boundary."
    },
    {
      "id": "q103",
      "topic": "transport",
      "type": "choice",
      "prompt": "Which statement explains the plant wall’s role correctly?",
      "answer": "It permits water entry but resists expansion",
      "options": [
        "It permits water entry but resists expansion",
        "It prevents all water from entering",
        "It replaces the cell membrane",
        "It synthesizes water"
      ],
      "why": "A cell wall is not waterproof; its resistance allows pressure to build.",
      "guide": 7
    },
    {
      "id": "q104",
      "topic": "transport",
      "type": "choice",
      "prompt": "In an isotonic solution, a typical animal cell has…",
      "answer": "No net water gain or loss",
      "options": [
        "No net water gain or loss",
        "No water molecules moving at all",
        "Rapid inward water flow only",
        "A newly formed cell wall"
      ],
      "why": "Water still moves both ways, but there is no net osmotic swelling or shrinking."
    },
    {
      "id": "q105",
      "topic": "transport",
      "type": "typed",
      "prompt": "What is the name for net water movement across a selectively permeable membrane?",
      "answer": "Osmosis",
      "aliases": [
        "Osmosis"
      ],
      "why": "Water tends to move toward the side with more nonpenetrating solute, before pressure balances the flow.",
      "guide": 7
    },
    {
      "id": "q106",
      "topic": "transport",
      "type": "typed",
      "prompt": "What word describes a plant cell that is full and firm from water pressure?",
      "answer": "Turgid",
      "aliases": [
        "Turgid",
        "turgidity"
      ],
      "why": "The pressure is turgor pressure; the firm state is turgid.",
      "guide": 7
    },
    {
      "id": "q107",
      "topic": "transport",
      "type": "typed",
      "prompt": "What is the name of the pressure that helps support a hydrated plant cell?",
      "answer": "Turgor pressure",
      "aliases": [
        "Turgor pressure",
        "turgor"
      ],
      "why": "Turgor pressure is exerted against the cell wall.",
      "guide": 7
    },
    {
      "id": "q108",
      "topic": "transport",
      "type": "typed",
      "prompt": "What GENERAL process takes material into a cell by forming a membrane-bound vesicle?",
      "answer": "Endocytosis",
      "aliases": [
        "Endocytosis"
      ],
      "why": "Endo- means in. Exocytosis moves vesicle cargo out."
    },
    {
      "id": "q109",
      "topic": "transport",
      "type": "multi",
      "prompt": "Select the processes classified as passive transport.",
      "answer": [
        "Simple diffusion",
        "Facilitated diffusion",
        "Osmosis"
      ],
      "options": [
        "Simple diffusion",
        "Facilitated diffusion",
        "Osmosis",
        "ATP-powered ion pump"
      ],
      "why": "Passive transport moves substances down their relevant gradients without direct cellular energy input."
    },
    {
      "id": "q110",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "Which biological molecules are built from amino acids?",
      "answer": "Proteins",
      "options": [
        "Proteins",
        "DNA",
        "Starch",
        "Phospholipids"
      ],
      "why": "Amino acids join into polypeptide chains that fold into proteins."
    },
    {
      "id": "q111",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "Which biomolecule group includes sugars and starch?",
      "answer": "Carbohydrates",
      "options": [
        "Carbohydrates",
        "Nucleic acids",
        "Proteins",
        "Steroids"
      ],
      "why": "Carbohydrates include simple sugars and larger polysaccharides."
    },
    {
      "id": "q112",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "DNA and RNA belong to which biomolecule group?",
      "answer": "Nucleic acids",
      "options": [
        "Nucleic acids",
        "Lipids",
        "Carbohydrates",
        "Proteins"
      ],
      "why": "Nucleic acids are made from nucleotide building blocks."
    },
    {
      "id": "q113",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "Which biomolecule group includes fats and phospholipids?",
      "answer": "Lipids",
      "options": [
        "Lipids",
        "Proteins",
        "Nucleic acids",
        "Simple sugars"
      ],
      "why": "Lipids have roles in membranes, energy storage, and signaling."
    },
    {
      "id": "q114",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "What is the main job of an enzyme?",
      "answer": "Speed up a chemical reaction by lowering activation energy",
      "options": [
        "Speed up a chemical reaction by lowering activation energy",
        "Change DNA into a cell wall",
        "Stop all chemical reactions",
        "Get permanently used up in every reaction"
      ],
      "why": "Enzymes are catalysts; they lower the energy barrier without being consumed by the reaction."
    },
    {
      "id": "q115",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "What are the building blocks of DNA and RNA?",
      "answer": "Nucleotides",
      "options": [
        "Nucleotides",
        "Amino acids",
        "Fatty acids only",
        "Glucose only"
      ],
      "why": "Nucleotides include a sugar, a phosphate, and a nitrogen-containing base."
    },
    {
      "id": "q116",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "Why is water described as polar?",
      "answer": "Its electrons are shared unevenly, creating partial charges",
      "options": [
        "Its electrons are shared unevenly, creating partial charges",
        "It has no electrons",
        "It is always a solid",
        "It consists of only carbon"
      ],
      "why": "Oxygen attracts shared electrons more strongly than hydrogen, giving water partial charges."
    },
    {
      "id": "q117",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "A covalent bond forms when atoms…",
      "answer": "Share electrons",
      "options": [
        "Share electrons",
        "Always transfer all their protons",
        "Become separate cells",
        "Lose their nuclei"
      ],
      "why": "Covalent bonds involve shared electron pairs."
    },
    {
      "id": "q118",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "An ionic bond is the attraction between…",
      "answer": "Oppositely charged ions",
      "options": [
        "Oppositely charged ions",
        "Two organelles",
        "Two uncharged nuclei only",
        "A cell wall and a vacuole"
      ],
      "why": "Ions have gained or lost electrons; opposite electrical charges attract."
    },
    {
      "id": "q119",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "What holds neighboring water molecules together?",
      "answer": "Hydrogen bonds",
      "options": [
        "Hydrogen bonds",
        "Cell walls",
        "Peptide bonds between the waters",
        "Ribosomes"
      ],
      "why": "Hydrogen bonds link partial positive and partial negative regions of nearby water molecules."
    },
    {
      "id": "q120",
      "topic": "chemistry",
      "type": "choice",
      "prompt": "Why can very high temperatures reduce the activity of many enzymes?",
      "answer": "They can change the enzyme’s shape",
      "options": [
        "They can change the enzyme’s shape",
        "They turn every enzyme into DNA",
        "They create extra cell walls",
        "They make the enzyme an organism"
      ],
      "why": "Denaturation can alter an enzyme’s active site and reduce its function."
    },
    {
      "id": "q121",
      "topic": "chemistry",
      "type": "typed",
      "prompt": "What is the general name for a biological catalyst?",
      "answer": "Enzyme",
      "aliases": [
        "Enzyme",
        "enzymes",
        "an enzyme"
      ],
      "why": "Most enzymes are proteins; they speed up specific reactions."
    },
    {
      "id": "q122",
      "topic": "chemistry",
      "type": "typed",
      "prompt": "What is a building block of a protein?",
      "answer": "Amino acid",
      "aliases": [
        "Amino acid",
        "amino acids",
        "an amino acid"
      ],
      "why": "Ribosomes link amino acids to form proteins."
    }
  ],
  "flashcards": [
    {
      "id": "f-membrane",
      "topic": "organelles",
      "front": "Cell membrane",
      "back": "Controls movement into and out of the cell. A phospholipid bilayer surrounds the cell.",
      "tip": "Do not confuse it with the cell wall; plants have both."
    },
    {
      "id": "f-cytoplasm",
      "topic": "organelles",
      "front": "Cytoplasm",
      "back": "The cell contents inside the plasma membrane, excluding the nucleus in a eukaryote. Many reactions occur here.",
      "tip": "Cytosol is the fluid part; cytoplasm includes more than just fluid."
    },
    {
      "id": "f-nucleus",
      "topic": "organelles",
      "front": "Nucleus",
      "back": "Contains most of a eukaryotic cell’s DNA. DNA instructions are copied into RNA here.",
      "tip": "The nucleus is not the site where ribosomes assemble proteins."
    },
    {
      "id": "f-nucleolus",
      "topic": "organelles",
      "front": "Nucleolus",
      "back": "A region inside the nucleus where ribosomal RNA is made and ribosomal subunits are assembled.",
      "tip": "It is inside the nucleus and has no surrounding membrane of its own."
    },
    {
      "id": "f-ribosomes",
      "topic": "organelles",
      "front": "Ribosomes",
      "back": "Join amino acids to make proteins by reading mRNA. They can be free or attached to rough ER.",
      "tip": "They are not membrane-bound, and bacteria have them too."
    },
    {
      "id": "f-rough-er",
      "topic": "organelles",
      "front": "Rough ER",
      "back": "Its attached ribosomes make proteins destined for secretion, membranes, or certain organelles; the ER helps fold and process them.",
      "tip": "The “rough” dots are ribosomes."
    },
    {
      "id": "f-smooth-er",
      "topic": "organelles",
      "front": "Smooth ER",
      "back": "Makes lipids, participates in detoxification, and stores calcium in some cells.",
      "tip": "It has no attached ribosomes; it is not the protein-building ER."
    },
    {
      "id": "f-golgi",
      "topic": "organelles",
      "front": "Golgi apparatus",
      "back": "Modifies, sorts, and packages proteins and lipids for delivery.",
      "tip": "It processes proteins; ribosomes are what synthesize them."
    },
    {
      "id": "f-mitochondrion",
      "topic": "energy",
      "front": "Mitochondrion",
      "back": "Uses energy released from nutrients to make much of a eukaryotic cell’s ATP through aerobic cellular respiration.",
      "tip": "Plants, including their roots, need mitochondria too."
    },
    {
      "id": "f-vesicle",
      "topic": "organelles",
      "front": "Vesicle",
      "back": "A small membrane-bound compartment that carries material between cell locations; secretory vesicles release cargo by exocytosis.",
      "tip": "Vesicles carry cargo; they do not manufacture the protein."
    },
    {
      "id": "f-lysosome",
      "topic": "organelles",
      "front": "Lysosome",
      "back": "Contains digestive enzymes that break down large molecules and worn-out cell parts.",
      "tip": "Plant lytic vacuoles can carry out similar digestive roles."
    },
    {
      "id": "f-peroxisome",
      "topic": "organelles",
      "front": "Peroxisome",
      "back": "Carries out oxidation reactions, including fatty-acid breakdown, and breaks down hydrogen peroxide using enzymes such as catalase.",
      "tip": "It is different from a lysosome, which uses digestive enzymes."
    },
    {
      "id": "f-cytoskeleton",
      "topic": "organelles",
      "front": "Cytoskeleton",
      "back": "A network of protein fibers that helps maintain shape, organize internal structures, and move materials.",
      "tip": "It is a fiber network, not a membrane-bound sac."
    },
    {
      "id": "f-wall",
      "topic": "organelles",
      "front": "Cell wall",
      "back": "A supporting layer outside the cell membrane. Plant walls contain cellulose; most bacterial walls contain peptidoglycan.",
      "tip": "Not all bacteria have walls. This diagram represents a typical walled bacterium."
    },
    {
      "id": "f-chloroplast",
      "topic": "energy",
      "front": "Chloroplast",
      "back": "Captures light energy to help build sugars from carbon dioxide and water. Contains chlorophyll.",
      "tip": "The plant diagram represents a photosynthetic cell, not an ordinary underground root."
    },
    {
      "id": "f-vacuole",
      "topic": "organelles",
      "front": "Large central vacuole",
      "back": "Stores water and other materials; pressure from the filled cell helps support the plant against its wall.",
      "tip": "Turgor is pressure, not a separate type of organelle."
    },
    {
      "id": "f-nucleoid",
      "topic": "organelles",
      "front": "Nucleoid",
      "back": "The region containing the main bacterial chromosome; it is not enclosed in a nuclear membrane.",
      "tip": "No nucleus does not mean no DNA."
    },
    {
      "id": "f-flagellum",
      "topic": "organelles",
      "front": "Flagellum",
      "back": "A long external structure that can propel some bacterial cells.",
      "tip": "Not every bacterium has a flagellum. Eukaryotic flagella have a different structure."
    },
    {
      "id": "f-trait-0",
      "topic": "life",
      "front": "Respond to their environment",
      "back": "React to a stimulus, or a change around them.",
      "tip": "Example: A plant shoot bends toward a light source."
    },
    {
      "id": "f-trait-1",
      "topic": "life",
      "front": "Grow and develop",
      "back": "Increase in size and go through changes during life.",
      "tip": "Example: A tadpole develops into a frog."
    },
    {
      "id": "f-trait-2",
      "topic": "life",
      "front": "Produce offspring",
      "back": "Reproduce, creating a new generation.",
      "tip": "Example: A bacterium divides into two cells."
    },
    {
      "id": "f-trait-3",
      "topic": "life",
      "front": "Maintain homeostasis",
      "back": "Keep internal conditions within a stable range.",
      "tip": "Example: Sweating helps cool your body when you are hot."
    },
    {
      "id": "f-trait-4",
      "topic": "life",
      "front": "Have complex chemistry",
      "back": "Use many chemical reactions to build materials and process energy; these reactions are metabolism.",
      "tip": "Example: Enzymes help cells break down glucose and make ATP."
    },
    {
      "id": "f-trait-5",
      "topic": "life",
      "front": "Consist of cells",
      "back": "Have one or more cells, the basic units of life.",
      "tip": "Example: Onion skin is made of many individual cells."
    },
    {
      "id": "f-term-0",
      "topic": "organization",
      "front": "Levels, smallest → largest",
      "back": "Atom → molecule → organelle → cell → tissue → organ → organ system → organism.",
      "tip": "An organelle is inside a cell; an organ is made of tissues."
    },
    {
      "id": "f-term-1",
      "topic": "organization",
      "front": "Tissue",
      "back": "A group of cells working together in a related function.",
      "tip": "Tissue comes between cell and organ."
    },
    {
      "id": "f-term-2",
      "topic": "organization",
      "front": "Organ system",
      "back": "A group of organs working together.",
      "tip": "Example: digestive system."
    },
    {
      "id": "f-term-3",
      "topic": "organization",
      "front": "Organism",
      "back": "One complete living individual.",
      "tip": "It can have one cell or many cells."
    },
    {
      "id": "f-term-4",
      "topic": "cells",
      "front": "Prokaryote",
      "back": "An organism whose cells lack a membrane-bound nucleus.",
      "tip": "Bacteria and archaea still have DNA and ribosomes."
    },
    {
      "id": "f-term-5",
      "topic": "cells",
      "front": "Eukaryote",
      "back": "An organism whose cells are organized with a nucleus and other membrane-bound organelles.",
      "tip": "Plants, animals, fungi, and protists."
    },
    {
      "id": "f-term-6",
      "topic": "cells",
      "front": "Cell theory",
      "back": "Living organisms consist of cells; the cell is the basic unit of life; cells come from existing cells.",
      "tip": "A single cell can be an entire organism."
    },
    {
      "id": "f-term-7",
      "topic": "cells",
      "front": "Two structures ALL cells share",
      "back": "Cell membrane and cytoplasm.",
      "tip": "DNA and ribosomes are also core features in standard cell-type comparisons."
    },
    {
      "id": "f-term-8",
      "topic": "protein",
      "front": "Secreted protein route",
      "back": "Ribosome on rough ER → transport vesicle → Golgi → secretory vesicle → cell membrane / exocytosis.",
      "tip": "The nucleus provides mRNA instructions, not the finished protein."
    },
    {
      "id": "f-term-9",
      "topic": "protein",
      "front": "Exocytosis",
      "back": "A vesicle fuses with the cell membrane and releases cargo outside.",
      "tip": "Exo = out."
    },
    {
      "id": "f-term-10",
      "topic": "protein",
      "front": "mRNA",
      "back": "Messenger RNA carries instructions used by ribosomes to make proteins.",
      "tip": "In a eukaryote, it can travel from the nucleus to the cytoplasm."
    },
    {
      "id": "f-term-11",
      "topic": "energy",
      "front": "ATP",
      "back": "An energy-carrying molecule that powers cellular work.",
      "tip": "ATP is a molecule, not an organelle."
    },
    {
      "id": "f-term-12",
      "topic": "energy",
      "front": "Underground root cell",
      "back": "Normally has mitochondria, but no chloroplasts.",
      "tip": "It needs ATP and typically receives no light."
    },
    {
      "id": "f-term-13",
      "topic": "transport",
      "front": "Osmosis",
      "back": "Net water movement across a selectively permeable membrane.",
      "tip": "With nonpenetrating solutes and before pressure balance, water tends toward the more concentrated solution."
    },
    {
      "id": "f-term-14",
      "topic": "transport",
      "front": "Hypotonic surroundings",
      "back": "Lower nonpenetrating-solute concentration than inside the cell; water tends to enter.",
      "tip": "Animal: may lyse. Plant: normally turgid."
    },
    {
      "id": "f-term-15",
      "topic": "transport",
      "front": "Hypertonic surroundings",
      "back": "Higher nonpenetrating-solute concentration than inside; water tends to leave.",
      "tip": "A plant cell can plasmolyze."
    },
    {
      "id": "f-term-16",
      "topic": "transport",
      "front": "Isotonic surroundings",
      "back": "No net osmotic water movement.",
      "tip": "Water molecules still move in both directions."
    },
    {
      "id": "f-term-17",
      "topic": "transport",
      "front": "Turgid",
      "back": "The full, firm state of a hydrated plant cell.",
      "tip": "Turgor pressure develops against the wall."
    },
    {
      "id": "f-term-18",
      "topic": "transport",
      "front": "Active transport",
      "back": "Energy-requiring transport that can move substances against a gradient.",
      "tip": "An ATP-powered membrane pump is an example."
    },
    {
      "id": "f-term-19",
      "topic": "transport",
      "front": "Facilitated diffusion",
      "back": "Passive movement down a gradient using membrane proteins.",
      "tip": "Uses a protein, but does not directly use ATP."
    },
    {
      "id": "f-term-20",
      "topic": "chemistry",
      "front": "Four major biomolecule groups",
      "back": "Carbohydrates, lipids, proteins, and nucleic acids.",
      "tip": "Cell membranes contain lipids and proteins; DNA is a nucleic acid."
    },
    {
      "id": "f-term-21",
      "topic": "chemistry",
      "front": "Enzyme",
      "back": "A biological catalyst that lowers activation energy.",
      "tip": "Its shape matters to its function."
    },
    {
      "id": "f-term-22",
      "topic": "chemistry",
      "front": "Protein building block",
      "back": "Amino acid.",
      "tip": "Nucleic-acid building blocks are nucleotides."
    }
  ],
  "levels": [
    "Atom",
    "Molecule",
    "Organelle",
    "Cell",
    "Tissue",
    "Organ",
    "Organ system",
    "Organism"
  ]
};

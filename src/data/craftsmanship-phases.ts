export interface CraftsmanshipPhase {
  id: string;
  phase: string;
  shortTabTitle: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  image: string;
  caption: string;
  details: string[];
}

export const CRAFTSMANSHIP_PHASES: CraftsmanshipPhase[] = [
  {
    id: "design",
    phase: "01",
    shortTabTitle: "DESIGN",
    title: "Design & Planning",
    subtitle: "Solar Orientation & Spatial Planning",
    shortDescription:
      "Every development begins on paper: studying natural sun paths and breeze directions to shape living spaces around natural daylight and continuous airflow.",
    image: "/images/craft/01-design.jpg",
    caption: "Architectural drafting & sun-path orientation mapping",
    details: [
      "Solar orientation mapped to maximize morning light and minimize western heat",
      "Cross-ventilation breezeways planned across living and bedroom spaces",
      "Efficient floor plates designed without dark or wasted circulation corridors",
    ],
  },
  {
    id: "foundation",
    phase: "02",
    shortTabTitle: "FOUNDATION",
    title: "Ground & Foundation",
    subtitle: "Site Preparation & Structural Footings",
    shortDescription:
      "Once the site is prepared, the foundation establishes a solid base for the structure above, anchoring the building securely into the ground.",
    image: "/images/craft/02-foundation.jpg",
    caption: "Engineered excavation & dense reinforcement footing grid",
    details: [
      "Ground levels prepared and verified before structural footing begins",
      "Reinforced concrete footings poured to support structural columns",
      "Subterranean protection applied to keep foundation elements dry and durable",
    ],
  },
  {
    id: "structure",
    phase: "03",
    shortTabTitle: "STRUCTURE",
    title: "Structure & Framing",
    subtitle: "Monolithic Skeleton & Floor Plates",
    shortDescription:
      "The structural frame rises floor by floor using monolithic columns and reinforced concrete slabs to ensure lasting structural strength and clean geometry.",
    image: "/images/craft/03-structure.jpg",
    caption: "Reinforced concrete columns, floor slabs & precision staging",
    details: [
      "Monolithic columns and beam grids engineered for seismic stability",
      "Precision formwork ensuring clean, true vertical surfaces and crisp edges",
      "Documented curing cycles for every concrete pour to ensure strength",
    ],
  },
  {
    id: "finish",
    phase: "04",
    shortTabTitle: "FINISH",
    title: "Craft & Detailing",
    subtitle: "Materials, Services & Fine Joinery",
    shortDescription:
      "Where structure meets daily living. Skilled artisans install stonework, acoustic window glazing, concealed plumbing and electrical lines, and custom architectural woodwork.",
    image: "/images/craft/04-finish.jpg",
    caption: "On-site carpentry, stone cladding & concealed lighting profiles",
    details: [
      "Plumbing and electrical lines pressure-tested before concealing in walls",
      "Acoustic weather-sealed windows installed for quiet, dust-free interiors",
      "Natural wood joinery and precision stone surfaces installed with fine reveals",
    ],
  },
  {
    id: "handover",
    phase: "05",
    shortTabTitle: "HANDOVER",
    title: "Handover & Care",
    subtitle: "Personal Walkthrough & Living Transition",
    shortDescription:
      "Before keys are handed over, we conduct a thorough room-by-room walkthrough together, ensuring every fitting, door, and finish meets expectations.",
    image: "/images/craft/05-handover.jpg",
    caption: "Completed residence, landscaped grounds & keys handover",
    details: [
      "Joint room-by-room inspection walkthrough with our project directors",
      "Clear statutory documentation, warranties, and maintenance manuals provided",
      "As-built conduit layout diagrams supplied for effortless future decor",
    ],
  },
];

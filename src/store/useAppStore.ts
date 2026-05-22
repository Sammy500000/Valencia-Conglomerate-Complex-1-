import { create } from 'zustand'

export interface Division {
  id: string
  name: string
  overview: string
  description: string
  website: string
  images: string[]
  position: [number, number, number]
  size: [number, number] // width, depth
  category: string
  cameraPosition?: [number, number, number]
  cameraTarget?: [number, number, number]
  cameraZoom?: number
}

interface AppState {
  isExploring: boolean
  setIsExploring: (isExploring: boolean) => void
  selectedDivision: Division | null
  setSelectedDivision: (division: Division | null) => void
  resetSignal: number
  triggerReset: () => void
  divisions: Division[]
  setDivisions: (divisions: Division[]) => void
}

export const useAppStore = create<AppState>((set) => ({
  isExploring: false,
  setIsExploring: (isExploring) => set({ isExploring }),
  selectedDivision: null,
  setSelectedDivision: (division) => set({ selectedDivision: division }),
  resetSignal: 0,
  triggerReset: () => set((state) => ({ resetSignal: state.resetSignal + 1, selectedDivision: null })),
  divisions: [
    {
      id: "valencia-beverages",
      name: "Valencia Beverages & Superwater",
      category: "Manufacturing",
      overview: "14 Acres / 174240 Sq. Ft.",
      description: "Focuses on the high-volume production, distribution, and sale of functional beverages and premium waters packaged in convenient, retail-ready PET bottles.",
      website: "https://valencianutrition.com/valencia-beverages-and-super-water/",
      images: [],
      position: [-45, 0, 5],
      cameraTarget: [-45.00, 0.00, 5.00],
      cameraPosition: [-95.88, 5.44, 101.01],
      cameraZoom: 1.00,
      size: [60, 45]
    },
    {
      id: "aluminum-cans",
      name: "Valencia Vitabev Beverages & Valencia Vitalize Functional Beverages",
      category: "Manufacturing",
      overview: "4 Acres / 174240 Sq. Ft.",
      description: "Manages the development and manufacturing of premium beverages in aluminium cans. Utilizing high-standard production facilities in India, this division acts as a strategic export hub targeting the GCC markets.",
      website: "https://valencianutrition.com/valencia-vitabev-cola/",
      images: [],
      position: [-15, 0, -35],
      cameraTarget: [-15.00, 0.00, -35.00],
      cameraPosition: [1.25, 8.58, -99.24],
      cameraZoom: 1.00,
      size: [30, 20]
    },
    {
      id: "valencia-pos",
      name: "Valencia POS Solutions",
      category: "Operations",
      overview: "4 Acres / 174240 Sq. Ft.",
      description: "Oversees the engineering, manufacturing, and assembly of commercial retail infrastructure, including vending machines, visicoolers, soda fountains, and aroma diffusers.",
      website: "https://valencianutrition.com/pos/",
      images: [],
      position: [-10, 0, 25],
      cameraTarget: [-10.00, 0.00, 25.00],
      cameraPosition: [-26.07, 12.38, 89.39],
      cameraZoom: 1.00,
      size: [20, 25]
    },
    {
      id: "valencia-nutracare",
      name: "Valencia Nutracare Lifesciences P Ltd",
      category: "Nutraceuticals",
      overview: "3 Acres / 130680 Sq. Ft.",
      description: "Neutraceutical Solutions for Pregnancy & Lactation Care (20 Tonnes/Day) & Infant & Child Care (20 Tonnes/Day).",
      website: "https://valencianutrition.com/valencia-nutracare/",
      images: [],
      position: [25, 0, -20],
      cameraTarget: [25.00, 0.00, -20.00],
      cameraPosition: [46.72, 19.31, -73.55],
      cameraZoom: 1.00,
      size: [25, 20]
    },
    {
      id: "valencia-consumer",
      name: "Valencia Consumer Goods",
      category: "Consumer Goods",
      overview: "3 Acres / 130680 Sq. Ft.",
      description: "A multi-category manufacturing unit dedicated to everyday essentials and personal care, specializing in the production of perfumes, chewing gums, mints, and toothpastes.",
      website: "https://valencianutrition.com/consumer-products/",
      images: [],
      position: [60, 0, -20],
      cameraTarget: [60.00, 0.00, -20.00],
      cameraPosition: [93.63, 16.92, -67.91],
      cameraZoom: 1.00,
      size: [25, 20]
    },
    {
      id: "packaging-manufacture",
      name: "Packaging Manufacture",
      category: "Packaging",
      overview: "1.5 Acres / 65340 Sq. Ft.",
      description: "HP Indigo 6K Packaging and labeling material for Consumer Goods, Nutracare, Healthy Bites, Crunzzo, POS.",
      website: "https://valencianutrition.com",
      images: [],
      position: [40, 0, 10],
      cameraTarget: [40.00, 0.00, 10.00],
      cameraPosition: [77.50, 30.00, 47.50],
      cameraZoom: 1.00,
      size: [25, 15]
    },
    {
      id: "valencia-snacks",
      name: "Valencia Snacks & Healthy Bites",
      category: "Food Production",
      overview: "8 Acres Total",
      description: "Caters to a diverse consumer base by offering a dual-track portfolio: an affordable budget range for everyday snacking, and a premium range focused on health-conscious, nutrient-dense bites.",
      website: "https://valencianutrition.com/valencia-snacks-and-healthy-bites/",
      images: [],
      position: [55, 0, 35],
      cameraTarget: [55.00, 0.00, 35.00],
      cameraPosition: [117.76, 14.76, 56.86],
      cameraZoom: 1.00,
      size: [40, 30]
    },
    {
      id: "corporate-block",
      name: "Corporate Block",
      category: "Administration",
      overview: "1 Acre / 43560 Sq. Ft.",
      description: "Main administrative and corporate offices.",
      website: "https://valencianutrition.com",
      images: [],
      position: [25, 0, 60],
      cameraTarget: [25.00, 0.00, 60.00],
      cameraPosition: [-7.31, 5.07, 76.33],
      cameraZoom: 1.00,
      size: [15, 15]
    },
    {
      id: "guest-house",
      name: "Guest House",
      category: "Hospitality",
      overview: "1 Acre / 43560 Sq. Ft.",
      description: "Guest accommodations.",
      website: "",
      images: [],
      position: [60, 0, 60],
      cameraTarget: [60.00, 0.00, 60.00],
      cameraPosition: [82.50, 18.00, 82.50],
      cameraZoom: 1.00,
      size: [15, 15]
    },
    {
      id: "fleet-bay",
      name: "Fleet Bay",
      category: "Logistics",
      overview: "2 Acres / 87120 Sq. Ft.",
      description: "Fleet bay operations and transport logistics.",
      website: "",
      images: [],
      position: [45, 0, -45],
      cameraTarget: [45.00, 0.00, -45.00],
      cameraPosition: [93.15, 3.33, -38.22],
      cameraZoom: 1.00,
      size: [20, 15]
    },
    {
      id: "dormitory",
      name: "Dormitory",
      category: "Housing",
      overview: "1.5 Acres / 65340 Sq. Ft.",
      description: "Staff and worker housing.",
      website: "",
      images: [],
      position: [45, 0, -65],
      cameraTarget: [45.00, 0.00, -65.00],
      cameraPosition: [-13.47, 17.07, -99.09],
      cameraZoom: 1.00,
      size: [20, 15]
    },
    {
      id: "pantry",
      name: "Pantry",
      category: "Facilities",
      overview: "General pantry facilities.",
      description: "Pantry and dining areas.",
      website: "",
      images: [],
      position: [15, 0, -50],
      cameraTarget: [11.14, -6.91, -53.96],
      cameraPosition: [-1.78, 3.52, -88.68],
      cameraZoom: 1.00,
      size: [15, 15]
    }
  ],
  setDivisions: (divisions) => set({ divisions }),
}))

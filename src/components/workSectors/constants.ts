import FranceFlag from 'components/svg/franceFlag';
import IndiaFlag from 'components/svg/indiaFlag';
import SingaporeFlag from 'components/svg/singporeFlag';
import UnitedKingdomFlag from 'components/svg/unitedKingdomFlag';
import UsFlag from 'components/svg/UsFlag';

// @TODO: Decide if its better to write AND MORE as the last option with an animated global map as a background

interface SectorsData {
  heading: string[];
  sectors: {
    name: string;
    flag?: () => JSX.Element;
  }[];
}

export const SECTORS: SectorsData[] = [
  {
    heading: ['BUILDING', 'WITH', 'TEAMS', 'WORLDWIDE'],
    sectors: [
      { name: 'NEW YORK', flag: UsFlag },
      { name: 'LONDON', flag: UnitedKingdomFlag },
      { name: 'FRANCE', flag: FranceFlag },
      { name: 'SINGAPORE', flag: SingaporeFlag },
      { name: 'NEW DELHI', flag: IndiaFlag },
      { name: 'CALIFORNIA', flag: UsFlag },
      { name: 'SAN FRANCISCO', flag: UsFlag },
      { name: 'BENGALURU', flag: IndiaFlag },
      { name: 'MIAMI', flag: UsFlag },
    ],
  },
  {
    heading: ['ACROSS', 'VARIOUS', 'INDUSTRY', 'DOMAINS'],
    sectors: [
      { name: 'FAST FASHION' },
      { name: 'HEALTHCARE' },
      { name: 'CRYPTOCURRENCY' },
      { name: 'E-COMMERCE' },
      { name: 'ARTIFICIAL INTELLIGENCE' },
      { name: 'FINANCE' },
      { name: 'CONTENT DELIVERY' },
      { name: 'REAL ESTATE' },
      { name: 'AND MORE' },
    ],
  },
];

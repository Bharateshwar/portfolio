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
      { name: 'New York', flag: UsFlag },
      { name: 'London', flag: UnitedKingdomFlag },
      { name: 'France', flag: FranceFlag },
      { name: 'Singapore', flag: SingaporeFlag },
      { name: 'New Delhi', flag: IndiaFlag },
      { name: 'California', flag: UsFlag },
      { name: 'San Francisco', flag: UsFlag },
      { name: 'Bengaluru', flag: IndiaFlag },
      { name: 'Miami', flag: UsFlag },
    ],
  },
  {
    heading: ['ACROSS', 'VARIOUS', 'INDUSTRY', 'DOMAINS'],
    sectors: [
      { name: 'Fast Fashion' },
      { name: 'Healthcare' },
      { name: 'Cryptocurrency' },
      { name: 'E-Commerce' },
      { name: 'Artificial Intelligence' },
      { name: 'Finance' },
      { name: 'Content Delivery' },
      { name: 'Real Estate' },
      { name: 'And More' },
    ],
  },
];

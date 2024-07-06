import FranceFlag from 'components/svg/franceFlag';
import IndiaFlag from 'components/svg/indiaFlag';
import SingaporeFlag from 'components/svg/singporeFlag';
import UnitedKingdomFlag from 'components/svg/unitedKingdomFlag';
import UsFlag from 'components/svg/UsFlag';
import 'styles/work-locations.scss';

const LOCATIONS = [
  { name: 'NEW YORK', flag: UsFlag },
  { name: 'LONDON', flag: UnitedKingdomFlag },
  { name: 'FRANCE', flag: FranceFlag },
  { name: 'SINGAPORE', flag: SingaporeFlag },
  { name: 'NEW DELHI', flag: IndiaFlag },
  { name: 'CALIFORNIA', flag: UsFlag },
  { name: 'SAN FRANCISCO', flag: UsFlag },
  { name: 'BENGALURU', flag: IndiaFlag },
  { name: 'MIAMI', flag: UsFlag },
];

function WorkLocations() {
  return (
    <div className="work-locations-container">
      <h2 className="h2-large">
        <span>BUILDING</span>
        <span>WITH</span>
        <span>TEAMS</span>
        <span>WORLDWIDE</span>
      </h2>
      <div className="work-locations">
        {LOCATIONS.map(({ name, flag: Flag }) => (
          <div key={name} className="work-locations__location">
            <p>{name}</p>
            <Flag />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkLocations;

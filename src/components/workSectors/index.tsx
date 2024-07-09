import Container from 'components/container';

import 'styles/work-sectors.scss';
import { SECTORS } from './constants';

function WorkSectors() {
  return (
    <Container variant="gradient" isSection>
      {SECTORS.map(({ heading, sectors }, index) => (
        <div className="work-sectors-container" key={index}>
          <h2 className="h2-large">
            {heading.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </h2>
          <div className="work-sectors">
            {sectors.map(({ name, flag: Flag }) => (
              <div key={name} className="work-sectors__sector">
                {/* @TODO: Explore styled text instead of normal text */}
                <p>{name}</p>
                {Flag && <Flag />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}

export default WorkSectors;

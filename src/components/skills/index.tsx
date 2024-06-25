import 'styles/skills.scss';
import { SKILLS_DATA } from './constants';

function Skills() {
  return (
    <div className="skills-section">
      {SKILLS_DATA.map(({ name, logo: Logo }) => (
        <div className="skill-item" key={name}>
          <div className="skill-item__logo">
            <Logo />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skills;

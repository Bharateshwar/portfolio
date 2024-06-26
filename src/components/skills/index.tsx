import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import 'styles/skills.scss';
import { SKILL_DATA_ROWS, SkillItem, SkillList } from './constants';

function Skills() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // @TODO: Add animation logic
    },
    { scope: mainContainerRef },
  );

  const renderSkillItems = (items: SkillItem[]) =>
    items.map(({ name, link, logo: Logo }) => (
      <li className="skills-list__item" key={name}>
        <a href={link} target="_blank" rel="noreferrer">
          <div className="skills-list__item__logo">
            <Logo />
          </div>
        </a>
      </li>
    ));

  const renderSkillList = ({ category, items }: SkillList) => {
    return (
      <div className="skills-list" key={category}>
        <p className="skills-list__title">{category}</p>
        <ul>{renderSkillItems(items)}</ul>
      </div>
    );
  };

  return (
    <div className="skills-section" ref={mainContainerRef}>
      {SKILL_DATA_ROWS.map((dataRow, index) => (
        <div className="skills-row" key={index}>
          {dataRow.map(renderSkillList)}
        </div>
      ))}
    </div>
  );
}

export default Skills;

import { useGSAP } from '@gsap/react';
import gsap from 'gsap/dist/gsap';
import { useRef } from 'react';

import 'styles/skills.scss';
import { SKILL_DATA_ROWS, SkillDataRow, SkillItem } from './constants';

function Skills() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows: HTMLDivElement[] = gsap.utils.toArray('.skills-row');

      rows.forEach((row, index) => {
        const width = row.offsetWidth;
        const widthToScroll =
          width - (mainContainerRef.current?.offsetWidth ?? 0);

        if (widthToScroll > 0) {
          // @TODO: Pause on hover or show a button within overlay to open skills section
          gsap.to(row, {
            x: (index % 2 === 0 ? -1 : 1) * widthToScroll,
            ease: 'none',
            duration: 10,
            yoyo: true,
            repeat: -1,
          });
        }
      });
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

  const renderSkillList = ({ category, items }: SkillDataRow) => {
    return (
      <div className="skills-list" key={category}>
        <p className="skills-list__title">{category}</p>
        <ul>{renderSkillItems(items)}</ul>
      </div>
    );
  };

  return (
    <div className="skills-section" ref={mainContainerRef}>
      {SKILL_DATA_ROWS.map((dataRow) => (
        <div className="skills-row" key={dataRow.category}>
          {renderSkillList(dataRow)}
        </div>
      ))}
    </div>
  );
}

export default Skills;

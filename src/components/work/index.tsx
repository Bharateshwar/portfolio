import { formatDistance, parseISO } from 'date-fns';

import Container from 'components/container';
import 'styles/work.scss';

const WORK_HISTORY = [
  {
    employer: { name: 'Two Point One', location: 'New Hyde Park, New York' },
    designation: 'Senior Software Developer',
    period: { start: '2021-07-02' },
  },
  {
    employer: { name: 'Cognizant', location: 'Bengaluru' },
    designation: 'Full-stack Developer',
    period: { start: '2019-07-30', end: '2021-07-01' },
  },
];

function Work() {
  const renderWorkHistoryItems = () => {
    return WORK_HISTORY.map(({ period, employer, designation }, index) => {
      const startDate = parseISO(period.start);
      const endDate = parseISO(period.end || new Date().toISOString());
      const duration = formatDistance(startDate, endDate);

      const formattedPeriod = `${startDate.getFullYear()} - ${period.end ? endDate.getFullYear() : 'Present'}`;

      return (
        <div className="work-history__item" key={index}>
          <Container className="work-history__item__details-container">
            <div className="work-history__item__period-details">
              <p className="body-extra-large">{formattedPeriod}</p>
              <p className="work-history__item__duration">{duration}</p>
            </div>
            <div>
              <p className="body-extra-large work-history__item__employer-name">
                {employer.name}
              </p>
              <p>{employer.location}</p>
            </div>
            <p className="body-extra-large work-history__item__designation">
              {designation}
            </p>
          </Container>
        </div>
      );
    });
  };
  return (
    <section>
      <Container>
        <h2 className="h2-extra-large">Work</h2>
      </Container>
      <div className="work-history">{renderWorkHistoryItems()}</div>
    </section>
  );
}

export default Work;

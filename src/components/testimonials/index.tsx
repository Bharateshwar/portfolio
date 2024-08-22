import 'styles/testimonials.scss';
import { TESTIMONIALS } from './constants';

function Testimonials() {
  return (
    <section className="testimonials-section hide-scrollbar">
      {TESTIMONIALS.map(
        (
          { name, company, designation, image, pretext, excerpt, posttext },
          index,
        ) => {
          return (
            <div className="testimonial" key={index}>
              <div className="testimonial__intro">
                <img
                  src={image}
                  alt={name}
                  className="testimonial__image"
                  loading="lazy"
                />
                <div>
                  <p className="testimonial__name">{name}</p>
                  <p>{designation}</p>
                  <p>{company}</p>
                </div>
              </div>
              <p>
                <span className="testimonial__blurred-text">{pretext}</span>
                <span className="testimonial__excerpt">{excerpt}</span>
                <span className="testimonial__blurred-text">{posttext}</span>
              </p>
            </div>
          );
        },
      )}
    </section>
  );
}

export default Testimonials;

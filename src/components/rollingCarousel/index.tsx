import LayoutCircle from "components/svg/layoutCircle";
import "styles/rolling-carousel.scss";

const carouselItems = [{ title: "Lorem" }, { title: "ipsum" }];

function RollingCaoursel() {
  const renderCarouselItems = () => {
    return carouselItems?.map(({ title }, index) => {
      return (
        <div className="rolling-carousel__item" key={index}>
          <div className="rolling-carousel__item__inner-container">
            <h2>{title}</h2>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="rolling-carousel --left">
      <LayoutCircle />
      {renderCarouselItems()}
    </div>
  );
}

export default RollingCaoursel;

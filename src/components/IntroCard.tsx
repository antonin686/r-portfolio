interface props {
  image: string;
  headerTitle: string;
  headerBody: string;
}

function IntroCard({ image, headerTitle, headerBody }: props) {
  return (
    <div className="introcard-wrapper">
      <div className="mx-auto flex flex-col">
        <img src={image} alt="Developer" />       
      </div>
      <div className="intro-summary mx-auto">
        <div className="intro-shadow">
          <div className="intro-front">
            <div className="title-md">{headerTitle}</div>
            <p className="intro-body">{headerBody}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroCard;

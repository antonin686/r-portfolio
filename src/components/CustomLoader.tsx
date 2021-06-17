import Loader from "react-loader-spinner";

function CustomLoader() {
  return (
    <div className="loader">
      <div className="m-auto title-lg">
        <Loader type="Puff" color="var(--frontLineColor)" height={150} width={150} />
      </div>
    </div>
  );
}

export default CustomLoader;

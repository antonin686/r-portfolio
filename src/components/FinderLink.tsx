import { iconsUrl } from "../helpers/ApiLinks";

interface props {
  link: string;
  icon: string;
}

function FinderLink({ link, icon }: props) {
  return (
    <div className="finderLink">
      <a target="_blank" rel="noreferrer" href={link}>
        <img className="finder-icon filter-green" src={iconsUrl + icon} alt={icon} />
      </a>
    </div>
  );
}

export default FinderLink;

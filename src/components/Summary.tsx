import FinderLink from "./FinderLink";
import { IfinderLink } from "../helpers/Interfaces";
interface props {
  mainTitle: string;
  mainBody: string;
  extraTitle: string;
  extraBody?: string;
  techsets: [string[]];
  btnLink?: string;
  finderLinks?: any;
}

function Summary({
  mainTitle,
  mainBody,
  extraTitle,
  extraBody,
  techsets,
  btnLink,
  finderLinks,
}: props) {
  return (
    <div className="summary-wrapper">
      <div>
        <div className="title-md">{mainTitle}</div>
        <p>{mainBody}</p>
        <hr />
        <div className="title-md">{extraTitle}</div>
        <p>
          {extraBody}{" "}
          {btnLink && (
            <span>
              <a target="_blank" rel="noreferrer" href={btnLink}>
                Download Resume
              </a>
              .
            </span>
          )}
        </p>
        <div className="techsets-wrapper">
          {techsets &&
            techsets.map((techset: string[]) => (
              <ul key={techset.toString()}>
                {techset.map((set: string) => (
                  <li key={set}>{set}</li>
                ))}
              </ul>
            ))}
        </div>
      </div>
      <div className="finderSection-wrapper">
        <div className="title-md">You Can Find Me On</div>
        <div className="finderLink-wrapper">
          {finderLinks &&
            finderLinks.map((finder: IfinderLink) => (
              <FinderLink
                key={finder.id}
                link={finder.link}
                icon={finder.icon}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Summary;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModalImage from "react-modal-image";
import MacNav from "./../../components/MacNav";
import Summary from "./../../components/Summary";

import { projectsUrl } from "../../helpers/ApiLinks";
import { IprojectFull, Itechset } from "../../helpers/Interfaces";
import CustomLoader from "../../components/CustomLoader";

function Details() {
  const { id } = useParams<any>();
  const projectUrl = `${projectsUrl}/${id}`;
  const [project, setproject] = useState<IprojectFull | null>(null);

  useEffect(() => {
    axios.get(projectUrl).then((response) => {
      let lang: string[] = [];
      let fw: string[] = [];
      response.data.techsets.forEach((set: Itechset) => {
        lang.push(set.name);
        if (set.extra) fw.push(set.extra);
      });
      response.data.techsets = [lang, fw];
      setproject(response.data);
    });
  }, [projectUrl]);

  return (
    <div>
      {!project ? (
        <CustomLoader />
      ) : (
        <div>
          <MacNav />
          <div className="section-secondary border-bottom">
            <div className="container">
              <Summary
                mainTitle={project.pageInfo.main_title}
                mainBody={project.pageInfo.main_body}
                extraTitle={project.pageInfo.extra_title}
                extraBody={project.pageInfo.extra_body}
                techsets={project.techsets}
                finderLinks={project.finderLinks}
              />
            </div>
          </div>
          {/* Image Section */}
          <div className="section-primary">
            <div className="title-lg text-center">Project Images</div>
            <div className="container">
              <div className="project-images-wrapper">
                {project.images &&
                  project.images.map((image) => (
                    <div key={image.id}>
                      <div className="title-md">{image.title}</div>
                      <p>{image.description}</p>            
                      <ModalImage
                        small={image.path}
                        large={image.path}
                        alt={image.title}
                      />
                      <div className="text-center">~~~~~~~~~~</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;

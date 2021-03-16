import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-elastic-carousel";

import { Itechset, IhomePage, Iproject } from "../helpers/Interfaces";
import { homePageUrl, projectsUrl, resumeUrl } from "../helpers/ApiLinks";
import useGetFetch from "../hooks/useGetFetch";
import MacNav from "../components/MacNav";
import IntroCard from "../components/IntroCard";
import Summary from "../components/Summary";
import ProjectCard from "../components/ProjectCard";
import CustomLoader from "../components/CustomLoader";

function Home() {
  const [homePage, setHomePage] = useState<IhomePage | null>(null);
  const projects: any = useGetFetch(projectsUrl, { reverse: true });
  const breakPoints = [
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  useEffect(() => {
    axios.get(homePageUrl).then((response) => {
      let lang: string[] = [];
      let fw: string[] = [];
      response.data.techsets.forEach((set: Itechset) => {
        lang.push(set.name);
        if (set.extra) fw.push(set.extra);
      });
      response.data.techsets = [lang, fw];
      setHomePage(response.data);
    });
  }, []);

  return (
    <div>
      {!homePage ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="section-primary border-bottom">
            <div className="title-home">Hi, I'm Antonin Islam</div>
            <div className="container">
              <MacNav />
              <IntroCard
                image={homePage.pageInfo.img_path}
                headerTitle={homePage.pageInfo.header_title}
                headerBody={homePage.pageInfo.header_body}
              />
            </div>
          </div>
          <div className="section-secondary border-bottom">
            <div className="container">
              <Summary
                mainTitle={homePage.pageInfo.main_title}
                mainBody={homePage.pageInfo.main_body}
                extraTitle={homePage.pageInfo.extra_title}
                extraBody={homePage.pageInfo.extra_body}
                techsets={homePage.techsets}
                btnLink={resumeUrl}
                finderLinks={homePage.finderLinks}
              />
            </div>
          </div>
        </div>
      )}
      <div className="section-primary">
        <div className="title-lg text-center">My Past Projects</div>
        <div className="container">
          <div className="projectCard-wrapper">
            {!projects ? (
              <CustomLoader />
            ) : (
              <div>
                <Carousel breakPoints={breakPoints} isRTL={false}>
                  {projects.map((project: Iproject) => (
                    <div key={project.id}>
                      <Link to={`/projects/${project.id}`}>
                        <ProjectCard
                          title={project.header_title}
                          body={project.header_body}
                          image={project.img_path}
                          tags={project.tags}
                        />
                      </Link>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// const hostname = "https://portfolio.api.antoninislam.com";
const hostname = "http://localhost:7000";
const homePageUrl: string = `${hostname}/api/pageinfo/defaultPage`;
const projectsUrl: string = `${hostname}/api/projects`;
const resumeUrl: string = `${hostname}/uploads/resume.pdf`;
const iconsUrl: string = `${hostname}/uploads/icons/`;
const contactActionUrl: string = `${hostname}/api/contacts/create`;
const loginActionUrl: string = `${hostname}/api/login`;
const sidebarInfoUrl: string = `${hostname}/api/pageinfo/sldebarInfo`;
const pagesUpdateUrl: string = `${hostname}/api/pages/update`;

export {
  homePageUrl,
  projectsUrl,
  resumeUrl,
  iconsUrl,
  contactActionUrl,
  loginActionUrl,
  sidebarInfoUrl,
  pagesUpdateUrl
};

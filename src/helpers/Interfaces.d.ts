interface IpageInfo {
  id: string;
  header_title: string;
  header_body: string;
  img_path: string;
  main_title: string;
  main_body: string;
  extra_title: string;
  extra_body: string;
  tags?: string[];
}

interface IfinderLink {
  id: string;
  icon: string;
  link: string;
}

interface Itechset {
  id: string;
  name: string;
  extra?: string;
}

interface IhomePage {
  pageInfo: IpageInfo;
  finderLinks: IfinderLink[];
  techsets: [string[]];
}

interface Iproject {
  id: string;
  page_id: string;
  tags: string[];
  header_title: string;
  header_body: string;
  img_path: string;
}

interface Iimage {
  id: string;
  page_id: string;
  path: string;
  title: string;
  description?: string;
}

interface IprojectFull {
  pageInfo: IpageInfo;
  finderLinks: IfinderLink[];
  techsets: [string[]];
  images: Iimage[];
}

interface IformNames {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  username?: string;
  password?: string;
}

interface Iauth {
  isAuth: boolean;
  username: string;
  type: string;
}

export {
  IpageInfo,
  IfinderLink,
  Itechset,
  IhomePage,
  Iproject,
  IprojectFull,
  IformNames,
  Iauth,
};

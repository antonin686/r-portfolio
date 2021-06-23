import { FaHome, FaStar, FaProductHunt } from "react-icons/fa";
import { BsEnvelopeOpenFill } from "react-icons/bs";

const items = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    link: "/admin/dashboard",
    match: "dashboard",
    value: false,
  },
  {
    title: "Home Page",
    icon: <FaStar />,
    link: "/admin/home-page",
    match: "home-page",
    value: false,
  },
  {
    title: "Projects",
    icon: <FaProductHunt />,
    link: "/admin/projects",
    match: "projects",
    value: false,
  },
  {
    title: "Contacts",
    icon: <BsEnvelopeOpenFill />,
    link: "/admin/contacts",
    match: "contacts",
    value: true,
  },
];

export default items;

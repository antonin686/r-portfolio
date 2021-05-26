import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import getItems from "./../helpers/SidebarItems";
import { sidebarInfoUrl } from "./../helpers/ApiLinks";

function Sidebar() {
  const location = useLocation();
  const paths = location.pathname.split("/");
  const fItems = getItems;
  const [items, setItems] = useState(fItems);

  useEffect(() => {
    axios.get(sidebarInfoUrl).then((response) => {
      const updatedItems = [...fItems];
      updatedItems.forEach((item) => {      
        if (item.match === "contacts") item.value = response.data.contacts;
      });
      setItems(updatedItems);
    });
  }, [fItems]);

  return (
    <div className="sidebar shadow">
      {items &&
        items.map((item) => (
          <Link
            key={item.match}
            to={item.link}
            className={
              paths[2] === item.match ? "sidebar-item active" : "sidebar-item"
            }
          >
            <div className="flex">
              <div className="sidebar-icon">{item.icon}</div> {item.title}
            </div>
            {item.value && <div className="pill">{item.value}</div>}
          </Link>
        ))}
    </div>
  );
}

export default Sidebar;

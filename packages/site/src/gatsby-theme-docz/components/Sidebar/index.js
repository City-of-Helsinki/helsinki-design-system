/** @jsx jsx */
import React, { useState, useRef, useEffect } from "react";
import { Global } from "@emotion/core";
import { jsx, Box } from "theme-ui";
import { useMenus, useCurrentDoc } from "docz";
import { Link } from "gatsby";

import * as styles from "gatsby-theme-docz/src/components/Sidebar/styles";
import { NavSearch } from "gatsby-theme-docz/src/components/NavSearch";
import { NavLink } from "gatsby-theme-docz/src/components/NavLink";
import { NavGroup } from "gatsby-theme-docz/src/components/NavGroup";
import logo from "../../assets/logo.png";

export const Sidebar = React.forwardRef((props, ref) => {
  const [query, setQuery] = useState("");
  const menus = useMenus({ query });
  const currentDoc = useCurrentDoc();
  const currentDocRef = useRef();
  const handleChange = ev => {
    setQuery(ev.target.value);
  };
  useEffect(() => {
    if (ref.current && currentDocRef.current) {
      ref.current.scrollTo(0, currentDocRef.current.offsetTop);
    }
  });
  return (
    <>
      <Box onClick={props.onClick} sx={styles.overlay(props)}>
        {props.open && <Global styles={styles.global} />}
      </Box>
      <Box ref={ref} sx={styles.wrapper(props)} data-testid="sidebar">
        <div
          style={{
            textAlign: "center",
            fontSize: "0.9em",
            marginBottom: "2em"
          }}
        >
          <Link
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none"
            }}
          >
            <img src={logo} alt="Helsinki Design System" height="60" />
            <div>Design System</div>
          </Link>
        </div>
        <NavSearch
          placeholder="Type to search..."
          value={query}
          onChange={handleChange}
        />
        {menus &&
          menus.map(menu => {
            if (!menu.route)
              return <NavGroup key={menu.id} item={menu} sidebarRef={ref} />;
            if (menu.route === currentDoc.route) {
              return (
                <NavLink key={menu.id} item={menu} ref={currentDocRef}>
                  {menu.name}
                </NavLink>
              );
            }
            return (
              <NavLink key={menu.id} item={menu}>
                {menu.name}
              </NavLink>
            );
          })}
      </Box>
    </>
  );
});

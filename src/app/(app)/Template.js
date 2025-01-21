"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";

const Template = ({ children, header }) => {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (path) => {
    setExpandedMenus((prev) => {
      // If clicking the same menu that's already open, just toggle it
      if (prev[path]) {
        return {
          [path]: false,
        };
      }

      // If clicking a different menu, close all others and open this one
      return {
        [path]: true,
      };
    });
  };

  // Helper function to check if a path is active
  const isPathActive = (path) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  // Helper function to check if menu should be expanded
  const isMenuExpanded = (path) => {
    return expandedMenus[path] || pathname.startsWith(path);
  };

  return (
    <div className={`main-wrapper ${isMenuOpen ? "menu-toggle" : ""}`}>
      <div className="nav-header ">
        <a href="/dashboard" className="brand-logo" aria-label="Gymove">
          <Image
            className="logo-abbr"
            src="/assets/PMSLOGO.png"
            alt="logo"
            width={500}
            height={500}
            priority
          />
          <Image
            className="logo-compact"
            src="/assets/PMSTEXT.png"
            alt="logo"
            width={500}
            height={500}
            priority
          />
          <Image
            className="brand-title"
            src="/assets/PMSTEXT.png"
            alt="logo"
            width={500}
            height={500}
            priority
          />
        </a>

        <div className="nav-control" onClick={toggleMenu}>
          <div className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>

      <div className="header position-sticky">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="navbar-collapse justify-content-between">
              <div className="header-left">
                <div className="dashboard_bar">
                  PMS | Purchasing Management System
                </div>
              </div>
              <ul className="navbar-nav header-right">
                <li className="nav-item">
                  <form>
                    <div className="input-group search-area d-lg-inline-flex d-none me-3">
                      <span className="input-group-text" id="header-search">
                        <button
                          className="bg-transparent border-0"
                          type="button"
                          aria-label="header-search"
                        >
                          <i className="flaticon-381-search-2"></i>
                        </button>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search here"
                        aria-label="Username"
                        aria-describedby="header-search"
                      />
                    </div>
                  </form>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link  ai-icon"
                    aria-label="bell"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z"
                        fill="#0B2A97"
                      />
                    </svg>
                    <div className="pulse-css"></div>
                  </a>
                  <div className="dropdown-menu rounded dropdown-menu-end">
                    <div
                      id="DZ_W_Notification1"
                      className="widget-media dz-scroll p-3 height380"
                    >
                      <ul className="timeline">
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              {/* <img alt="image" width="50" src="images/avatar/1.jpg"> */}
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Dr sultads Send you Photo
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-info">KG</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Resport created successfully
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-success">
                              <i className="fa fa-home"></i>
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Reminder : Treatment Time!
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <a className="all-notification">
                      See all notifications <i className="ti-arrow-right"></i>
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown header-profile">
                  <a
                    className="nav-link"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <Image
                      src="/assets/images/profile/17.jpg"
                      width={20}
                      height={20}
                      alt="profile"
                      priority
                    />
                    <div className="header-info">
                      <span className="text-black">
                        <strong>Peter Parkur</strong>
                      </span>
                      <p className="fs-12 mb-0">Super Admin</p>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a
                      href="app-profile.html"
                      className="dropdown-item ai-icon"
                    >
                      <span className="ms-2">Profile </span>
                    </a>
                    <button onClick={logout} className="dropdown-item ai-icon">
                      <span className="ms-2">Logout </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            <li className={isPathActive("/dashboard") ? "mm-active" : ""}>
              <a
                className="has-arrow ai-icon"
                onClick={() => toggleSubmenu("/dashboard")}
                style={{ cursor: "pointer" }}
              >
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </a>
              <ul
                aria-expanded={isMenuExpanded("/dashboard")}
                className={`mm-collapse ${
                  isMenuExpanded("/dashboard") ? "mm-show" : ""
                }`}
              >
                <li>
                  <Link
                    href="/dashboard"
                    className={pathname === "/dashboard" ? "mm-active" : ""}
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </li>
            <li className={isPathActive("/user-list") ? "mm-active" : ""}>
              <a
                className="has-arrow ai-icon"
                onClick={() => toggleSubmenu("/user-list")}
                style={{ cursor: "pointer" }}
              >
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">User Management</span>
              </a>
              <ul
                aria-expanded={isMenuExpanded("/user-list")}
                className={`mm-collapse ${
                  isMenuExpanded("/user-list") ? "mm-show" : ""
                }`}
              >
                <li>
                  <Link
                    href="/user-list"
                    className={pathname === "/user-list" ? "mm-active" : ""}
                  >
                    User List
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-body default-height">
        <div className="container-fluid">
          <div className="row">{children}</div>
        </div>
      </div>
      <footer className="footer">
        <div className="copyright">
          <p>PMS | Purchasing Management System 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Template;

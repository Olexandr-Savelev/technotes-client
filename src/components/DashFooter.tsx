import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const DashFooter: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClick = () => {
    navigate("/dash");
  };

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClick}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current user:</p>
      <p>Status:</p>
    </footer>
  );
  return content;
};

export default DashFooter;

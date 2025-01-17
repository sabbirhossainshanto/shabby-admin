import { useEffect, useState } from "react";
import BannerModal from "./BannerModal";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const modal = JSON.parse(localStorage.getItem("adminModal"));
  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("hasAdminModalBeenShown");
    if (!hasModalBeenShown) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("hasAdminModalBeenShown", "true");
  };
  return (
    <footer data-v-b00d14ae="" className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">© Copyright 2023. All Rights Reserved.</div>
          <div className="col-sm-6">
            <div className="text-sm-right d-none d-sm-block"></div>
          </div>
        </div>
      </div>
      {showModal && <BannerModal modal={modal} closeModal={closeModal} />}
    </footer>
  );
};

export default Footer;

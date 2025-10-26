import { Mail, Phone } from "@mui/icons-material";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { TopNavSkeleton, TopNavSkeletonMobile } from "../Loader/SkeletonLoader";

const TopNav = ({ showTopNav }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { companys, loading } = useSelector((state) => state.company);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add minimum loading time to prevent flickering
    if (!loading && companys?.length > 0) {
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [loading, companys]);

  if (!showTopNav) return null;

  // Show skeleton loader while loading
  if (!isLoaded || loading || !companys?.length) {
    return isMobile ? <TopNavSkeletonMobile /> : <TopNavSkeleton />;
  }

  return (
    <nav className="wapper-header">
      {companys.map((com) => (
        <div className="nav" key={com._id}>
          <div className="nav-div">
            <ul className="nav-ul">
              {com.phone && (
                <li className="nav-li">
                  <Phone />
                  <span className="nav-span">{com.phone}</span>
                </li>
              )}
              {com.email && (
                <li className="nav-li">
                  <Mail />
                  <span className="nav-span">{com.email}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="social-div">
            <ul className="social-media">
              {com.facebook && (
                <li className="link">
                  <a
                    href={com.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook style={{ fontSize: "1rem" }} />
                  </a>
                </li>
              )}
              {com.instagram && (
                <li className="link">
                  <a
                    href={com.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram style={{ fontSize: "1rem" }} />
                  </a>
                </li>
              )}
              {com.twitter && (
                <li className="link">
                  <a
                    href={com.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <FaTiktok style={{ fontSize: "1rem" }} />
                  </a>
                </li>
              )}
              {com.linkedin && (
                <li className="link">
                  <a
                    href={com.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <FaYoutube style={{ fontSize: "1rem" }} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default TopNav;

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>
            {t("home")}
          </Link>
        </li>
       
        <li>
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            Shop
          </Link>
        </li>

        {/* Top Categories */}
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/top-categories"}>
            Top Categories
          </Link>
          <ul className="sub-menu">
            {/* Bras */}
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/bras"}>
                Bras
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/bras/air-bra"}>
                    Air Bra
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/bras/sports-bra"}>
                    Sports Bra
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/bras/padded-bra"}>
                    Padded Bra
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/bras/nursing-bra"}>
                    Nursing Bra
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/bras/strapless-bra"}>
                    Strapless Bra
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/bras/cotton-net-bra"}>
                    Cotton & Net Bra
                  </Link>
                </li>
              </ul>
            </li>
            
            {/* Lingerie */}
            <li>
              <Link to={process.env.PUBLIC_URL + "/lingerie"}>
                Lingerie
              </Link>
            </li>
            
            {/* Nightwear */}
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/nightwear"}>
                Nightwear
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/nightwear/nighties"}>
                    Nighties
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/nightwear/bold-wear"}>
                    Bold Wear
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/nightwear/night-suits"}>
                    Night Suits
                  </Link>
                </li>
              </ul>
            </li>
            
            {/* Panties */}
            <li>
              <Link to={process.env.PUBLIC_URL + "/panties"}>
                Panties
              </Link>
            </li>
          </ul>
        </li>

        {/* Other Categories */}
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/categories"}>
            Categories
          </Link>
          <ul className="sub-menu">
            {/* Undergarments */}
            <li>
              <Link to={process.env.PUBLIC_URL + "/undergarments"}>
                Undergarments
              </Link>
            </li>
            
            {/* Stockings */}
            <li>
              <Link to={process.env.PUBLIC_URL + "/stockings"}>
                Stockings
              </Link>
            </li>
            
            {/* Tops */}
            <li>
              <Link to={process.env.PUBLIC_URL + "/tops"}>
                Tops
              </Link>
            </li>
          </ul>
        </li>

        {/* Other Pages */}
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>
            Pages
          </Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/about"}>
                {t("about_us")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/contact"}>
                {t("contact_us")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/cart"}>
                {t("cart")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/checkout"}>
                {t("checkout")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                {t("wishlist")}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/compare"}>
                {t("compare")}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;


import { useState, useEffect } from "react";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivalProducts } from "../../../redux/slices/productSlices";
import { useNavigate } from "react-router-dom";
import { ProductCardSkeleton } from "../../../Components/Loader/SkeletonLoader";

// Custom Arrows for the main slider
const NextArrow = ({ onClick }) => (
  <button className="arrow next" onClick={onClick}>
    <ArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="arrow prev" onClick={onClick}>
    <ArrowLeft />
  </button>
);

// Custom Arrows for the inner color slider
const CustomNextArrow = ({ onClick }) => (
  <button className="custom-arrow next" onClick={onClick}>
    <ArrowForwardIos />
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button className="custom-arrow prev" onClick={onClick}>
    <ArrowBackIos />
  </button>
);

const NewArrivalProduct = () => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error, selectedColor } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchNewArrivalProducts(selectedColor));
  }, [dispatch, selectedColor]);

  useEffect(() => {
    // Minimum loading time to prevent flickering
    if (!loading && products?.length > 0) {
      const timer = setTimeout(() => setIsLoaded(true), 400);
      return () => clearTimeout(timer);
    }
  }, [loading, products]);

  // Settings for the main product slider
  const mainSliderSettings = {
    dots: true,
    infinite: products?.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // Settings for the inner color slider
  const colorSliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const navigateLink = (productId, image) => {
    window.scrollTo(0, 0);
    navigate(`/product-details/${productId}?selectedImage=${encodeURIComponent(image)}`);
  };

  const getDefaultImage = (product) => {
    return product.colors?.[0]?.photos?.[0]?.url || "https://via.placeholder.com/50";
  };

  const getVariantImage = (color) => {
    return color.photos?.[0]?.url || "https://via.placeholder.com/50";
  };

  const handleColorHover = (productId, colorVariant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: colorVariant,
    }));
  };

  if (error) {
    return (
      <section className="arrival-section">
        <p style={{ textAlign: "center", color: "red", padding: "40px" }}>
          Error loading products: {error}
        </p>
      </section>
    );
  }

  return (
    <section className="arrival-section">
      <h1>{`What's`} new this week.</h1>
      <div className="bar"></div>

      {!isLoaded || loading ? (
        <div className="slider-container" style={{ padding: "20px 0" }}>
          <ProductCardSkeleton count={4} />
        </div>
      ) : (
        <>
          <div className="slider-container">
            <Slider {...mainSliderSettings}>
              {products.map((product) => {
                const defaultImg = getDefaultImage(product);
                const variant = selectedVariants[product._id] || {
                  photos: [{ url: defaultImg }],
                };
                const mainImage = variant.photos[0].url;
                return (
                  <div key={product._id} className="product-card">
                    <div
                      className="image-container"
                      onClick={() => navigateLink(product._id, mainImage)}
                    >
                      <img src={mainImage} alt={product.name} loading="lazy" />
                    </div>

                    {product.colors && product.colors.length > 0 && (
                      <div className="colors">
                        <Slider {...colorSliderSettings}>
                          {product.colors.map((color, index) => {
                            const variantImg = getVariantImage(color);
                            return (
                              <div key={index} className="color-slide">
                                <img
                                  src={color.colorImage?.url || variantImg}
                                  alt={color.colorName || `Color ${index + 1}`}
                                  className="color"
                                  onMouseEnter={() =>
                                    handleColorHover(product._id, color)
                                  }
                                  onClick={() =>
                                    navigateLink(product._id, variantImg)
                                  }
                                  loading="lazy"
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    )}

                    <div className="details">
                      <h3>{product.name}</h3>
                      <span className="span">
                        <p className="price">${product.price.toFixed(2)}</p>
                      </span>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="button-div">
            <button className="button" onClick={() => navigate("/products")}>
              SHOP {"WHAT'S"} NEW
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default NewArrivalProduct;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchThirdBanners } from "../../../redux/slices/thirdBannerSlices";
import { useNavigate } from "react-router-dom";
import { ThirdBannerSkeleton } from "../../../Components/Loader/SkeletonLoader";

const ThirdBanner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const { thirdBanners, loading } = useSelector((state) => state.thirdbanners);

    useEffect(() => {
        dispatch(fetchThirdBanners());
    }, [dispatch]);

    useEffect(() => {
        if (!loading && thirdBanners?.length > 0) {
            const timer = setTimeout(() => setIsLoaded(true), 300);
            return () => clearTimeout(timer);
        }
    }, [loading, thirdBanners]);

    const HandleUrl = () => {
        navigate("/products");
    };

    if (!isLoaded || loading || !thirdBanners?.length) {
        return <ThirdBannerSkeleton />;
    }

    return (
        <section className="third-banner">
            {thirdBanners.map((banner) => (
                <div key={banner._id}>
                    <div className="container">
                        <img src={banner.photos[0]?.url} alt="banner" loading="lazy" />

                        <div className="new-to-website">
                            <div className="row">
                                <div>
                                    <h2>New to the website?</h2>
                                </div>

                                <div>
                                    <h2>Get familiar, get inspired, and get moving.</h2>
                                </div>

                                <div>
                                    <button onClick={HandleUrl}>Start Here</button>
                                </div>
                            </div>
                        </div>

                        <img src={banner.photos[1]?.url} alt="banners" loading="lazy" />

                        <div className="img3">
                            <img src={banner.photos[2]?.url} alt="banners" loading="lazy" />
                            <div className="contents">
                                <h1>Essentially effortless.</h1>
                                <p>The Leather Alternative Mini Bag - storage and style for everywhere you go.</p>
                                <button onClick={HandleUrl}>Shop bags</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ThirdBanner;

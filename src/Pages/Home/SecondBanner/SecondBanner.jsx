import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSecondBanners } from "../../../redux/slices/secondBannerSlices";
import { useNavigate } from "react-router-dom";
import { SecondBannerSkeleton } from "../../../Components/Loader/SkeletonLoader";



const SecondBanner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const { banners, loading } = useSelector((state) => state.secondBanner);


    useEffect(() => {
        dispatch(fetchSecondBanners())
    }, [dispatch])


    useEffect(() => {
        if (!loading && banners?.length > 0) {
            const timer = setTimeout(() => setIsLoaded(true), 300);
            return () => clearTimeout(timer);
        }
    }, [loading, banners]);

    const HandleUrl = () => {
        navigate("/products");
    };

    if (!isLoaded || loading || !banners?.length) {
        return <SecondBannerSkeleton />;
    }

    return (
        <>
            <section className="second-banner">
                {banners.map((banner) => (
                    <>
                        <h1>{banner.headingOne}</h1>
                        <div className="second-container">

                            <div className="second-img-one">
                                <img src={banner.photos[0]?.url} alt="Banner" />
                                <div className="content-one">
                                    <h1>Break the rules.</h1>
                                    <p>Meet Daydrift™, a tailored trouser that stretches the imagination.</p>

                                    <div className="content-button">
                                        <button onClick={HandleUrl}>Shop pants</button>
                                        <button onClick={HandleUrl}>Shop Daydrift™ Trousers</button>
                                    </div>
                                </div>
                            </div>

                            <div className="second-img-one">
                                <img src={banner.photos[1]?.url} alt="Banner" />
                                <div className="content-one">
                                    <h1>Practically unstoppable.</h1>
                                    <p>In these soft, stretchy layers, you’re comfortable enough to do almost anything.</p>

                                    <div className="content-button">
                                        <button onClick={HandleUrl}>Shop Spring Preview</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                ))}

            </section>
        </>
    )
}

export default SecondBanner










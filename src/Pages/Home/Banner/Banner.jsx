import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBanners } from "../../../redux/slices/bannerSlices";
import { fetchBannerss } from "../../../redux/slices/bannersSlices";
import { BannerSkeleton } from "../../../Components/Loader/SkeletonLoader";

const Banner = () => {
    const dispatch = useDispatch();
    const { banners: bannerss, loading } = useSelector((state) => state.bannerss);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchBanners());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBannerss());
    }, [dispatch]);

    useEffect(() => {
        // Minimum loading time to prevent flickering
        if (!loading && bannerss?.length > 0) {
            const timer = setTimeout(() => setIsLoaded(true), 300);
            return () => clearTimeout(timer);
        }
    }, [loading, bannerss]);

    if (!isLoaded || loading || !bannerss?.length) {
        return <BannerSkeleton />;
    }

    return (
        <section className="banner-section">
            <div className="banner-container">
                <div className="banner-image">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={bannerss.length > 1}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        speed={800}
                    >
                        {bannerss.flatMap((banner) =>
                            banner.photos.map((photo) => (
                                <SwiperSlide key={photo._id}>
                                    <img
                                        src={photo.url}
                                        alt={`Banner ${photo._id}`}
                                        className="banner-img"
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Banner;

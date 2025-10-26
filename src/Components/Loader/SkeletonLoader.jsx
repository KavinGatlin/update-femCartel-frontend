import { Skeleton, Box } from "@mui/material";

// Banner Skeleton
export const BannerSkeleton = () => (
    <Box className="banner-section" sx={{ width: "100%", height: { xs: "300px", md: "500px" } }}>
        <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{ borderRadius: "8px" }}
        />
    </Box>
);


export const HeaderSkeleton = () => (
    <Box>
        {/* Top Nav Skeleton */}
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                padding: "8px 0",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Box
                sx={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Skeleton variant="text" width={100} height={20} animation="wave" />
                <Skeleton variant="text" width={100} height={20} animation="wave" />
                <Skeleton variant="text" width={100} height={20} animation="wave" />
            </Box>
        </Box>

        {/* Main Header Skeleton */}
        <Box
            sx={{
                padding: "20px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            {/* Logo Skeleton */}
            <Skeleton
                variant="rectangular"
                width={120}
                height={50}
                animation="wave"
                sx={{ borderRadius: "4px" }}
            />

            {/* Navigation Items Skeleton */}
            <Box sx={{ display: "flex", gap: 3, flex: 1, justifyContent: "center" }}>
                {[...Array(5)].map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="text"
                        width={80}
                        height={30}
                        animation="wave"
                    />
                ))}
            </Box>

            {/* Icon Section Skeleton */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Skeleton variant="circular" width={40} height={40} animation="wave" />
                <Skeleton variant="circular" width={40} height={40} animation="wave" />
                <Skeleton variant="circular" width={40} height={40} animation="wave" />
            </Box>
        </Box>
    </Box>
);

// Header Skeleton - Mobile
export const HeaderSkeletonMobile = () => (
    <Box>
        {/* Top Nav Skeleton */}
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                padding: "8px 0",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                }}
            >
                <Skeleton variant="text" width={80} height={18} animation="wave" />
                <Skeleton variant="text" width={80} height={18} animation="wave" />
            </Box>
        </Box>

        {/* Main Header Skeleton */}
        <Box
            sx={{
                padding: "15px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            {/* Logo Skeleton */}
            <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                animation="wave"
                sx={{ borderRadius: "4px" }}
            />

            {/* Icons Section Skeleton */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Skeleton variant="circular" width={35} height={35} animation="wave" />
                <Skeleton variant="circular" width={35} height={35} animation="wave" />
                <Skeleton variant="circular" width={35} height={35} animation="wave" />
                <Skeleton variant="rectangular" width={35} height={35} animation="wave" />
            </Box>
        </Box>
    </Box>
);

// Logo Only Skeleton (for faster partial loading)
export const LogoSkeleton = () => (
    <Skeleton
        variant="rectangular"
        width={120}
        height={50}
        animation="wave"
        sx={{ borderRadius: "4px" }}
    />
);

// Navigation Items Skeleton
export const NavItemsSkeleton = ({ count = 5 }) => (
    <Box sx={{ display: "flex", gap: 3 }}>
        {[...Array(count)].map((_, index) => (
            <Skeleton
                key={index}
                variant="text"
                width={80}
                height={30}
                animation="wave"
            />
        ))}
    </Box>
);



// Product Card Skeleton
export const ProductCardSkeleton = ({ count = 4 }) => (
    <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        {[...Array(count)].map((_, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: "250px" }}>
                <Skeleton
                    variant="rectangular"
                    height={350}
                    animation="wave"
                    sx={{ borderRadius: "8px", mb: 1 }}
                />
                <Box sx={{ display: "flex", gap: 1, my: 1 }}>
                    {[...Array(5)].map((_, i) => (
                        <Skeleton
                            key={i}
                            variant="circular"
                            width={40}
                            height={40}
                            animation="wave"
                        />
                    ))}
                </Box>
                <Skeleton variant="text" height={30} width="80%" animation="wave" />
                <Skeleton variant="text" height={25} width="40%" animation="wave" />
            </Box>
        ))}
    </Box>
);

// Category Card Skeleton
export const CategoryCardSkeleton = ({ count = 5 }) => (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
        {[...Array(count)].map((_, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
                <Skeleton
                    variant="rectangular"
                    width={200}
                    height={200}
                    animation="wave"
                    sx={{ borderRadius: "8px", mb: 1 }}
                />
                <Skeleton variant="text" height={25} width={150} animation="wave" sx={{ margin: "0 auto" }} />
            </Box>
        ))}
    </Box>
);

// Second Banner Skeleton
export const SecondBannerSkeleton = () => (
    <Box className="second-banner" sx={{ padding: "40px 20px" }}>
        <Skeleton variant="text" height={50} width={300} animation="wave" sx={{ margin: "0 auto 30px" }} />
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
            <Box sx={{ flex: 1 }}>
                <Skeleton
                    variant="rectangular"
                    height={400}
                    animation="wave"
                    sx={{ borderRadius: "8px", mb: 2 }}
                />
                <Skeleton variant="text" height={30} width="60%" animation="wave" />
                <Skeleton variant="text" height={20} width="80%" animation="wave" />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Skeleton variant="rectangular" width={120} height={40} animation="wave" sx={{ borderRadius: "4px" }} />
                    <Skeleton variant="rectangular" width={180} height={40} animation="wave" sx={{ borderRadius: "4px" }} />
                </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Skeleton
                    variant="rectangular"
                    height={400}
                    animation="wave"
                    sx={{ borderRadius: "8px", mb: 2 }}
                />
                <Skeleton variant="text" height={30} width="60%" animation="wave" />
                <Skeleton variant="text" height={20} width="80%" animation="wave" />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Skeleton variant="rectangular" width={150} height={40} animation="wave" sx={{ borderRadius: "4px" }} />
                </Box>
            </Box>
        </Box>
    </Box>
);

// Third Banner Skeleton
export const ThirdBannerSkeleton = () => (
    <Box className="third-banner" sx={{ padding: "40px 20px" }}>
        <Skeleton
            variant="rectangular"
            height={300}
            animation="wave"
            sx={{ borderRadius: "8px", mb: 3 }}
        />
        <Box sx={{ textAlign: "center", my: 4 }}>
            <Skeleton variant="text" height={40} width={300} animation="wave" sx={{ margin: "0 auto" }} />
            <Skeleton variant="text" height={30} width={400} animation="wave" sx={{ margin: "10px auto" }} />
            <Skeleton variant="rectangular" width={150} height={45} animation="wave" sx={{ margin: "20px auto", borderRadius: "4px" }} />
        </Box>
        <Skeleton
            variant="rectangular"
            height={300}
            animation="wave"
            sx={{ borderRadius: "8px", mb: 3 }}
        />
        <Box sx={{ position: "relative" }}>
            <Skeleton
                variant="rectangular"
                height={400}
                animation="wave"
                sx={{ borderRadius: "8px" }}
            />
            <Box sx={{ position: "absolute", bottom: 30, left: 30, right: 30 }}>
                <Skeleton variant="text" height={40} width="60%" animation="wave" />
                <Skeleton variant="text" height={25} width="80%" animation="wave" />
                <Skeleton variant="rectangular" width={120} height={40} animation="wave" sx={{ mt: 2, borderRadius: "4px" }} />
            </Box>
        </Box>
    </Box>
);


// TopNav Skeleton
export const TopNavSkeleton = () => (
    <Box
        sx={{
            backgroundColor: "#f5f5f5",
            padding: "8px 20px",
            borderBottom: "1px solid #e0e0e0",
        }}
    >
        <Box
            sx={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {/* Contact Info Skeleton */}
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="circular" width={20} height={20} animation="wave" />
                    <Skeleton variant="text" width={100} height={20} animation="wave" />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="circular" width={20} height={20} animation="wave" />
                    <Skeleton variant="text" width={150} height={20} animation="wave" />
                </Box>
            </Box>

            {/* Social Media Icons Skeleton */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                {[...Array(4)].map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="circular"
                        width={24}
                        height={24}
                        animation="wave"
                    />
                ))}
            </Box>
        </Box>
    </Box>
);

// TopNav Skeleton - Mobile Version
export const TopNavSkeletonMobile = () => (
    <Box
        sx={{
            backgroundColor: "#f5f5f5",
            padding: "8px 15px",
            borderBottom: "1px solid #e0e0e0",
        }}
    >
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
            }}
        >
            {/* Contact Info Skeleton */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Skeleton variant="circular" width={18} height={18} animation="wave" />
                    <Skeleton variant="text" width={80} height={18} animation="wave" />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Skeleton variant="circular" width={18} height={18} animation="wave" />
                    <Skeleton variant="text" width={120} height={18} animation="wave" />
                </Box>
            </Box>

            {/* Social Media Icons Skeleton */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {[...Array(4)].map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="circular"
                        width={22}
                        height={22}
                        animation="wave"
                    />
                ))}
            </Box>
        </Box>
    </Box>
);

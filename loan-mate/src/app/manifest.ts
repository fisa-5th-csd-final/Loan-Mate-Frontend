import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Loan Mate",
        short_name: "Loan Mate",
        description: "당신의 현명한 대출 관리 파트너",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
            {
                src: "/icon/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icon/maskable-icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}

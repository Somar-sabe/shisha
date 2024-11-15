'use client';
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import { DashboardAsideMenu } from "@/data/Menu";
import { UserLists } from "@/data/Users";

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const authInfo = useSelector((state) => state.auth);
    const isAuthenticated = authInfo && authInfo.userData; // Check if user data exists

    const pathname = usePathname();
    const split = pathname.split("/");
    const pageSlug = split[split.length - 1];

    // Redirect to sign-in if user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/sign-in");
        }
    }, [isAuthenticated, router]);

    // Don't render the dashboard layout if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return ( 
        <>
            <HeaderFive headerSlider />
            <main className="main-wrapper">
                <Breadcrumb activeItem="My Account" title="Explore All Products" />
                <div className="axil-dashboard-area axil-section-gap">
                    <div className="container">
                        <div className="axil-dashboard-warp">
                            <div className="row">
                                <div className="col-xl-3 col-md-4">
                                    <aside className="axil-dashboard-aside">
                                        <nav className="axil-dashboard-nav">
                                            <div className="nav nav-tabs">
                                                {DashboardAsideMenu.map((data, index) => (
                                                    <Link
                                                        href={`/dashboard/${data.slug}`} 
                                                        className={`nav-item nav-link ${data.slug === pageSlug ? "active" : ""}`} 
                                                        key={index}
                                                    >
                                                        <i className={data.icon} /> {data.name}
                                                    </Link>
                                                ))}
                                                <Link href="/sign-in" className="nav-item nav-link">
                                                    <i className="fal fa-sign-out" /> Logout
                                                </Link>
                                            </div>
                                        </nav>
                                    </aside>
                                </div>
                                <div className="col-xl-9 col-md-8">
                                    <div className="tab-content">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ServiceTwo />
            </main>
            <FooterTwo />
        </>
    );
}

export default DashboardLayout;

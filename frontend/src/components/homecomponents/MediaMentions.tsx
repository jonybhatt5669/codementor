import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Replace with your actual logo imports
import TechCrunch from "@/assets/svg/tech_crunch.svg";
import TNW from "@/assets/svg/tnw.svg";
import Forbes from "@/assets/svg/forbes.svg";
import Mashable from "@/assets/svg/mashable.svg";
import HackerNews from "@/assets/svg/hacker_news.svg";
import ProductHunt from "@/assets/svg/product_hunt.svg";

gsap.registerPlugin(ScrollTrigger);

export const MediaMentions = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logosRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(logosRef.current, { opacity: 0, y: 20 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 85%",
                end: "bottom 15%",
                onEnter: () => {
                    gsap.to(logosRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        stagger: 0.1
                    });
                },
                onLeave: () => {
                    gsap.to(logosRef.current, {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        ease: "power2.in"
                    });
                },
                onEnterBack: () => {
                    gsap.to(logosRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        stagger: 0.1
                    });
                },
                onLeaveBack: () => {
                    gsap.to(logosRef.current, {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        ease: "power2.in"
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const logos = [
        { src: TechCrunch, alt: "TechCrunch" },
        { src: TNW, alt: "The Next Web" },
        { src: Forbes, alt: "Forbes" },
        { src: Mashable, alt: "Mashable" },
        { src: HackerNews, alt: "Hacker News" },
        { src: ProductHunt, alt: "Product Hunt" }
    ];

    return (
        <section
            ref={containerRef}
            className="w-full bg-white py-10 px-6 md:px-12 lg:px-20"
        >
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {logos.map((logo, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) logosRef.current[i] = el;
                        }}
                        className="flex-shrink-0"
                    >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="h-6 object-contain opacity-30 hover:opacity-60 transition-opacity"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};
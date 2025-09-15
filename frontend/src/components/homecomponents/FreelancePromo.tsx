import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 👈 import plugin
import FreelanceImage from '@/assets/image/freelance-work.png'
import FindExpertSvg from "@/assets/svg/find_expert.svg"
import BuildFeatureSvg from '@/assets/svg/build-feature.svg'
import MVPSvg from '@/assets/svg/idea_mvp.svg'

gsap.registerPlugin(ScrollTrigger); // 👈 register plugin

export const FreelancePromo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const listItemsRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline for animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",   // when section enters viewport
                    end: "bottom 20%",  // when it leaves
                    toggleActions: "play reverse play reverse",
                    // play when enter, reverse when leave
                    markers: false, // 👈 set true for debugging
                }
            });

            tl.from(headingRef.current, {
                y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
            })
                .from(listItemsRef.current?.children || [], {
                    x: -20, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.15,
                }, "-=0.4")
                .from(buttonRef.current, {
                    y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
                }, "-=0.3")
                .from(imageRef.current, {
                    scale: 0.9, opacity: 0, duration: 0.8, ease: "power3.out",
                }, "-=0.6");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full bg-white px-6 md:px-12 lg:px-20 py-12 flex flex-col-reverse md:flex-row items-center justify-center gap-10"
        >

            {/* Text Content */}
            <div className=" text-center md:text-left">
                <h1
                    ref={headingRef}
                    className="font-bold text-gray-900 leading-tight text-[clamp(1.75rem,4vw,3rem)]"
                >
                    Project-based  <span className="text-red-500">Freelance</span> <br /> work
                </h1>

                <ul
                    ref={listItemsRef}
                    className="mt-6 space-y-3 text-gray-700 text-[clamp(0.95rem,1.5vw,1.125rem)]"
                >
                    <li className="flex items-center gap-2">
                        <img src={FindExpertSvg} alt="debug icon" className="w-5 h-5" />
                        Find experts for on-demand code review
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={BuildFeatureSvg} alt="personalize icon" className="w-5 h-5" />
                        Build features for your existing product
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={MVPSvg} alt="answers icon" className="w-5 h-5" />
                        Turn your idea into an MVP
                    </li>
                </ul>

                <button
                    ref={buttonRef}
                    className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                >
                    Find a freelancer
                </button>
            </div>
            {/* Illustration */}
            <div ref={imageRef} className="flex justify-center max-w-lg">
                <picture>
                    <img
                        src={FreelanceImage}
                        alt="Mentorship Illustration"
                        className="size-auto"
                    />
                </picture>
            </div>

        </section>
    );
};

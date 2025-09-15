import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Example imports — replace with your actual image paths
import TechImage from "@/assets/image/variety-of-technologies.png";
import ExpertImage from "@/assets/image/code-help.png";
import SetupImage from "@/assets/image/effortless-setup.png";

gsap.registerPlugin(ScrollTrigger);

export const YouFind = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hide initially
            gsap.set([headingRef.current, cardsRef.current], { opacity: 0, y: 40 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => {
                    gsap.to(headingRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                    gsap.to(cardsRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.2,
                        delay: 0.2
                    });
                },
                onLeave: () => {
                    gsap.to([headingRef.current, cardsRef.current], {
                        opacity: 0,
                        y: 40,
                        duration: 0.5,
                        ease: "power2.in"
                    });
                },
                onEnterBack: () => {
                    gsap.to(headingRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                    gsap.to(cardsRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.2,
                        delay: 0.2
                    });
                },
                onLeaveBack: () => {
                    gsap.to([headingRef.current, cardsRef.current], {
                        opacity: 0,
                        y: 40,
                        duration: 0.5,
                        ease: "power2.in"
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            img: TechImage,
            title: "A variety of technologies",
            desc: "Codementor developers cover a range of technologies, including JavaScript, React, and Swift."
        },
        {
            img: ExpertImage,
            title: "Code help from experts",
            desc: "All developers go through a strict application and vetting process to ensure only the best are available."
        },
        {
            img: SetupImage,
            title: "Effortless setup",
            desc: "Connect with a developer quickly with easy setup and billing."
        }
    ];

    return (
        <section
            ref={containerRef}
            className="w-full bg-white px-6 md:px-12 lg:px-20 py-16"
        >
            <h2
                ref={headingRef}
                className="text-center font-bold text-gray-900 text-[clamp(1.75rem,4vw,2.5rem)] mb-12"
            >
                What you'll find on <span className="text-red-500">Codementor</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) cardsRef.current[i] = el;
                        }}
                        className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                    >
                        <img
                            src={feature.img}
                            alt={feature.title}
                            className="w-24 h-24 object-contain mb-4"
                        />
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
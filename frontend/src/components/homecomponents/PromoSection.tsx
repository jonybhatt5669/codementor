import {useEffect, useRef} from "react";
import gsap from "gsap"
import Hero from '@/assets/image/hero-large.png'
import SmallHero from '@/assets/image/hero-small.png'

export const PromoSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 40, opacity: 0, delay: 0.6, duration: 0.8, ease: "power3.out",
            });
            gsap.from(buttonRef.current, {
                y: 20, opacity: 0, delay: 0.7, duration: 0.6, ease: "power3.out",
            });
            gsap.from(imageRef.current, {
                scale: 0.9, opacity: 0, delay: 0.8, duration: 0.8, ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (<section
            ref={containerRef}
            className="w-full bg-white px-6 md:px-12 lg:px-20 py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-10"
        >
            {/* Text Content */}
            <div ref={textRef} className="flex-1 text-center md:text-left">
                <h1
                    className="font-bold text-gray-900 leading-tight text-[clamp(1.75rem,4vw,3rem)]"
                >
                    Find a developer for{" "}
                    <span className="text-red-500">live programming help</span> & freelance jobs
                </h1>
                <p
                    className="mt-4 text-gray-600 max-w-lg mx-auto md:mx-0 text-[clamp(0.9rem,1.5vw,1.125rem)]"
                >
                    Connect instantly with skilled developers for real-time coding assistance or hire for your next big
                    project.
                </p>
                <button
                    ref={buttonRef}
                    className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                >
                    Get help now
                </button>
            </div>


            {/* Illustration */}
            <div
                ref={imageRef}
                className="flex-1 flex justify-center md:justify-end"
            >
                <picture>
                    <source srcSet={SmallHero} media={"(max-width: 768px)"}/>

                    <img
                        src={Hero}
                        alt="hero"
                        className="size-auto"
                    />
                </picture>
            </div>
        </section>);
};
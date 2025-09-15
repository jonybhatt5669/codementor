import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-neutral-950 text-neutral-200">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20 py-12">
                {/* Top: Columns */}
                <div className="grid gap-10 md:grid-cols-2">
                    {/* PRODUCTS */}
                    <section aria-labelledby="footer-products">
                        <h3
                            id="footer-products"
                            className="text-xs tracking-widest text-neutral-400 mb-4"
                        >
                            PRODUCTS
                        </h3>

                        <ul className="space-y-5">
                            <li>
                                <a href="#" className="group inline-block">
                                    <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                                        Codementor
                                    </div>
                                    <p className="text-sm text-neutral-400">
                                        Find a mentor to help you in real-time
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group inline-block">
                                    <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                                        Codementor Events
                                    </div>
                                    <p className="text-sm text-neutral-400">
                                        Attend tech talks and network with developers
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group inline-block">
                                    <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                                        DevProjects
                                    </div>
                                    <p className="text-sm text-neutral-400">
                                        Learn programming by building projects
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="group inline-block">
                                    <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                                        Arc
                                    </div>
                                    <p className="text-sm text-neutral-400">
                                        Helping employers find talent for remote jobs
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* PAGES */}
                    <section aria-labelledby="footer-pages">
                        <h3
                            id="footer-pages"
                            className="text-xs tracking-widest text-neutral-400 mb-4"
                        >
                            PAGES
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                            {[
                                "Become a Codementor",
                                "How It Works",
                                "Find Mentors",
                                "Find Freelancers",
                                "Find a Tutor",
                                "Community",
                                "Blog",
                                "Codementor for Students",
                                "Codementor for Teams",
                                "Code Review",
                                "Pair Programming",
                                "Best Web Design Software",
                                "Coding Starter Kit",
                                "Best Languages to Learn",
                            ].map((label) => (
                                <a
                                    key={label}
                                    href="#"
                                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Divider */}
                <hr className="my-10 border-neutral-800" />

                {/* Bottom bar */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-neutral-400">
                        © Copyright 2023 Codementor
                    </p>

                    <nav aria-label="Footer legal" className="flex flex-wrap gap-x-6 gap-y-2">
                        {[
                            { label: "Cookie Policy", href: "#" },
                            { label: "Privacy Policy", href: "#" },
                            { label: "Terms of Service", href: "#" },
                            { label: "Careers", href: "#" },
                            { label: "Press", href: "#" },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-neutral-300 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
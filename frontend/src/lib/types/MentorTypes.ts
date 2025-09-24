export type Review = {
    reviewer: string;
    review: string;
    date: string;
};

type Project = {
    title: string;
    company: string;
    year: number;
    description: string;
    skills: string[];
};

type SocialPresence = {
    github?: string
    stackOverflow?: string
};

export type Mentor = {
    name: string;
    role: string;
    rating: number;
    reviewsCount: number;
    hourlyRate: number;
    experience: { skill: string; years: number; endorsements: number; description: string }[];
    reviews: Review[];
    socialPresence?: SocialPresence;
    projects: Project[];
    languages: string[];
    timezone: string;
    joined: string;
};

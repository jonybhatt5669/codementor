import {useEffect, useState} from 'react'
import type {Mentor} from "@/lib/types/MentorTypes.ts";
import {MentorMocks} from "@/lib/mocks/MentorMocks.ts";
import MentorCard from "@/components/mentorcomponents/MentorCard.tsx";
import MentorFilters from "@/components/mentorcomponents/MentorFilter.tsx";

function MentorListPage() {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    const [rating, setRating] = useState(0);
    const [minReviews, setMinReviews] = useState(0);
    const [minRate, setMinRate] = useState(0);
    const [maxRate, setMaxRate] = useState(200);

    useEffect(() => {
        // Simulate fetching data from an API
        setMentors(MentorMocks)
    }, []);

    const filteredMentors = mentors.filter((m) => {
        return (m.rating >= rating && m.reviewsCount >= minReviews && m.hourlyRate >= minRate && m.hourlyRate <= maxRate);
    });
    return (<div className={"max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6 w-full"}>
        <MentorFilters
            rating={rating}
            setRating={setRating}
            minReviews={minReviews}
            setMinReviews={setMinReviews}
            minRate={minRate}
            setMinRate={setMinRate}
            maxRate={maxRate}
            setMaxRate={setMaxRate}
        />

        <div className={"flex-1 space-y-4 w-full"}>
            {filteredMentors.length > 0 ? (filteredMentors.map((mentor, idx) => (
                    <MentorCard key={idx} mentor={mentor}/>))) : (mentors.map((mentor, idx) => (
                    <MentorCard key={idx} mentor={mentor}/>))

            )}
        </div>
        {/*{mentors.map((mentor, idx) => (<MentorCard key={idx} mentor={mentor}/>))}*/}
    </div>)
}

export default MentorListPage

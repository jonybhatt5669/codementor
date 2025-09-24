import React from "react";

type MentorFiltersProps = {
    rating: number;
    setRating: (val: number) => void;
    minReviews: number;
    setMinReviews: (val: number) => void;
    minRate: number;
    setMinRate: (val: number) => void;
    maxRate: number;
    setMaxRate: (val: number) => void;
};

const MentorFilters: React.FC<MentorFiltersProps> = ({
                                                         rating,
                                                         setRating,
                                                         minReviews,
                                                         setMinReviews,
                                                         minRate,
                                                         setMinRate,
                                                         maxRate,
                                                         setMaxRate,
                                                     }) => {
    return (<div className="w-full md:w-64 bg-white p-4 border rounded-lg shadow-sm space-y-4 h-fit">
            {/* Rating */}
            <div>
                <label className="block text-sm font-medium mb-1">Min Rating</label>
                <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    className="w-full border rounded-md px-2 py-1"
                />
            </div>

            {/* Reviews */}
            <div>
                <label className="block text-sm font-medium mb-1">Min Reviews</label>
                <input
                    type="number"
                    min={0}
                    value={minReviews}
                    onChange={(e) => setMinReviews(parseInt(e.target.value))}
                    className="w-full border rounded-md px-2 py-1"
                />
            </div>

            {/* Hourly Rate */}
            <div>
                <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        min={0}
                        value={minRate}
                        onChange={(e) => setMinRate(parseInt(e.target.value))}
                        className="w-1/2 border rounded-md px-2 py-1"
                        placeholder="Min"
                    />
                    <input
                        type="number"
                        min={0}
                        value={maxRate}
                        onChange={(e) => setMaxRate(parseInt(e.target.value))}
                        className="w-1/2 border rounded-md px-2 py-1"
                        placeholder="Max"
                    />
                </div>
            </div>
        </div>);
};

export default MentorFilters;

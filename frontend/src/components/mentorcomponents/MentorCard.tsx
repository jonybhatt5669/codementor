import React from "react";
import type {Mentor} from "@/lib/types/MentorTypes.ts";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";


type MentorCardProps = {
    mentor: Mentor;
};

const MentorCard: React.FC<MentorCardProps> = ({mentor}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg shadow-sm bg-white w-full">
            {/* Avatar placeholder */}
            <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0"/>

            {/* Info */}
            <div className="flex-1 flex-row flex justify-between">
                <div className={"flex  gap-2 flex-col"}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{mentor.name}</h2>

                    </div>
                    <p className="text-gray-600">{mentor.role}</p>

                    {/* Rating */}
                    <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm font-medium">
                        {mentor.rating.toFixed(1)}
                    </span>
                        <span className="ml-2 text-gray-500 text-sm">
                        ({mentor.reviewsCount} reviews)
                    </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {mentor.experience.slice(0, 5).map((exp, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                            >
                          {exp.skill}
                        </span>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className={"flex flex-col gap-4"}>
                    <span className="font-normal text-sm">
                    <b className={"text-lg"}>US${mentor.hourlyRate}</b> / 15 mins
                  </span>
                    <div className=" flex gap-2 flex-col">
                        <Button size={"lg"}>
                            View Profile
                        </Button>
                        <Button className={"flex items-center gap-2"} variant={"outline"}>
                            <Plus className={"size-4"} />
                            Compare
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MentorCard;

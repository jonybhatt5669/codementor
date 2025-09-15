import {PromoSection} from "@/components/homecomponents/PromoSection.tsx";
import {MentorPromo} from "@/components/homecomponents/MentorPromo.tsx";
import {FreelancePromo} from "@/components/homecomponents/FreelancePromo.tsx";
import {YouFind} from "@/components/homecomponents/YouFind.tsx";
import {MediaMentions} from "@/components/homecomponents/MediaMentions.tsx";

function HomePage() {
    return (
        <div>
            <PromoSection />
            <MentorPromo />
            <FreelancePromo />
            <YouFind />
            <MediaMentions />
        </div>
    )
}

export default HomePage

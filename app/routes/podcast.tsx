import ReactAudioPlayer from "react-audio-player";
import { SocialIcon } from "react-social-icons";
import PageHeader from "~/components/page-header";

export default function PodcastPage() {
  return (
    <div className="max-w-prose mx-auto px-4 py-8">
      <PageHeader
        title="Podcast"
        subtitle="Listen to the latest episodes of the AIS Podcast"
      />
      <div className="pt-2">
        <h2 className="text-gray-800 font-semibold text-2xl mb-4">
          Latest Episode!
        </h2>

        <h3 className="text-xl text-gray-800 font-medium mb-1">
          Kyle Longhurst - Senior Product Manager at Pariveda
        </h3>
        <p className="mb-2">
          Kyle is a senior product manager at Pariveda. On this episode we talk
          about his journey to where he is at along with advice that he would
          give to students starting their own career path.
        </p>
        <div className="mb-6">
          <p className="text-sm font-semibold mb-1">Get In Touch With Kyle</p>
          <SocialIcon
            url="https://www.linkedin.com/in/kylelonghurst"
            style={{ width: 32, height: 32 }}
          />
        </div>
        <ReactAudioPlayer
          src="https://storage.googleapis.com/ais-byu-podcast/KyleLonghurst-Finished.mp3"
          controls
          className="w-full "
        />
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function FeedbackSubmit() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="section-title text-3xl mb-2">Anonymous Feedback</h1>
          <p className="text-muted-foreground mb-6">Choose feedback type to proceed</p>
        </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link to="/feedback/course" className="block">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm">
              <GlowCard size="md" glowColor="blue" className="p-6">
                <div className="h-full flex flex-col justify-center relative z-10 text-white">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Course Feedback</h3>
                    <p className="text-sm text-muted-foreground">Feedback about courses, faculty, and teaching effectiveness</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </Link>
        <Link to="/feedback/institute" className="block">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm">
              <GlowCard size="md" glowColor="blue" className="p-6">
                <div className="h-full flex flex-col justify-center relative z-10 text-white">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Institute Feedback</h3>
                    <p className="text-sm text-muted-foreground">Feedback about canteen, campus facilities, and services</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </Link>
      </div>
      </div>
    </div>
  );
}

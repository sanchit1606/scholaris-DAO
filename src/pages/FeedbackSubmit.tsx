import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function FeedbackSubmit() {
  return (
    <div className="page-container max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="section-title text-3xl mb-2">Anonymous Feedback</h1>
        <p className="text-muted-foreground mb-6">Choose feedback type to proceed</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Link to="/feedback/course" className="block">
          <div className="glass-card p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Course Feedback</h3>
            <p className="text-sm text-muted-foreground">Feedback about courses, faculty, and teaching effectiveness</p>
          </div>
        </Link>
        <Link to="/feedback/institute" className="block">
          <div className="glass-card p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Institute Feedback</h3>
            <p className="text-sm text-muted-foreground">Feedback about canteen, campus facilities, and services</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

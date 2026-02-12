import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, CheckCircle, Star, Send } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const departments = [
  "Computer Engineering",
  "Electronics",
  "Mechanical",
  "Mathematics",
];
const deptCoursesMap: Record<string, string[]> = {
  "Computer Engineering": [
    "CS301 - Algorithms",
    "CS401 - Machine Learning",
    "CS201 - Data Structures",
  ],
  Electronics: ["EC201 - Signals", "EC301 - Microcontrollers"],
  Mechanical: ["ME101 - Thermodynamics"],
  Mathematics: ["MA201 - Linear Algebra"],
};

const courseQuestions = [
  "CO-PO-PEO Percolation",
  "Effectiveness of teaching-learning process",
  "Attitude and Behaviour of faculty",
];

const likertOptions = [
  "Totally Satisfied",
  "Satisfied",
  "Neither Satisfied Nor Dissatisfied",
  "Dissatisfied",
  "Totally Dissatisfied",
];

export default function FeedbackCourse() {
  const [department, setDepartment] = useState("");
  const [deptCourse, setDeptCourse] = useState("");
  const [courseType, setCourseType] = useState<
    "Theory" | "Lab" | "Tutorial" | ""
  >("");
  const [courseResponses, setCourseResponses] = useState<Record<number, string>>(
    {}
  );
  const [courseNotes, setCourseNotes] = useState("");
  const [phase, setPhase] = useState<
    "commit" | "committed" | "reveal" | "revealed"
  >("commit");

  const commit = () => {
    if (!department || !deptCourse) return;
    setPhase("committed");
  };
  const reveal = () => setPhase("revealed");

  return (
    <div className="page-container max-w-3xl mx-auto">
      <div className="mb-4">
        <Link to="/feedback/submit" className="text-sm text-primary hover:underline">← Back to Feedback Menu</Link>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Course Feedback</h1>
        <p className="text-muted-foreground mb-8">
          Submit anonymous academic feedback (commit → reveal)
        </p>
      </motion.div>

      <div className="flex gap-4 mb-6">
        <div
          className={`flex-1 glass-card p-4 text-center ${
            phase === "commit" || phase === "committed" ? "border-primary/30" : ""
          }`}
        >
          <Lock
            className={`w-6 h-6 mx-auto mb-2 ${
              phase !== "commit" ? "text-success" : "text-primary"
            }`}
          />
          <p className="text-xs font-medium">
            {phase === "commit" ? "Commit Phase" : "Committed ✓"}
          </p>
        </div>
        <div
          className={`flex-1 glass-card p-4 text-center ${
            phase === "reveal" || phase === "revealed" ? "border-primary/30" : ""
          }`}
        >
          <Unlock
            className={`w-6 h-6 mx-auto mb-2 ${
              phase === "revealed" ? "text-success" : "text-muted-foreground/30"
            }`}
          />
          <p className="text-xs font-medium">
            {phase === "revealed" ? "Revealed ✓" : "Reveal Phase"}
          </p>
        </div>
      </div>

      {phase === "commit" && (
        <div className="glass-card p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Department
            </label>
            <Select value={department} onValueChange={(v) => { setDepartment(v); setDeptCourse(""); }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department..." />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Course
            </label>
            <Select value={deptCourse} onValueChange={(v) => setDeptCourse(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course..." />
              </SelectTrigger>
              <SelectContent>
                {(department ? deptCoursesMap[department] : []).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Type
            </label>
            <Select value={courseType} onValueChange={(v) => setCourseType(v as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theory / Lab / Tutorial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Theory">Theory</SelectItem>
                <SelectItem value="Lab">Lab</SelectItem>
                <SelectItem value="Tutorial">Tutorial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {courseQuestions.map((q, idx) => (
              <div key={q}>
                <div className="text-sm font-medium mb-2">
                  {idx + 1}: {q}
                </div>
                <div className="flex flex-wrap gap-2">
                  {likertOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        setCourseResponses((p) => ({ ...p, [idx]: opt }))
                      }
                      className={`px-3 py-1 text-xs rounded-full ${
                        courseResponses[idx] === opt
                          ? "bg-primary text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Additional Notes (optional)
            </label>
            <textarea
              value={courseNotes}
              onChange={(e) => setCourseNotes(e.target.value)}
              rows={3}
              placeholder="Any extra comments..."
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            onClick={commit}
            disabled={!department || !deptCourse}
            className="btn-primary-glow w-full flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Lock className="w-4 h-4" /> Commit Feedback Hash
          </button>
        </div>
      )}

      {phase === "committed" && (
        <motion.div
          key="committed"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="font-heading text-lg font-bold mb-2">Feedback Committed!</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Your hash has been recorded on-chain. Reveal your feedback after the semester ends.
          </p>
          <button onClick={() => setPhase("reveal")} className="btn-secondary-glass flex items-center gap-2 mx-auto">
            <Unlock className="w-4 h-4" /> Proceed to Reveal
          </button>
        </motion.div>
      )}

      {phase === "reveal" && (
        <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 text-center space-y-4">
          <Unlock className="w-12 h-12 text-primary mx-auto" />
          <h3 className="font-heading text-lg font-bold">Reveal Your Feedback</h3>
          <p className="text-sm text-muted-foreground">
            Submit your plaintext + nonce for on-chain verification
          </p>
          <button onClick={reveal} className="btn-primary-glow flex items-center justify-center gap-2 mx-auto">
            <Send className="w-4 h-4" /> Reveal Feedback
          </button>
        </motion.div>
      )}

      {phase === "revealed" && (
        <motion.div key="revealed" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }} className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </motion.div>
          <h3 className="font-heading text-lg font-bold mb-2">Feedback Revealed! 🎉</h3>
          <p className="text-sm text-muted-foreground">Your anonymous feedback has been validated on-chain.</p>
        </motion.div>
      )}
    </div>
  );
}


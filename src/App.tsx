import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useWalletStore } from "@/stores/walletStore";
import WalletConnectModal from "@/components/WalletConnectModal";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Documentation from "@/pages/Documentation";
import PlacePrepUpload from "@/pages/PlacePrepUpload";
import Companies from "@/pages/Companies";
import CompanyDetail from "@/pages/CompanyDetail";
import JDDetail from "@/pages/JDDetail";
import Roadmap from "@/pages/Roadmap";
import Practice from "@/pages/Practice";
import MockInterviews from "@/pages/MockInterviews";
import Leaderboard from "@/pages/Leaderboard";
import Governance from "@/pages/Governance";
import VotingList from "@/pages/VotingList";
import ElectionDetail from "@/pages/ElectionDetail";

import AttendanceMint from "@/pages/AttendanceMint";
import FeedbackSubmit from "@/pages/FeedbackSubmit";
import FeedbackCourse from "@/pages/FeedbackCourse";
import FeedbackInstitute from "@/pages/FeedbackInstitute";
import FeedbackView from "@/pages/FeedbackView";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { useLenis } from "@/hooks/use-lenis";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useWalletStore();
  if (!isConnected) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const App = () => {
  useLenis();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <WalletConnectModal />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/placeprep/upload" element={<PlacePrepUpload />} />
              <Route path="/placeprep/companies" element={<Companies />} />
              <Route path="/placeprep/company/:name" element={<CompanyDetail />} />
              <Route path="/placeprep/jd/:id" element={<JDDetail />} />
              <Route path="/placeprep/roadmap" element={<Roadmap />} />
              <Route path="/placeprep/practice" element={<Practice />} />
              <Route path="/placeprep/mocks" element={<MockInterviews />} />
              <Route path="/placeprep/leaderboard" element={<Leaderboard />} />
              <Route path="/placeprep/governance" element={<Governance />} />
              <Route path="/voting" element={<VotingList />} />
              <Route path="/voting/:id" element={<ElectionDetail />} />

              <Route path="/attendance/mint" element={<AttendanceMint />} />
              <Route path="/feedback/submit" element={<FeedbackSubmit />} />
              <Route path="/feedback/course" element={<FeedbackCourse />} />
              <Route path="/feedback/institute" element={<FeedbackInstitute />} />
              <Route path="/feedback/view" element={<FeedbackView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

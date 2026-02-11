import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import {
  Briefcase, Vote, QrCode, MessageSquare,
  Trophy, Settings, Bell, Menu, X, LayoutDashboard,
  Wallet, ChevronDown, Shield, User
} from 'lucide-react';

const navModules = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  {
    label: 'PlacePrep', icon: Briefcase, children: [
      { label: 'Companies', path: '/placeprep/companies' },
      { label: 'Upload JD', path: '/placeprep/upload' },
      { label: 'Roadmap', path: '/placeprep/roadmap' },
      { label: 'Practice', path: '/placeprep/practice' },
      { label: 'Mock Interviews', path: '/placeprep/mocks' },
      { label: 'Governance', path: '/placeprep/governance' },
      { label: 'Leaderboard', path: '/placeprep/leaderboard' },
    ]
  },
  { label: 'Voting', path: '/voting', icon: Vote },

  { label: 'Attendance', path: '/attendance/mint', icon: QrCode },
  { label: 'Feedback', path: '/feedback/submit', icon: MessageSquare },
];

export default function Layout() {
  const { pathname } = useLocation();
  const { isConnected, address, prepTokens, setShowConnectModal } = useWalletStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const shortAddr = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to={isConnected ? '/dashboard' : '/'} className="flex items-center gap-2.5">
              <div className="module-icon w-8 h-8 rounded-lg text-sm font-bold">⛓</div>
              <span className="font-heading font-bold text-lg gradient-text hidden sm:block">CampusChain</span>
            </Link>

            {/* Desktop Nav */}
            {isConnected && (
              <div className="hidden lg:flex items-center gap-1">
                {navModules.map((mod) =>
                  mod.children ? (
                    <div key={mod.label} className="relative"
                      onMouseEnter={() => setOpenDropdown(mod.label)}
                      onMouseLeave={() => setOpenDropdown(null)}>
                      <button className={`nav-link flex items-center gap-1 ${mod.children.some(c => pathname.startsWith(c.path)) ? 'active' : ''}`}>
                        <mod.icon className="w-4 h-4" />
                        {mod.label}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <AnimatePresence>
                        {openDropdown === mod.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute top-full left-0 mt-1 w-48 glass-card p-2 rounded-xl"
                          >
                            {mod.children.map((child) => (
                              <Link key={child.path} to={child.path}
                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${pathname === child.path ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={mod.path} to={mod.path!}
                      className={`nav-link flex items-center gap-1 ${pathname === mod.path ? 'active' : ''}`}>
                      <mod.icon className="w-4 h-4" />
                      {mod.label}
                    </Link>
                  )
                )}
              </div>
            )}

            {/* Right section */}
            <div className="flex items-center gap-3">
              {isConnected ? (
                <>
                  <div className="stat-badge hidden sm:flex">
                    <span className="text-primary">◆</span> {prepTokens} PREP
                  </div>
                  <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                  </button>
                  <Link to="/profile" className="nav-link flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-mono">{shortAddr}</span>
                  </Link>
                  <Link to="/settings" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Settings className="w-5 h-5" />
                  </Link>
                </>
              ) : (
                <button onClick={() => setShowConnectModal(true)} className="btn-primary-glow text-sm flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              )}
              <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-card border-l border-border p-6 lg:hidden"
          >
            <div className="mt-16 space-y-2">
              {navModules.map((mod) =>
                mod.children ? (
                  <div key={mod.label}>
                    <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{mod.label}</p>
                    {mod.children.map((c) => (
                      <Link key={c.path} to={c.path} onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-sm ${pathname === c.path ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                      >{c.label}</Link>
                    ))}
                  </div>
                ) : (
                  <Link key={mod.path} to={mod.path!} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${pathname === mod.path ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                  >
                    <mod.icon className="w-4 h-4" />
                    {mod.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {mobileOpen && <div className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

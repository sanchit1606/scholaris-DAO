import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  accentColor?: string;
  delay?: number;
}

export default function ModuleCard({ icon: Icon, title, description, path, delay = 0 }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link to={path} className="glass-card-hover p-6 flex flex-col h-full group block">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground flex-1">{description}</p>
        <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  );
}

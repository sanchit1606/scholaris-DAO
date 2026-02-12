import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import React from 'react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  change?: string;
  positive?: boolean;
}

export default function StatCard({ icon: Icon, label, value, change, positive }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-5"
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {change && (
          <span className={`text-xs font-medium ${positive ? 'text-success' : 'text-destructive'}`}>
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-heading font-bold">{value}</div>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

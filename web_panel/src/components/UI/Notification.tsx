import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-900/10';
      case 'error':
        return 'border-red-500/30 bg-red-900/10';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-900/10';
      default:
        return 'border-blue-500/30 bg-blue-900/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start space-x-3 p-4 rounded-lg border backdrop-blur-sm ${getBorderColor()}`}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-dark-text">{title}</p>
        <div className="text-sm text-dark-textSecondary mt-1 leading-relaxed">
          {message}
          {type === 'error' && (
            <div className="mt-2 text-[11px] text-danger/80 bg-danger/10 px-2 py-1.5 rounded border border-danger/20 font-medium">
              It will work when connected to our device. Please watch this video to know about it more: <br/>
              <a href="https://youtu.be/GqRE9r5_pXY?si=2z1zpVS26iEn-mer" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:text-white underline font-bold mt-1 inline-block">
                ▶ Watch Demo Video
              </a>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-dark-textSecondary hover:text-dark-text transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default Notification;

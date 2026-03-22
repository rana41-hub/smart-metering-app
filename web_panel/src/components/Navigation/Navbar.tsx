import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../UI/Icon';
import { NavItem } from '../../types/navigation.types';
import { AdminControls } from './AdminControls';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'layout-dashboard',
      path: '/dashboard',
      description: 'Energy overview and analytics'
    },
    {
      id: 'appliances',
      name: 'Appliances',
      icon: 'zap',
      path: '/appliances',
      description: 'Manage and monitor devices'
    },
    {
      id: 'community',
      name: 'Community',
      icon: 'users',
      path: '/community',
      description: 'Energy trading and community sharing'
    },
    {
      id: 'routine',
      name: 'Routine',
      icon: 'clock',
      path: '/routine',
      description: 'Automated schedules and patterns'
    },
    {
      id: 'ai-conversation',
      name: 'AI Assistant',
      icon: 'message-circle',
      path: '/ai-chat',
      description: 'Chat & voice control with AI assistant'
    },
    {
      id: 'simulation',
      name: 'Simulation',
      icon: 'cpu',
      path: '/simulation',
      description: 'Run energy usage simulations'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="glass border-b border-dark-surface/30 sticky top-0 z-50 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow-effect group-hover:shadow-xl transition-all duration-300">
                  <Icon
                    name="zap"
                    size={24}
                    className="text-white"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:bg-primary/40 transition-all duration-300"></div>
              </div>
              <span className="text-xl font-heading text-dark-text group-hover:text-primary transition-colors serif-optimized tracking-tight text-shadow">
                PrakashAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-accent transition-all duration-300 relative group serif-optimized ${isActive(item.path)
                  ? 'text-primary bg-primary/10 border border-primary/30 shadow-lg glow-effect backdrop-blur-sm'
                  : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-surface/30 hover:backdrop-blur-sm hover:border hover:border-dark-surface/50'
                  }`}
              >
                <Icon
                  name={item.icon}
                  size={18}
                  className={`transition-colors ${isActive(item.path) ? 'text-primary' : 'text-dark-textSecondary group-hover:text-dark-text'
                    }`}
                />
                <span className="font-medium">{item.name}</span>

                {/* Active indicator */}
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r rounded-xl -z-10" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <AdminControls />
          </div>

          {/* User Profile & Logout (Merged from UserProfile.tsx) */}
          <div className="hidden md:flex items-center space-x-4 ml-4 pl-4 border-l border-dark-surface/30">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="h-8 w-8 rounded-xl border border-primary/30"
              />
            ) : (
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-effect">
                <span className="text-white text-xs font-accent">PAI</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-heading text-dark-text leading-tight">
                {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
              </span>
              <span className="text-xs text-dark-textSecondary leading-tight">
                {currentUser?.email}
              </span>
            </div>
            <button
              onClick={() => logout().catch(console.error)}
              title="Logout"
              className="p-2 ml-2 rounded-xl text-dark-textSecondary hover:text-danger hover:bg-danger/10 transition-colors"
            >
              <Icon name="log-out" size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-dark-textSecondary hover:text-dark-text hover:bg-dark-surface/30 transition-all duration-300 backdrop-blur-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'x' : 'menu'}
              size={20}
              className="transition-transform hover:scale-110"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-dark-surface/30 shadow-xl backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-accent transition-all duration-300 serif-optimized ${isActive(item.path)
                  ? 'text-primary bg-primary/10 border border-primary/30 shadow-lg glow-effect'
                  : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-surface/30 hover:backdrop-blur-sm'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon
                  name={item.icon}
                  size={22}
                  className={`transition-colors ${isActive(item.path) ? 'text-primary' : 'text-dark-textSecondary'
                    }`}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  {item.description && (
                    <span className="text-xs text-dark-textSecondary/70 font-body serif-optimized">
                      {item.description}
                    </span>
                  )}
                </div>
              </Link>
            ))}
            
            {/* Mobile Admin Controls & Logout */}
            <div className="mt-4 pt-4 border-t border-dark-surface/30 px-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-dark-textSecondary">Active User</span>
                <span className="text-sm text-dark-text font-medium">{currentUser?.displayName || 'User'}</span>
              </div>
              <AdminControls />
              <button
                onClick={() => logout().catch(console.error)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-danger bg-danger/10 hover:bg-danger/20 transition-colors mt-2"
              >
                <Icon name="log-out" size={18} />
                <span>Logout</span>
              </button>
            </div>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

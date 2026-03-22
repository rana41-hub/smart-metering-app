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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">

          {/* LEFT: Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow-effect group-hover:shadow-xl transition-all duration-300">
                  <Icon name="zap" size={24} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:bg-primary/40 transition-all duration-300"></div>
              </div>
              <span className="text-xl font-heading text-dark-text group-hover:text-primary transition-colors serif-optimized tracking-tight text-shadow">
                PrakashAI
              </span>
            </Link>
          </div>

          {/* CENTER: Desktop Navigation */}
          <div className="hidden xl:flex items-center justify-center flex-1 space-x-1 mx-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-accent transition-all duration-300 relative group serif-optimized ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10 border border-primary/30 shadow-lg glow-effect backdrop-blur-sm'
                    : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-surface/30 hover:backdrop-blur-sm hover:border hover:border-dark-surface/50'
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className={`transition-colors ${
                    isActive(item.path) ? 'text-primary' : 'text-dark-textSecondary group-hover:text-dark-text'
                  }`}
                />
                <span className="font-medium whitespace-nowrap">{item.name}</span>
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r rounded-xl -z-10" />
                )}
              </Link>
            ))}
          </div>

          {/* RIGHT: User Profile & Admin Controls */}
          <div className="hidden xl:flex items-center space-x-4 flex-shrink-0">
            {/* Kill Switch Area */}
            <AdminControls />
            
            <div className="h-8 w-px bg-dark-surface/30"></div>

            {/* Profile Dropdown Area */}
            <div className="flex items-center space-x-3 pl-2 group relative cursor-pointer">
              <div className="flex flex-col text-right">
                <span className="text-sm font-heading text-dark-text leading-none mb-1">
                  {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Admin User'}
                </span>
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider leading-none">
                  Project Owner
                </span>
              </div>
              
              <div className="relative">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-primary/50 shadow-lg object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg glow-effect border-2 border-primary/30">
                    <span className="text-white text-xs font-heading font-bold">PAI</span>
                  </div>
                )}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/40 transition-all duration-300 -z-10"></div>
              </div>

              {/* Logout Button inside the flex layout right next to profile so it's clearly grouped */}
              <button
                onClick={() => logout().catch(console.error)}
                title="Secure Logout"
                className="ml-2 p-2.5 rounded-full text-danger/80 hover:text-white hover:bg-danger transition-all duration-300 shadow-sm hover:shadow-danger/50"
              >
                <Icon name="log-out" size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button - Show on smaller screens where flex overlaps */}
          <div className="xl:hidden flex items-center">
            <button
              className="p-2 rounded-xl text-dark-textSecondary hover:text-dark-text hover:bg-dark-surface/30 transition-all duration-300 backdrop-blur-sm focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <Icon
                name={isMobileMenuOpen ? 'x' : 'menu'}
                size={24}
                className="transition-transform hover:scale-110"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden glass border-t border-dark-surface/30 shadow-xl backdrop-blur-lg animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-accent transition-all duration-300 serif-optimized ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10 border border-primary/30 shadow-lg glow-effect'
                    : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-surface/30 hover:backdrop-blur-sm'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  className={`transition-colors ${isActive(item.path) ? 'text-primary' : 'text-dark-textSecondary'}`}
                />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            
            <div className="mt-4 pt-4 border-t border-dark-surface/30 px-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-heading">PAI</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-heading text-dark-text leading-tight">
                      {currentUser?.displayName || 'Admin'}
                    </span>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">Project Owner</span>
                  </div>
                </div>
                <button
                  onClick={() => logout().catch(console.error)}
                  className="p-2 rounded-xl text-danger hover:bg-danger/10 transition-colors"
                  title="Logout"
                >
                  <Icon name="log-out" size={20} />
                </button>
              </div>
              
              <div className="bg-dark-surface/40 rounded-xl p-1">
                <AdminControls />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

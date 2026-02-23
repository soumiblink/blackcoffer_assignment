'use client';

import { Bell, Search, User, LogOut, Settings as SettingsIcon, LayoutDashboard, BarChart3, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, logout } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New data imported', message: '1,000 records added', time: '5 min ago', unread: true },
    { id: 2, title: 'Filter applied', message: 'Energy sector filtered', time: '1 hour ago', unread: true },
    { id: 3, title: 'Export completed', message: 'CSV file ready', time: '2 hours ago', unread: false },
  ]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const clearNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-2xl border-b border-white/10"
    >
      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push('/dashboard')}
            >
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                
                {/* Icon container */}
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent">
                  DataViz
                </span>
                <p className="text-xs text-gray-500 font-medium">Analytics Platform</p>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-xl rounded-xl p-1 border border-white/10">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <motion.button
                    key={index}
                    onClick={() => router.push(item.path)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative flex items-center space-x-2 px-4 py-2 rounded-lg
                      transition-all duration-200 font-medium text-sm
                      ${isActive
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg shadow-cyan-500/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <motion.div 
              className="hidden lg:block relative"
              animate={{ width: searchFocused ? 280 : 240 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search anything..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`
                  w-full pl-9 pr-4 py-2.5
                  bg-white/5 backdrop-blur-xl
                  border transition-all duration-200
                  rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent
                  text-white placeholder-gray-500 text-sm
                  hover:bg-white/[0.07]
                  ${searchFocused ? 'border-cyan-500/50 bg-white/[0.07]' : 'border-white/10'}
                `}
              />
              {searchFocused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl -z-10"
                />
              )}
            </motion.div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-xl p-1 border border-white/10">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-red-500/50"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification, idx) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`
                              p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group
                              ${notification.unread ? 'bg-cyan-500/5' : ''}
                            `}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-white text-sm group-hover:text-cyan-400 transition-colors">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
                              </div>
                              <button
                                onClick={() => clearNotification(notification.id)}
                                className="text-gray-500 hover:text-gray-300 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-2 p-1 pr-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    {currentUser?.name?.split(' ')[0] || 'User'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                        <p className="font-semibold text-white">{currentUser?.name || 'User'}</p>
                        <p className="text-sm text-gray-400">{currentUser?.email || 'user@example.com'}</p>
                      </div>

                      {/* Mobile Navigation */}
                      <div className="md:hidden py-2 border-b border-white/10">
                        {navItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              router.push(item.path);
                              setShowUserMenu(false);
                            }}
                            className="w-full px-4 py-2.5 text-left text-gray-300 hover:text-white hover:bg-white/5 flex items-center space-x-2 transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center space-x-2 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </motion.nav>
  );
}

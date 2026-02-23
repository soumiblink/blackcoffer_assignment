'use client';

import { LayoutDashboard, BarChart3, Settings, Menu, X, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'from-blue-500 to-blue-600' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', color: 'from-purple-500 to-purple-600' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'from-gray-500 to-gray-600' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg lg:hidden hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl z-40 lg:relative"
          >
            <div className="flex flex-col h-full p-6">
              {/* Logo Section */}
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">
                      DataViz
                    </h1>
                    <p className="text-xs text-gray-400">Analytics Platform</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => router.push(item.path)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r ' + item.color + ' shadow-lg'
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                    >
                      {/* Animated background on hover */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
                      )}
                      
                      <div className="relative flex items-center space-x-4 px-5 py-4">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                        }`}>
                          <item.icon className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`} />
                        </div>
                        <span className={`font-medium transition-colors ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {item.label}
                        </span>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom Section */}
              <div className="mt-auto pt-6 border-t border-gray-700">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">?</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Need Help?</p>
                      <p className="text-xs text-gray-400">Check our docs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

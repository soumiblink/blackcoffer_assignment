'use client';

import { useState, useEffect } from 'react';
import { Save, Bell, Globe, Check, Zap, Database, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showIntensity, setShowIntensity] = useState(true);
  const [showRegional, setShowRegional] = useState(true);
  const [enableCaching, setEnableCaching] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('dashboardSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(settings.notifications !== false);
      setEmailNotifications(settings.emailNotifications || false);
      setLanguage(settings.language || 'en');
      setShowIntensity(settings.showIntensity !== false);
      setShowRegional(settings.showRegional !== false);
      setEnableCaching(settings.enableCaching !== false);
      setAutoRefresh(settings.autoRefresh || false);
      setRefreshInterval(settings.refreshInterval || 30);
      setAnimationsEnabled(settings.animationsEnabled !== false);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      notifications,
      emailNotifications,
      language,
      showIntensity,
      showRegional,
      enableCaching,
      autoRefresh,
      refreshInterval,
      animationsEnabled,
    };
    
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      
      <main className="p-8 max-w-[1400px] mx-auto">
       
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Settings</h1>
              <p className="text-gray-400">Manage your dashboard preferences</p>
            </div>
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center space-x-2 text-emerald-400 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 px-4 py-2 rounded-xl"
              >
                <Check className="w-5 h-5" />
                <span className="font-medium">Settings saved!</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-indigo-400" />
              Appearance
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-base font-medium text-white">Smooth Animations</h3>
                    <p className="text-sm text-gray-400">Enable UI animations</p>
                  </div>
                </div>
                <button
                  onClick={() => setAnimationsEnabled(!animationsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    animationsEnabled ? 'bg-indigo-500' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-base font-medium text-white">Language</h3>
                    <p className="text-sm text-gray-400">Select language</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white text-sm transition-all hover:bg-white/[0.07]"
                >
                  <option value="en" className="bg-slate-900">English</option>
                  <option value="es" className="bg-slate-900">Spanish</option>
                  <option value="fr" className="bg-slate-900">French</option>
                  <option value="de" className="bg-slate-900">German</option>
                  <option value="zh" className="bg-slate-900">Chinese</option>
                  <option value="ja" className="bg-slate-900">Japanese</option>
                </select>
              </div>
            </div>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-indigo-400" />
              Notifications
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-base font-medium text-white">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Browser notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-indigo-500' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-base font-medium text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailNotifications ? 'bg-indigo-500' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Data Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={showIntensity}
                onChange={(e) => setShowIntensity(e.target.checked)}
                className="w-5 h-5 text-indigo-500 bg-white/5 border-white/10 rounded focus:ring-indigo-500/50 focus:ring-2"
              />
              <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                Show intensity metrics
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={showRegional}
                onChange={(e) => setShowRegional(e.target.checked)}
                className="w-5 h-5 text-indigo-500 bg-white/5 border-white/10 rounded focus:ring-indigo-500/50 focus:ring-2"
              />
              <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                Display regional data
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={enableCaching}
                onChange={(e) => setEnableCaching(e.target.checked)}
                className="w-5 h-5 text-indigo-500 bg-white/5 border-white/10 rounded focus:ring-indigo-500/50 focus:ring-2"
              />
              <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                Enable data caching
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-5 h-5 text-indigo-500 bg-white/5 border-white/10 rounded focus:ring-indigo-500/50 focus:ring-2"
              />
              <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                Auto-refresh data
              </span>
            </label>
          </div>

          {autoRefresh && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                min="10"
                max="300"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white transition-all hover:bg-white/[0.07]"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-8 flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all font-medium"
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}

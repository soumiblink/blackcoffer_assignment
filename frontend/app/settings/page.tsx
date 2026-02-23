'use client';

import { useState, useEffect } from 'react';
import { Save, Moon, Sun, Bell, Globe, User, Mail, Lock, Check } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showIntensity, setShowIntensity] = useState(true);
  const [showRegional, setShowRegional] = useState(true);
  const [enableCaching, setEnableCaching] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('dashboardSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDarkMode(settings.darkMode || false);
      setNotifications(settings.notifications !== false);
      setEmailNotifications(settings.emailNotifications || false);
      setLanguage(settings.language || 'en');
      setShowIntensity(settings.showIntensity !== false);
      setShowRegional(settings.showRegional !== false);
      setEnableCaching(settings.enableCaching !== false);
      setAutoRefresh(settings.autoRefresh || false);
      setRefreshInterval(settings.refreshInterval || 30);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      darkMode,
      notifications,
      emailNotifications,
      language,
      showIntensity,
      showRegional,
      enableCaching,
      autoRefresh,
      refreshInterval,
    };
    
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        {saved && (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <Check className="w-5 h-5" />
            <span>Settings saved!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Appearance
          </h2>

          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Dark Mode
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle dark mode theme
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Language
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select your preferred language
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Notifications
          </h2>

          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Push Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable browser notifications
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-gray-300'
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
              <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates via email
                </p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
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
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Data Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showIntensity}
              onChange={(e) => setShowIntensity(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Show intensity metrics
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showRegional}
              onChange={(e) => setShowRegional(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Display regional data
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enableCaching}
              onChange={(e) => setEnableCaching(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Enable data caching
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Auto-refresh data
            </span>
          </label>
        </div>

        {autoRefresh && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Refresh Interval (seconds)
            </label>
            <input
              type="number"
              min="10"
              max="300"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Save className="w-5 h-5" />
          <span className="font-medium">Save Settings</span>
        </button>
      </div>
    </div>
  );
}

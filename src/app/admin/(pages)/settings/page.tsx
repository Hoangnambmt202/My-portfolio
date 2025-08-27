"use client";

import { useState } from "react";
import { 
  User, 
  Globe, 
  Camera, 
  Palette, 
  Bell, 
  Shield, 
  Moon,
  Sun,
  Save,
  Upload,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Trash2,
  Plus
} from "lucide-react";
import {

    FiLinkedin,
    FiGithub,
    FiFacebook,
} from 'react-icons/fi'
interface SocialLink {
  id: string;
  platform: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
}

export default function PortfolioSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    marketing: false,
  });

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about creating amazing digital experiences.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    avatar: null as File | null,
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: "1", platform: "GitHub", url: "https://github.com/johndoe", icon: FiGithub, color: "text-gray-900" },
    { id: "2", platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: FiLinkedin, color: "text-blue-600" },
    { id: "3", platform: "Facebook", url: "https://twitter.com/johndoe", icon: FiFacebook, color: "text-blue-400" },
  ]);

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "John Doe - Full Stack Developer",
    metaDescription: "Full-stack developer specializing in React, Node.js, and modern web technologies.",
    keywords: "developer, react, nodejs, javascript, portfolio",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "social", label: "Social Links", icon: LinkIcon },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  const handleSocialLinkChange = (id: string, field: string, value: string) => {
    setSocialLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: "",
      url: "",
      icon: LinkIcon,
      color: "text-gray-600"
    };
    setSocialLinks(prev => [...prev, newLink]);
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(prev => prev.filter(link => link.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Camera size={16} className="text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
                <p className="text-sm text-gray-500">Upload a professional photo for your portfolio</p>
                <button className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  Upload New Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
                placeholder="Tell visitors about yourself..."
              />
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Preferences</h3>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon size={20} className="text-purple-600" /> : <Sun size={20} className="text-yellow-500" />}
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span className={`absolute w-4 h-4 bg-white rounded-full top-1 left-0 transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Scheme</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: "Blue", colors: "from-blue-500 to-blue-600" },
                  { name: "Purple", colors: "from-purple-500 to-purple-600" },
                  { name: "Green", colors: "from-green-500 to-green-600" },
                  { name: "Orange", colors: "from-orange-500 to-orange-600" },
                ].map((scheme) => (
                  <div key={scheme.name} className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${scheme.colors} rounded-lg mx-auto mb-2 cursor-pointer hover:scale-105 transition-transform border-2 border-transparent hover:border-gray-300`} />
                    <p className="text-sm text-gray-600">{scheme.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-4 cursor-pointer">
                  <div className="w-full h-24 bg-white rounded mb-3 shadow-sm"></div>
                  <p className="font-medium text-center">Modern Layout</p>
                </div>
                <div className="border-2 border-gray-200 bg-gray-50 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                  <div className="w-full h-24 bg-white rounded mb-3 shadow-sm"></div>
                  <p className="font-medium text-center">Classic Layout</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "social":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                <p className="text-sm text-gray-500">Connect your social media profiles</p>
              </div>
              <button
                onClick={addSocialLink}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Link
              </button>
            </div>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <div key={link.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <link.icon size={20} className={link.color} />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Platform name"
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(link.id, 'platform', e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <input
                      type="url"
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(link.id, 'url', e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removeSocialLink(link.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "seo":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
              <p className="text-sm text-gray-500 mb-6">Optimize your portfolio for search engines</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input
                  type="text"
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">{seoSettings.metaTitle.length}/60 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{seoSettings.metaDescription.length}/160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                <input
                  type="text"
                  value={seoSettings.keywords}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, keywords: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Separate keywords with commas"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">SEO Preview</h4>
              <div className="bg-white rounded p-3 border">
                <h5 className="text-blue-600 text-lg hover:underline cursor-pointer">{seoSettings.metaTitle}</h5>
                <p className="text-green-600 text-sm">https://yourportfolio.com</p>
                <p className="text-gray-600 text-sm mt-1">{seoSettings.metaDescription}</p>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <p className="text-sm text-gray-500 mb-6">Choose how you want to be notified</p>
            </div>

            <div className="space-y-4">
              {[
                { key: "email", label: "Email Notifications", description: "Receive notifications via email" },
                { key: "browser", label: "Browser Notifications", description: "Show browser push notifications" },
                { key: "marketing", label: "Marketing Updates", description: "Receive updates about new features" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
              <p className="text-sm text-gray-500 mb-6">Control who can see your portfolio</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isPublic ? <Eye size={20} className="text-green-600" /> : <EyeOff size={20} className="text-gray-600" />}
                  <div>
                    <p className="font-medium">Portfolio Visibility</p>
                    <p className="text-sm text-gray-500">
                      {isPublic ? "Your portfolio is public and visible to everyone" : "Your portfolio is private"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isPublic 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isPublic ? 'Public' : 'Private'}
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Data Export</h4>
              <p className="text-sm text-gray-500 mb-4">Download a copy of your portfolio data</p>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Export Data
              </button>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium text-red-600 mb-4">Danger Zone</h4>
              <p className="text-sm text-gray-500 mb-4">Permanently delete your portfolio and all associated data</p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Portfolio
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Settings</h1>
        <p className="text-gray-600">Customize your portfolio appearance and manage your preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64">
          <nav className="bg-white rounded-xl border border-gray-200 p-2 sticky top-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="flex justify-end pt-8 border-t mt-8">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
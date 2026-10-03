"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  User,
  FolderGit2,
  Cpu,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
  RefreshCw,
  ExternalLink,
  Shield,
  Eye,
  Check,
} from "lucide-react";
import api from "@/lib/axios";
import {
  Profile,
  Project,
  Skill,
  ContactMessage,
  ProjectCategory,
  SkillCategory,
} from "@/types";
import {
  FALLBACK_PROFILE,
  FALLBACK_PROJECTS,
  FALLBACK_SKILLS,
  formatDate,
} from "@/lib/utils";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "profile" | "projects" | "skills" | "messages"
  >("profile");

  // Login form state
  const [email, setEmail] = useState("admin@bibhavpokharel.com");
  const [password, setPassword] = useState("ChangeMe123!");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Profile management state
  const [profile, setProfile] = useState<Profile>(FALLBACK_PROFILE);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileFeedback, setProfileFeedback] = useState<string | null>(null);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState<boolean>(false);
  const [projectForm, setProjectForm] = useState<{
    _id?: string;
    title: string;
    category: ProjectCategory;
    shortDescription: string;
    fullDescription: string;
    technologies: string;
    githubUrl: string;
    liveUrl: string;
    featured: boolean;
    image: string;
  }>({
    title: "",
    category: "Full Stack",
    shortDescription: "",
    fullDescription: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    image: "/project-placeholder.jpg",
  });

  // Skills state
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillForm, setSkillForm] = useState<{
    _id?: string;
    name: string;
    category: SkillCategory;
    level: number;
    icon: string;
    order: number;
  }>({
    name: "",
    category: "Frontend",
    level: 80,
    icon: "code",
    order: 0,
  });

  // Contact messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Feedback notifications
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // Check existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("bibhav_admin_token");
    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    }
  }, []);

  const verifyToken = async (jwtToken: string) => {
    try {
      const res = await api.get("/auth/me");
      if (res.data?.success) {
        setIsAuthenticated(true);
        loadAdminData();
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data?.success && res.data.token) {
        const receivedToken = res.data.token;
        localStorage.setItem("bibhav_admin_token", receivedToken);
        setToken(receivedToken);
        setIsAuthenticated(true);
        showAlert("success", "Logged in successfully as Administrator.");
        loadAdminData();
      } else {
        setLoginError(
          res.data?.message || "Login failed. Please verify credentials.",
        );
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setLoginError(
        errorObj.message ||
          "Authentication failed. Please verify backend is running on http://localhost:5000.",
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bibhav_admin_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  const loadAdminData = async () => {
    loadProfile();
    loadProjects();
    loadSkills();
    loadMessages();
  };

  // Profile API
  const loadProfile = async () => {
    try {
      const res = await api.get("/profile");
      if (res.data?.success && res.data.data) {
        setProfile(res.data.data);
      }
    } catch {
      // Use current profile
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileFeedback(null);

    try {
      // If there's an image file, use FormData
      let res;
      if (profileImageFile) {
        const formData = new FormData();
        Object.entries(profile).forEach(([key, val]) => {
          if (
            val !== undefined &&
            key !== "_id" &&
            key !== "createdAt" &&
            key !== "updatedAt"
          ) {
            formData.append(key, String(val));
          }
        });
        formData.append("image", profileImageFile);

        res = await api.put("/profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.put("/profile", profile);
      }

      if (res.data?.success) {
        setProfile(res.data.data);
        setProfileImageFile(null);
        showAlert("success", "Profile updated successfully!");
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      showAlert("error", errorObj.message || "Failed to update profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  // Projects API
  const loadProjects = async () => {
    setProjectsLoading(true);
    try {
      const res = await api.get("/projects");
      if (res.data?.success && Array.isArray(res.data.data)) {
        setProjects(res.data.data);
      }
    } catch {
      setProjects(FALLBACK_PROJECTS);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      technologies: projectForm.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEditingProject && projectForm._id) {
        const res = await api.put(`/projects/${projectForm._id}`, payload);
        if (res.data?.success) {
          showAlert("success", "Project updated successfully.");
          loadProjects();
          resetProjectForm();
        }
      } else {
        const res = await api.post("/projects", payload);
        if (res.data?.success) {
          showAlert("success", "Project added successfully.");
          loadProjects();
          resetProjectForm();
        }
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      showAlert("error", errorObj.message || "Failed to save project.");
    }
  };

  const handleEditProject = (p: Project) => {
    setIsEditingProject(true);
    setProjectForm({
      _id: p._id,
      title: p.title,
      category: p.category,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      technologies: p.technologies.join(", "),
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      featured: p.featured,
      image: p.image || "/project-placeholder.jpg",
    });
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.data?.success) {
        showAlert("success", "Project removed.");
        loadProjects();
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      showAlert("error", errorObj.message || "Failed to delete project.");
    }
  };

  const resetProjectForm = () => {
    setIsEditingProject(false);
    setProjectForm({
      title: "",
      category: "Full Stack",
      shortDescription: "",
      fullDescription: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      image: "/project-placeholder.jpg",
    });
  };

  // Skills API
  const loadSkills = async () => {
    try {
      const res = await api.get("/skills");
      if (res.data?.success && Array.isArray(res.data.data)) {
        setSkills(res.data.data);
      }
    } catch {
      setSkills(FALLBACK_SKILLS);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (skillForm._id) {
        const res = await api.put(`/skills/${skillForm._id}`, skillForm);
        if (res.data?.success) {
          showAlert("success", "Skill updated.");
          loadSkills();
          resetSkillForm();
        }
      } else {
        const res = await api.post("/skills", skillForm);
        if (res.data?.success) {
          showAlert("success", "Skill added.");
          loadSkills();
          resetSkillForm();
        }
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      showAlert("error", errorObj.message || "Failed to save skill.");
    }
  };

  const handleDeleteSkill = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await api.delete(`/skills/${id}`);
      if (res.data?.success) {
        showAlert("success", "Skill deleted.");
        loadSkills();
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      showAlert("error", errorObj.message || "Failed to delete skill.");
    }
  };

  const resetSkillForm = () => {
    setSkillForm({
      name: "",
      category: "Frontend",
      level: 80,
      icon: "code",
      order: 0,
    });
  };

  // Messages API
  const loadMessages = async () => {
    setMessagesLoading(true);
    try {
      const res = await api.get("/contact");
      if (res.data?.success && Array.isArray(res.data.data)) {
        setMessages(res.data.data);
      }
    } catch {
      // offline
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleMarkAsRead = async (id?: string) => {
    if (!id) return;
    try {
      const res = await api.put(`/contact/${id}`, { status: "read" });
      if (res.data?.success) {
        showAlert("success", "Message marked as read.");
        loadMessages();
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      showAlert("error", errorObj.message || "Failed to update status.");
    }
  };

  const handleDeleteMessage = async (id?: string) => {
    if (!id || !confirm("Delete this message permanently?")) return;
    try {
      const res = await api.delete(`/contact/${id}`);
      if (res.data?.success) {
        showAlert("success", "Message deleted.");
        loadMessages();
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      showAlert("error", errorObj.message || "Failed to delete message.");
    }
  };

  // If NOT Authenticated: Show Login View
  if (!isAuthenticated) {
    return (
      <div className="py-20 md:py-32 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-indigo-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sign in to manage portfolio content, projects, and contact
              inquiries.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-cyan-500 dark:to-indigo-500 text-white dark:text-slate-950 hover:opacity-95 transition-opacity shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? "Authenticating..." : "Sign In as Admin"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Admin Session Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Portfolio Control Panel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Global Alert Notification */}
        {alert && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
              alert.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                : "bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400"
            }`}
          >
            {alert.type === "success" ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{alert.message}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            {
              id: "profile",
              label: "Profile Details",
              icon: <User className="w-4 h-4" />,
            },
            {
              id: "projects",
              label: "Projects Management",
              icon: <FolderGit2 className="w-4 h-4" />,
            },
            {
              id: "skills",
              label: "Skills & Levels",
              icon: <Cpu className="w-4 h-4" />,
            },
            {
              id: "messages",
              label: `Contact Inquiries (${messages.filter((m) => m.status === "unread").length} new)`,
              icon: <Mail className="w-4 h-4" />,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500 shadow-md"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE */}
        {activeTab === "profile" && (
          <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm max-w-4xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Edit Professional Profile
            </h2>

            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.professionalTitle}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        professionalTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Short Introduction
                </label>
                <textarea
                  rows={2}
                  required
                  value={profile.shortIntro}
                  onChange={(e) =>
                    setProfile({ ...profile, shortIntro: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  About Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={profile.aboutDescription}
                  onChange={(e) =>
                    setProfile({ ...profile, aboutDescription: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Placeholder
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={profile.githubUrl}
                    onChange={(e) =>
                      setProfile({ ...profile, githubUrl: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profile.linkedinUrl}
                    onChange={(e) =>
                      setProfile({ ...profile, linkedinUrl: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Upload Profile Image via Multer */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Upload Profile Photo (Multer endpoint)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={(e) =>
                      setProfileImageFile(e.target.files?.[0] || null)
                    }
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 dark:file:bg-slate-800 file:text-indigo-700 dark:file:text-cyan-400 hover:file:bg-indigo-100"
                  />
                  {profile.profileImage && (
                    <span className="text-xs text-slate-400 font-mono">
                      Current: {profile.profileImage}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:opacity-90 shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>
                  {profileSaving
                    ? "Saving Changes..."
                    : "Save Profile Information"}
                </span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Form */}
            <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isEditingProject ? "Edit Project" : "Add New Project"}
                </h2>
                {isEditingProject && (
                  <button
                    onClick={resetProjectForm}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="Full-Stack MERN Blog Platform"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          category: e.target.value as ProjectCategory,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.shortDescription}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="Brief 1-2 sentence overview for cards"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Description & Architecture *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={projectForm.fullDescription}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        fullDescription: e.target.value,
                      })
                    }
                    placeholder="Comprehensive explanation of features, challenges, and architectural decisions"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Technologies (comma separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.technologies}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        technologies: e.target.value,
                      })
                    }
                    placeholder="React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          githubUrl: e.target.value,
                        })
                      }
                      placeholder="https://github.com/bob2056/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={projectForm.liveUrl}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          liveUrl: e.target.value,
                        })
                      }
                      placeholder="https://my-demo-app.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="featured"
                    className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300"
                  >
                    Feature this project on home page
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:opacity-90 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {isEditingProject
                      ? "Update Project"
                      : "Add Project to Portfolio"}
                  </span>
                </button>
              </form>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Existing Projects ({projects.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div
                    key={p._id || p.slug}
                    className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-cyan-400">
                          {p.category}
                        </span>
                        {p.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-500">
                            Featured
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {p.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEditProject(p)}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-cyan-400"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p._id)}
                        className="p-2 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            <div className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm max-w-2xl space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {skillForm._id ? "Edit Skill" : "Add New Skill"}
              </h2>

              <form onSubmit={handleSkillSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) =>
                        setSkillForm({ ...skillForm, name: e.target.value })
                      }
                      placeholder="e.g. Next.js"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={skillForm.category}
                      onChange={(e) =>
                        setSkillForm({
                          ...skillForm,
                          category: e.target.value as SkillCategory,
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Programming">Programming</option>
                      <option value="AI / Machine Learning">
                        AI / Machine Learning
                      </option>
                      <option value="Tools">Tools</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                      Proficiency Level ({skillForm.level}%)
                    </label>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={skillForm.level}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        level: Number(e.target.value),
                      })
                    }
                    className="w-full accent-indigo-600 dark:accent-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:opacity-90 shadow-md cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{skillForm._id ? "Update Skill" : "Add Skill"}</span>
                </button>
              </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((s) => (
                <div
                  key={s._id || s.name}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {s.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">
                      {s.category} • {s.level}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteSkill(s._id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recruiter & Inbound Contact Messages ({messages.length})
            </h2>

            {messages.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <Mail className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">
                  No contact messages received yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m._id}
                    className={`p-6 rounded-2xl border transition-all ${
                      m.status === "unread"
                        ? "border-indigo-500/50 dark:border-cyan-500/50 bg-indigo-50/20 dark:bg-cyan-950/20 shadow-sm"
                        : "border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {m.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              m.status === "unread"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-xs text-indigo-600 dark:text-cyan-400 hover:underline"
                        >
                          {m.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        {m.createdAt && (
                          <span className="text-xs text-slate-400 font-mono">
                            {formatDate(m.createdAt)}
                          </span>
                        )}
                        {m.status === "unread" && (
                          <button
                            onClick={() => handleMarkAsRead(m._id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                            title="Mark as Read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(m._id)}
                          className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Subject: {m.subject}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

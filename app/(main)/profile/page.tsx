"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { User } from "firebase/auth";
import LogoutButton from "../../../components/LogoutButton";
import Image from "next/image";
export default function ProfilePage() {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    bio: "",
    grade: "",
    subjects: [] as string[],
  });

  const availableSubjects = [
    "Physics",
    "Mathematics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
    "History",
    "Geography",
  ];

  const extraStats = {
    joinDate: "July 2025",
    totalDoubts: 127,
    solvedDoubts: 98,
    streakDays: 15,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
        setFormData({
          displayName: user.displayName || "",
          email: user.email || "",
          bio: "Passionate about learning and exploring new concepts in science and mathematics.",
          grade: "Grade 12",
          subjects: ["Physics", "Mathematics", "Chemistry"],
        });
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!firebaseUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-300">Manage your learning journey</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {firebaseUser.photoURL ? (
                    <Image
                      src={firebaseUser.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                      width={400}
                      height={400}
                    />
                  ) : (
                    formData.displayName.charAt(0)
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 text-center md:text-left">
                {editMode ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                      placeholder="Display Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                      placeholder="Email"
                    />
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                    >
                      <option value="">Select Grade</option>
                      {[...Array(12)].map((_, i) => (
                        <option
                          key={i}
                          value={`Grade ${i + 1}`}
                          className="bg-slate-800"
                        >
                          Grade {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-white">
                      {formData.displayName}
                    </h2>
                    <p className="text-gray-300">{formData.email}</p>
                    <p className="text-gray-400 mt-4">{formData.bio}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {/* <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                        {formData.grade}
                      </span> */}
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                        Joined {extraStats.joinDate}
                      </span>
                    </div>
                  </>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
                  {editMode ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {/* <button
                        onClick={() => setEditMode(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
                      >
                        Edit Profile
                      </button> */}
                      <LogoutButton className="px-6 py-3 bg-red-500/20 text-red-300 rounded-xl" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Total Doubts", value: extraStats.totalDoubts },
              { label: "Solved Doubts", value: extraStats.solvedDoubts },
              { label: "Day Streak", value: extraStats.streakDays },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
              >
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div> */}

          {/* <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {editMode ? "Select Your Subjects" : "Your Subjects"}
            </h3>
            {editMode ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableSubjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`p-3 rounded-xl font-medium ${
                      formData.subjects.includes(subject)
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {formData.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </main>
    </div>
  );
}

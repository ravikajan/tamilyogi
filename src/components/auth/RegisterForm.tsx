"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { getCurrentCountry } from "@/actions/getCurrentCountry";
import countries from "react-phone-number-input/locale/en.json";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import { validateEmail } from "@/actions/validateEmail";

// Custom country select component for react-phone-number-input
const CountrySelect = React.forwardRef<HTMLSelectElement, {
  value?: string;
  onChange: (value: string) => void;
  options: string[];
  [key: string]: any;
}>(({ value, onChange, options, ...rest }, ref) => {
  // Only remove iconComponent, do NOT remove dropdownClass here
  const { iconComponent, ...selectProps } = rest;
  return (
    <select
      ref={ref}
      {...selectProps}
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      className={classNames(
        "bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent px-3 py-2",
        selectProps.className
      )}
      style={{ backgroundColor: "#1a1a2e", color: "#fff", ...selectProps.style }}
    >
      {options
        .filter((country: string): country is string => typeof country === "string")
        .map((country: string) => (
          <option key={country} value={country}>
            {countryName(country)} (+{getCountryCallingCode(country as any)})
          </option>
        ))}
    </select>
  );
});

// Helper to get country name from code
function countryName(countryCode: string) {
  return countries[countryCode as keyof typeof countries] || countryCode;
}

function checkPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

export default function RegisterForm({ onSwitch }: { onSwitch?: () => void }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  // Use type assertion for country as CountryCode
  const [country, setCountry] = useState<string | undefined>(undefined); // No default
  const [phone, setPhone] = useState<string>("");
  const [geoMsg, setGeoMsg] = useState<string>("Getting your country details...");

  useEffect(() => {
    (async () => {
      setGeoMsg("Getting your country details...");
      const geo = await getCurrentCountry();
      if (geo.success && geo.country) {
        // Find country code by country name
        const found = Object.entries(countries).find(
          ([code, name]) => name === geo.country
        );
        if (found) {
          setCountry(found[0]);
          setGeoMsg("");
        } else {
          setGeoMsg("Country not found, defaulting to India.");
        }
      } else {
        setGeoMsg("Could not detect your country, defaulting to India.");
      }
    })();
  }, []);

  const handlePassword = (val: string) => {
    setPassword(val);
    setStrength(checkPasswordStrength(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    let errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else {
      const emailCheck = await validateEmail(email);
      if (!emailCheck.isValid) errors.email = emailCheck.error || "Invalid email address";
    }
    if (!country) errors.country = "Country is required";
    if (!phone.trim()) errors.phone = "Phone number is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm your password";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match!";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: `+${getCountryCallingCode(country as any)}${phone}`,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }
      setLoading(false);
      if (data.redirect) {
        window.location.reload();
        return;
      }
      alert("Account created successfully! You can now sign in.");
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Name<span className="text-red-500 ml-1">*</span></label>
        <input
          type="text"
          required
          className={`input-field w-full px-4 py-3 bg-gray-800 border ${fieldErrors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address<span className="text-red-500 ml-1">*</span></label>
        <input
          type="email"
          required
          className={`input-field w-full px-4 py-3 bg-gray-800 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
          placeholder="john@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Country<span className="text-red-500 ml-1">*</span></label>
        <select
          className={`input-field w-full px-4 py-3 bg-gray-800 border ${fieldErrors.country ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
          value={country || ""}
          onChange={e => setCountry(e.target.value)}
          required
        >
          <option value="" disabled>
            {geoMsg ? "Detecting country..." : "Select your country"}
          </option>
          {getCountries().map((c) => (
            <option key={c} value={c}>
              {countryName(c)} (+{getCountryCallingCode(c as any)})
            </option>
          ))}
        </select>
        {geoMsg && <p className="text-yellow-400 text-xs mt-1">{geoMsg}</p>}
        {fieldErrors.country && <p className="text-red-400 text-xs mt-1">{fieldErrors.country}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number<span className="text-red-500 ml-1">*</span></label>
        <div className="flex">
          <span className="flex items-center px-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white select-none">
            {country ? `+${getCountryCallingCode(country as any)}` : <span className="text-gray-500">---</span>}
          </span>
          <input
            type="tel"
            required
            inputMode="numeric"
            pattern="[0-9]{7,}"
            className={`input-field flex-1 px-4 py-3 bg-gray-800 border-t border-b border-r ${fieldErrors.phone ? 'border-red-500' : 'border-gray-700'} rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
            placeholder="Phone Number"
            value={phone}
            onChange={e => {
              // Only allow numbers
              const val = e.target.value.replace(/[^0-9]/g, '');
              setPhone(val);
            }}
            disabled={!country}
          />
        </div>
        {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Password<span className="text-red-500 ml-1">*</span></label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            id="signupPassword"
            className={`input-field w-full px-4 py-3 bg-gray-800 border ${fieldErrors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
            placeholder="Create a strong password"
            value={password}
            onChange={e => handlePassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        {/* Password Strength Indicator */}
        <div className="mt-2">
          <div className="flex space-x-1">
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength >= 1 ? (strength <= 2 ? "password-weak" : strength === 3 ? "password-medium" : "password-strong") : ""}`}></div>
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength >= 2 ? (strength <= 2 ? "password-weak" : strength === 3 ? "password-medium" : "password-strong") : ""}`}></div>
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength >= 3 ? (strength === 3 ? "password-medium" : strength === 4 ? "password-strong" : "") : ""}`}></div>
            <div className={`password-strength h-1 rounded-full flex-1 bg-gray-700 ${strength === 4 ? "password-strong" : ""}`}></div>
          </div>
          <p className={`text-xs mt-1 ${strength <= 2 ? "text-red-400" : strength === 3 ? "text-yellow-400" : strength === 4 ? "text-green-400" : "text-gray-400"}`}>
            {strength <= 2 ? "Weak password" : strength === 3 ? "Medium strength" : strength === 4 ? "Strong password" : "Password strength"}
          </p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password<span className="text-red-500 ml-1">*</span></label>
        <input
          type="password"
          required
          id="confirmPassword"
          className={`input-field w-full px-4 py-3 bg-gray-800 border ${fieldErrors.confirmPassword ? 'border-red-500' : password !== confirmPassword && confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {fieldErrors.confirmPassword && <p className="text-red-400 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div className="space-y-3">
        <label className="flex items-start">
          <input type="checkbox" required className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 mt-0.5" />
          <span className="ml-2 text-sm text-gray-300">
            I agree to the <a href="#" className="text-red-400 hover:text-red-300">Terms of Service</a> and <a href="#" className="text-red-400 hover:text-red-300">Privacy Policy</a>
          </span>
        </label>
        <label className="flex items-start">
          <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 mt-0.5" />
          <span className="ml-2 text-sm text-gray-300">
            Subscribe to updates and promotional content
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all pulse-glow"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}

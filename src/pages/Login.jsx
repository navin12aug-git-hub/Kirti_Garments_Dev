import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Min 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(email);
    toast('Welcome back!');
    navigate('/account');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block"><Logo /></div>
          <h1 className="mt-6 text-2xl font-serif font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-neutral-500">Sign in to your Kirti Garments account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-6 md:p-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10 pr-10"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-neutral-900" />
              <span className="text-neutral-600">Remember me</span>
            </label>
            <button type="button" className="text-accent hover:text-accent-dark">Forgot password?</button>
          </div>

          <button type="submit" className="btn-primary w-full">Sign In</button>

          <p className="text-center text-sm text-neutral-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:text-accent-dark font-medium">Create one</Link>
          </p>
        </form>

        <p className="mt-4 text-center text-xs text-neutral-400">
          Demo: Use any email and password (min 6 chars) to sign in.
        </p>
      </div>
    </div>
  );
}

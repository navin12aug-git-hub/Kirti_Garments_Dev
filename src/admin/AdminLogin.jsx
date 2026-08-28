import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const { adminLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!email.trim()) err.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(email)) err.email = 'Invalid email';
    if (!password) err.password = 'Required';
    else if (password.length < 6) err.password = 'Min 6 characters';
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    adminLogin(email);
    toast('Welcome to Admin Dashboard');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block"><Logo light /></div>
          <div className="mt-6 flex items-center justify-center gap-2 text-accent-light">
            <ShieldCheck size={20} />
            <span className="text-sm font-medium tracking-wider uppercase">Admin Panel</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 space-y-4">
          <h1 className="text-xl font-serif font-bold text-center">Admin Sign In</h1>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" placeholder="admin@kirtigarments.com" />
            </div>
            {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pl-10 pr-10" placeholder="••••••••" />
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

          <button type="submit" className="btn-primary w-full">Sign In to Dashboard</button>

          <p className="text-center text-xs text-neutral-400">
            Demo: Use any email and password (min 6 chars).
          </p>
          <Link to="/" className="block text-center text-xs text-neutral-400 hover:text-neutral-600">← Back to Store</Link>
        </form>
      </div>
    </div>
  );
}

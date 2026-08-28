import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email';
    if (!mobile.trim()) e.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(mobile)) e.mobile = 'Enter 10-digit mobile';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Min 6 characters';
    if (confirm !== password) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    register(name, email, mobile);
    toast('Account created successfully!');
    navigate('/account');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block"><Logo /></div>
          <h1 className="mt-6 text-2xl font-serif font-bold">Create Account</h1>
          <p className="mt-2 text-sm text-neutral-500">Join the Kirti Garments family</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-6 md:p-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field pl-10" placeholder="John Doe" />
            </div>
            {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-10" placeholder="you@example.com" />
            </div>
            {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Mobile Number</label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} className="input-field pl-10" placeholder="9876543210" />
            </div>
            {errors.mobile && <p className="text-xs text-danger mt-1">{errors.mobile}</p>}
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

          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type={showPass ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-field pl-10" placeholder="••••••••" />
            </div>
            {errors.confirm && <p className="text-xs text-danger mt-1">{errors.confirm}</p>}
          </div>

          <button type="submit" className="btn-primary w-full">Create Account</button>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent-dark font-medium">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

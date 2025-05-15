import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        if (!isLogin) {
          // If registration was successful, switch to login
          setIsLogin(true);
          setFormData({...formData, password: ''});
          setError('Account created! Please login.');
        } else {
          // Save auth state in localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', formData.email);
          // If login successful, redirect to dashboard
          router.push('/');
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Check for existing auth on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      router.push('/');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Gizmo360 - {isLogin ? 'Login' : 'Register'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <div className={styles.overlay}></div>

        <div className={styles.branding}>GIZMO360®</div>

        <div className={styles.loginContainer}>
          <div className={styles.pulseWrapper}>
            <div className={styles.pulse}></div>
          </div>
          <h2>Welcome to Gizmo360</h2>
          <p className={styles.subtitle}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>

          {error && <p className={styles.error}>{error}</p>}

          <form id="loginForm" onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <p className={styles.terms}>
              By continuing, you agree to our <u>Terms</u> and <u>Privacy Policy</u>
            </p>
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
            
            <p className={styles.switchMode}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={toggleMode} className={styles.switchLink}>
                {isLogin ? 'Sign up' : 'Log in'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
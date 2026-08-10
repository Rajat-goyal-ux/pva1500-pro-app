import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { App } from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Trapped Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-8 max-w-xl w-full space-y-4 text-left">
            <h2 className="text-xl font-bold font-syne text-rose-400">Runtime Error Caught</h2>
            <p className="text-xs text-slate-300 font-mono bg-black/60 p-4 rounded-xl border border-rose-500/20 overflow-x-auto text-rose-300">
              {this.state.error ? this.state.error.toString() : 'Unknown Error'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="btn-animated-cyber py-2.5 px-6 text-xs w-full text-center"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

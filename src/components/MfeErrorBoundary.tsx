import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  fragmentName: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class MfeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[MFE Error] Failed loading fragment "${this.props.fragmentName}":`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-12 p-8 max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            Micro-Frontend Unavailable
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            The <span className="font-semibold text-slate-700">{this.props.fragmentName}</span> remote could not be loaded over Module Federation.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Fragment</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

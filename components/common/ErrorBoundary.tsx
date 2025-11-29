import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-500">Ops! Algo deu errado</h1>
            <p className="text-gray-400 mb-4">
              Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.
            </p>
            {this.state.error && (
              <details className="text-left mt-4 p-4 bg-gray-900 rounded text-sm">
                <summary className="cursor-pointer text-gray-400 mb-2">Detalhes do erro</summary>
                <pre className="text-red-400 overflow-auto">{this.state.error.toString()}</pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-[#20FF82] text-black rounded-lg font-semibold hover:bg-[#1ae870] transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


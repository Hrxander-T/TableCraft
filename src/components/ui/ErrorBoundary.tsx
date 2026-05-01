import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  reset = () => this.setState({ hasError: false, message: '' })

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{
          padding: 24, borderRadius: 12, border: '1px solid #ef4444',
          background: '#fef2f2', color: '#991b1b', fontFamily: 'Georgia, serif',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Something went wrong</div>
          <div style={{ fontSize: 13, marginBottom: 16, opacity: 0.8 }}>{this.state.message}</div>
          <button onClick={this.reset} style={{
            padding: '6px 16px', background: '#ef4444', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
          }}>Try Again</button>
        </div>
      )
    }
    return this.props.children
  }
}
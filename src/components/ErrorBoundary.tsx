"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Component error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: "40px",
          textAlign: "center",
          background: "#1a1a1a",
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.85rem",
        }}>
          Something went wrong loading this section.
        </div>
      );
    }
    return this.props.children;
  }
}

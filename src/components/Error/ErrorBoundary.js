import React from 'react'
export class ErrorBoundary extends React.Component {
  state = {
    error: null,
  }
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error)
    return { error }
  }
  render() {
    const { error } = this.state

    if (error) {
      return <this.props.ErrorComponent error={error} />
    }
    return this.props.children
  }
}

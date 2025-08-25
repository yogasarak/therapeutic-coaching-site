'use client'

import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">Loading...</p>
      <style jsx>{`
        .loading-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg) }
          100% { transform: rotate(360deg) }
        }
        
        .loading-text {
          color: #6b7280;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  )
}

export default Loading
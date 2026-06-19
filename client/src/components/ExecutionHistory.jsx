// client/src/components/ExecutionHistory.jsx
import { useState, useEffect } from 'react';
import './ExecutionHistory.css';

const ExecutionHistory = ({ history, onClearHistory }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!history || history.length === 0) {
    return (
      <div className="execution-history-container">
        <button 
          className="history-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          📜 History ({history?.length || 0})
        </button>
        {isOpen && (
          <div className="history-panel">
            <div className="history-empty">
              <span>📭</span>
              <p>No execution history yet</p>
              <small>Run some code to see results here</small>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="execution-history-container">
      <button 
        className="history-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        📜 History ({history.length})
      </button>

      {isOpen && (
        <div className="history-panel">
          <div className="history-header">
            <span className="history-title">📋 Execution History</span>
            <button 
              className="history-clear-btn"
              onClick={onClearHistory}
              title="Clear all history"
            >
              🗑️ Clear All
            </button>
          </div>

          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className={`history-item ${item.status}`}>
                <div className="history-item-header">
                  <span className="history-index">#{index + 1}</span>
                  <span className={`history-status-badge ${item.status}`}>
                    {item.status === 'success' ? '✅' : '❌'} {item.status}
                  </span>
                  <span className="history-time">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="history-item-body">
                  {item.output && (
                    <div className="history-output">
                      <span className="history-label">Output:</span>
                      <pre className="history-output-text">{item.output}</pre>
                    </div>
                  )}
                  
                  {item.error && (
                    <div className="history-error">
                      <span className="history-label">Error:</span>
                      <pre className="history-error-text">{item.error}</pre>
                    </div>
                  )}
                  
                  {item.score !== null && item.score !== undefined && (
                    <div className="history-score">
                      <span className="history-label">Score:</span>
                      <span className={`history-score-value ${item.score >= 80 ? 'high' : item.score >= 50 ? 'medium' : 'low'}`}>
                        {item.score}%
                      </span>
                    </div>
                  )}

                  {item.code && (
                    <div className="history-code">
                      <span className="history-label">Code:</span>
                      <pre className="history-code-text">{item.code}</pre>
                    </div>
                  )}
                </div>

                <div className="history-item-footer">
                  <span className="history-language">🌐 {item.language || 'Unknown'}</span>
                  {item.executionTime > 0 && (
                    <span className="history-execution-time">⚡ {item.executionTime}ms</span>
                  )}
                  <span className="history-attempt">🔁 Attempt #{item.attempt || 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="history-footer">
            <small>Showing last {history.length} executions</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionHistory;
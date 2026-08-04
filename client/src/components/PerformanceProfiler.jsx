import React, { useEffect, useState } from 'react';

const PerformanceProfiler = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime.toFixed(2) + 'ms' }));
          }
        });
      });
      observer.observe({ type: 'paint', buffered: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="performance-profiler" style={{ position: 'fixed', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: '#0f0', padding: '10px', borderRadius: '5px', fontSize: '11px', zIndex: 9999 }}>
      <strong>Live Profiler</strong>
      <div>FCP: {metrics.fcp || 'Calculating...'}</div>
      <div>Memory: {window.performance.memory ? (window.performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB' : 'N/A'}</div>
    </div>
  );
};

export default PerformanceProfiler;
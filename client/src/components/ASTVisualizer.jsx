import React, { useState } from 'react';

const ASTVisualizer = ({ code }) => {
  const [ast, setAst] = useState(null);
  const [error, setError] = useState('');

  const parseCode = async () => {
    try {
      // Utilizing dynamic import for performance
      const acorn = await import('acorn');
      const parsed = acorn.parse(code, { ecmaVersion: 2020 });
      setAst(parsed);
      setError('');
    } catch (err) {
      setError(err.message);
      setAst(null);
    }
  };

  return (
    <div className="ast-visualizer-container" style={{ padding: '20px', background: '#1e1e1e', color: '#d4d4d4', borderRadius: '8px' }}>
      <h3>AST Explorer (Educational Tool)</h3>
      <button onClick={parseCode} style={{ background: '#007acc', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Generate AST Tree
      </button>
      {error && <p style={{ color: '#f48771' }}>Syntax Error: {error}</p>}
      {ast && (
        <pre style={{ overflowX: 'auto', marginTop: '15px', fontSize: '12px' }}>
          {JSON.stringify(ast, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ASTVisualizer;
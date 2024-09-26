import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const Table = () => {
  const { existingValue, loading, error } = useContext(AppContext);
  const [inputValue, setInputValue] = React.useState(0);
  const theme = useTheme();

  const calculatePercentage = () => {
    return existingValue > 0 ? ((inputValue / existingValue) * 100).toFixed(2) : 0;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{
      padding: '1.25em',
      color: theme.colors.text,
    }}>
      <h1 style={{ fontSize: '1.5em', marginBottom: '1.25em' }}>Values Table</h1>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '0.625em',
        backgroundColor: '#1F1F1F',
      }}>
        <thead>
          <tr>
            <th style={{
              padding: '0.625em',
              borderBottom: `1px solid ${theme.colors.border}`,
              textAlign: 'left',
            }}>Input Value</th>
            <th style={{
              padding: '0.625em',
              borderBottom: `1px solid ${theme.colors.border}`,
              textAlign: 'left',
            }}>Existing Value</th>
            <th style={{
              padding: '0.625em',
              borderBottom: `1px solid ${theme.colors.border}`,
              textAlign: 'left',
            }}>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.625em', borderBottom: `1px solid #282828` }}>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.3125em',
                  borderRadius: '0.3125em',
                  border: `1px solid ${theme.colors.border}`,
                  backgroundColor: '#282828',
                  color: '#FFFFFF',
                }}
              />
            </td>
            <td style={{ padding: '0.625em', borderBottom: `1px solid #282828` }}>{existingValue}</td>
            <td style={{ padding: '0.625em', borderBottom: `1px solid #282828` }}>{calculatePercentage()}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;

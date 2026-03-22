import React, { useState, useEffect } from 'react';

export const AdminControls: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/status`)
      .then(res => res.json())
      .then(data => {
        setIsBlocked(data.blocked);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch block status", err);
        setLoading(false);
      });
  }, []);

  const toggleBlockStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/block`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocked: !isBlocked })
      });
      const data = await res.json();
      if (data.success) {
        setIsBlocked(data.blocked);
      }
    } catch (err) {
      console.error("Failed to update block status", err);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center space-x-3 ml-4 bg-dark-surface/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-dark-surface/50">
      <div className="text-sm font-medium text-dark-textSecondary">
        Mobile App Access:
      </div>
      <button
        onClick={toggleBlockStatus}
        disabled={loading}
        aria-label="Toggle App Access"
        title="Revoke or Grant Android App Access"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isBlocked ? 'bg-red-500' : 'bg-green-500'
        } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isBlocked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`text-xs font-bold ${isBlocked ? 'text-red-400' : 'text-green-400'}`}>
        {isBlocked ? 'REVOKED' : 'ACTIVE'}
      </span>
    </div>
  );
};

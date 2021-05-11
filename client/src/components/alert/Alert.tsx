import React from 'react';
import { useAppSelector } from '../../app/hooks';

export const Alert = () => {
  const alerts = useAppSelector((state) => state.alert.alerts);
  return (
    <>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        ))}
    </>
  );
};

import React from 'react';
import { Route as ReactRoute, useHistory } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { usePrevious } from 'react-use';

const Route: React.FC<RouteProps> = props => {
  
  return <ReactRoute {...props} />;
};

export default Route;

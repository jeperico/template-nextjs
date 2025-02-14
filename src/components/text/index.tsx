import React from 'react';

interface TextProps {
  children: React.ReactNode;
  cn?: string;
}

const Text: React.FC<TextProps> = ({ children, cn }) => {
  return <p className={cn}>{children}</p>;
};

export default Text;

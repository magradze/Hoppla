import React from 'react';

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="pt-16 h-auto">
            {children}
        </div>
    );
};

export default AuthLayout;

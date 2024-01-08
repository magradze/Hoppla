import React from 'react';

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="pt-16">
            {children}
        </div>
    );
};

export default AuthLayout;

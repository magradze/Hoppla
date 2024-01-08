import React from 'react';

const RideLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="pt-16 h-screen">
            {children}
        </div>
    );
};

export default RideLayout;

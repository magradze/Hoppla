import React from 'react';

const RideLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="pt-16 h-auto">
            {children}
        </div>
    );
};

export default RideLayout;

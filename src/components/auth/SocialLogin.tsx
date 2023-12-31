import React from 'react';
import LoginWithGoogle from "@/components/shared/buttons/LoginWithGoogle";

const SocialLogin = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center mt-6">
            <LoginWithGoogle/>
        </div>
    );
};

export default SocialLogin;

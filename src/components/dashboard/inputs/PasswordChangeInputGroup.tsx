"use client"
import * as React from "react"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

// eslint-disable-next-line react/display-name
const PasswordChangeInputGroup = React.forwardRef<HTMLInputElement, InputProps>(({type, ...props}, ref) => {


    return (
        <div className="sm:flex items-center">
            {/*<dt className="font-medium text-gray-900 sm:w-40 sm:flex-none flex-shrink sm:pr-6">{label}:</dt>*/}
            <dd className="mt-1 flex flex-grow justify-between items-center gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="block w-full">
                    <input
                        type={type}
                        ref={ref}
                        {...props}
                        placeholder="******"
                        className="block w-full h-12 rounded-md border focus:border-0 focus:shadow-md outline-none py-1.5 px-6 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 alk-sanet disabled:bg-transparent disabled:border-transparent"
                        // disabled={!editing}
                    />
                </div>

            </dd>
        </div>
    );
});

export default PasswordChangeInputGroup;

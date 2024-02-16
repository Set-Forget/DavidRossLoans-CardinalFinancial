export default function Input({ label, errors, register, className, icon, textarea, ...props }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <label className="flex items-center text-left text-sm font-medium leading-6 mb-1 text-gray-900">
                    {label}
                </label>
            )}
            <div className="relative rounded-md shadow-sm">
                {icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        {icon}
                    </div>
                )}
                {textarea ? (
                    <textarea
                        className={`block w-full rounded-md border-0 py-1.5 ${
                            icon && "pl-7"
                        } text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00b1a4] sm:text-sm sm:leading-6`}
                        {...register}
                        {...props}
                    />
                ) : (
                    <input
                        className={`block w-full rounded-md border-0 py-1.5 ${
                            icon && "pl-7"
                        } text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00b1a4] sm:text-sm sm:leading-6`}
                        {...register}
                        {...props}
                    />
                )}
            </div>
            {errors && <span className="text-red-500 text-sm text-left mt-2">{errors}</span>}
        </div>
    );
}

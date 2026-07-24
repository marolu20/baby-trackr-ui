export function ProfileField({ label, value }) {
    return (
        <div className="py-4">
            <p className="text-sm font-medium text-gray-500">
                {label}
            </p>
            <p className="mt-1 text-gray-900">
                {value}
            </p>
        </div>
    );
}

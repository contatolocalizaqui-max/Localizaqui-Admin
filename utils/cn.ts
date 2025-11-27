// A simple utility to concatenate class names conditionally.
// This is a lightweight replacement for clsx/tailwind-merge for this specific environment.
export function cn(...inputs: (string | undefined | null | boolean)[]) {
    return inputs.filter(Boolean).join(' ');
}

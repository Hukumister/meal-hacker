export type Result<T> = {
    success: boolean;
} & (
    { success: true; data: T } |
    { success: false; error: string }
    );
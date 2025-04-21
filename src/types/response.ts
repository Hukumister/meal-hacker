import {ZodIssue} from "zod";

export type FormResponse<T> = {
    success: boolean;
} & (
    { success: true; data: T } |
    { success: false; data?: undefined; errors: ZodIssue[]; message?: string }
    );

export type ActionResponse<T> = {
    success: boolean;
} & (
    { success: true; data: T } |
    { success: false; data?: undefined; message?: string }
    );
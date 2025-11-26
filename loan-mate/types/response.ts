export interface SuccessBody<T> {
    code: string;
    message: string;
    data: T;
}

export interface FailureBody {
    error: string;
    message: string;
}

export interface User {
    username: string,
    email: string,
    password: string,
    resetPasswordToken?: string,
    resetPasswordExpire?: Date,
    company?: Array<string>
}

export interface Bug {
    bugName: string;
    type: string
    description: string;
    status: string;
    reporter: string;
    assignee: string;
    priority: string;
    save: Function;
}

export interface Options {
    to: string,
    subject: string,
    text: string,
}
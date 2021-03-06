export interface User {
    _id: string,
    username: string,
    email: string,
    password: string,
    resetPasswordToken?: string,
    resetPasswordExpire?: Date,
    companyId?: string,
    save: Function,
}

export interface Bug {
    bugName: string;
    type: string
    description: string;
    status: string;
    reporterId: string;
    assigneeId: string;
    priority: string;
    save: Function;
}

export interface Company {
    _id: string,
    companyName: string,
    ownerId: string,
    save: Function
}

export interface Options {
    to: string,
    subject: string,
    text: string,
}
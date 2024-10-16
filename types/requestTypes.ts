export type RequestType = {
    reqId: string,
    senderId: string,
    receiverId: string,
    userName: string,
    funcName: string,
    funcId: string,
    createdAt: Date,
    message: string,
    status: "pending" | "accepted" | "rejected"
}
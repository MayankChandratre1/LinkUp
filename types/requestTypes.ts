export type RequestType = {
    reqId: string,
    senderId: string,
    receiverId: string,
    userName: string,
    funcName: string,
    funcId: string,
    createdAt: {
        seconds: number,
        nanoseconds: number
    },
    message: string,
    status: "pending" | "accepted" | "rejected"
}
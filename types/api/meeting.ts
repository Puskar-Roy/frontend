interface GenerateTokenRequestBody{
    participantName:string;
    roomName:string;
};

type success="success";

interface GenerateTokenSuccessResponse{
    status:success;
    token:string;
}

interface ErrorResponse{
    error:string;
    details?:string;
}
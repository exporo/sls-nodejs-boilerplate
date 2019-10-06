interface middlewareReturnInterface {
    allow: boolean,
    authenticatedUser: object;
    error: string;
}

interface middlewareInterface {
    allow(req): middlewareReturnInterface;
}
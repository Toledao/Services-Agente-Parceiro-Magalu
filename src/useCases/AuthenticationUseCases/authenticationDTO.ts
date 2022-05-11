export interface IAuthenticationDTO {
    email: string,
    senha: string,
}

export interface IAuthenticationResponseDTO {
    token: string,
    refreshToken: string
}
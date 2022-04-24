export interface IRefreshTokenRequestDTO {
    refreshToken: string
}

export interface IRefreshTokenResponseDTO {
    token: string,
    refreshToken: string
}
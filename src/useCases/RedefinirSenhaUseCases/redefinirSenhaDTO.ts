export interface IEnviarEmailRequestDTO {
	email: string
}

export interface IDefaultResponseDTO {
	success: boolean
}

export interface IAuthCodigoRequestDTO {
	email: string
	codigo: string
}

export interface IRedefinirSenhaRequestDTO {
	email: string
	senha: string
}
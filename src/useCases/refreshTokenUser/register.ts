import { GenerateRefreshToken } from '@providers/implementations/GenerateRefreshToken';
import { GenerateToken } from '@providers/implementations/GenerateToken';
import { PrismaClient } from '@repositories/PrismaClient';
import { RefreshTokenController } from './refreshTokenController';
import { RefreshTokenUseCase } from './refreshTokenUseCase';

const generateToken = new GenerateToken();
const generateRefreshToken = new GenerateRefreshToken(); 
const refreshToken = new RefreshTokenUseCase(PrismaClient, generateToken, generateRefreshToken );
const refreshTokenController = new RefreshTokenController(refreshToken);

export { refreshTokenController as RegisterRefreshTokenController };
import { GenerateRefreshToken } from '@providers/implementations/GenerateRefreshToken';
import { GenerateToken } from '@providers/implementations/GenerateToken';
import { PrismaClient } from '@repositories/PrismaClient';
import { AuthenticationController } from './authenticationController';
import { AuthenticationUseCase } from './authenticationUseCase';

const generateToken = new GenerateToken();
const generateRefreshToken = new GenerateRefreshToken(); 
const authentication = new AuthenticationUseCase(PrismaClient, generateToken, generateRefreshToken);
const authenticationController = new AuthenticationController(authentication);

export { authenticationController as RegisterAuthenticationController };
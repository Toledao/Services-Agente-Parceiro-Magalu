import { Request, Response } from 'express';
import { DeleteParceiroUseCase } from './DeleteParceiroUseCase';
import { GetParceiroUseCase } from './GetParceiroUseCase';
import { IParceiroQueryRequestDTO, IParceiroSaveRequestDTO } from './ParceiroDTO';
import { SaveParceiroUseCase } from './SaveParceiroUseCase';


export class ParceiroController {

	constructor(
		private readonly parceiroSaveUseCase: SaveParceiroUseCase,
		private readonly parceiroGetUseCase: GetParceiroUseCase,
		private readonly parceiroDeleteUseCase: DeleteParceiroUseCase,
	) { }

	async GetAll(request: Request, response: Response): Promise<Response> {
		try {
			const {
				nome,
				descricao,
				cpnj,
				telefone,
				email,
				endereco,
				enderecoNumero,
				bairro,
				referencia,
				cep,
				cidade,
				estado,
				enderecoComplemento,
				ativo,
				reponsavel,
				agenteId } = request.query;

			const parceiros = await this.parceiroGetUseCase.execute(
				<IParceiroQueryRequestDTO>
				{
					nome,
					descricao,
					cpnj,
					telefone,
					email,
					endereco,
					enderecoNumero,
					bairro,
					referencia,
					cep,
					cidade,
					estado,
					enderecoComplemento,
					ativo: ativo === undefined ? undefined : ativo === 'S',
					reponsavel,
					agenteId
				});

			if (parceiros.length > 0)
				return response.status(200).send(parceiros);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Get(request: Request, response: Response): Promise<Response> {

		try {
			const {
				id,
				nome,
				descricao,
				cpnj,
				telefone,
				email,
				endereco,
				enderecoNumero,
				bairro,
				referencia,
				cep,
				cidade,
				estado,
				enderecoComplemento,
				ativo,
				reponsavel,
				agenteId } = request.query;

			const parceiros = await this.parceiroGetUseCase.execute(
				<IParceiroQueryRequestDTO>
				{
					id,
					nome,
					descricao,
					cpnj,
					telefone,
					email,
					endereco,
					enderecoNumero,
					bairro,
					referencia,
					cep,
					cidade,
					estado,
					enderecoComplemento,
					ativo: ativo === undefined ? undefined : ativo === 'S',
					reponsavel,
					agenteId
				});

			if (parceiros?.length > 0)
				return response.status(200).send(parceiros);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Save(request: Request, response: Response): Promise<Response> {

		const { data } = request.body;

		const reqbody = <IParceiroSaveRequestDTO[]>[...data];

		try {
			const parceiros = await this.parceiroSaveUseCase.Save(reqbody);

			return response.status(201).send(parceiros);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async SaveImport(request: Request, response: Response): Promise<Response> {

		const { buffer } = request.file;

		try {
			const parceiros = await this.parceiroSaveUseCase.Import(buffer);

			return response.status(201).send(parceiros);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Delete(request: Request, response: Response): Promise<Response> {

		const { id } = request.body;

		try {
			if (!await this.parceiroDeleteUseCase.execute(id)) {
				throw new Error('Não foi possível excluir o parceiro.');
			}

			return response.status(200).send({ message: 'Parceiro excluído com sucesso' });

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

}
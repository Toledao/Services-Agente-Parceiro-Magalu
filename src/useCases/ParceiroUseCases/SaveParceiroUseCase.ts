import { Parceiro } from '@entities/parceiro';
import { IParceirosRepository } from '@repositories/IParceirosRepository';
import { IParceiroSaveRequestDTO, IParceiroSaveResponseDTO } from './ParceiroDTO';
import { Readable } from 'stream';
import readline from 'readline';

export class SaveParceiroUseCase {

	constructor(
		private parceiroRepository: IParceirosRepository
	) { }


	public async Save(data: IParceiroSaveRequestDTO[]): Promise<IParceiroSaveResponseDTO[]> {

		const ret = await this.SaveParceiro(data.map(x => new Parceiro({ ...x }, x?.id)));

		return <IParceiroSaveResponseDTO[]>ret;
	}

	private async SaveParceiro(data: Parceiro[]) {

		let ret: Parceiro[];

		const toCreate = data.filter(x => x.id === undefined);
		for (const item of toCreate) {
			const parceiro = await this.parceiroRepository.create(item);
			ret.push(parceiro);
		}

		const toUpdate = data.filter(x => x.id != undefined);
		for (const item of toUpdate) {
			const parceiro = await this.parceiroRepository.update(item);
			ret.push(parceiro);
		}

		return ret;
	}

	public async Import(data: Buffer): Promise<IParceiroSaveResponseDTO[]> {

		const read = new Readable();
		read.push(data);
		read.push(null);

		const parceiroLines = readline.createInterface({
			input: read
		});

		const parceiroArray = await this.Read(parceiroLines);

		const ret = await this.SaveParceiro(parceiroArray);

		return <IParceiroSaveResponseDTO[]>ret;
	}

	private async Read(parceiroLines: readline.Interface) {
		let parceiroArray: Parceiro[];

		for await (const line of parceiroLines) {
			const split = line.split(',');
			console.log(line);

			parceiroArray.push(
				new Parceiro(
					{
						agenteId: split[0],
						cpnj: split[2],
						nome: split[3],
						descricao: split[4],
						email: split[5],
						telefone: split[6],
						endereco: split[7],
						enderecoNumero: split[8],
						referencia: split[9],
						bairro: split[10],
						cidade: split[11],
						estado: split[12],
						cep: split[13],
						enderecoComplemento: split[14],
						reponsavel: split[15],
						ativo: true
					}, split[1] //id
				)
			);
		}

		return parceiroArray;
	}

}
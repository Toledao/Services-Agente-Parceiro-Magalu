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

		const req = <Parceiro[]>data;

		req.forEach(x => x.ativo = true);

		const ret = await this.SaveParceiro(req);

		return <IParceiroSaveResponseDTO[]>ret;
	}

	private async SaveParceiro(data: Parceiro[]) {

		const ret: Parceiro[] = [];
		let toCreate = data.filter(x => x.id === undefined);
		const toUpdate = data.filter(x => x.id != undefined);
		for (const item of data) {
			const inativo = await this.parceiroRepository.findByCnpj(item.cpnj);
			if (inativo != undefined && inativo != null) {
				toCreate = toCreate.filter(x => x.cpnj != inativo.cpnj);
				inativo.ativo = true;
				toUpdate.push(inativo);
			}
		}

		for (const item of toCreate) {
			const parceiro = await this.parceiroRepository.create(item);
			ret.push(parceiro);
		}

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
				<Parceiro>
				{
					agenteId: split[0],
					id: split[1],
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
				}
			);
		}

		return parceiroArray;
	}

}
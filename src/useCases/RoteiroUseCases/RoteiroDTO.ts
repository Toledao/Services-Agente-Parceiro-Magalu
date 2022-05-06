import { Roteiro, TipoVisita } from '@entities/roteiro';
import { AgenteResponseDTO } from '@usecases/AgentesUseCases/agentesDTO';
import { ParceiroResponseDTO } from '@usecases/ParceiroUseCases/ParceiroDTO';
import { ITagSaveRequestDTO, TagResponseDTO } from '@usecases/TagsUseCases/TagDTO';

export interface IRoteiroSaveRequestDTO {
	id?: string;
	dataVisita: Date;
	tipoVisita: TipoVisita;
	agenteId: string;
	parceiroId: string;
	tags: ITagSaveRequestDTO[];
}

export interface IRoteiroResponseDTO {
	id: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agente: AgenteResponseDTO;
	parceiro: ParceiroResponseDTO;
	tags: TagResponseDTO[];
}

export class RoteiroResponseDTO implements IRoteiroResponseDTO {

	constructor(props: Roteiro) {
		const { TagRoteiro, ..._props } = props;
		Object.assign(this, _props);
		this.tags = props?.TagRoteiro?.map(x => new TagResponseDTO(x.tag));
	}

	id: string;
	agente: AgenteResponseDTO;
	parceiro: ParceiroResponseDTO;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	tags: TagResponseDTO[];
}

export interface IRoteiroDeleteRequestDTO {
	id?: string;
}

export class IRoteiroQueryRequestDTO {
	id: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agenteId: string;
	parceiroId: string;
}

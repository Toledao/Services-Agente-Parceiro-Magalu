
import { ParceiroResponseDTO } from '../ParceiroUseCases/ParceiroDTO';
import { AgenteResponseDTO } from '../AgentesUseCases/agentesDTO';
import { ITagSaveRequestDTO, TagResponseDTO } from '../TagsUseCases/TagDTO';

export interface ICheckListSaveRequestDTO {
	id?: string;
	preferenciaContato: string;
	redesSociaisAtivas: string;
	canaisVendaOnline: string;
	qtdeSku: string;
	pussuiErpHub: string;
	tipoLogistica: string;
	percepcaoGeral: string;
	imagens: string;
	dataPrimeiraVisita: Date;
	agenteId: string;
	parceiroId: string;
	tags: ITagSaveRequestDTO[];
}

export interface ICheckListResponseDTO {
	id: string;
	preferenciaContato: string;
	redesSociaisAtivas: string;
	canaisVendaOnline: string;
	qtdeSku: string;
	pussuiErpHub: string;
	tipoLogistica: string;
	percepcaoGeral: string;
	imagens: string;
	dataPrimeiraVisita: Date;
	dataCriacao: Date;
	agente: AgenteResponseDTO;
	parceiro: ParceiroResponseDTO;
	tags: TagResponseDTO[];
}

export class CheckListResponseDTO implements ICheckListResponseDTO {

	constructor(props: CheckList) {
		const { TagCheckList, ..._props } = props;
		Object.assign(this, _props);
		this.tags = props?.TagCheckList?.map(x => new TagResponseDTO(x.tag));
	}

	id: string;
	preferenciaContato: string;
	redesSociaisAtivas: string;
	canaisVendaOnline: string;
	qtdeSku: string;
	pussuiErpHub: string;
	tipoLogistica: string;
	percepcaoGeral: string;
	imagens: string;
	dataPrimeiraVisita: Date;
	dataCriacao: Date;
	agente: AgenteResponseDTO;
	parceiro: ParceiroResponseDTO;
	tags: TagResponseDTO[];

}

export interface ICheckListDeleteRequestDTO {
	id?: string;
}

export class ICheckListQueryRequestDTO {
	id: string;
	preferenciaContato: string;
	redesSociaisAtivas: string;
	canaisVendaOnline: string;
	qtdeSku: string;
	pussuiErpHub: string;
	tipoLogistica: string;
	percepcaoGeral: string;
	dataPrimeiraVisita: Date;
	agenteId: string;
	parceiroId: string;
}

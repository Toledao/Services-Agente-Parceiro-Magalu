import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.tag.deleteMany({
		where: {
			exibePadrao: true,
			agenteId: null,
		}
	});

	await prisma.tag.createMany({
		data: [
			{
				exibePadrao: true,
				nome: 'VisitaPresencial',
				agenteId: null,
				cor: '#eb5e54'
			},
			{
				exibePadrao: true,
				nome: 'VisitaOnline',
				agenteId: null,
				cor: '#54eb70'
			},
			{
				exibePadrao: true,
				nome: 'VisitaLigação',
				agenteId: null,
				cor: '#5470eb'
			}
		]
	});
}

main()
	.catch(async (e) => {
		console.error('seed-prisma', e);
		await prisma.$disconnect();
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
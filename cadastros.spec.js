/// <reference types="cypress" />

// Antes de executar este Test-suite faça as seguintes alterações:
// No test-case: Caminhão, altere a placa e o rfid
// No test-case: Destinatário, altere o cnpj
// No test-case: Motorista, altere a CNH e CPF
// No test-case: Nota fiscal, altere o código
// No test-case: Produto, altere o código
// No test-case: Proprietário, altere o CNPJ e inscrição estadual
// No test-case: Transportadora, altere o CNPJ e inscrição estadual
// No test-case: Vagão, altere a placa

Cypress.on('uncaught:exception', (err, runnable) => {
	return false
})

describe('OpenWMS Cadastros', () => {
	beforeEach(() => {
		cy.loginWMS()
	})

	it('Destinatário', () => {
		cy.visitUrlWms('receiver/list?format=')

		cy.contains('F9 - Novo').click()

		// Nome destinatário
		cy.get('#name').type('Fernando Oliveiras')

		// Razão Social
		cy.get('#description').type('Oliveira Transportes')

		// CNPJ
		cy.get('#document').type('03.941.327/0001-56')

		// Inscrição Estadual
		cy.get('#stateRegistration').type('637.170.721.894')

		// E-mail
		cy.get('#email').type('fernando.oliveira@oliveiratransportes.com.br')

		// Telefone
		cy.get('#phone').type('(041) 30327596')

		// Fax
		cy.get('#fax').type('(041) 30327597')

		// Contato
		cy.get('#contact').type('Fernando Oliveira')

		// Telefone contato
		cy.get('#contactPhone').type('(041) 30327596')

		// Endereço
		cy.get('#address').type('Av. Floriano Peixoto')

		// Número
		cy.get('#addressNumber').type('2332')

		// Bairro
		cy.get('#neighborhood').type('Parolim')

		// Estado
		cy.get('#province').type('Paraná')

		// Cidade
		cy.get('#city').type('Curitiba')

		// Código da cidade
		cy.get('#cityCode').type('41')

		// CEP
		cy.get('#zipcode').type('80240-210')

		// Observação
		cy.get('#observation').type('Aprovação pendente..')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Pesquisa destinatário', () => {
		cy.visitUrlWms('receiver/list?format=')

		cy.get("#name").type('Fernando Oliveira')
		cy.get('#document').type('19.502/9999-35')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('Fernando Oliveira')
			.parent()
			.siblings()
			.contains('Ativo')
	});

	it.only('Fornecedor', () => {
		cy.visitUrlWms('productProvider/list?format=')

		// Novo fornecedor
		cy.contains('F9 - Novo').click()

		// Nome
		cy.get('#name').type('Paraná foods')

		// Razão Social
		cy.get('#description').type('Paraná Foods alimentos Ltda')

		// CNPJ
		cy.get('#document').type('92.219.048/0001-03')

		// Email
		cy.get('#email').type('contato@foodscuritiba.com.br')

		// Telefone
		cy.get('#phone').type('(041) 3323-2233')

		// Fax
		cy.get('#fax').type('(041) 3323-2233')

		// Contato
		cy.get('#contact').type('Pedro Fernandes')

		// Telefone contato
		cy.get('#contactPhone').type('(041) 99201-4596')

		// Endereço
		cy.get('#address').type('Avenida Marechal Deodoro')

		// Número
		cy.get('#addressNumber').type('231')

		// Bairro
		cy.get('#neighborhood').type('Juveve')

		// Cidade
		cy.get('#city').type('Campo Largo')

		// Estado
		cy.get('#province').type('Paraná')

		// CEP
		cy.get('#zipcode').type('83.601.080')

		// Observação
		cy.get('#observation').type('Aprovação pendente')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Pesquisa fornecedor', () => {
		cy.visitUrlWms('productProvider/list?format=')

		cy.get("#name").type('Curitiba foods')
		cy.get('#description').type('Foods alimentos Ltda')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('Curitiba foods')
			.parent()
			.siblings()
			.contains('19502999935')
	});

	it('ICMS', () => {
		cy.visitUrlWms('productTaxBR/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Selecionado proprietário
		cy.get("#productOwner").select('ACTIVAS', { force: true })

		// Estado
		cy.get("#uf").select('Paraná', { force: true })

		// Origem CST
		cy.get("#origemCST").select('0 - Nacional, exceto as indicadas nos códigos 3 a 5', { force: true })

		// Situação tributária
		cy.get("#situacaoTributaria").select('20 - Tributado Com redução de base de cálculo', { force: true })

		// Modalidade de determinação da Base de Cálculo do ICMS
		cy.get("#modalideBCICMS\\.id").select('3 - Valor da Operação', { force: true })

		// Reducao BC
		cy.get('#reducaoBC').type('8')

		// Alíquota ICMS
		cy.get('#aliquotaICMS').type('4')

		// Regime tributário
		cy.get("#regimeTributario\\.id").select('1 - Simples Nacional', { force: true })

		// Situacao Operacao SN
		cy.get("#situacaoOperacaoSN\\.id").select('101 - Tributada pelo Simples Nacional com permissão de crédito', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Motorista', () => {
		cy.visitUrlWms('driver/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// CPF
		cy.get('#document').type('762.364.030-58')

		// CNH
		cy.get('#license').type('81634963880')

		// Nome
		cy.get('#name').type('Pedro Fontanas')

		// E-mail
		cy.get('#email').type('robson_c@hotmail.com')

		// Selecionar transportadora
		cy.get("#content-right > div:nth-child(3) > div:nth-child(3) > div:nth-child(5) > a:nth-child(4)").click()
		cy.contains('2TEMPOS').click()

		// Telefone
		cy.get('#phone').type('(041) 3265-5695')

		// Celular
		cy.get('#cellphone').type('(041) 99928-6354')

		// Endereço
		cy.get('#address').type('Rua Euclides da Cunha')

		// Número
		cy.get('#addressNumber').type('7984')

		// Bairro
		cy.get('#neighborhood').type('São Vicente')

		// Cidade
		cy.get('#city').type('Campo Largo')

		// Estado
		cy.get('#province').select('Paraná', { force: true })

		// CEP
		cy.get('#zipcode').type('83.601-080')

		// Observação
		cy.get('#observation').type('Aprovação pendente')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Pesquisa motorista', () => {
		cy.visitUrlWms('driver/list?format=')

		cy.get("#document").type('612.325.660-20')
		cy.get("#name").type('Pedro Fontana')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('Pedro Fontana')
			.parent()
			.siblings()
			.contains('612.325.660-20')
	});

	it('Nota Fiscal', () => {
		cy.visitUrlWms('document/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Código
		cy.get('#code').type('PR_395535')

		// Proprietário
		cy.get('#owner').select('ACTIVAS', { force: true })

		// Valor
		cy.get('#value').type('32000,00')

		// Fornecedor
		cy.get("#tab-1 > table > tbody > tr:nth-child(6) > td > a:nth-child(4)").click()
		cy.contains('CARIOCA').click()

		// Natureza da operação
		cy.get('#natureOperation').select('1.999 - CFOP Entrada para troca de NF', { force: true })

		// Destinatário
		cy.get("#tab-1 > table > tbody > tr:nth-child(8) > td > div > a:nth-child(4)").click()
		cy.contains('PIZZERIA').click()

		// PO
		cy.get('#processNumber').type('123456')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Produto', () => {
		cy.visitUrlWms('product/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Código
		cy.get('#code').type('1234564')

		// Descrição
		cy.get('#description').type('Amônia')

		// Descrição complementar
		cy.get('#complementDescription').type('Amônia')

		// Característica
		cy.get('#feature').select('QUP-QUÍMICO PERIGOSO', { force: true })

		// Grupo
		cy.get('#group').select('Corrosion Coupons', { force: true })

		// Subgrupo
		cy.get('#classification').select('8 - Substâncias Corrosivas', { force: true })

		// Tipo de Produto
		cy.get('#productType').select('Container', { force: true })

		// Unidade de medida
		cy.get("#unitMeasure").select('LI - Litro', { force: true })

		// Peso
		cy.get('#weight').type('20000')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Pesquisar produto', () => {
		cy.visitUrlWms('product/list?format=')

		cy.get('#code').type('123456')
		cy.get('#description').type('AMÔNIA')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('123456')
			.parent()
			.siblings()
			.contains('AMÔNIA')
			.parent()
			.siblings()
			.contains('Ativo')
	});

	it('Proprietário', () => {
		cy.visitUrlWms('productOwner/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Nome proprietário
		cy.get("#name").type('KMM QA Logística Ltda')

		// Razão Social
		cy.get("#description").type('KMM QA WMS Logística Ltda')

		// CNPJ
		cy.get('#document').type('07.286.738/0001-06')

		// Incrição estadual
		cy.get("#stateRegistration").type('988.727.140.178')

		// Email
		cy.get("#email").type('kmmqa@kmm.com.br')

		// Telefone
		cy.get('#phone').type('(042) 3312-4569')

		// Fax
		cy.get('#fax').type('(042) 3312-4569')

		// Contato
		cy.get('#contact').type('Rui Dias')

		// Telefone contato
		cy.get('#contactPhone').type('(042) 3312-4570')

		// Endereço
		cy.get('#address').type('Rua Luiz Fagundes')

		// Número
		cy.get('#addressNumber').type('456')

		// Bairro
		cy.get('#neighborhood').type('Centro')

		// Estado
		cy.get('#province').type('Paraná')

		// Cidade
		cy.get('#city').type('Ponta Grossa')

		// Código cidade
		cy.get('#cityCode').type('042')

		// CEP
		cy.get('#zipcode').type('84050-903')

		// Tempo máximo de operação de agendamento
		cy.get('#maxSchedulingTime').type('180')

		// Possui programação
		cy.get('#hasProgramming').not('[disabled]').check().should('be.checked')

		// Movimenta estoque
		cy.get('#stockMovement').not('[disabled]').check().should('be.checked')

		// Utiliza separação por NF de venda/tranferência
		cy.get('#groupSeparationByDocument')
			.not('[disabled]')
			.check()
			.should('be.checked')

		// Habilita mudança de nat. de operação no romaneio
		cy.get('#allowSalesOrderNatureOperationChage')
			.not('[disabled]')
			.check()
			.should('be.checked')

		// Utiliza criação de caixa na conferência do romaneio
		cy.get('#allowBoxCreation').not('[disabled]').check().should('be.checked')

		// Autorização
		// Valor de NF que precisa de autorização
		cy.get('#valueDocumentNeedAuthorization').type('20000,00')

		// Valor unitário de produto por NF que precisa de autorização
		cy.get('#valueProductNeedAuthorization')
			.type('20000,00')

		// Emails para envio automático DANFE
		cy.get('#documentEmails').type('kmmqa@kmm.com.br')

		// Envio de relatório de estoque automático
		// Horário
		cy.get('#hourReportStock').type('17:00')
		// Emails
		cy.get('#emailsReportStock').type('kmmqa@kmm.com.br')

		// Envio de relatório de operação automático
		// Horário
		cy.get('#hourReportOperation').type('17:00')
		cy.get('#emailsReportOperation').type('kmmqa@kmm.com.br')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Pesquisa proprietário', () => {
		cy.visitUrlWms('productOwner/list?format=')

		cy.get("#name").type('KMM QA Logística Ltda')
		cy.get("#description").type('KMM QA WMS Logística Ltda')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('KMM QA Logística Ltda')
			.parent()
			.siblings()
			.contains('43132447000127')
			.parent()
			.siblings()
			.contains('Ativo')
	});

	it('Caminhão', () => {
		cy.visitUrlWms('truck/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Placa
		cy.get('#serial').type('ABC')
		cy.get('#code').type('1A15')

		// Descrição
		cy.get('#description').type('ABC-1A13')

		// RFID
		cy.get('#rfid').type('00000000000000000000006')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Pesquisar Caminhão', () => {
		cy.visitUrlWms('truck/list?format=')

		cy.get("#serial").type('ABC')
		cy.get("#code").type('3A33')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('ABC-3A33')
			.parent()
			.siblings()
			.contains('Ativo')
	});

	it('Transportadora', () => {
		cy.visitUrlWms('carrier/list?format=#')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Nome
		cy.get('#name').type('TransKMM')

		// Data de registro
		cy.get('#registerDate').clear().type('10/05/2022')

		// Razão social
		cy.get('#description').type('TransKMMQA Ltda')

		// CNPJ
		cy.get('#document').type('54.413.435/0001-97')

		// Inscrição Estadual
		cy.get('#stateRegistration').type('54.413.435/0001-97')

		// E-mail
		cy.get('#email').type('contato@transkmm.com.br')

		// Telefone
		cy.get('#phone').type('(042) 3322-1236')

		// Fax
		cy.get('#fax').type('(042) 3322-1236')

		// Contato
		cy.get('#contact').type('Sérgio França')

		// Telefone contato
		cy.get('#contactPhone').type('(042) 3322-1237')

		// Endereço
		cy.get('#address').type('Rua Magalhães Fernandes')

		// Número
		cy.get('#addressNumber').type('789')

		// Bairro
		cy.get('#neighborhood').type('Vila Militar')

		// Cidade
		cy.get('#city').type('Ponta Grossa')

		// CEP
		cy.get('#zipcode').type('84050-903')

		// Observação
		cy.get('#observation').type('Pendente aprovação')

		// Requisição de transporte
		cy.get('#requestTransport').not('[disabled]').check().should('be.checked')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Pesquisa transportadora', () => {
		cy.visitUrlWms('carrier/list?format=#')

		// Nome
		cy.get('#name').type('TransKMM')

		// Razão social
		cy.get('#description').type('TransKMM Ltda')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('92958847000100')
			.parent()
			.siblings()
			.contains('TransKMM')
	});

	it('Vagão', () => {
		cy.visitUrlWms('wagon/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Placa
		cy.get('#serial').type('AAA')
		cy.get('#code').type('1234571')

		// Descrição
		cy.get('#description').type('AAA-1234571')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Pesquisa vagão', () => {
		cy.visitUrlWms('wagon/list?format=')

		cy.get('#serial').type('AAA')
		cy.get('#code').type('1234567')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('AAA - 1234567')
			.parent()
			.siblings()
			.contains('Ativo')
	});
});

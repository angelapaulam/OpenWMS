/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	return false
})

describe('OpenWMS Operações', () => {
	beforeEach(() => {
		cy.loginWMS()
	})

	it('Apontamento de Serviço', () => {
		cy.visitUrlWms('additionalServiceChecking/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Tipo de Operação
		cy.get("#operationType").select('Serviço Adicional', { force: true })

		// Serviço
		cy.get('#service').select('02 - Desova Conteiner 40 pés', { force: true })

		// Quantidade
		cy.get('#amount').type('1')

		// Nota fiscal
		cy.get('#documentCode').type('PR_39560')

		// Produto
		cy.get('[href="javascript:registerProductReturnFields();"] > .search-ico').click({ force: true })
		cy.contains('ESLINGA').click()

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Pesquisa de apontamento de serviços', () => {
		cy.visitUrlWms('additionalServiceChecking/list?format=')

		// Nota fiscal
		cy.get('#documentCode').type('839')

		// Serviço
		cy.get('#service').select('01 - Desova Conteiner 20 pés', { force: true })

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('01 - Desova Conteiner 20 pés')
			.parent()
			.siblings()
			.contains('839')
	});

	it('Bloqueio de endereço', () => {
		cy.visitUrlWms('addressLock/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Endereço
		cy.get('#addressCode').type('LUB.2')

		// Motivo bloqueio
		cy.get('#cause').select('VENCIDO', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Conferência da separação', () => {
		cy.visitUrlWms('separationConference/list?format=')

		// Código da nota fiscal
		cy.get('#code').type('32740')

		// Período
		cy.get('#startDate').clear().type('01/01/2022')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('32740')
			.parent()
			.siblings()
			.contains('ACTIVAS')
	});

	it('Mensagens de alerta', () => {
		cy.visitUrlWms('systemAlert/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Data
		cy.get('#alertDate').type('01/11/2022')

		// Hora
		cy.get('#alertHour').type('15:00')

		// Tempo de duração
		cy.get('#duration').type('2')

		// Mensagem
		cy.get('#message').type('QA testando o OpenWMS')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});


	it('Pesquisa mensagem de alerta', () => {
		cy.visitUrlWms('systemAlert/list?format=')

		// Mensagem
		cy.get('#message').type('QA testando o OpenWMS')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('QA testando o OpenWMS')
	});

	it('Movimentação de container', () => {
		cy.visitUrlWms('movementPlanningContainerPL/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Data
		cy.get('#date').type('01/12/2022')

		// Armazém
		cy.get('#warehouse').select('Armazem ARM', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it('Planejamento de inventário', () => {
		cy.visitUrlWms('inventoryPlanning/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Selecione o armazém
		cy.get('#warehouse').select('Armazem ARM', { force: true })

		// Data do inventário
		cy.get('#date').type('01/12/2022')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		cy.get('#check').not('[disabled]').check().should('be.checked')

		// Atualizar inventário
		cy.get('#actionUpdate').click()

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Pesquisa inventário', () => {
		cy.visitUrlWms('inventoryPlanning/list?format=')

		// Digite o código do inventário
		cy.get('#code').type('01560')

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('01560')
	});

	it('Planejamento de movimentação', () => {
		cy.visitUrlWms('movementPlanning/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Selecione o armazém
		cy.get('#warehouse').select('Armazem ARM', { force: true })

		// Data
		cy.get('#date').type('01/12/2022')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Apontamento de Produção', () => {
		cy.visitUrlWms('productionNote/list?format=')

		// Novo apontamento
		cy.contains('Novo Apontamento').click()

		// Produto
		cy.get('#product').type('1024{enter}')
	});

	it('Requisição de material', () => {
		cy.visitUrlWms('requestMaterial/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Modelo
		cy.get('#modelId').select('Modelo do Novo Produto', { force: true })

		// Salvar
		cy.get('#actionSave').click()

		// Quantidade solicitada
		cy.get('#amountRequested_items_0').clear().type('1')
		cy.get('#amountRequested_items_1').clear().type('2')
		cy.get('#amountRequested_items_2').clear().type('3')

		// Salvar
		cy.get('#actionUpdate').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro alterado com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Packing List', () => {
		cy.visitUrlWms('packingList/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Embalagem
		cy.get('#packing').select('123 - TESTE EMB', { force: true })

		// Embarque
		cy.get('[value="M"]').not('[disabled]').check().should('be.checked')

		// País destino
		cy.get('#countryDestination').type('Portugal')

		// Data saída
		cy.get('#departureDate').type('01/12/2022')

		// Cliente
		cy.get("#tab-1 > table > tbody > tr:nth-child(4) > td:nth-child(1) > div > a:nth-child(4)").click()
		cy.contains('TESTE CLIENTE').click()

		// Consignatário
		cy.get("#tab-1 > table > tbody > tr:nth-child(5) > td:nth-child(1) > div > a:nth-child(4)").click()
		cy.contains('TESTE CLIENTE')
			.siblings()
			.get('.link-ico-edit')
			.click({ force: true })

		// Ordens
		cy.get('#salesOrderCodes').clear().type('#')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Itens atualizados com sucesso')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});
});

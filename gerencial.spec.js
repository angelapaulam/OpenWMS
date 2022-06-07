/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	return false
})

describe('OpenWMS Gerencial', () => {
	beforeEach(() => {
		cy.loginWMS()
	})

	it('Planejamento', () => {
		cy.visitUrlWms('planning/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Descrição
		cy.get('#description').type('Recebimento Barracuda')

		// Buscar e selecionar proprietário
		cy.get("#content-right > div:nth-child(3) > div:nth-child(4) > a:nth-child(5)").click()
		cy.contains('BARRACUDA').click()

		// Produto
		cy.get('#feature').select('PN-PNEU', { force: true })

		// Tipo de planejamento
		cy.get('[value="RE"]').not('[disabled]').check().should('be.checked')

		// Transporte
		cy.get('#typeTransport').not('[disabled]').check().should('be.checked')

		// Período
		cy.get('#startDate').type('09/05/2022')
		cy.get('#endDate').type('19/05/2022')

		// Gerar itens planejamento
		cy.get('.fieldcontain > .button').click()

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Pesquisa planejamento', () => {
		cy.visitUrlWms('planning/list?format=')

		// Descrição
		cy.get('#description').type('Expedição Pronokal')

		// Período
		cy.get('#startDate').type('01/01/2018')
		cy.get('#endDate').type('09/05/2022')

		// Tipo de planejamento
		cy.get('#planningType').select('Expedição', { force: true })

		cy.contains('F7 - Pesquisar').click()

		cy.get('#content-right > table > tbody')
			.contains('Expedição Pronokal')
			.parent()
			.siblings()
			.contains('Expedição')
	});

	it('Política de preço', () => {
		cy.visitUrlWms('stockPrice/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Descrição
		cy.get('#description').type('CAFELAND')

		// Produto
		cy.get('#feature').select('BB-BOMBA', { force: true })

		// Selecionando o proprietário
		cy.get("#divOwner > a:nth-child(5)").click()
		cy.contains('CAFELAND').click()

		// Modalidade
		cy.get('#billingType').select('Pico Máximo', { force: true })

		// Arredondamento
		cy.get('#roundingType').select('Arredondamento ABNT', { force: true })

		// Movimentações
		cy.get('#movementPriceType').select('Recebimento + Separação', { force: true })

		cy.get("#movementPriceDay1").type('8,90')

		// Limite
		cy.get("#movementPriceLimit1").type('9.999')

		cy.get("#movementPriceDay2").type('8,90')

		// Posições ocupadas
		// Preço por posição
		cy.get("#freepositionPrice").type('59,00')

		cy.get("#freeposition").type('9.999')

		cy.get("#freepositionPriceDay").type('59,00')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Pesquisa de políticas de preços', () => {
		cy.visitUrlWms('stockPrice/list?format=')

		// TODO - Assim que a pesquisa estiver implementada, codificar este test-case
	});
});
/// <reference types="cypress" />

// Antes de executar este Test-suite faça as seguintes alterações:
// Test-case: Armazém, alterar código

Cypress.on('uncaught:exception', (err, runnable) => {
	return false
})

describe('OpenWMS Parametrização', () => {
	beforeEach(() => {
		cy.loginWMS()
	})

	it('Armazém', () => {
		cy.visitUrlWms('warehouse/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Código
		cy.get('#code').type('A008')

		// Descrição
		cy.get('#description').type('Armazém teste 1')

		// Incluir armazenagem
		cy.get('td > .yellow').click()

		// Descrição área
		cy.get('#description_areas').type('Área de armazenagem 1')

		// Selecionar tipo
		cy.get('#type_areas').select('Separação', { force: true })

		// Selecionar classificação
		cy.get('#classificationId_areas').select('G - GRANDE', { force: true })

		// Ordem
		cy.get("#showorder_areas").type('1')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')
	});

	it.only('Avaria', () => {
		cy.visitUrlWms('breakdown/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA01')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.children()
			.type('QA Avaria')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar avaria
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.prev()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('[data-top="180"]')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Característica', () => {
		cy.visitUrlWms('feature/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(3)
			.children()
			.type('QA01')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(2)
			.children()
			.type('QA Descrição')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(1)
			.children()
			.type('QA Descrição complementar')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.select('OS-OFFSHORE', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar avaria
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(4)
			.click()
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(4)
			.click()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Classificação', () => {
		cy.visitUrlWms('classification/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA1')

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.children()
			.type('QA1 Descrição')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.prev()
			.children()
			.first()
			.next()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Endereços X características', () => {
		cy.visitUrlWms('addressingFeature/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Prioridade
		cy.get('#priority').type('1')

		// Característica
		cy.get('#addressFeature').select('BB-BOMBA', { force: true })

		// Tipo de endereço
		cy.get('#addressType').select('PT - PATIO', { force: true })

		// Área
		cy.get('#addressWarehouseArea').select('arm', { force: true })

		// Produto
		// Classificação
		cy.get('#productClassification').select('5.1 - OXIDANTE', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Etiqueta de terceiros', () => {
		cy.visitUrlWms('thirdLabel/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(8)
			.children()
			.type('QA Descrição 01')

		// Tam. código de barras (mín.)
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(7)
			.children()
			.type('2')

		// Posição do Código
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(6)
			.children()
			.type('2')

		// Posição Serial
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(5)
			.children()
			.type('2')

		// Contém
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(4)
			.children()
			.type('2')

		// Posição Lote
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(3)
			.children()
			.type('2')

		// Posição Peso
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(2)
			.children()
			.type('2')

		// Remover início com
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(1)
			.children()
			.type('2')

		// Precedência
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('2')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.description")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(9)
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Grupo', () => {
		cy.visitUrlWms('featureGroup/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.prev()
			.children()
			.type('QA001')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA Descrição')

		// Característica
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.children()
			.select('BB-BOMBA', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(2)
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Motivo bloqueio de endereço', () => {
		cy.visitUrlWms('addressLockCause/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA001')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.children()
			.type('QA Descrição')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.prev()
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Natureza de Operação', () => {
		cy.visitUrlWms('natureOperation/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA001')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.children()
			.type('QA Descrição')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.prev()
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Serviço adicional', () => {
		cy.visitUrlWms('additionalService/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.prev()
			.children()
			.type('QA001')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA Descrição')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.prev()
			.prev()
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Subgrupo', () => {
		cy.visitUrlWms('featureSubgroup/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(1)
			.children()
			.type('QA001')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA Descrição')

		// Grupo
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.children()
			.select('CHI-CHINELO - KIDS', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(2)
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Tipo de endereço', () => {
		cy.visitUrlWms('addressType/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(5)
			.children()
			.type('QA001')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(4)
			.children()
			.type('QA001 Descrição')

		// Altura
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(3)
			.children()
			.clear()
			.type('3,00')

		// Largura
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(2)
			.children()
			.clear()
			.type('3,00')

		// Comprimento
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(1)
			.children()
			.clear()
			.type('3,00')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(6)
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Unidade de medida', () => {
		cy.visitUrlWms('unitMeasure/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Código
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prev()
			.children()
			.type('QA001')

		// Descrição
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.children()
			.type('QA001 Descrição')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar
		cy.get("#lines\\.1\\.code")
			.parent()
			.siblings()
			.parent()
			.siblings()
			.last()
			.children()
			.children()
			.last()
			.parent()
			.prevAll()
			.eq(1)
			.children()
			.children()
			.dblclick()

		cy.wait(1000)

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Doca', () => {
		cy.visitUrlWms('dock/list/actionFind')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Código
		cy.get('#code').type('QA1')

		// Descrição
		cy.get('#description').type('QA Descrição')

		// Proprietário
		cy.get('#productOwner').select('ACTIVAS', { force: true })

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Configuração de endereço', () => {
		cy.visitUrlWms('address/create?format=')

		// Armazém
		cy.get('#warehouse').select('Armazem ARM', { force: true })

		// Área
		cy.get('#warehouseArea').select('ATIVO', { force: true })
	});
});

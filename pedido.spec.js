/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
	return false
})

describe('OpenWMS Pedido', () => {
	beforeEach(() => {
		cy.loginWMS()
	})

	it('Cliente', () => {
		cy.visitUrlWms('client/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// CNPJ
		cy.get('#document').clear().type('13.065.118/0001-40')

		// Razão Social
		cy.get('#description').type('QA Cliente Jurídico Ltda')

		// Nome Fantasia
		cy.get('#name').type('QA Success')

		// Inscrição Estadual
		cy.get('#stateRegistration').type('115.47297-60')

		// Telefone
		cy.get('#phone').type('(042) 3033-2022')

		// Celular
		cy.get('#cellphone').type('(042) 99988-3032')

		// Fax
		cy.get('#fax').type('(042) 3033-2022')

		cy.get('#contact').type('Julio Cezar')

		// Email
		cy.get('#email').type('contato@qasuccess.com.br')

		// Website
		cy.get('#website').type('http://www.qasuccess.com.br')

		// Endereço
		cy.get('#address').type('Rua General Carneiro')

		// Número
		cy.get('#addressNumber').type('2022')

		// Bairro
		cy.get('#neighborhood').type('Japão')

		// Cidade
		cy.get('#city').type('Ponta Grossa')

		// Estado
		cy.get('#province').select('Paraná', { force: true })

		// CEP
		cy.get('#zipcode').type('80.200-000')

		// Observação
		cy.get('#observation').type('QA Observação')

		// Observação para pedido
		cy.get('#observationSalesorder').type('QA Observação para pedido')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});

	it('Formas de pagamento', () => {
		cy.visitUrlWms('payment/create?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		cy.wait(1000)

		// Descrição
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
			.type('Boleto')

		// Número de parcelas
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
			.type('0')

		// Valor mínimo da parcela
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
			.clear()
			.type('1000,00')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')

		// Apagar forma de pagamento
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
			.dblclick()

		cy.wait(1000)
		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro(s) alterado(s) com sucesso.')
	});

	it('Lista de preços', () => {
		cy.visitUrlWms('priceList/list?format=')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// Produto
		cy.get('#productCode').type('1024{enter}')
	});

	it('Representante', () => {
		cy.visitUrlWms('seller/list?format=&enterprise=true')

		// Novo registro
		cy.contains('F9 - Novo').click()

		// CNPJ
		cy.get('#document').clear().type('13.065.118/0001-40')

		// Razão Social
		cy.get('#description').type('QA Cliente Jurídico Ltda')

		// Nome Fantasia
		cy.get('#name').type('QA Success')

		// Telefone
		cy.get('#phone').type('(042) 3033-2022')

		// Fax
		cy.get('#fax').type('(042) 3033-2022')

		// Pedido mínimo
		cy.get('#soMinimumValue').clear().type('3000,00')

		// Endereço
		cy.get('#address').type('Rua General Carneiro')

		// Número
		cy.get('#addressNumber').type('2022')

		// Bairro
		cy.get('#neighborhood').type('Japão')

		// Cidade
		cy.get('#city').type('Ponta Grossa')

		// Estado
		cy.get('#province').select('Paraná', { force: true })

		// CEP
		cy.get('#zipcode').type('80.200-000')

		// Segurança
		// Email
		cy.get('#email').type('qarepresentante@kmmqa.com.br')

		// Senha
		cy.get('#password').type('qa123kmm')

		// Salvar
		cy.get('#actionSave').click()
		cy.get('#divMensagem')
			.should('have.text', 'Registro salvo com sucesso.')

		// Exluindo
		cy.get("#actionDelete").click({ force: true })
		cy.get('#divMensagem')
			.should('have.text', 'Registro excluído com sucesso.')
	});
});

import ambiente            from '../fixtures/ambiente_gtm.json'
import ambienteWms         from '../fixtures/ambiente_wms.json'
import ambienteAgendamento from '../fixtures/agendamento.json'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginGTM', () => {
  cy.visit(ambiente.url)
  cy.get('#email').type(ambiente.user)
  cy.get('#password').type(ambiente.password)
  cy.get('#login_submit').click()
 })

 Cypress.Commands.add('loginWMS', () => {
  cy.visit(ambienteWms.url)
  cy.get('#email').type(ambienteWms.email)
  cy.get('#password').type(ambienteWms.password)
  cy.get('#login_submit').click()
 })

 Cypress.Commands.add('loginAgendamento', () => {
  cy.visit(ambienteAgendamento.url)
  cy.get('#username').type(ambienteAgendamento.user)
  cy.get('#password').type(ambienteAgendamento.password)
  cy.get('#submit').click()
 })

 Cypress.Commands.add('visitUrl', (req_url) => {
  var endereco = ambiente.url + req_url
  cy.visit(endereco)
 })

 Cypress.Commands.add('visitUrlWms', (req_url) => {
  var endereco = ambienteWms.url + req_url
  cy.visit(endereco)
 })

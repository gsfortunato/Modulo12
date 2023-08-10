/// <reference types="cypress" />

import selecaoProdutos from "../support/page_objects/selecaoProdutos.page";
const dadosProdutos = require('../fixtures/produtos.json');
const faker = require('faker')


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta/')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
            cy.visit('produtos/')

        })
    });

    //PRODUTOS PAG.1

    selecaoProdutos.editarProdutos(dadosProdutos[0].produto, dadosProdutos[0].tamanho, dadosProdutos[0].cor, dadosProdutos[0].quantidade)

    selecaoProdutos.editarProdutos(dadosProdutos[1].produto, dadosProdutos[1].tamanho, dadosProdutos[1].cor, dadosProdutos[1].quantidade)

    // PRODUTOS PAG.2

    cy.get(':nth-child(2) > .page-numbers').click()

    selecaoProdutos.editarProdutos(dadosProdutos[2].produto, dadosProdutos[2].tamanho, dadosProdutos[2].cor, dadosProdutos[2].quantidade)

    cy.get(':nth-child(2) > .page-numbers').click()

    selecaoProdutos.editarProdutos(dadosProdutos[3].produto, dadosProdutos[3].tamanho, dadosProdutos[3].cor, dadosProdutos[3].quantidade)

});

it('Deve editar detalhes de faturamento', () => {
    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

    cy.get('#billing_first_name').clear().type(faker.name.firstName())
    cy.get('#billing_last_name').clear().type(faker.name.lastName())
    cy.get('#billing_company').clear().type(faker.company.companyName())

    //CAMPO PARA O PAÍS
    cy.get('#billing_country_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').click()
    cy.get('.select2-search__field').type('Brasil').get('[class="select2-results__option select2-results__option--highlighted"]').click()

    cy.get('#billing_address_1').clear().type(faker.address.streetAddress())
    cy.get('#billing_address_2').clear().type(faker.address.streetAddress())
    cy.get('#billing_city').clear().type(faker.address.cityName())

    //CAMPO PARA O ESTADO E CEP
    cy.get('#select2-billing_state-container').click()
    cy.get('.select2-search__field').clear().type('Rio de Janeiro').get('[class="select2-results__option select2-results__option--highlighted"]').click()
    cy.get('#billing_postcode').clear().type('24370-035')


    cy.get('#billing_phone').clear().type(faker.phone.phoneNumberFormat())
    cy.get('#billing_email').clear().type(faker.internet.email())
    cy.get('#order_comments').clear().type('Obrigado')
    cy.get('#payment_method_cheque').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')


});




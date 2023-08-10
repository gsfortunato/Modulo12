class SelecaoProdutos {

    editarProdutos(produto, tamanho, cor, quantidade){
        //ações do método
        cy.get('[class="row"]').contains(produto).click()
        cy.get(tamanho).click()
        cy.get(cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('#primary-menu > .menu-item-629 > a').click()
    }
}

export default new SelecaoProdutos()
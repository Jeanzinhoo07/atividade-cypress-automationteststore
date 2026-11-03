describe('Módulo 05 - Responsividade e experiência de navegação', () => {

    // RF-15
    it('Deve apresentar os elementos principais em desktop', () => {

        cy.viewport(1366, 768);

        cy.visit('/');

        cy.get('#categorymenu')
            .should('be.visible');

        cy.get('#header')
            .should('be.visible');

        cy.get('#maincontainer')
            .should('be.visible');

    });

    // RF-15
    it('Deve apresentar os elementos principais em mobile', () => {

        cy.viewport('iphone-6');

        cy.visit('/');

        cy.get('#header')
            .should('be.visible');

        cy.get('#maincontainer')
            .should('be.visible');

        cy.get('body')
            .should('be.visible');

        cy.get('#categorymenu')
            .should('exist');

    });

    // RF-16
    it('Deve permitir localizar produtos e acessar o carrinho em mobile', () => {

        cy.viewport(390, 844);

        cy.visit('/');

        cy.get('#filter_keyword, input[name="keyword"]')
            .first()
            .should('be.visible');

        cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
            .filter(':visible')
            .first()
            .find('a.productcart, .productcart, [title="Add to Cart"]')
            .filter(':visible')
            .first()
            .click();

        cy.get('body')
            .should('contain.text', 'Shopping Cart');

    });

});
describe('Módulo 01 - Navegação e organização da interface', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    // RF-01
    it('Deve exibir a página inicial e seus elementos principais', () => {

        cy.get('body').should('be.visible');

        cy.get('#maincontainer').should('be.visible');

        cy.get('#header').should('be.visible');

        cy.get('#categorymenu').should('be.visible');

    });

    // RF-02
    it('Deve permitir acessar uma categoria de produtos', () => {

        cy.get('#categorymenu a')
            .filter(':visible')
            .then(($links) => {

                expect($links.length).to.be.greaterThan(0);

                cy.wrap($links.first()).click();

            });

        cy.get('#maincontainer').should('be.visible');

        cy.get('.thumbnails, .product-list')
            .should('exist');

    });

    // RF-03
    it('Deve permitir retornar à página inicial pelo logotipo', () => {

        cy.get('#logo a, .logo a')
            .first()
            .click();

        cy.location('pathname')
            .should('match', /\/$|index\.php$/);

        cy.get('#maincontainer').should('be.visible');

    });

    // RF-04
    it('Deve apresentar os elementos de navegação', () => {

        cy.get('#categorymenu')
            .should('be.visible');

        cy.get('#categorymenu a')
            .filter(':visible')
            .first()
            .should('be.visible')
            .and('have.attr', 'href');

    });

});
describe('Módulo 02 - Catálogo e apresentação de produtos', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    // RF-05
    it('Deve apresentar nome, imagem e preço dos produtos', () => {

        cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
            .filter(':visible')
            .should('have.length.greaterThan', 0);

        cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
            .filter(':visible')
            .first()
            .within(() => {

                cy.get('img').should('be.visible');

                cy.get('.prdocutname, .productname, a')
                    .filter(':visible')
                    .first()
                    .should('not.be.empty');

                cy.get('.price, .oneprice, .product-price')
                    .should('exist');

            });

    });

    // RF-06
    it('Deve abrir a página de detalhes de um produto', () => {

        cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
            .filter(':visible')
            .first()
            .find('.prdocutname, .productname, a')
            .filter(':visible')
            .first()
            .click();

        cy.get('#product_details, .productpage, #maincontainer')
            .should('be.visible');

        cy.get('h1, .productname')
            .filter(':visible')
            .should('exist');

    });

    // RF-07
    it('Deve apresentar resultado adequado para produto inexistente', () => {

        cy.get('#filter_keyword, input[name="keyword"]')
            .first()
            .should('be.visible')
            .type('produto-inexistente-xyz-987');

        cy.get('a[title="Search"], button[title="Search"], .button-in-search')
            .first()
            .click();

        cy.get('#maincontainer')
            .should('be.visible')
            .and('contain.text', 'There is no product');

    });

    // RF-07
    it('Deve permitir buscar um produto existente', () => {

        cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
            .filter(':visible')
            .first()
            .find('.prdocutname, .productname, a')
            .filter(':visible')
            .first()
            .invoke('text')
            .then((nome) => {

                const termo = nome.trim().split(/\s+/)[0];

                cy.get('#filter_keyword, input[name="keyword"]')
                    .first()
                    .clear()
                    .type(termo);

                cy.get('a[title="Search"], button[title="Search"], .button-in-search')
                    .first()
                    .click();

                cy.get('#maincontainer')
                    .should('be.visible')
                    .and('contain.text', termo);

            });

    });

    // RF-08
    it('Deve manter o nome do produto entre listagem e detalhes', () => {

        cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
            .filter(':visible')
            .first()
            .find('.prdocutname, .productname, a')
            .filter(':visible')
            .first()
            .invoke('text')
            .then((nomeLista) => {

                cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
                    .filter(':visible')
                    .first()
                    .find('.prdocutname, .productname, a')
                    .filter(':visible')
                    .first()
                    .click();

                cy.get('h1, .productname')
                    .filter(':visible')
                    .first()
                    .invoke('text')
                    .should((nomeDetalhes) => {

                        expect(nomeDetalhes.trim())
                            .to.contain(nomeLista.trim());

                    });

            });

    });

});
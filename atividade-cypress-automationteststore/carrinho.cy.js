describe('Módulo 03 - Gerenciamento do carrinho', () => {

    // Função para adicionar o primeiro produto
    const adicionarProduto = () => {

        cy.visit('/');

        cy.get('.thumbnails .thumbnail, .product-list .thumbnail')
            .filter(':visible')
            .first()
            .find('a.productcart, .productcart, [title="Add to Cart"]')
            .filter(':visible')
            .first()
            .click();

    };

    // RF-09
    it('Deve adicionar um produto ao carrinho', () => {

        adicionarProduto();

        cy.get('body')
            .should('contain.text', 'Shopping Cart');

        cy.get('#cart, .cart')
            .should('exist');

    });

    // RF-10
    it('Deve permitir alterar a quantidade do produto', () => {

        adicionarProduto();

        cy.get('a[href*="checkout"], a[href*="cart"], #cart a')
            .filter(':visible')
            .first()
            .click();

        cy.get('input[name*="quantity"], input[id*="quantity"]')
            .first()
            .then(($input) => {

                if ($input.length) {

                    cy.wrap($input)
                        .clear()
                        .type('2');

                    cy.get('button[title*="Update"], input[value*="Update"], .fa-refresh')
                        .first()
                        .click();

                    cy.get('input[name*="quantity"], input[id*="quantity"]')
                        .first()
                        .should('have.value', '2');

                } else {

                    cy.get('#maincontainer')
                        .should('be.visible');

                }

            });

    });

    // RF-11
    it('Deve apresentar os valores monetários no carrinho', () => {

        adicionarProduto();

        cy.get('a[href*="checkout"], a[href*="cart"], #cart a')
            .filter(':visible')
            .first()
            .click();

        cy.get('#maincontainer')
            .should('be.visible');

        cy.get('body').should(($body) => {

            expect($body.text())
                .to.match(/Total|Sub-Total|Shipping|Grand Total/i);

        });

        cy.get('body')
            .should('contain.text', '$');

    });

    // RF-12
    it('Deve remover produto do carrinho', () => {

        adicionarProduto();

        cy.get('a[href*="checkout"], a[href*="cart"], #cart a')
            .filter(':visible')
            .first()
            .click();

        cy.get('#maincontainer')
            .should('be.visible');

        cy.get('button[title*="Remove"], a[title*="Remove"], .fa-trash, .btn-remove')
            .filter(':visible')
            .first()
            .click();

        cy.get('#maincontainer')
            .should('be.visible');

        cy.get('body')
            .should('contain.text', 'Your shopping cart is empty');

    });

});
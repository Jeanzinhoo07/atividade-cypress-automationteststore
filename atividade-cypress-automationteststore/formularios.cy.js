describe('Módulo 04 - Formulários e validação de interface', () => {

    // RF-13
    it('Deve verificar campos obrigatórios do formulário de contato', () => {

        cy.visit('/');

        cy.get('a')
            .contains(/contact us/i)
            .first()
            .click();

        cy.get('button, input[type="submit"]')
            .filter(':visible')
            .then(($buttons) => {

                const botao = [...$buttons].find((el) =>
                    /submit|send/i.test(el.innerText || el.value || '')
                );

                if (botao) {
                    cy.wrap(botao).click();
                }

            });

        cy.get('#ContactUsFrm')
            .should('be.visible');

        cy.get('body')
            .should('contain.text', 'Contact Us');

        cy.get('#ContactUsFrm [required], #ContactUsFrm .required')
            .should('exist');

    });

    // RF-14
    it('Deve apresentar orientações no formulário de contato', () => {

        cy.visit('/');

        cy.get('a')
            .contains(/contact us/i)
            .first()
            .click();

        cy.get('#ContactUsFrm')
            .should('be.visible');

        cy.get('label, .help-block, .required')
            .filter(':visible')
            .should('have.length.greaterThan', 0);

    });

    // RF-14
    it('Deve apresentar confirmação após adicionar produto', () => {

        cy.visit('/');

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
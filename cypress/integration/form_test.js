// write tests here
describe("Forms", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    })

    it('Get the name and type it in', () => {
        //grab input
        //assert it is empty
        //type in name
        //assert that we typed it in there
        cy.get('input[name="name"]').should('have.value', '')
        .type('Emma')
        .should('have.value', 'Emma');
    })

    it('Get email and type email', () => {
        cy.get('input[name="email"]').should('have.value', '')
        .type('cooperemmey@yahoo.com')
        .should('have.value', 'cooperemmey@yahoo.com')
    })

    it('Get password and type it in', () => {
        cy.get('input[name="password"]').should('have.value', '')
        .type('emmaCooper')
        .should('have.value', 'emmaCooper')
    })

    it('Check terms of service box', () => {
        //set up : see if terms of service checkbox is false
        //click
        //assert check if it is true
        cy.get('input[name="terms"]').check();
        cy.get('input[name="terms"]').uncheck();
    })

    it('Check to see if user can submit form data', () => {
        cy.get('button').should('be.disabled')

        cy.get('input[name="name"]')
        .type('Emma')

        cy.get('input[name="email"]')
        .type('cooperemmey@yahoo.com')

        cy.get('input[name="password"]')
        .type('emmaCooper')

        cy.get('input[name="terms"]').check();

        cy.get('button').should('be.enabled').click()
    })

    it('Check to see if user can submit form data', () => {
        cy.get('button').should('be.disabled')

        cy.get('input[name="email"]')
        .type('cooperemmey@yahoo.com')

        cy.get('input[name="password"]')
        .type('emmaCooper')

        cy.get('input[name="terms"]').check();

        cy.get('button').should('be.disabled')
    })
})
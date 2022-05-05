describe('login workflow', () => {
    it('login', ()=> {
        cy.visit('http://localhost:3000');
        cy.findByRole('textbox', {placeholder: /email/i}).type('carlos@uh.edu');
        cy.findByPlaceholderText(/password/i).type('123okGo#');
        cy.findByRole('button', {  name: /log in/i}).click();
        cy.get('[data-test="logout"]').click();
    })   
})

describe('signup a new user', () => {
    it('signup', ()=> {
        cy.visit('http://localhost:3000');
        cy.findByRole('link', {  name: /sign up/i}).click();
        cy.get('[type="text"]').type('David Smith');
        cy.get('#email').type('DavidSmith@gmail.com');
        cy.get('#new-password').type('DSmith123@!');
        cy.findByRole('button', {  name: /sign up/i}).click();

        if (cy.get('.sc-papXJ')) {
            cy.get('.styles_ExitIcon__1YoeF').click();
        }
    }),
    it('login in now with new credentials', () => {
        cy.findByRole('textbox', {placeholder: /email/i}).type('DavidSmith@gmail.com');
        cy.findByPlaceholderText(/password/i).type('DSmith123@!');
        cy.findByRole('button', {  name: /log in/i}).click();
        cy.get('[data-test="logout"]').click();
    })
})

describe('login auth testing', () => {
    it('email tests', () => {
        cy.findByRole('textbox', {placeholder: /email/i}).type('newuser@gmail.com');
        cy.findByRole('button', {  name: /log in/i}).click();
        
        const emptyPwdCheck = cy.get('.sc-dIouRR').contains(/"password" is not allowed to be empty/i);
        
        if (emptyPwdCheck) {
            cy.get('#current-password').type('a');
            cy.findByRole('button', {  name: /log in/i}).click();
        }

        const invalidPwd = cy.get('.sc-dIouRR').contains(/invalid email or password/i);

        if(invalidPwd) {
            cy.findByRole('textbox', {placeholder: /email/i}).clear(); 
            cy.findByRole('button', {  name: /log in/i}).click();
        }

        const empytEmail = cy.get('.sc-dIouRR').contains(/"email" is not allowed to be empty/i);

        if (empytEmail) {
            cy.log('success');
            console.log('success');
        }
    })
})
describe("tests routes in register", () => {
  describe("when user is logged", () => {
    before(() => {
      cy.visit("/login");
      cy.get("#email").type("zebirita@email.com");
      cy.get("#password").type("$#zebirita#$");
      cy.get("#login-button").click();
    });
    it("should visit the register page", () => {
      cy.visit("/register");
      cy.url().should("include", "/customer/products");
      cy.get("#products-page").should("be.visible");
    });
  });
  describe("when user isn't logged", () => {
    it("should visit the register page", () => {
      cy.visit("/register");
      cy.url().should("include", "/register");
      cy.get("#register-page").should("be.visible");
    });
  });
});

describe("tests in register of login page", () => {
  it("should appear a error when name is unformatted", () => {
    cy.visit("/register");
    cy.get("#name").type("f");
    cy.get("#name-error").should("be.visible");
    cy.get("#register-button").should("be.disabled");
  });
  it("should appear a error when email is unformatted", () => {
    cy.visit("/register");
    cy.get("#email").type("fake.com");
    cy.get("#email-error").should("be.visible");
    cy.get("#register-button").should("be.disabled");
  });
  it("should appear a error when password is unformatted", () => {
    cy.visit("/register");
    cy.get("#password").type("12");
    cy.get("#password-error").should("be.visible");
    cy.get("#register-button").should("be.disabled");
  });
});

describe("tests in buttons of login page", () => {
  before(() => {
    cy.exec("cd .. && cd back-end && npm run db:reset");
  });
  describe("test in register button", () => {
    it("should show error with existing user", () => {
      cy.visit("/register");
      cy.get("#name").type("Zé");
      cy.get("#email").type("zebirita@email.com");
      cy.get("#password").type("$#zebirita#$");
      cy.get("#register-button").click();
      cy.get("#register-error").should("be.visible");
    });
    it("should register with correct credentials", () => {
      cy.visit("/register");
      cy.get("#name").type("test");
      cy.get("#email").type("test@test.com");
      cy.get("#password").type("test1234");
      cy.get("#register-button").click();
      cy.url().should("include", "/customer/products");
      cy.get("#products-page").should("be.visible");
    });
  });

  describe("test in go back button", () => {
    it("should go to register page", () => {
      cy.visit("/register");
      cy.get("#back-button").click();
      cy.url().should("include", "/login");
      cy.get("#login-page").should("be.visible");
    });
  });
});

describe("tests routes in login page when not logged in", () => {
  it("should visit the login page with no route", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
    cy.get("#login-page").should("be.visible");
  });

  it("should visit the login page with login route", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
    cy.get("#login-page").should("be.visible");
  });

  it("should visit the login page with customer routes", () => {
    it("should visit the login page with customer/products", () => {
      cy.visit("/customer/products");
      cy.url().should("include", "/login");
      cy.get("#login-page").should("be.visible");
    });

    it("should visit the login page with customer/checkout", () => {
      cy.visit("/customer/checkout");
      cy.url().should("include", "/login");
      cy.get("#login-page").should("be.visible");
    });

    it("should visit the login page with customer/orders", () => {
      cy.visit("/customer/orders");
      cy.url().should("include", "/login");
      cy.get("#login-page").should("be.visible");
    });
    it("should visit the login page with customer/orders/id", () => {
      cy.visit("/customer/orders/1");
      cy.url().should("include", "/login");
      cy.get("#login-page").should("be.visible");
    });
  });

  it("should visit the login page with seller routes", () => {
    it("should visit the login page with seller/orders", () => {
      cy.visit("/seller/orders");
      cy.url().should("include", "/login");
      cy.get("#login-page").should("be.visible");
    });
    it("should visit the login page with seller/orders/id", () => {
      cy.visit("/seller/orders/1");
      cy.url().should("include", "/login");
      cy.get("#login-page").should("be.visible");
    });
  });

  it("should visit the login page with admin route", () => {
    cy.visit("/admin/manage");
    cy.url().should("include", "/login");
    cy.get("#login-page").should("be.visible");
  });
});

describe("tests in inputs of login page", () => {
  it("should appear a error when email is unformatted", () => {
    cy.visit("/login");
    cy.get("#email").type("fake.com");
    cy.get("#email-error").should("be.visible");
    cy.get("#login-button").should("be.disabled");
  });
  it("should appear a error when password is unformatted", () => {
    cy.visit("/login");
    cy.get("#password").type("12");
    cy.get("#password-error").should("be.visible");
    cy.get("#login-button").should("be.disabled");
  });
});

describe("tests in buttons of login page", () => {
  describe("test in login button", () => {
    it("should show error with incorrect credentials", () => {
      cy.visit("/login");
      cy.get("#email").type("fake@fake.com");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();
      cy.get("#login-error").should("be.visible");
    });
    it("should login with correct credentials", () => {
      cy.visit("/login");
      cy.get("#email").type("zebirita@email.com");
      cy.get("#password").type("$#zebirita#$");
      cy.get("#login-button").click();
      cy.url().should("include", "/customer/products");
      cy.get("#products-page").should("be.visible");
    });
  });

  describe("test in register button", () => {
    it("should go to register page", () => {
      cy.visit("/login");
      cy.get("#register-button").click();
      cy.url().should("include", "/register");
      cy.get("#register-page").should("be.visible");
    });
  });
});

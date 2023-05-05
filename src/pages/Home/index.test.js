import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
    
    it("a list of events is displayed", async () => {
    // create page
    render(<Home />);
     /* check if a list of events is displayed - find at least one Eventcard in the section 
     nos realisations */
    await screen.findByText("Contactez-nous");
  })
  it("a list a people is displayed", async () => {
    render(<Home />);
    // list of people contains a role of CEO
    await screen.findByText("CEO");
  })
  it("a footer is displayed", async () => {
    render(<Home />);
    // footer contains the text "Notre derniére prestation" 
    await screen.findByText("Notre derniére prestation");
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});

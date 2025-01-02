
describe('E2E TEST', () => {
  it('types', () => {
    // Step 1: Visit the application at the specified URL
    cy.visit('http://localhost:3000');

    // Step 2: Click the timer button using its data-testid attribute
    cy.get('[data-testid="timerBtn"]').click();
    cy.get('[data-testid="startBtn"]').click();

    // Step 3: Type a long passage of text into the input field
    cy.get('[data-testid="user_input"]').type(
      "The quick brown fox jumped over the lazy dog, while birds flew high above the tall trees, casting long shadows across the grass. The warm sun shone brightly, and the gentle breeze stirred the flowers along the path. Nearby, the river flowed steadily, its surface reflecting the blue sky and distant mountains. As the clouds drifted slowly, small creatures scurried about, gathering food and preparing for the coming night. The air was fresh, filled with scents of pine and earth, offering sense of peace and calm. In the distance, the deer grazed quietly, unaware of the watchful eyes hidden among the branches. Everything seemed still, yet alive with the rhythm of nature, where every moment held its own story, waiting to unfold."
    );
  });
});


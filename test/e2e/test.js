import { ClientFunction } from 'testcafe'; // first import testcafe selectors


fixture `Getting Started`// declare the fixture
    .page `http://localhost:8080/test/e2e`;  // specify the start page


//then create a test and place your code there
test('My first test', async t => {

    await t
    .wait(5000)
    .expect(true).eql(true);
        // .typeText('#developer-name', 'John Smith')
        // .click('#submit-button')

        // Use the assertion to check if the actual header text is equal to the expected one
        // .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});
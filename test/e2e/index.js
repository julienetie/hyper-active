const createTestCafe = require('testcafe');

createTestCafe('localhost', 8080)
    .then(testcafe => {
        testcafe
            .createRunner()
            .src('test.js')
            .browsers(['chrome'])
            .run();
    });
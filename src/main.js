const rallf = require('rallf-js-sdk');

class BasicExample extends rallf.Task {
  constructor() {
    super();
    this.firefox = null;
  }

  /**
   * This function will happen once you have access to robot, before run happens.
   * You dont know how much time before, but it will be before... 
   */
  async warmup() {
    // Available logger
    this.logger.debug('warmup done!');
  }

  /**
   * This function will run once everything is properly loaded and set to go
   * @param {any} input - this is the input of your task, provided by the consumer
   */
  async start(input) {
    this.logger.debug('start done!');

    // this will call method 'login' in `rallf.facebook.example`
    // and will return the result or error
    let res = await this.robot.delegateLocal('rallf.js.facebook.skill', 'login', {
      username: process.env.FB_USERNAME,
      password: process.env.FB_PASSWORD
    }, {});

    // If there has been an error lets log it and return
    if (res.error) {
      this.logger.error(res.error);
      return;
    } 

    // Otherwise we can access the result 
    // wich contains a result property containing the return value of the method
    else {
      this.logger.debug(this.fqtn + ' finished: ' + JSON.stringify(res.return));
      return {
        delegate_result: res
      };
    }
  }

  /**
   * This function will happen once start finishes, and before killing execution
   * You can get rid of devices by yourself here, or they will be closed after
   */
  async cooldown() {
    this.logger.debug('cooldown');
  }
}
module.exports = BasicExample;
const reactPageModel = require('./react-page');

class reactAppPage {
	constructor(page) {
		this.page = page;
	}
	
	async goto() {
		// await this.page.goto('http://frontend.localhost');
        await this.page.goto('/');
	}

    async enterdetails(data) {
        // await this.page.fill('#full-name', data.name);
        // await this.page.fill('#avatar_url', data.avatar);
        // await this.page.fill('#phone-number', data.phone);
        // await this.page.fill('#email', data.email);
        await this.page.fill(reactPageModel.reactPageSelectors.fullNameTextfield, data.name);
        await this.page.fill(reactPageModel.reactPageSelectors.avatarUrlTextfield, data.avatar);
        await this.page.fill(reactPageModel.reactPageSelectors.phoneTextfield, data.phone);
        await this.page.fill(reactPageModel.reactPageSelectors.emailTextfield, data.email);
    }

}
module.exports = { reactAppPage };